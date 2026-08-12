import { approvedTestimonials } from "data/testimonials";
import { FaQuoteLeft } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const Testimonials = () => {
  // Renders nothing until at least one person has approved their quote. The nav
  // entry is filtered on the same condition, so a link can never point at a
  // section that is not on the page.
  if (!approvedTestimonials.length) return null;

  return (
    <div id={Section.Testimonials}>
      {getSectionHeading(Section.Testimonials)}

      <div className="grid gap-6 md:grid-cols-2">
        {approvedTestimonials.map(({ id, quote, name, role, company, companyUrl }) => (
          <figure
            key={id}
            className="p-6 md:p-8 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors"
          >
            <FaQuoteLeft className="text-teal-600 dark:text-teal-400" size={18} aria-hidden />

            <blockquote className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {quote}
            </blockquote>

            <figcaption className="mt-5 pt-5 border-t border-neutral-900/10 dark:border-neutral-50/10">
              <span className="block font-bold">{name}</span>
              <span className="block mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                {role} ·{" "}
                {companyUrl ? (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-4 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    {company}
                  </a>
                ) : (
                  company
                )}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
