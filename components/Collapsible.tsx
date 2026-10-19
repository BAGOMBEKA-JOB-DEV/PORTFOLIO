/**
 * A disclosure built on native <details>, used to fold the long-form body of a
 * project card away until someone asks for it.
 *
 * Native rather than React state on purpose:
 *   - it works with JavaScript disabled, like the rest of this site;
 *   - the content stays in the served HTML, so crawlers still read it — the
 *     same reasoning that keeps every project tab panel mounted;
 *   - keyboard operation, focus and screen-reader semantics come for free.
 */
const Collapsible: React.FC<React.PropsWithChildren<{ label: string; openLabel: string }>> = ({
  label,
  openLabel,
  children,
}) => (
  <details className="group mt-6 w-full">
    <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded [&::-webkit-details-marker]:hidden">
      {/* Both labels ship in the HTML; CSS picks one, so no JavaScript is needed
          to keep the control's wording honest about what it will do. */}
      <span className="group-open:hidden">{label}</span>
      <span className="hidden group-open:inline">{openLabel}</span>

      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="transition-transform duration-200 group-open:rotate-180"
      >
        <path d="M2 4.5 L6 8.5 L10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </summary>

    <div className="w-full">{children}</div>
  </details>
);

export default Collapsible;
