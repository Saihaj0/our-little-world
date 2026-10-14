"use client";

/**
 * Open When… letters — elegant envelope cards that open with a smooth
 * animation into a readable letter dialog.
 *
 * Keyboard: Enter/Space opens (native button behaviour), Escape closes,
 * focus moves into the dialog and returns to the envelope on close.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Mail, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { OpenWhenLetter } from "@/lib/content";

export default function Letters({ letters }: { letters: OpenWhenLetter[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const active = letters.find((l) => l.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openId]);

  return (
    <section id="letters" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="Written in advance"
        title="Little letters for whenever you need them."
        description="For the days you need a hug, a little reassurance, a reason to smile, or a reminder of how much you mean to me. If I can't find the right words in the moment, maybe you'll find them here, my Dumbo ♡"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter, i) => (
          <Reveal key={letter.id} delay={(i % 3) * 0.08} className="h-full">
            <button
              onClick={() => setOpenId(letter.id)}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-rose/12 bg-gradient-to-br from-cream/6 to-rose/4 p-6 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-rose/35 hover:shadow-[0_20px_60px_-24px_rgba(240,169,192,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:p-7"
              aria-label={`Open the letter: ${letter.title}`}
            >
              {/* Envelope flap motif */}
              <span
                aria-hidden
                className="absolute right-5 top-5 text-rose/50 transition-all duration-500 group-hover:text-rose group-hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5" />
              </span>
              {/* Wax-seal dot */}
              <span
                aria-hidden
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-rose/25 bg-rose/10 text-rose"
              >
                <Sparkles className="h-4 w-4" />
              </span>
              <h3 className="font-serif text-xl text-cream sm:text-[22px]">
                {letter.title}
              </h3>
              <p className="mt-2 text-sm italic text-mauve">{letter.subtitle}</p>
              {/* Pushed to the card's bottom edge so every card lines up,
                  even when a title wraps to two lines. */}
              <span className="mt-auto pt-5 text-[11px] uppercase tracking-[0.3em] text-rose/80 transition-transform duration-500 group-hover:translate-x-1">
                tear it open →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Letter dialog */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setOpenId(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: reducedMotion ? 0 : 40, rotateX: reducedMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-rose/20 bg-gradient-to-b from-burgundy/80 to-ink/95 p-7 shadow-2xl sm:p-10"
            >
              <button
                ref={closeRef}
                onClick={() => setOpenId(null)}
                aria-label="Close letter"
                className="absolute right-5 top-5 rounded-full border border-cream/20 p-2 text-cream transition hover:border-rose/50 hover:text-rose"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>

              <p className="text-[11px] uppercase tracking-[0.35em] text-rose/80">
                {active.subtitle}
              </p>
              <h3
                id="letter-title"
                className="mt-3 pr-10 font-serif text-3xl text-cream sm:text-4xl"
              >
                {active.title}
              </h3>

              <span
                aria-hidden
                className="my-6 block h-px w-20 bg-gradient-to-r from-rose/60 to-transparent"
              />

              <div className="space-y-4">
                {active.body.map((paragraph, i) => (
                  <p key={i} className="text-[15.5px] leading-relaxed text-blush/95">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-8 text-right font-serif text-xl italic text-rose">
                {active.signOff}
              </p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
