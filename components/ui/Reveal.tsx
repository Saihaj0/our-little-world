"use client";

/** Reveal-on-scroll wrapper used across sections. Respects reduced motion. */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance the element travels while fading in, in px. */
  distance?: number;
}

export default function Reveal({
  children,
  delay = 0,
  className,
  distance = 28,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
