"use client";

/**
 * Lock screen — the beautiful password gate at /welcome.
 *
 * The password is verified server-side via POST /api/auth/login; this form
 * never stores or persists it anywhere on the client.
 */

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Lock, LoaderCircle } from "lucide-react";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const reducedMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checking) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // Full navigation so the server renders the unlocked site.
        window.location.assign("/");
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(data?.error ?? "Something went wrong. Try again?");
      setPassword("");
    } catch {
      setError("Network hiccup — check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  const fade = reducedMotion ? { duration: 0 } : { duration: 1.1 };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full bg-burgundy/60 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[45vh] w-[45vw] rounded-full bg-rose/10 blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...fade, ease: "easeOut" }}
        className="glass w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-rose/30 bg-burgundy/50"
          >
            <Heart className="h-6 w-6 text-rose" aria-hidden />
          </motion.div>
          <h1 className="font-serif text-3xl text-cream">
            A little place made just for us.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-mauve">
            Some things are too special to leave out in the open.
            <br />
            This little world is one of them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Lock
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mauve"
            />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="The password"
              disabled={checking}
              className="w-full rounded-2xl border border-cream/10 bg-cream/5 py-3.5 pl-11 pr-4 text-cream placeholder:text-mauve/70 focus:border-rose/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 disabled:opacity-60"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-sm text-rose"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={checking || password.length === 0}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-rose px-6 py-3.5 font-medium text-burgundy transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checking ? (
              <>
                <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
                Unlocking…
              </>
            ) : (
              "Unlock our little world"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-mauve/70">
          Private. Just ours. ♡
        </p>
      </motion.div>
    </main>
  );
}
