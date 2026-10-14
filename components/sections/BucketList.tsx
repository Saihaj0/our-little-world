"use client";

/**
 * Bucket list — "Things we still have to do together".
 *
 * Example items come from lib/content/bucket-list.ts; anything added here
 * on the site is stored in THIS BROWSER'S localStorage only (device-specific,
 * never synced, never sent anywhere). Authentication never touches storage.
 *
 * Persistence shape (key: olw:bucket-list:v1):
 *   { done: string[], custom: {id,title,category}[], deleted: string[] }
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Plus, Trash2, Compass, Home, Heart, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { BucketItem } from "@/lib/content";

const STORAGE_KEY = "olw:bucket-list:v1";

interface StoredState {
  done: string[];
  custom: { id: string; title: string; category: BucketItem["category"] }[];
  deleted: string[];
}

const EMPTY: StoredState = { done: [], custom: [], deleted: [] };

const CATEGORY_META = {
  date: { label: "Dates", icon: Heart },
  adventure: { label: "Adventures", icon: Compass },
  home: { label: "At home", icon: Home },
  milestone: { label: "Milestones", icon: Trophy },
} as const;

type CategoryFilter = keyof typeof CATEGORY_META | "all";

function readState(): StoredState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      done: Array.isArray(parsed.done) ? parsed.done : [],
      custom: Array.isArray(parsed.custom) ? parsed.custom : [],
      deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [],
    };
  } catch {
    return EMPTY;
  }
}

export default function BucketList({ items }: { items: BucketItem[] }) {
  const [stored, setStored] = useState<StoredState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [draft, setDraft] = useState("");
  const reducedMotion = useReducedMotion();

  // Hydrate from localStorage after mount (SSR-safe).
  useEffect(() => {
    setStored(readState());
    setHydrated(true);
  }, []);

  // Persist changes — debounced so typing or rapid toggling doesn't thrash
  // the storage channel or cause scrollbar jumps mid-interaction.
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!hydrated) return;
    persistTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch {
        // Storage full/blocked — the checklist still works for this visit.
      }
    }, 150);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [stored, hydrated]);

  const visible = useMemo(() => {
    const customItems: BucketItem[] = stored.custom.map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      isExample: false,
    }));
    const all = [...items.filter((i) => !stored.deleted.includes(i.id)), ...customItems];
    return filter === "all" ? all : all.filter((i) => i.category === filter);
  }, [items, stored, filter]);

  const totalVisible = visible.length;
  const doneVisible = visible.filter((i) => stored.done.includes(i.id)).length;
  const progress = totalVisible === 0 ? 0 : Math.round((doneVisible / totalVisible) * 100);

  function toggle(id: string) {
    setStored((s) => ({
      ...s,
      done: s.done.includes(id) ? s.done.filter((d) => d !== id) : [...s.done, id],
    }));
  }

  function deleteItem(id: string) {
    setStored((s) => {
      const isCustom = s.custom.some((c) => c.id === id);
      return {
        ...s,
        // Custom items are removed outright; built-in items are remembered
        // in `deleted` (which the visible list filters out) so they stay
        // hidden on every future visit too.
        custom: s.custom.filter((c) => c.id !== id),
        deleted: isCustom ? s.deleted : [...s.deleted, id],
        // A deleted item shouldn't linger in the done-count either.
        done: s.done.filter((d) => d !== id),
      };
    });
  }

  function addCustom(e: React.FormEvent) {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    const id = `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // File the new item under the active category filter (if any) so it is
    // immediately visible instead of disappearing behind the filter.
    const category = filter === "all" ? "date" : filter;
    setStored((s) => ({
      ...s,
      custom: [...s.custom, { id, title, category }],
    }));
    setDraft("");
  }

  return (
    <section id="bucket-list" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="OUR LITTLE LIST OF DREAMS"
        title="All the things we haven't done yet."
        description="Places we want to see, things we want to try, and little moments we want to make ours. No rush, Dumbo — we've got so many memories waiting for us."
      />

      {/* Progress */}
      <Reveal className="mx-auto mb-10 max-w-xl">
        <div className="glass rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-mauve">
              {doneVisible} of {totalVisible} done
            </span>
            <span className="font-serif text-lg text-rose">{progress}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-cream/10"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Bucket list progress"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose to-blush"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </Reveal>

      {/* Category filters */}
      <Reveal className="mb-8 flex flex-wrap justify-center gap-2.5">
        {(
          [["all", "Everything"], ...Object.entries(CATEGORY_META).map(([k, v]) => [k, v.label])] as [
            CategoryFilter,
            string,
          ][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
              filter === key
                ? "border-rose/50 bg-rose/15 text-rose"
                : "border-cream/15 text-mauve hover:border-rose/30 hover:text-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </Reveal>

      {/* Items */}
      <Reveal>
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((item) => {
              const done = stored.done.includes(item.id);
              const meta = CATEGORY_META[item.category];
              const Icon = meta.icon;
              return (
                <motion.li
                  key={item.id}
                  layout={!reducedMotion}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  className={`group relative rounded-2xl border p-5 transition-colors ${
                    done
                      ? "border-rose/30 bg-rose/8"
                      : "border-rose/10 bg-cream/4 hover:border-rose/25"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggle(item.id)}
                      role="checkbox"
                      aria-checked={done}
                      aria-label={`Mark "${item.title}" as ${done ? "not done" : "done"}`}
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                        done
                          ? "border-rose bg-rose text-burgundy"
                          : "border-cream/30 text-transparent hover:border-rose/60"
                      }`}
                    >
                      <AnimatePresence>
                        {done && (
                          <motion.span
                            initial={reducedMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.25 }}
                          >
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[15px] leading-snug transition-colors ${
                          done ? "text-mauve line-through" : "text-cream"
                        }`}
                      >
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-xs leading-relaxed text-mauve">
                          {item.description}
                        </p>
                      )}
                      <p className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-rose/60">
                        <Icon className="h-3 w-3" aria-hidden />
                        {meta.label}
                        {!item.isExample && " · yours"}
                      </p>
                    </div>

                    {/* Delete only for user-added items */}
                    {!item.isExample && (
                      <button
                        onClick={() => deleteItem(item.id)}
                        aria-label={`Delete "${item.title}"`}
                        className="rounded-full p-1.5 text-mauve transition hover:text-rose focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </Reveal>

      {totalVisible === 0 && hydrated && (
        <p className="mt-8 text-center text-sm text-mauve">
          Nothing in this category yet — add something below ♡
        </p>
      )}

      {/* Add custom */}
      <Reveal className="mx-auto mt-10 max-w-xl">
        <form onSubmit={addCustom} className="flex gap-3">
          <label htmlFor="new-activity" className="sr-only">
            Add your own activity
          </label>
          <input
            id="new-activity"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={120}
            placeholder="Add something you want us to do…"
            className="min-w-0 flex-1 rounded-2xl border border-cream/12 bg-cream/5 px-5 py-3.5 text-cream placeholder:text-mauve/70 focus:border-rose/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          />
          <button
            type="submit"
            disabled={draft.trim().length === 0}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-rose px-5 py-3.5 text-sm font-medium text-burgundy transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-mauve/80">
        Little things we dream of, memories we'll make together. ❤️
        </p>
      </Reveal>

      {/* Our rule */}
      <p className="mx-auto mt-12 max-w-xl text-center font-serif text-lg italic text-blush/90">
      One day at a time, one dream at a time, a thousand memories with you. ❤️
      </p>
    </section>
  );
}