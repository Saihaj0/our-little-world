"use client";

/**
 * "Just one more reason I love you." — a random reason card.
 * Never repeats the immediately previous reason; gentle cross-fade between
 * cards; fully usable one-handed on mobile.
 */

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Reason } from "@/lib/content";

export default function Reasons({ reasons }: { reasons: Reason[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();

  const pickAnother = useCallback(() => {
    if (reasons.length <= 1) return;
    setDirection((d) => -d);
    setIndex((current) => {
      // Pick a different index — no immediate repeats.
      let nextIndex = current;
      while (nextIndex === current) {
        nextIndex = Math.floor(Math.random() * reasons.length);
      }
      return nextIndex;
    });
  }, [reasons.length]);

  const reason = reasons[index];

  return (
    <section id="reasons" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="An ongoing list"
        title="100 reasons, and still counting."
        description="I tried putting all the things I love about you into words. Turns out, Dumbo, even 100 reasons aren't enough ♡"
      />

      <Reveal>
        <div className="glass relative mx-auto flex min-h-[280px] max-w-2xl flex-col items-center justify-center rounded-[2rem] p-8 text-center sm:min-h-[300px] sm:p-12">
          {/* Decorative corner heart */}
          <Heart
            aria-hidden
            className="absolute right-7 top-7 h-5 w-5 text-rose/25"
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={reason?.id ?? "empty"}
              custom={direction}
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : 36 * direction,
                filter: "blur(4px)",
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                x: reducedMotion ? 0 : -36 * direction,
                filter: "blur(4px)",
              }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
              className="flex min-h-[120px] w-full items-center justify-center"
            >
              <p className="font-serif text-2xl leading-snug text-cream sm:text-[30px]">
                {reason?.text ?? "Add a few reasons in lib/content/reasons.ts ♡"}
              </p>
            </motion.blockquote>
          </AnimatePresence>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-mauve">
            reason #{index + 1} of {reasons.length}
          </p>

          <button
            onClick={pickAnother}
            disabled={reasons.length <= 1}
            className="mt-8 rounded-full border border-rose/40 bg-rose/10 px-8 py-3.5 text-sm tracking-wide text-rose transition-colors hover:bg-rose hover:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Give me another reason ♡
          </button>
        </div>
      </Reveal>
    </section>
  );
}
