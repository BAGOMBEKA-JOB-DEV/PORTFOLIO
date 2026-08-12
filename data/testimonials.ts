import type { Testimonial } from "types/Sections";

/**
 * Approved testimonials only. Empty until a referee has seen and agreed to the
 * exact wording of their quote.
 *
 * Drafts live in `docs/testimonials-drafts.md`, deliberately outside the import
 * graph: anything referenced here is compiled into the client bundle and is
 * readable by anyone who opens it, so an unapproved quote attributed to a real,
 * contactable person must not be in this file.
 *
 * To publish one: copy the approved wording across, fill in name/role/company,
 * and it appears on the page and in the nav automatically.
 *
 * Never add phone numbers or personal emails — those were given for private
 * reference checks and are not ours to publish.
 */
const testimonialsList: Testimonial[] = [];

export const approvedTestimonials = testimonialsList;

export default testimonialsList;
