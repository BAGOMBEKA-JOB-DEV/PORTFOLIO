import { useEffect, useMemo, useState } from "react";
import { FiClock } from "react-icons/fi";

// Converts the stated core hours into whatever timezone the visitor is in, using
// only Intl — the IANA database ships inside the browser, so this needs no API,
// no dependency and no backend.
//
// Everything here runs after mount. Rendering a visitor-specific time on the
// server would guarantee a hydration mismatch on a statically generated page, and
// the "Timezone alignment" pillar above already states the hours in plain text,
// so this is strictly an enhancement over content that is already there.

const HOME_ZONE = "Africa/Kampala";
const HOME_LABEL = "Kampala";
const CORE_START_HOUR = 8;
const CORE_END_HOUR = 18;

// Used only where Intl.supportedValuesOf is missing (pre-2022 browsers). The
// feature degrades to a short list rather than disappearing.
const FALLBACK_ZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Africa/Kampala",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
];

const listZones = (): string[] => {
  const supported = (Intl as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf;

  if (typeof supported !== "function") return FALLBACK_ZONES;

  return supported("timeZone");
};

/** The visitor's own zone, or Kampala if the browser will not say. */
const detectZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone || HOME_ZONE;

/**
 * The two instants that bound today's core hours.
 *
 * Built from today's date rather than a fixed offset, which is the whole point:
 * EAT never observes DST but most northern zones do, so the correct conversion
 * for New York is 00:00 in January and 01:00 in July. A hardcoded offset table
 * is silently wrong for half the year.
 */
const coreHourInstants = () => {
  const now = new Date();

  const at = (hour: number) => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: HOME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);

    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "01";

    // EAT is UTC+3 year-round, so the UTC instant is simply the local hour minus 3.
    return new Date(`${get("year")}-${get("month")}-${get("day")}T${String(hour - 3).padStart(2, "0")}:00:00Z`);
  };

  return { start: at(CORE_START_HOUR), end: at(CORE_END_HOUR) };
};

const timeIn = (zone: string, instant: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).format(
    instant,
  );

const dayIn = (zone: string, instant: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: zone, day: "numeric" }).format(instant);

/**
 * Live UTC offset label, e.g. "GMT+2", "GMT+5:30", "GMT+12:45".
 *
 * Read from formatToParts rather than derived by subtracting dates — subtraction
 * rounds away the sub-hour zones, and Kolkata (:30) and Chatham (:45) are real.
 */
const offsetLabel = (zone: string, instant: Date) =>
  new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
    .formatToParts(instant)
    .find((part) => part.type === "timeZoneName")?.value ?? "";

/** Minutes this zone sits from UTC at the given instant, sub-hour offsets included. */
const offsetMinutes = (zone: string, instant: Date) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(instant)
      .map((part) => [part.type, part.value]),
  );

  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );

  return (asUTC - instant.getTime()) / 60000;
};

/** "7h behind Kampala", "2h 45m ahead of Kampala", "Same time as Kampala". */
const describeGap = (minutes: number) => {
  if (minutes === 0) return `Same time as ${HOME_LABEL}`;

  const direction = minutes < 0 ? `behind ${HOME_LABEL}` : `ahead of ${HOME_LABEL}`;
  const total = Math.abs(minutes);
  const hours = Math.floor(total / 60);
  const rest = total % 60;

  return `${hours ? `${hours}h` : ""}${hours && rest ? " " : ""}${rest ? `${rest}m` : ""} ${direction}`.trim();
};

type Conversion = {
  zone: string;
  offset: string;
  homeOffset: string;
  start: string;
  end: string;
  /** Set when the converted range crosses midnight — "21:00–07:00" alone reads as nonsense. */
  rollover: "previous day" | "next day" | null;
  gap: string;
  available: boolean;
  homeNow: string;
  localNow: string;
};

const convert = (zone: string): Conversion | null => {
  try {
    const { start, end } = coreHourInstants();
    const now = new Date();

    // Compare each endpoint's day against Kampala's to see which way it crossed.
    const homeDay = dayIn(HOME_ZONE, start);
    let rollover: Conversion["rollover"] = null;
    if (dayIn(zone, start) !== homeDay) rollover = "previous day";
    else if (dayIn(zone, end) !== homeDay) rollover = "next day";

    const homeHour = Number(
      new Intl.DateTimeFormat("en-GB", { timeZone: HOME_ZONE, hour: "2-digit", hour12: false }).format(now),
    );

    return {
      zone,
      offset: offsetLabel(zone, now),
      homeOffset: offsetLabel(HOME_ZONE, now),
      start: timeIn(zone, start),
      end: timeIn(zone, end),
      rollover,
      gap: describeGap(offsetMinutes(zone, now) - offsetMinutes(HOME_ZONE, now)),
      available: homeHour >= CORE_START_HOUR && homeHour < CORE_END_HOUR,
      homeNow: timeIn(HOME_ZONE, now),
      localNow: timeIn(zone, now),
    };
  } catch {
    // An unknown zone, or an Intl build without timezone data. The pillar above
    // already answers the question, so failing invisibly is the right outcome.
    return null;
  }
};

