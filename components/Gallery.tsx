import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import type { Screenshot } from "types/Sections";

/**
 * Documentation screenshots: a mosaic on the card, a lightbox over the page.
 *
 * The captures are of real websites, so they are framed as windows — a title
 * bar carrying the live hostname. That is not decoration: it says these are
 * running sites rather than mockups, and it tells the reader where to go.
 *
 * The dialog is portalled to document.body. It has to be: scroll-reveal puts
 * `transform: translateY(...)` on the wrapping group, and a transformed
 * ancestor becomes the containing block for `position: fixed`, so an in-place
 * overlay would be clipped to the card instead of covering the viewport.
 */

/** The capture size every set used before any declared its own. */
const DEFAULT_W = 1600;
const DEFAULT_H = 1000;

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
};

/** Title bar. Monochrome dots — three coloured ones would imply macOS, which
 *  is a claim about the screenshot that is not being made. */
const Chrome: React.FC<{ host: string; compact?: boolean }> = ({ host, compact = false }) => (
  <div
    className={`flex flex-shrink-0 items-center gap-1.5 border-b border-neutral-50/10 bg-neutral-900/90 px-3 ${
      compact ? "h-6" : "h-8"
    }`}
  >
    <span className="flex gap-1" aria-hidden="true">
      <span className="h-[7px] w-[7px] rounded-full bg-neutral-50/25" />
      <span className="h-[7px] w-[7px] rounded-full bg-neutral-50/25" />
      <span className="h-[7px] w-[7px] rounded-full bg-neutral-50/25" />
    </span>

    {host && (
      <span className="ml-2 truncate rounded bg-neutral-50/[0.07] px-2 py-0.5 font-mono text-[10px] text-neutral-400">
        {host}
      </span>
    )}
  </div>
);

