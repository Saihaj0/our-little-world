"use client";

/**
 * Relationship timeline — a cinematic storybook.
 * Vertical line down the middle on desktop with alternating cards;
 * a single clean column on mobile. Reveal-on-scroll per entry.
 */

import { MapPin } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TimelineEntry } from "@/lib/content";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const sorted = [...entries].sort((a, b) => a.order - b.order);

  return (
    <section id="story" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="Chapter by chapter"
        title="How we happened"
        description="Every little moment brought us here. And somehow, my favourite story turned out to be ours ♡"
      />

      <div className="relative">
        {/* Center line (desktop only) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose/25 to-transparent md:block"
        />
        {/* Left line (mobile) */}
        <div
          aria-hidden
          className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-transparent via-rose/25 to-transparent md:hidden"
        />

        <ol className="space-y-14 md:space-y-24">
          {sorted.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={entry.id} className="relative">
                {/* Node dot */}
                <span
                  aria-hidden
                  className="absolute left-[18px] top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-rose/60 bg-ink md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                >
                  <span className="absolute inset-0.5 rounded-full bg-rose/70" />
                </span>

                <div
                  className={`pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
                    isLeft ? "" : "md:[&>article]:md:col-start-2"
                  }`}
                >
                  <Reveal
                    className={isLeft ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}
                    distance={24}
                  >
                    <article className="glass rounded-3xl p-6 transition-colors duration-500 hover:border-rose/30 sm:p-8">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-rose/80">
                        {entry.date}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl text-cream sm:text-[28px]">
                        {entry.title}
                      </h3>

                      {entry.photo && (
                        <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-rose/10">
                          <Image
                            src={entry.photo}
                            alt={entry.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 40vw"
                            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                          />
                        </div>
                      )}

                      <div className="mt-5 space-y-3">
                        {entry.story.map((paragraph, idx) => (
                          <p key={idx} className="text-[15px] leading-relaxed text-blush/90">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {entry.location && (
                        <p className="mt-5 flex items-center gap-1.5 text-xs text-mauve md:inline-flex">
                          <MapPin className="h-3.5 w-3.5 text-rose/70" aria-hidden />
                          {entry.location}
                        </p>
                      )}
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
