"use client";

/** Footer — signs off with the site's signature line. */

import { LogOut } from "lucide-react";

export default function Footer({ herName }: { herName: string }) {
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.assign("/welcome");
    }
  }

  return (
    <footer className="border-t border-rose/10 px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="font-serif text-xl italic text-blush">
          Made with love, for my Dumbo ♡
        </p>
        <p className="max-w-md text-xs leading-relaxed text-mauve/80">
          Our little world, one memory at a time.
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-mauve transition-colors hover:border-rose/40 hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          Leave this world
        </button>
      </div>
    </footer>
  );
}
