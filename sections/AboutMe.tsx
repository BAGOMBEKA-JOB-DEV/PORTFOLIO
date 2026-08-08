import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const AboutMe = () => (
  <div id={Section.AboutMe}>
    {getSectionHeading(Section.AboutMe)}

    <div className="max-w-3xl grid gap-5 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      <p>
        I am a software engineer based in Kampala, Uganda, working on systems where correctness matters at national
        scale. Most of my work sits where public institutions meet production software: identity verification,
        education data, examinations, and the messaging infrastructure that connects them to citizens.
      </p>

      <p>
        My day-to-day is Laravel, Go, Vue and React, on PostgreSQL. I care most about the parts that are hard to
        retrofit — schema design that survives a decade of policy change, validation enforced at ingestion rather than
        patched downstream, and queue architecture that degrades gracefully instead of collapsing under load.
      </p>

      <p>
        I work equally well embedded in a distributed remote team and on the ground with an enterprise client. I write
        regularly about engineering practice and technology trends for the DEV Community and for TechTalk, my LinkedIn
        newsletter.
      </p>

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Diploma in Computer Science &amp; Engineering — Sail Pali Institute of Technology &amp; Science.
      </p>
    </div>
  </div>
);

export default AboutMe;
