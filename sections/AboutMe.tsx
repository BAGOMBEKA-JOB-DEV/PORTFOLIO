import Link from "next/link";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const AboutMe = () => (
  <div id={Section.AboutMe}>
    {getSectionHeading(Section.AboutMe)}

    <div className="max-w-3xl grid gap-5 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      <p>
        I am a software engineer based in Kampala, Uganda. I build systems where being wrong is expensive — national
        platforms for public institutions, and enterprise products for private companies. The public work has meant
        identity verification, education data and examinations. The commercial work has meant multi-tenant SaaS that
        runs a company end to end: operations, fleet, procurement, payroll, billing and a double-entry ledger that has
        to balance in every currency and satisfy each country&apos;s tax authority.
      </p>

      <p>
        My day-to-day is Laravel, Go, Vue, React, TypeScript, PostgreSQL, Redis, Kafka, Docker, and Linux, with
        infrastructure and systems thinking woven through all of it. I care most about the parts that are hard to
        retrofit — schema design that survives a decade of policy change, tenant isolation you can prove rather than
        hope for, validation enforced at ingestion rather than patched downstream, queue architecture that degrades
        gracefully instead of collapsing under load, and platform choices that keep a system dependable under real
        production pressure.
      </p>

      <p>
        I work equally well embedded in a distributed remote team and on the ground with an enterprise client. I also
        build and maintain open-source tooling, and I write regularly about engineering practice and technology trends
        for the DEV Community and for TechTalk, my LinkedIn newsletter.
      </p>

      <div className="not-prose mt-2 rounded-2xl border border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-100/80 dark:bg-neutral-800/60 p-5">
        <p className="text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-200">
          Hiring for a global team?
        </p>
        <p className="mt-2 text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-200">
          I work effectively with distributed engineering teams, bringing strong communication, reliability, and a
          structured approach that makes collaboration seamless across time zones.
        </p>

        <Link
          href="/how-i-work-remotely"
          className="mt-4 inline-flex items-center text-sm md:text-base font-semibold text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-2 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          [See how I work remotely]
        </Link>
      </div>

      <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          Diploma in Software Engineering —
          <a
            href="https://saipali.education/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-2 hover:decoration-teal-600 dark:hover:decoration-teal-400"
          >
            Sai Pali Institute of Technology &amp; Science
          </a>
          , Entebbe, Uganda.
        </p>

        <p>
          Bachelor&apos;s of Science in Computer Science (In Pursuit) —
          <a
            href="https://www.uopeople.edu/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-teal-600 dark:text-teal-400 underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-2 hover:decoration-teal-600 dark:hover:decoration-teal-400"
          >
            University of the People (USA)
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);

export default AboutMe;
