"use client";

/** The closing long-distance letter, plus a small collection of future plans. */

import { Feather, Compass } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { FinalLetter as FinalLetterType, FuturePlan } from "@/lib/content";

export function FinalLetterSection({ letter }: { letter: FinalLetterType }) {
  return (
    <section
      id="final-letter"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        kicker="One last thing"
        title={letter.heading}
      />

      <Reveal>
        <article className="glass relative rounded-[2rem] p-8 sm:p-12">
          <Feather
            aria-hidden
            className="absolute right-7 top-7 h-5 w-5 text-rose/25"
          />
          <div className="space-y-5">
            {letter.body.map((paragraph, i) => (
              <p
                key={i}
                className="font-serif text-lg leading-relaxed text-blush sm:text-xl sm:leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-10 text-right font-serif text-2xl italic text-rose">
            {letter.signOff}
          </p>
        </article>
      </Reveal>
    </section>
  );
}

export function FuturePlansSection({ plans }: { plans: FuturePlan[] }) {
  /*
   * Balanced responsive grid for any card count:
   *   mobile  → 1 column
   *   tablet  → 2 columns (an odd trailing card spans both)
   *   desktop → 6-column grid, 3 cards per row (col-span-2);
   *             a partial final row spreads evenly (2 cards → half each)
   */
  const last = plans.length - 1;
  const lgRemainder = plans.length % 3;
  const smOdd = plans.length % 2 === 1;

  const spanFor = (i: number) => {
    const sm = smOdd && i === last ? "sm:col-span-2" : "sm:col-span-1";
    if (lgRemainder === 0 || i < plans.length - lgRemainder) {
      return `${sm} lg:col-span-2`;
    }
    const lg = lgRemainder === 1 ? "lg:col-span-6" : "lg:col-span-3";
    return `${sm} ${lg}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        kicker="On the horizon"
        title="A thousand little things, all with you."
        description="Some things we've already experienced. Some things we're still dreaming about. And some things we haven't even thought of yet. But one thing I know is that I want you beside me for as many of them as possible."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.1} className={spanFor(i)}>
            <div className="glass h-full rounded-3xl p-7 transition-colors duration-500 hover:border-rose/30">
              <span
                aria-hidden
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-rose/25 bg-rose/10 text-rose"
              >
                <Compass className="h-4 w-4" />
              </span>
              <h3 className="font-serif text-xl text-cream">{plan.title}</h3>
              <p className="mt-2 font-serif text-sm italic text-rose/90">
                {plan.hook}
              </p>
              <div className="mt-3 space-y-3">
                {plan.body.map((paragraph, j) => (
                  <p key={j} className="text-sm leading-relaxed text-mauve">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
