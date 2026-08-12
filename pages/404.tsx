import Link from "next/link";

const NotFound = () => (
  <main className="w-11/12 max-w-5xl mx-auto min-h-[100svh] flex flex-col justify-center">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">404</p>

    <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">This page does not exist.</h1>

    <p className="mt-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300">
      The link may be out of date, or the page may have moved.
    </p>

    <Link
      href="/"
      className="mt-8 w-fit px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
    >
      Back to home
    </Link>
  </main>
);

export default NotFound;
