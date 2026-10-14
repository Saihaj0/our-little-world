"use client";

/**
 * Live hero counters: days-together (ticking) and a recurring countdown
 * to the next anniversary. Both come from `siteProfile` and are optional
 * — this component renders nothing (and mounts nothing) when unconfigured.
 *
 * Details that matter:
 *  - Hydration-safe: the server HTML shows dashes; real values fill in
 *    after mount, so SSR and client markup always agree.
 *  - `tabular-nums` keeps the digits from jittering as they tick.
 *  - One state set per second, and the counter self-corrects when the
 *    tab becomes visible again, so it never shows stale time after
 *    backgrounding.
 *  - The anniversary date is always `togetherSince` (single source of
 *    truth); `profile.anniversary` only adds the label and cadence
 *    (yearly/monthly — see lib/anniversary.ts). On the anniversary day
 *    itself the countdown becomes "Happy Anniversary, my love! ❤️".
 *  - Timezone: everything is read in Indian Standard Time (UTC+05:30),
 *    so the day count ticks over at midnight IST wherever the visitor is.
 *
 * Entrance animation stays in Hero (this is plain markup on purpose).
 */

import { useEffect, useState } from "react";
import type { SiteProfile } from "@/lib/content";
import { nextAnniversaryStart, DAY_MS } from "@/lib/anniversary";

interface Split {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function split(ms: number): Split {
  const t = Math.max(0, ms);
  return {
    days: Math.floor(t / 86_400_000),
    hours: Math.floor(t / 3_600_000) % 24,
    minutes: Math.floor(t / 60_000) % 60,
    seconds: Math.floor(t / 1_000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Indian Standard Time — the site's timezone (UTC+05:30, no DST).
 *
 * A bare date like "2026-07-01" is parsed by JavaScript as *UTC* midnight,
 * which would make the counter tick over a day at 5:30 AM IST. Anchoring
 * date-only values (and offset-less datetimes) to IST keeps every rollover
 * at midnight IST, regardless of the visitor's device timezone.
 */
const IST_OFFSET = "+05:30";
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const NAIVE_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

function parseIST(value: string): number {
  const iso = DATE_ONLY.test(value)
    ? `${value}T00:00:00${IST_OFFSET}` // date → midnight IST
    : NAIVE_DATETIME.test(value)
      ? `${value}${IST_OFFSET}` // no offset → assume IST
      : value; // already carries an offset
  return Date.parse(iso);
}

function Clock({ value, ready }: { value: Split; ready: boolean }) {
  return (
    <p className="mt-2 font-serif text-xl tabular-nums text-cream sm:text-2xl">
      {ready ? (
        <>
          {value.days.toLocaleString("en-US")}
          <span className="text-mauve">{value.days === 1 ? " day" : " days"}</span>{" "}
          <span className="text-rose/80">
            {pad(value.hours)}:{pad(value.minutes)}:{pad(value.seconds)}
          </span>
        </>
      ) : (
        <span className="text-mauve" aria-hidden>
          — — —
        </span>
      )}
    </p>
  );
}

export default function TogetherCounter({
  profile,
}: {
  profile: SiteProfile;
}) {
  const sinceMs = profile.togetherSince ? parseIST(profile.togetherSince) : NaN;

  const hasSince = Number.isFinite(sinceMs);
  // The anniversary countdown is derived from `togetherSince` — it needs
  // that date to exist and an `anniversary` label to show.
  const anniversary = hasSince ? profile.anniversary : undefined;
  const hasAnniversary = anniversary !== undefined;

  // `now` is null until mounted — the SSR pass renders placeholders only.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const id = setInterval(update, 1_000);
    const onVisibility = () => {
      if (!document.hidden) update();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!hasSince && !hasAnniversary) return null;

  const ready = now !== null;
  // Midnight IST of the current (or next) anniversary day. Only meaningful
  // once mounted — the SSR pass renders placeholders either way.
  const annivStart =
    ready && hasAnniversary
      ? nextAnniversaryStart(now as number, sinceMs, anniversary?.mode)
      : 0;
  const isAnniversaryDay =
    ready &&
    hasAnniversary &&
    (now as number) >= annivStart &&
    (now as number) < annivStart + DAY_MS;

  return (
    <div className="mt-11 flex items-stretch justify-center gap-8 sm:gap-12">
      {hasSince && (
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-mauve">
            Together for
          </p>
          <Clock value={split(ready ? now - sinceMs : 0)} ready={ready} />
        </div>
      )}

      {hasSince && hasAnniversary && (
        <span
          aria-hidden
          className="w-px shrink-0 bg-gradient-to-b from-transparent via-cream/15 to-transparent"
        />
      )}

      {hasAnniversary && (
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-mauve">
            {anniversary?.label}
          </p>
          {isAnniversaryDay ? (
            <p className="mt-2 font-serif text-xl text-rose sm:text-2xl">
              Happy Anniversary, my love! ❤️
            </p>
          ) : (
            <Clock value={split(ready ? annivStart - now : 0)} ready={ready} />
          )}
        </div>
      )}
    </div>
  );
}
