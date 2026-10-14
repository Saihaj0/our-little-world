"use client";

/**
 * Cinematic introduction.
 *
 * Sequence:
 *   "Somewhere in this big, beautiful, slightly chaotic world…"
 *   →  "I found someone who made it feel a little more special."
 *   →  "And somehow, that someone became my favourite person."
 *   →  "For my Dumbo. ♡"  →  "Enter our little world." button
 *
 * - Returning visitors in the same session can skip (sessionStorage flag,
 *   NOT auth — the session cookie is the only authentication).
 * - prefers-reduced-motion collapses everything to a single still frame.
 * - No audio: nothing ever autoplays.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const INTRO_SEEN_KEY = "olw:intro-seen";

interface IntroProps {
  herName: string;
  onEnter: () => void;
  skipImmediately: boolean;
}

export default function Intro({ herName, onEnter, skipImmediately }: IntroProps) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  // Step timing: 0–2 text lines, 3 "For my …", 4 button.
  useEffect(() => {
    if (skipImmediately || reducedMotion) {
      setStep(4);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 3600),
      setTimeout(() => setStep(2), 7200),
      setTimeout(() => setStep(3), 10800),
      setTimeout(() => setStep(4), 14000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [skipImmediately, reducedMotion]);

  function handleEnter() {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage blocked — intro simply replays next visit. Harmless.
    }
    onEnter();
  }

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -14, filter: "blur(6px)" },
    transition: { duration: reducedMotion ? 0 : 1.4, delay: reducedMotion ? 0 : delay, ease: "easeOut" as const },
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: reducedMotion ? 0 : 1.1, ease: "easeInOut" }}
    >
      {/* Ambient light behind the words */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/60 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[50vw] rounded-full bg-rose/8 blur-[120px]" />
      </div>

      {/* Skip — for returning visitors mid-session */}
      {step < 4 && (
        <button
          onClick={handleEnter}
          className="absolute right-6 top-6 rounded-full border border-cream/15 p-2.5 text-mauve transition hover:border-rose/40 hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          aria-label="Skip the introduction"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}

      <div className="relative text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="l1"
              {...line(0.6)}
              className="font-serif text-2xl italic text-blush sm:text-3xl md:text-4xl"
            >
              Somewhere in this big, beautiful, slightly chaotic world…
            </motion.p>
          )}
          {step === 1 && (
            <motion.p
              key="l2"
              {...line(0.4)}
              className="font-serif text-2xl italic text-blush sm:text-3xl md:text-4xl"
            >
              I found someone who made it feel a little more special.
            </motion.p>
          )}
          {step === 2 && (
            <motion.p
              key="l3"
              {...line(0.4)}
              className="font-serif text-2xl italic text-blush sm:text-3xl md:text-4xl"
            >
              And somehow, that someone became my favourite person.
            </motion.p>
          )}
          {step === 3 && (
            <motion.div key="l4" {...line(0.3)}>
              <p className="text-xs uppercase tracking-[0.35em] text-mauve">
                For my
              </p>
              <motion.p
                className="mt-3 font-serif text-5xl text-rose sm:text-6xl md:text-7xl"
                initial={reducedMotion ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 1.6, ease: "easeOut" }}
              >
                {herName}. ♡
              </motion.p>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="cta" {...line(0.1)}>
              <p className="mb-10 font-serif text-2xl italic text-blush sm:text-3xl">
                For my {herName}. ♡
              </p>
              <motion.button
                onClick={handleEnter}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.8, duration: reducedMotion ? 0 : 1 }}
                whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                className="group rounded-full border border-rose/40 bg-rose/10 px-9 py-4 text-sm uppercase tracking-[0.25em] text-rose transition-colors hover:bg-rose hover:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Enter our little world
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
