import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import type { Screenshot } from "types/Sections";

/**
 * Thumbnail strip with a full-width lightbox.
 *
 * The strip stays in the card body rather than behind the Collapsible: a row
 * of thumbnails is about 90px tall, which is the whole point of having it —
 * it shows the project is real without re-creating the 2,700px cards that
 * Collapsible was added to fix.
 *
 * The dialog is portalled to document.body. It has to be: scroll-reveal puts
 * `transform: translateY(...)` on the wrapping group, and a transformed
 * ancestor becomes the containing block for `position: fixed`, so an in-place
 * overlay would be clipped to the card instead of covering the viewport.
 */
const Gallery: React.FC<{ items: Screenshot[]; label: string }> = ({ items, label }) => {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  // document does not exist while the page is being generated, so the portal
  // target is only available from the first client render onwards.
  useEffect(() => setMounted(true), []);

  const isOpen = openAt !== null;

  const step = useCallback(
    (offset: number) => setOpenAt((at) => (at === null ? at : (at + offset + items.length) % items.length)),
    [items.length],
  );

  const close = useCallback(() => {
    setOpenAt((at) => {
      // Focus goes back to the thumbnail that opened the dialog, so keyboard
      // and screen-reader users resume where they left off rather than at the
      // top of the document.
      if (at !== null) triggers.current[at]?.focus();

      return null;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return close();
      if (event.key === "ArrowRight") return step(1);
      if (event.key === "ArrowLeft") return step(-1);
      if (event.key !== "Tab") return undefined;

      // Keep Tab inside the dialog while it is modal.
      const focusable = dialog.current?.querySelectorAll<HTMLElement>("button");

      if (!focusable?.length) return undefined;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const target = event.shiftKey ? first : last;

      if (document.activeElement !== target) return undefined;

      event.preventDefault();
      (event.shiftKey ? last : first).focus();

      return undefined;
    };

    document.addEventListener("keydown", onKeyDown);

    // Stop the page behind the overlay from scrolling.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, step]);

  useEffect(() => {
    if (isOpen) dialog.current?.querySelector("button")?.focus();
  }, [isOpen]);

  const current = openAt === null ? null : items[openAt];

  return (
    <>
      <ul className="mt-5 flex gap-3 overflow-x-auto no-scrollbar scroll-fade pb-1">
        {items.map((item, index) => (
          <li key={item.src} className="flex-shrink-0">
            <button
              type="button"
              ref={(element) => {
                triggers.current[index] = element;
              }}
              onClick={() => setOpenAt(index)}
              aria-label={`${item.caption} — open screenshot ${index + 1} of ${items.length}`}
              className="block overflow-hidden rounded-lg border border-neutral-900/15 dark:border-neutral-50/15 hover:border-teal-600 dark:hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
            >
              <Image
                src={item.src}
                alt=""
                width={1600}
                height={1000}
                sizes="180px"
                className="h-[72px] w-[115px] sm:h-[90px] sm:w-[144px] object-cover object-top"
              />
            </button>
          </li>
        ))}
      </ul>

      {mounted && current
        ? createPortal(
            <div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-label={`${label} screenshots`}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
              onTouchStart={(event) => {
                touchX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                const delta = touchX.current === null ? 0 : event.changedTouches[0].clientX - touchX.current;

                if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);

                touchX.current = null;
              }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-neutral-950/95 p-4 sm:p-6 backdrop-blur-sm"
            >
              <div className="flex w-full max-w-[1400px] items-center justify-between gap-4">
                <p className="text-sm font-semibold text-neutral-100">
                  {label}
                  <span className="ml-3 font-medium text-neutral-400">
                    {(openAt ?? 0) + 1} / {items.length}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close screenshots"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-neutral-300 hover:bg-neutral-50/10 hover:text-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="relative flex w-full max-w-[1400px] min-h-0 flex-1 items-center">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-0 sm:left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/60 text-neutral-100 backdrop-blur-sm hover:bg-neutral-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiChevronLeft size={22} />
                </button>

                {/* `fill` rather than intrinsic width/height: inside a flex row
                    an auto-width image is content-sized, which collapsed the
                    box and made the browser pick a thumbnail-sized srcset
                    candidate. Filling a bounded parent and letterboxing with
                    object-contain keeps it sharp and inside the viewport. */}
                <div className="relative min-h-0 w-full flex-1 self-stretch">
                  <Image
                    key={current.src}
                    fill
                    src={current.src}
                    alt={current.alt}
                    sizes="(max-width: 1400px) 92vw, 1300px"
                    className="rounded-lg object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="absolute right-0 sm:right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/60 text-neutral-100 backdrop-blur-sm hover:bg-neutral-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <FiChevronRight size={22} />
                </button>
              </div>

              {/* aria-live, so changing slide announces the new caption to a
                  screen reader rather than silently swapping the image. */}
              <p aria-live="polite" className="max-w-[1000px] text-center text-sm text-neutral-300">
                {current.caption}
              </p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

export default Gallery;
