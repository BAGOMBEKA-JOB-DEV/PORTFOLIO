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
        My day-to-day is Laravel, Go, Vue and React, on PostgreSQL. I care most about the parts that are hard to
        retrofit — schema design that survives a decade of policy change, tenant isolation you can prove rather than
        hope for, validation enforced at ingestion rather than patched downstream, and queue architecture that degrades
        gracefully instead of collapsing under load.
      </p>

      <p>
        I work equally well embedded in a distributed remote team and on the ground with an enterprise client. I also
        build and maintain open-source tooling, and I write regularly about engineering practice and technology trends
        for the DEV Community and for TechTalk, my LinkedIn newsletter.
      </p>

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Diploma in Software Engineering — Sai Pali Institute of Technology &amp; Science.
      </p>
    </div>
  </div>
);

export default AboutMe;
