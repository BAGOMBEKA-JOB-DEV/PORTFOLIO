import Footer from "sections/Footer";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight, FaGlobeAfrica, FaShieldAlt } from "react-icons/fa";
import { FiArrowLeft, FiClock, FiWifi } from "react-icons/fi";

const pillars = [
  {
    icon: FiClock,
    title: "Timezone alignment",
    description:
      "Based in Kampala, Uganda (UTC+3), I naturally align with EMEA operations and remain flexible for early US East Coast syncs. My core work window is 08:00–18:00 EAT, giving teams reliable overlap for reviews, demos, and production coordination.",
  },
  {
    icon: FiWifi,
    title: "Infrastructure SLA",
    description:
      "I run a dedicated remote workspace with a high-speed fiber connection, automatic 5G failover, and a solar/inverter backup system so critical work is not disrupted by power or internet instability.",
  },
  {
    icon: FaGlobeAfrica,
    title: "Async-first delivery",
    description:
      "I work well in distributed teams because I prefer structured documentation, RFCs, transparent tickets, and detailed pull requests over constant live meetings. That keeps momentum high without creating unnecessary overhead.",
  },
  {
    icon: FaShieldAlt,
    title: "Hiring and compliance clarity",
    description:
      "I am set up for frictionless onboarding through global contractor frameworks and payroll platforms such as Deel or Remote.com, which makes legal and compliance concerns easier to resolve early.",
  },
];

const promises = [
  "Clear written updates, milestones, and delivery plans that keep stakeholders aligned without unnecessary calls.",
  "Strong ownership of execution: I diagnose issues early, propose practical fixes, and keep work moving without waiting to be chased.",
  "Documented architecture decisions, handoff notes, deployment readiness checks, and supportable production flows.",
  "Reliable availability during overlapping hours for reviews, pair programming, incident handling, and live decision-making.",
  "Thoughtful pull requests, code review discipline, and clean engineering communication that scales across distributed teams.",
  "A professional remote operating model built around trust, clarity, and consistent delivery rather than constant supervision.",
];

const RemoteWorkPage = () => (
  <>
    <Head>
      <title>How I Work Remotely — Bagombeka Job</title>
      <meta
        name="description"
        content="Learn how I work remotely: time zone alignment, infrastructure reliability, async collaboration, and compliant onboarding for distributed engineering teams."
      />
      <link rel="canonical" href="https://www.bagombekajob.com/how-i-work-remotely" />
    </Head>

    <main className="w-11/12 max-w-5xl mx-auto pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <FiArrowLeft />
          Back to home
        </Link>
      </div>

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Remote delivery
        </p>

        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          How I Work Remotely
        </h1>

        <p className="mt-5 text-base md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
          I am always open to upgrading my setup to match the demands of serious remote work. I build for distributed
          teams the same way I build for local enterprise clients: with clarity, ownership, and production-minded
          systems. My remote setup is designed to reduce friction, not add it.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2" aria-label="Remote work principles">
        {pillars.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="p-6 md:p-8 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-teal-600/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400">
                <Icon size={18} />
              </span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">{title}</h2>
            </div>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          What remote teams can expect
        </h2>

        <ul className="mt-6 grid gap-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300">
          {promises.map((promise) => (
            <li key={promise} className="flex items-start gap-3">
              <span className="mt-1 text-teal-600 dark:text-teal-400">•</span>
              <span>{promise}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Working model
          </p>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            I am comfortable operating as an embedded engineer, a senior contributor in a distributed product team, or a
            consultant driving technical delivery from planning through production support. I value clear documentation,
            thoughtful code review, and direct communication that keeps decisions moving. I work best in environments where
            ownership, written communication, and stable execution matter more than noise.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
            >
              Back to portfolio
              <FaArrowRight />
            </Link>

            <Link
              href="/#about"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-900/15 dark:border-neutral-50/15 text-sm md:text-base font-semibold hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
            >
              Read the About section
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  </>
);

export default RemoteWorkPage;