const TimeZoneConverter: React.FC = () => {
  const [zone, setZone] = useState<string | null>(null);
  const [zones, setZones] = useState<string[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const detected = detectZone();
      const all = listZones();

      // The browser may report a legacy IANA alias that supportedValuesOf does not
      // list — engines disagree here, Node resolves Asia/Kolkata where Chrome
      // resolves Asia/Calcutta. Splice the detected zone in rather than maintain an
      // alias table that would rot with every tzdata release.
      setZones(all.includes(detected) ? all : [detected, ...all]);
      setZone(detected);
    } catch {
      // Leaves zone null, so nothing renders.
    }
  }, []);

  // Labelling all ~418 zones with their live offset costs around 70ms — enough to
  // be felt if it ran inline. Deferred to idle time; until it lands the list is
  // still complete and usable, just without the offset suffix.
  useEffect(() => {
    if (!zones.length) return;

    const build = () => {
      const now = new Date();

      setLabels(
        Object.fromEntries(
          zones.map((value) => {
            try {
              return [value, `${value.replace(/_/g, " ")} (${offsetLabel(value, now)})`];
            } catch {
              return [value, value.replace(/_/g, " ")];
            }
          }),
        ),
      );
    };

    const idle = (window as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const handle = idle ? idle(build) : window.setTimeout(build, 0);

    return () => {
      if (!idle) window.clearTimeout(handle);
    };
  }, [zones]);

  const known = useMemo(() => new Set(zones), [zones]);
  const conversion = useMemo(() => (zone ? convert(zone) : null), [zone]);

  // Nothing on the server, and nothing at all if Intl let us down.
  if (!conversion) return null;

  const column = (label: string, place: string, range: string, meta: string, accent: boolean) => (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">{label}</p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{place}</p>
      <p
        className={
          accent
            ? "mt-2 text-2xl md:text-3xl font-bold tracking-tight tabular-nums text-teal-600 dark:text-teal-400"
            : "mt-2 text-2xl md:text-3xl font-bold tracking-tight tabular-nums text-neutral-900 dark:text-neutral-50"
        }
      >
        {range}
      </p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{meta}</p>
    </div>
  );

  return (
    <section
      aria-labelledby="tz-heading"
      className="mt-14 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-11 h-11 rounded-lg bg-teal-600/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400">
            <FiClock size={18} />
          </span>
          <h2 id="tz-heading" className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            My core hours, in your timezone
          </h2>
        </div>

        <p
          className={
            conversion.available
              ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-600/10 dark:bg-teal-400/10 text-sm font-semibold text-teal-700 dark:text-teal-400"
              : "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/5 dark:bg-neutral-50/5 text-sm font-semibold text-neutral-600 dark:text-neutral-400"
          }
        >
          <span
            aria-hidden="true"
            className={
              conversion.available
                ? "inline-block h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400"
                : "inline-block h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600"
            }
          />
          {conversion.available ? "Available now" : "Outside core hours"}
        </p>
      </div>

      <div aria-live="polite" className="mt-8 grid gap-8 sm:grid-cols-2">
        {column(
          "My hours",
          `${HOME_LABEL}, Uganda`,
          `${String(CORE_START_HOUR).padStart(2, "0")}:00 – ${CORE_END_HOUR}:00`,
          `${conversion.homeOffset} · now ${conversion.homeNow}`,
          false,
        )}

        {column(
          "Your hours",
          conversion.zone.replace(/_/g, " "),
          `${conversion.start} – ${conversion.end}${conversion.rollover ? " *" : ""}`,
          `${conversion.offset} · now ${conversion.localNow}`,
          true,
        )}
      </div>

      {conversion.rollover && (
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          * The window opens on the <span className="font-semibold">{conversion.rollover}</span> in your timezone.
        </p>
      )}

      <div className="mt-6 pt-6 border-t border-neutral-900/10 dark:border-neutral-50/10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <label htmlFor="tz-input" className="text-sm text-neutral-600 dark:text-neutral-400">
          Not your timezone?
        </label>

        <input
          id="tz-input"
          list="timezone-options"
          defaultValue={conversion.zone}
          placeholder="Type a city…"
          className="w-56 px-3 py-2 rounded-lg border border-neutral-900/15 dark:border-neutral-50/15 bg-transparent text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onChange={(event) => {
            const value = event.target.value.trim();

            // Free text: only accept it once it is a real zone, so a half-typed
            // entry never blanks the panel.
            if (known.has(value)) setZone(value);
          }}
        />

        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{conversion.gap}</p>

        <datalist id="timezone-options">
          {zones.map((value) => (
            <option key={value} value={value}>
              {labels[value] ?? value.replace(/_/g, " ")}
            </option>
          ))}
        </datalist>
      </div>
    </section>
  );
};

export default TimeZoneConverter;