const Gallery: React.FC<{ items: Screenshot[]; label: string; docsUrl?: string }> = ({ items, label, docsUrl }) => {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  // document does not exist while the page is being generated, so the portal
  // target is only available from the first client render onwards.
  useEffect(() => setMounted(true), []);

  const isOpen = openAt !== null;
  const host = docsUrl ? hostOf(docsUrl) : "";

  const step = useCallback(
    (offset: number) => setOpenAt((at) => (at === null ? at : (at + offset + items.length) % items.length)),
    [items.length],
  );

  const close = useCallback(() => {
    setOpenAt((at) => {
      // Focus goes back to the thumbnail for the slide being viewed, so
      // keyboard and screen-reader users resume where they left off.
      if (at !== null) triggers.current[at]?.focus();

      return null;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return close();
      if (event.key === "ArrowRight") return step(1);
      if (event.key === "ArrowLeft") return step(-1);
      if (event.key !== "Tab") return undefined;

      // Keep Tab inside the dialog while it is modal.
      const focusable = dialog.current?.querySelectorAll<HTMLElement>("button");

      if (!focusable?.length) return undefined;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const target = event.shiftKey ? first : last;

      if (document.activeElement !== target) return undefined;

      event.preventDefault();
      (event.shiftKey ? last : first).focus();

      return undefined;
    };

    document.addEventListener("keydown", onKeyDown);

    // Stop the page behind the overlay from scrolling.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, step]);

  useEffect(() => {
    if (isOpen) dialog.current?.querySelector("button")?.focus();
  }, [isOpen]);

  const current = openAt === null ? null : items[openAt];
  const [featured, ...rest] = items;
  // One set is one capture size, so the first item sets the frame's shape.
  const ratio = (featured.width ?? DEFAULT_W) / (featured.height ?? DEFAULT_H);

  const tile = (item: Screenshot, index: number, variant: "featured" | "small") => (
    <button
      key={item.src}
      type="button"
      ref={(element) => {
        triggers.current[index] = element;
      }}
      onClick={() => setOpenAt(index)}
      aria-label={`${item.caption} — open screenshot ${index + 1} of ${items.length}`}
      className={`group relative block w-full overflow-hidden rounded-lg border border-neutral-900/15 dark:border-neutral-50/15 bg-neutral-100 dark:bg-neutral-900 text-left transition-colors hover:border-teal-600 dark:hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
        variant === "featured" ? "flex flex-col md:h-full" : "aspect-[16/10] md:aspect-auto md:h-full"
      }`}
    >
      {variant === "featured" && <Chrome host={host} />}

      <div
        className={`relative w-full overflow-hidden ${
          variant === "featured" ? "aspect-[16/10] md:aspect-auto md:flex-1" : "h-full"
        }`}
      >
        <Image
          fill
          src={item.src}
          alt={variant === "featured" ? item.alt : ""}
          sizes={variant === "featured" ? "(max-width: 640px) 92vw, 540px" : "(max-width: 640px) 30vw, 300px"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Caption rides in on hover and on keyboard focus — focus-visible
            alone would leave it unreachable for a mouse user. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent p-3 pt-8 text-[11px] font-medium leading-snug text-neutral-100 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {item.caption}
        </span>

        <span className="pointer-events-none absolute right-2 top-2 rounded-md bg-neutral-950/70 p-1.5 text-neutral-100 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <FiMaximize2 size={13} />
        </span>
      </div>
    </button>
  );

  return (
    <>
      {/* Mosaic: one framed window carrying the hostname, the rest as a rail
          beside it on desktop and underneath it on a phone. */}
      <figure className="mt-6">
        {/* Height is pinned on the row so the three stacked tiles cannot
            stretch the featured window to three times its own height. */}
        <div className="grid gap-3 md:h-[320px] md:grid-cols-[1.75fr_1fr] lg:h-[380px]">
          {tile(featured, 0, "featured")}

          <div className="grid grid-cols-3 gap-3 md:h-full md:grid-cols-1 md:grid-rows-3">
            {rest.map((item, index) => tile(item, index + 1, "small"))}
          </div>
        </div>

        <figcaption className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-400">
          {items.length} pages from{" "}
          {docsUrl ? (
            <a
              href={docsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-4 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              {host}
            </a>
          ) : (
            "the documentation site"
          )}
        </figcaption>
      </figure>

      {mounted && current
        ? createPortal(
            <div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-label={`${label} screenshots`}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
              onTouchStart={(event) => {
                touchX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                const delta = touchX.current === null ? 0 : event.changedTouches[0].clientX - touchX.current;

                if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);

                touchX.current = null;
              }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-neutral-950/95 p-4 sm:p-6 backdrop-blur-sm"
            >
              <div className="flex w-full max-w-[1400px] items-center justify-between gap-4">
                <p className="truncate text-sm font-semibold text-neutral-100">
                  {label}
                  <span className="ml-3 font-mono text-xs font-medium text-neutral-400">
                    {(openAt ?? 0) + 1} / {items.length}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close screenshots"
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-neutral-300 hover:bg-neutral-50/10 hover:text-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* The arrows overlay the picture rather than sharing its row:
                  at 375px, two 44px buttons plus gaps left it 239px wide. */}
              <div className="relative flex w-full max-w-[1400px] min-h-0 flex-1 items-center justify-center">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-0 sm:left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/60 text-neutral-100 backdrop-blur-sm hover:bg-neutral-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiChevronLeft size={22} />
                </button>

                {/* `fill` inside a bounded parent: with intrinsic width/height
                    in a flex row the image was content-sized, which collapsed
                    the box and made the browser pick a 384px srcset candidate
                    for a 1272px slot. */}
                {/* The frame is sized from the picture, not the viewport, so
                    the title bar ends where the screenshot ends instead of
                    running on past a letterboxed image. */}
                {/* Capped at the width a 16:10 picture can actually use at
                    this viewport height, so the title bar ends where the
                    screenshot ends rather than running on past a letterbox.
                    aspect-ratio cannot do this here: it has no definite
                    height to resolve against inside a flex column. */}
                <div
                  style={{ maxWidth: `calc((100vh - 15rem) * ${ratio})` }}
                  className="mx-auto flex max-h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-50/15 shadow-2xl"
                >
                  <Chrome host={host} />

                  {/* Width is definite here — it comes from the frame — so
                      aspect-ratio resolves the height, and the window wraps
                      the picture on both axes instead of letterboxing it.
                      The max-width above keeps that height inside a short
                      viewport. */}
                  <div className="relative w-full bg-neutral-950" style={{ aspectRatio: `${ratio}` }}>
                    <Image
                      key={current.src}
                      fill
                      src={current.src}
                      alt={current.alt}
                      sizes="(max-width: 1400px) 92vw, 1300px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="absolute right-0 sm:right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/60 text-neutral-100 backdrop-blur-sm hover:bg-neutral-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiChevronRight size={22} />
                </button>
              </div>

              {/* aria-live, so changing slide announces the new caption to a
                  screen reader rather than silently swapping the image. */}
              <p aria-live="polite" className="max-w-[1000px] text-center text-sm text-neutral-300">
                {current.caption}
              </p>

              {/* Filmstrip — jump straight to a slide instead of stepping. */}
              <ul className="flex flex-shrink-0 gap-2">
                {items.map((item, index) => (
                  <li key={item.src}>
                    <button
                      type="button"
                      onClick={() => setOpenAt(index)}
                      aria-label={`Show screenshot ${index + 1}: ${item.caption}`}
                      aria-current={index === openAt}
                      className={`block overflow-hidden rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                        index === openAt
                          ? "border-teal-400 opacity-100"
                          : "border-neutral-50/20 opacity-50 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt=""
                        width={item.width ?? DEFAULT_W}
                        height={item.height ?? DEFAULT_H}
                        sizes="120px"
                        className="h-9 w-[58px] object-cover object-top sm:h-11 sm:w-[70px]"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

export default Gallery;
