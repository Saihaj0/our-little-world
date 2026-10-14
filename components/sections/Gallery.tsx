"use client";

/**
 * Photo gallery — masonry-style CSS columns with rounded glass frames,
 * hover lift, and a full keyboard-accessible lightbox (arrows navigate,
 * Escape closes, focus returns to the opened photo).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { GalleryPhoto } from "@/lib/content";

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );

  // Keyboard: arrows navigate, Escape closes.
  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the dialog.
    closeRef.current?.focus();
    // Snapshot the opener so cleanup can restore focus even if the
    // ref has been reassigned by then.
    const opener = openerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Return focus to the photo that opened the lightbox.
      opener?.focus();
    };
  }, [active, close, next, prev]);

  const current = active !== null ? photos[active] : null;

  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="LITTLE PIECES OF US"
        title="Little moments, forever ours."
        description="I'd probably choose a hundred of them with you. Little memories, random pictures, and moments I never want to forget. Because somehow, even the simplest moments become special when they're ours ♡"
      />

      <Reveal>
        <div className="columns-2 gap-4 sm:gap-5 md:columns-3 [&>*]:mb-4 sm:[&>*]:mb-5">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              ref={index === 0 ? openerRef : undefined}
              onClick={() => setActive(index)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-rose/10 transition-all duration-500 hover:-translate-y-1 hover:border-rose/30 hover:shadow-[0_18px_50px_-18px_rgba(240,169,192,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:mb-5"
              aria-label={`Open photo: ${photo.caption}`}
            >
              <div
                className={`relative w-full ${
                  photo.shape === "portrait"
                    ? "aspect-[3/4]"
                    : photo.shape === "square"
                      ? "aspect-square"
                      : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              {/* Caption veil */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <p className="text-sm text-cream">{photo.caption}</p>
                {photo.date && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-mauve">
                    <CalendarDays className="h-3 w-3" aria-hidden />
                    {photo.date}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close photo"
              className="absolute right-5 top-5 z-10 rounded-full border border-cream/20 p-2.5 text-cream transition hover:border-rose/50 hover:text-rose"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 z-10 rounded-full border border-cream/20 bg-ink/60 p-2.5 text-cream transition hover:border-rose/50 hover:text-rose sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 z-10 rounded-full border border-cream/20 bg-ink/60 p-2.5 text-cream transition hover:border-rose/50 hover:text-rose sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            {/* Image */}
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.02 }}
              transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
              className="max-h-[82vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex max-h-[72vh] w-full items-center justify-center">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1400}
                  height={1000}
                  sizes="(max-width: 1024px) 92vw, 900px"
                  className="h-auto max-h-[72vh] w-auto rounded-2xl border border-rose/15 object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-5 text-center">
                <p className="text-cream">{current.caption}</p>
                {current.date && (
                  <p className="mt-1 text-sm text-mauve">{current.date}</p>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
