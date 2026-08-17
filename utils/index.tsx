import Heading from "components/Heading";
import sectionsList from "data/sections";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import type { Section } from "types/Sections";

export const formatDateString = (date: string) => format(parseISO(date), "do MMMM yyyy");

export const openURLInNewTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export const getSectionHeading = (section: Section) => (
  <Heading icon={sectionsList[section].icon}>{sectionsList[section].title}</Heading>
);

/**
 * Institutions that get linked wherever their name appears in copy.
 *
 * `name` carries the expansion. It becomes the link's title, so an international
 * reader gets the full form on hover and assistive tech reads it out, without
 * the visible text growing — which matters most in the hero metric labels, where
 * a parenthetical would not fit.
 */
const entityLinks: Record<string, { href: string; name: string }> = {
  NIRA: { href: "https://www.nira.go.ug/", name: "National Identification and Registration Authority, Uganda" },
  UNEB: { href: "https://ereg.uneb.ac.ug/login", name: "Uganda National Examinations Board" },
  EMIS: { href: "https://emis.go.ug", name: "Education Management Information System" },
  "Parliament of Uganda": { href: "https://parliament.smsone.co.ug/", name: "Parliament of Uganda" },
};

// The capturing group makes String.split keep the matched names, so the result
// alternates plain text and entity names.
const entityPattern = new RegExp(`\\b(${Object.keys(entityLinks).join("|")})\\b`, "g");

export const withEntityLinks = (text: string) =>
  text.split(entityPattern).map((part, index) => {
    const entity = entityLinks[part];

    if (!entity) return part;

    return (
      <a
        key={`${part}-${index}`}
        href={entity.href}
        title={entity.name}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-2 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        {part}
      </a>
    );
  });
