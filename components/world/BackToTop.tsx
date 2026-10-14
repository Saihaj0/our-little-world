"use client";

/** Small floating back-to-top control that appears after scrolling. */

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 rounded-full border border-rose/30 bg-ink/80 p-3 text-rose backdrop-blur-md transition-colors hover:border-rose/60 hover:bg-rose hover:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
