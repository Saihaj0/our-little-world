"use client";

/**
 * Fixed navigation — glass bar on desktop, sheet menu on mobile.
 * Smooth-scrolls to sections and offers a logout control.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: "story", label: "Our story" },
  { id: "gallery", label: "Gallery" },
  { id: "letters", label: "Letters" },
  { id: "reasons", label: "Reasons" },
  { id: "songs", label: "Songs" },
  { id: "bucket-list", label: "Someday list" },
  { id: "final-letter", label: "One Last Thing ♡" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.assign("/welcome");
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "border-b border-rose/10 bg-ink/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Sections"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#top"
          className="font-serif text-lg tracking-wide text-rose transition-opacity hover:opacity-80"
        >
          Our Little World <span aria-hidden>♡</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-[13px] tracking-wide text-mauve transition-colors hover:text-cream"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[13px] tracking-wide text-mauve transition-colors hover:text-rose"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Leave
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-full border border-cream/15 p-2 text-cream transition hover:border-rose/40 hover:text-rose lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
            className="overflow-hidden border-b border-rose/10 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-cream transition-colors hover:bg-rose/10"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-cream/10 pt-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-mauve transition-colors hover:bg-rose/10 hover:text-rose"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Leave this world
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
