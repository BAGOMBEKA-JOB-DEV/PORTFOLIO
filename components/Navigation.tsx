import clsx from "clsx";
import { ThemeContext } from "contexts/ThemeProvider";
import links from "data/links";
import { sectionsArray } from "data/sections";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Sections only exist on the homepage, so react-scroll has nothing to find
  // anywhere else — off-homepage (the 404, most obviously) every link would
  // silently do nothing. Route to the anchor instead.
  const isHome = router.pathname === "/";

  const goToSection = (section: Section) => {
    setMenuOpen(false);

    if (!isHome) {
      window.location.assign(`/#${section}`);
      return;
    }

    scroller.scrollTo(section, { duration: 500, smooth: true, offset: -80 });
  };

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // While the drawer is open it behaves as a modal: Escape dismisses it, the page
  // behind cannot scroll, and focus moves inside — otherwise a keyboard user is
  // left focused on a control hidden behind the panel.
  useEffect(() => {
    if (!isMenuOpen) return;

    closeRef.current?.focus();
    document.body.classList.add("overflow-hidden");

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  const goHome = () => {
    setMenuOpen(false);

    if (!isHome) {
      window.location.assign("/");
      return;
    }

    animateScroll.scrollToTop();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur pt-safe">
        <nav className="w-11/12 max-w-5xl mx-auto h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goHome}
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
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden grid place-items-center -mr-2 w-11 h-11 text-neutral-700 dark:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop and panel stay mounted so the drawer can animate closed as well
          as open. `invisible` is what actually removes the links from the tab
          order when shut — a translate alone would leave them reachable. */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={clsx(
          "lg:hidden fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none",
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      />

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={clsx(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col overflow-y-auto",
          "border-r border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-50 dark:bg-neutral-900",
          "pt-safe pb-safe pl-safe transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none",
          isMenuOpen ? "visible translate-x-0" : "invisible -translate-x-full",
        )}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-900/10 dark:border-neutral-50/10">
          <Image src="/images/mylogo.png" alt="Bagombeka Job" width={32} height={32} className="w-8 h-auto" />

          <button
            ref={closeRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="grid place-items-center w-11 h-11 -mr-2 text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-3 grid gap-1">
          {sectionsArray.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              className="group flex items-center gap-3 px-3 min-h-[48px] rounded-lg text-left text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900/5 dark:hover:bg-neutral-50/5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Icon
                size={16}
                className="flex-shrink-0 text-neutral-500 dark:text-neutral-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
              />
              {title}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              router.push("/how-i-work-remotely");
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 min-h-[48px] rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            See how I work remotely
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
