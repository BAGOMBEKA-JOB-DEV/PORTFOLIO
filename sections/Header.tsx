import Profiles from "components/Header/Profiles";
import links from "data/links";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import { scroller } from "react-scroll";
import { Section } from "types/Sections";
import { withEntityLinks } from "utils";

const PRIMARY_STACK = ["Laravel", "Go", "Java", "Vue", "React"];

const metrics = [
  { id: 1, figure: "30M+", label: "learner records registered on Uganda's national EMIS platform" },
  { id: 2, figure: "300K", label: "examination candidates processed annually via UNEB and NIRA integrations" },
  { id: 3, figure: "45M+", label: "contacts ingested by enterprise messaging pipelines" },
  { id: 4, figure: "100K+", label: "concurrent users architected for in production systems" },
];

const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: links.calendly });
    return;
  }

  window.open(links.calendly, "_blank", "noopener,noreferrer");
};

const Header: React.FC = () => (
  <div id="header" className="pt-28 pb-4 md:pt-36">
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
      <div className="lg:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Bagombeka Job
        </p>

        <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight">
          Enterprise Software Engineer
        </h1>

        <p className="mt-4 text-lg md:text-2xl font-medium leading-snug text-neutral-700 dark:text-neutral-300">
          Architecting scalable, secure systems for global remote teams and East African enterprises.
        </p>

        {/* The h1, subhead and photo above are deliberately not revealed: they
            are the LCP elements, and fading them in would delay it. */}
        <ul
          data-reveal
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
          aria-label="Primary technology stack"
        >
          {PRIMARY_STACK.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1 rounded-full border border-neutral-900/15 dark:border-neutral-50/15 text-sm font-semibold"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
        >
          I build the platforms institutions run on — national identity integrations, high-throughput data pipelines,
          and the interfaces that tens of millions of records flow through.
        </p>

        <div data-reveal className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            <FaRegCalendarAlt />
            Book a Technical Consultation
          </button>

          <button
            type="button"
            onClick={() => scroller.scrollTo(Section.Projects, { duration: 500, smooth: true, offset: -80 })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-900/20 dark:border-neutral-50/20 hover:border-neutral-900/50 dark:hover:border-neutral-50/50 text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            <FiArrowDown />
            View Case Studies
          </button>
        </div>

        <p data-reveal className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          Kampala, Uganda · Core hours 08:00–18:00 EAT · overlaps CET and EST
        </p>

        <Profiles />
      </div>

      <div className="lg:col-span-2 order-first lg:order-last">
        <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-full lg:h-auto lg:aspect-square mx-auto rounded-2xl overflow-hidden">
          <Image
            fill
            priority
            src="/images/photo-wall/JOB.jpeg"
            alt="Bagombeka Job"
            sizes="(max-width: 1024px) 224px, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>

    <dl
      data-reveal-group
      className="mt-16 md:mt-20 py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-y border-neutral-900/10 dark:border-neutral-50/10"
    >
      {metrics.map(({ id, figure, label }) => (
        <div key={id}>
          <dt className="text-3xl md:text-4xl font-bold tracking-tight text-teal-600 dark:text-teal-400">{figure}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {withEntityLinks(label)}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Header;
