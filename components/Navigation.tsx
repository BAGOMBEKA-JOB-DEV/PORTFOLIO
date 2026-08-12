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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur pt-safe">
      <nav className="w-11/12 max-w-5xl mx-auto h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => animateScroll.scrollToTop()}
          className="flex items-center justify-center -ml-2 w-11 h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <Image src="/images/mylogo.png" alt="Bagombeka Job — home" width={32} height={32} className="w-8 h-auto" />
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

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center px-3 sm:px-4 h-11 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a call</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            className="grid place-items-center w-11 h-11 text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden grid place-items-center -mr-2 w-11 h-11 text-neutral-700 dark:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
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
                className="flex items-center min-h-[44px] text-left text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
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
