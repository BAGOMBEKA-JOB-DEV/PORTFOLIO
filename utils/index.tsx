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

/** Institutions and systems that get linked wherever their name appears in copy. */
const entityLinks: Record<string, string> = {
  NIRA: "https://www.nira.go.ug/",
  UNEB: "https://ereg.uneb.ac.ug/login",
  EMIS: "https://emis.go.ug",
  "Parliament of Uganda": "https://parliament.smsone.co.ug/",
};

// The capturing group makes String.split keep the matched names, so the result
// alternates plain text and entity names.
const entityPattern = new RegExp(`\\b(${Object.keys(entityLinks).join("|")})\\b`, "g");

export const withEntityLinks = (text: string) =>
  text.split(entityPattern).map((part, index) =>
    entityLinks[part] ? (
      <a
        key={`${part}-${index}`}
        href={entityLinks[part]}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-2 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
