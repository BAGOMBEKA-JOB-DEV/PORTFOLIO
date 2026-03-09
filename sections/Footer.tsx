import { format } from "date-fns";

const Footer = () => (
  <footer id="footer" className="w-full mt-24 mb-16 px-6 relative z-10">
    <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-3xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md text-center">
      <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
        <p className="mb-3 font-semibold text-neutral-800 dark:text-neutral-200 text-base md:text-lg">
          Thank you for visiting my website!
        </p>
        <p>
          Follow me on{" "}
          <a
            className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors underline decoration-2 decoration-teal-600/30 underline-offset-4 hover:decoration-teal-600/80"
            href="https://www.github.com/BAGOMBEKA-JOB-DEV"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>{" "}
          to see my latest projects, updates, and open-source contributions. Your support and feedback mean a lot!
        </p>
      </div>

      <div className="h-px w-20 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto my-6" />

      <p className="text-xs md:text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
        All content is &copy; {format(Date.now(), "yyyy")} Bagombeka Job.{" "}
        <span className="text-green-600 dark:text-green-500 font-semibold italic ml-1 hover:animate-pulse cursor-default">
          See you soon!
        </span>
      </p>
    </div>
  </footer>
);

export default Footer;
