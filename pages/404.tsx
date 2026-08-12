import Head from "next/head";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Section } from "types/Sections";

const destinations = [
  { href: `/#${Section.Projects}`, label: "Case Studies", hint: "National platforms and open source" },
  { href: `/#${Section.Testimonials}`, label: "Testimonials", hint: "What colleagues say" },
  { href: `/#${Section.Contact}`, label: "Contact", hint: "Start a conversation" },
];

const NotFound = () => (
  <>
    <Head>
      <title>Page not found — Bagombeka Job</title>
      {/* Error pages must never be indexed. */}
      <meta name="robots" content="noindex, nofollow" />
      {/* Same key as _app, so this replaces the inherited canonical rather than
          adding a second one pointing the crawler at the homepage. */}
      <link rel="canonical" key="canonical" href="https://www.bagombekajob.com/" />
    </Head>

    <main className="w-11/12 max-w-xl mx-auto min-h-[100svh] pt-24 pb-16 pb-safe flex flex-col justify-center text-center">
      <p className="text-6xl md:text-7xl font-bold tracking-tight text-neutral-900/15 dark:text-neutral-50/15">404</p>

      <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">This page doesn&apos;t exist</h1>

      <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        The link may be out of date, or the page may have moved. Nothing is broken on your end.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
        >
          <FiArrowLeft />
          Back to home
        </Link>
      </div>

      <p className="mt-12 mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
        Or go straight to
      </p>

      <div className="grid gap-3 sm:grid-cols-3 text-left">
        {destinations.map(({ href, label, hint }) => (
          <Link
            key={href}
            href={href}
            className="p-4 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <span className="block font-semibold text-teal-600 dark:text-teal-400">{label}</span>
            <span className="block mt-1 text-sm text-neutral-600 dark:text-neutral-400">{hint}</span>
          </Link>
        ))}
      </div>
    </main>
  </>
);

export default NotFound;
