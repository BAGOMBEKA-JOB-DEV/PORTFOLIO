import { ThemeContext } from "contexts/ThemeProvider";
import links from "data/links";
import { sectionsArray } from "data/sections";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { animateScroll, scroller } from "react-scroll";
import { Section } from "types/Sections";

const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: links.calendly });
    return;
  }

  window.open(links.calendly, "_blank", "noopener,noreferrer");
};

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const goToSection = (section: Section) => {
    setMenuOpen(false);
    scroller.scrollTo(section, { duration: 500, smooth: true, offset: -80 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur">
      <nav className="w-11/12 max-w-5xl mx-auto h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => animateScroll.scrollToTop()}
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <Image src="/images/mylogo.png" alt="Bagombeka Job — home" width={32} height={32} />
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {sectionsArray.map(({ id, title }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              {title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCalendly}
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            Book a call
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-neutral-900/10 dark:border-neutral-50/10">
          <div className="w-11/12 max-w-5xl mx-auto py-4 grid gap-1">
            {sectionsArray.map(({ id, title }) => (
              <button
                key={id}
                type="button"
                onClick={() => goToSection(id)}
                className="py-2.5 text-left text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
