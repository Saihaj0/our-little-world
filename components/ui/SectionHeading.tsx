"use client";

/** Section heading: small serif kicker, big serif title, soft rule. */

import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`mb-12 flex flex-col ${alignment} sm:mb-16`}>
      <span className="text-[11px] uppercase tracking-[0.4em] text-rose/80">
        {kicker}
      </span>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mauve">
          {description}
        </p>
      )}
      <span aria-hidden className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-rose/50 to-transparent" />
    </Reveal>
  );
}
