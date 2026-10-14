/**
 * Recurring anniversary countdown math.
 *
 * Pure functions — no React, no side effects — so they can be unit-checked
 * with plain Node and reused anywhere. All calendar comparisons happen in
 * Indian Standard Time (UTC+05:30, no DST), matching the rest of the site:
 * the "today" a visitor sees is the IST calendar day, wherever their device
 * is set.
 */

/** How often the anniversary repeats. */
export type AnniversaryMode = "yearly" | "monthly";

/** Milliseconds in one calendar day. */
export const DAY_MS = 86_400_000;

/**
 * Indian Standard Time offset in milliseconds (UTC+05:30).
 *
 * Shifting an instant by this much and then reading it with the UTC
 * accessors gives the IST wall-clock fields — a reliable way to do calendar
 * math in a fixed-offset timezone without a timezone database. (IST has no
 * daylight saving, so the offset is constant.)
 */
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1_000;

/**
 * Start of the anniversary day (midnight IST) that `nowMs` falls in, or the
 * next one it will reach.
 *
 * - `"yearly"`: the same calendar date as `sinceMs` (e.g. 1 July) every year.
 * - `"monthly"`: the 1st of every month.
 *
 * Returns the midnight-IST instant of the current anniversary day when
 * `nowMs` is on it, otherwise of the next one — so callers can both count
 * down (`start - now`) and detect the day itself
 * (`now >= start && now < start + DAY_MS`).
 */
export function nextAnniversaryStart(
  nowMs: number,
  sinceMs: number,
  mode: AnniversaryMode = "yearly",
): number {
  // The anchor date's IST wall-clock month/day (e.g. 1 July).
  const anchor = new Date(sinceMs + IST_OFFSET_MS);
  const anchorMonth = anchor.getUTCMonth();
  const anchorDate = anchor.getUTCDate();

  // "Now" in IST wall-clock terms.
  const ist = new Date(nowMs + IST_OFFSET_MS);
  const year = ist.getUTCFullYear();
  const month = ist.getUTCMonth();

  // Midnight IST of a wall-clock calendar day, as a real instant.
  // (Date.UTC normalises overflow — e.g. 29 Feb in a non-leap year.)
  const midnightIST = (y: number, m: number, d: number) =>
    Date.UTC(y, m, d) - IST_OFFSET_MS;

  if (mode === "monthly") {
    const thisMonth = midnightIST(year, month, 1);
    // On the 1st the anniversary day has already begun — return it so the
    // caller shows the message; otherwise aim for the next 1st.
    if (nowMs < thisMonth + DAY_MS) return thisMonth;
    return month === 11
      ? midnightIST(year + 1, 0, 1)
      : midnightIST(year, month + 1, 1);
  }

  const thisYear = midnightIST(year, anchorMonth, anchorDate);
  if (nowMs < thisYear) return thisYear; // before the anniversary this year
  if (nowMs < thisYear + DAY_MS) return thisYear; // it's the anniversary day
  return midnightIST(year + 1, anchorMonth, anchorDate); // after → next year
}
