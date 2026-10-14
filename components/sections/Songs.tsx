"use client";

/**
 * Songs that feel like us — a curated list with a player-style UI.
 *
 * Honesty note: this never plays or downloads copyrighted music. If a
 * streaming link is supplied the button opens it on that service; if no
 * link exists for a song, the button says so instead of pretending.
 * Nothing ever autoplays.
 */

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Music, Play, ExternalLink, ListMusic } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Song } from "@/lib/content";

function linkEntries(song: Song): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  if (song.links?.spotify) out.push({ label: "Spotify", href: song.links.spotify });
  if (song.links?.youtube) out.push({ label: "YouTube", href: song.links.youtube });
  if (song.links?.appleMusic) out.push({ label: "Apple Music", href: song.links.appleMusic });
  return out;
}

export default function Songs({ songs }: { songs: Song[] }) {
  const [selectedId, setSelectedId] = useState<string>(songs[0]?.id ?? "");
  const reducedMotion = useReducedMotion();
  const selected = songs.find((s) => s.id === selectedId) ?? songs[0];

  return (
    <section id="songs" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="The soundtrack"
        title="If our love had a soundtrack."
        description="Songs that remind me of you, remind me of us, or simply make me want to hold you a little closer."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        {/* Now-selected panel */}
        <Reveal>
          <div className="glass sticky top-24 rounded-[2rem] p-7 sm:p-8">
            <div className="flex items-center gap-3 text-rose">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rose/30 bg-rose/10">
                <Music className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-mauve">
                  Now in focus
                </p>
                <p className="text-sm text-cream">{selected?.label}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.id ?? "none"}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
                className="mt-6"
              >
                {/* Optional album art — only rendered when a cover is supplied */}
                {selected?.cover && (
                  <div className="relative mb-5 aspect-square w-28 overflow-hidden rounded-2xl border border-rose/15 sm:w-36">
                    <Image
                      src={selected.cover}
                      alt={`Cover art for ${selected.title}`}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-serif text-2xl text-cream sm:text-[28px]">
                  {selected?.title}
                </h3>
                <p className="mt-1 text-sm text-mauve">{selected?.artist}</p>
                <div className="mt-5 space-y-3">
                  {selected?.note?.map((paragraph, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-blush/90">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Fake-but-honest transport bar */}
                <div className="mt-7 flex items-center gap-3" aria-hidden>
                  <Play className="h-4 w-4 shrink-0 text-rose" />
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-cream/10">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-rose/70 to-blush/60" />
                  </div>
                  <ListMusic className="h-4 w-4 shrink-0 text-mauve" />
                </div>

                {selected && linkEntries(selected).length > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {linkEntries(selected).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-burgundy transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        <Play className="h-3.5 w-3.5" aria-hidden />
                        Listen on {link.label}
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm text-mauve">
                    No streaming link yet — add one in{" "}
                    <code className="text-rose">lib/content/songs.ts</code> and the
                    listen button appears here.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Song list */}
        <Reveal delay={0.1}>
          <ul className="space-y-3">
            {songs.map((song) => {
              const isSelected = song.id === selected?.id;
              return (
                <li key={song.id}>
                  <button
                    onClick={() => setSelectedId(song.id)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                      isSelected
                        ? "border-rose/40 bg-rose/8 shadow-[0_14px_40px_-20px_rgba(240,169,192,0.45)]"
                        : "border-rose/10 bg-cream/4 hover:border-rose/25 hover:bg-cream/6"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-rose/50 bg-rose/15 text-rose"
                          : "border-cream/15 text-mauve"
                      }`}
                      aria-hidden
                    >
                      {isSelected ? (
                        <motion.span
                          className="flex"
                          animate={
                            reducedMotion ? undefined : { scale: [1, 1.18, 1] }
                          }
                          transition={{ duration: 1.6, repeat: Infinity }}
                        >
                          <Music className="h-4.5 w-4.5" />
                        </motion.span>
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-[0.25em] text-rose/70">
                        {song.label}
                      </span>
                      <span className="mt-1 block truncate font-serif text-lg text-cream">
                        {song.title}
                      </span>
                      <span className="block truncate text-sm text-mauve">
                        {song.artist}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
