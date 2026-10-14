"use client";

/** Hero — cinematic opening of the unlocked site. */

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Images } from "lucide-react";
import TogetherCounter from "./TogetherCounter";
import type { SiteProfile } from "@/lib/content";

export default function Hero({ profile }: { profile: SiteProfile }) {
  const reducedMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 1.2,
      delay: reducedMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        {...rise(0.2)}
        className="text-[11px] uppercase tracking-[0.45em] text-rose/80"
      >
        {profile.heroEyebrow}
      </motion.p>

      <motion.h1
        {...rise(0.6)}
        className="mt-6 font-serif text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {profile.heroTitle}
      </motion.h1>

      {/* Subtle animated heart motif */}
      <motion.span
        aria-hidden
        className="mt-7 text-2xl text-rose"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: reducedMotion ? 0 : 1.2,
        }}
      >
        {profile.heroMotif}
      </motion.span>

      <motion.p
        {...rise(1)}
        className="mt-7 max-w-lg text-[15px] leading-relaxed text-blush sm:text-base"
      >
        {profile.heroSubtitle}
      </motion.p>

      {/* Live days-together + anniversary countdown (optional content) */}
      <motion.div
        {...rise(1.3)}
        className="w-full max-w-xl border-y border-cream/10 py-5"
      >
        <TogetherCounter profile={profile} />
      </motion.div>

      <motion.div {...rise(1.5)} className="mt-16 flex flex-col items-center gap-5 sm:flex-row">
        <a
          href="#story"
          className="group flex items-center gap-2 rounded-full bg-rose px-8 py-3.5 text-sm font-medium tracking-wide text-burgundy transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          How it all began
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
        </a>
        <a
          href="#gallery"
          className="flex items-center gap-2 rounded-full border border-cream/20 px-8 py-3.5 text-sm tracking-wide text-cream transition-colors hover:border-rose/50 hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
        >
          <Images className="h-4 w-4" aria-hidden />
          Our little memories
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 40, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-mauve"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-mauve/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
