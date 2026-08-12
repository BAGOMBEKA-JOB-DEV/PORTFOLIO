import links from "data/links";
import type { Testimonial } from "types/Sections";

/**
 * Published testimonials. Each person named here has agreed to be quoted.
 *
 * If anyone wants different wording, replace their `quote` string with their
 * version verbatim. To take one down, set `approved` to false — the section and
 * its nav entry disappear together once the approved list is empty.
 *
 * Never add phone numbers or personal emails: those were given for private
 * reference checks and are not ours to publish.
 */
const testimonialsList: Testimonial[] = [
  {
    id: 1,
    approved: true,
    quote:
      "Job took ownership of our database infrastructure and kept it running without interruption. He had a habit of tracing problems to the actual cause instead of patching symptoms, and recurring issues simply stopped coming back. He also led our engineering team through a major delivery on time and on budget.",
    name: "Steven Tendo",
    role: "Founder",
    company: "Eloi Ministries Inc.",
    companyUrl: "https://eloiafrica.org",
  },
  {
    id: 2,
    approved: true,
    quote:
      "Job built core parts of the national EMIS platform, including the integrations with NIRA and UNEB that validate records at the point of entry. He is careful with data at a scale where mistakes are expensive, and he documents his work so the rest of the team can rely on it.",
    name: "Clinton",
    role: "Senior Software Engineer",
    company: "SMS ONE (U) Limited",
    companyUrl: links.smsone,
  },
  {
    id: 3,
    approved: true,
    quote:
      "Job was among the strongest engineers I taught. He went well past the syllabus into architecture and system design, and he was already building complete production systems before he graduated.",
    name: "Taqee Ahmed",
    role: "Senior Software Engineer",
    company: "Sai Pali Institute of Technology & Science",
  },
];

export const approvedTestimonials = testimonialsList.filter(({ approved }) => approved);

export default testimonialsList;
