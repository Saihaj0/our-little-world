/**
 * Content types for "Our Little World".
 *
 * Every piece of personal content on the site is typed here, so the design
 * stays polished and type-safe while you swap in your own words and photos.
 */

export interface SiteProfile {
  /** Her nickname — used across the site. */
  herName: string;
  /** Your name / signature. */
  yourName: string;
  /** Eyebrow text above the hero title. */
  heroEyebrow: string;
  /** Main hero title. */
  heroTitle: string;
  /** Hero subtitle. */
  heroSubtitle: string;
  /** Small motif under the hero title (a character or short word). */
  heroMotif: string;
  /**
   * ISO date you became "us", e.g. "2024-06-15".
   * A bare date is read as midnight IST (UTC+05:30), so the counter
   * rolls over at midnight Indian time wherever the visitor is.
   * Powers the live days-together counter in the hero.
   * Omit the field entirely to hide the counter.
   */
  togetherSince?: string;
  /**
   * Recurring anniversary countdown shown beside the "Together for"
   * counter in the hero. The date is ALWAYS `togetherSince` (the single
   * source of truth) — this config only controls the label and cadence.
   * Omit it to hide the countdown.
   */
  anniversary?: {
    /** Label above the countdown, e.g. "Until our next anniversary". */
    label: string;
    /**
     * "yearly" (default) — the anniversary of `togetherSince` each year
     * (1 July). "monthly" — the 1st of every month. On the day itself
     * the counter reads "Happy Anniversary, my love! ❤️" instead.
     */
    mode?: "yearly" | "monthly";
  };
}

export interface TimelineEntry {
  /** Stable unique id — used as React key and for editing. */
  id: string;
  /** Sort order, ascending. e.g. 1, 2, 3 … */
  order: number;
  /** Human-readable date, e.g. "12 March 2024" or "March 2024". */
  date: string;
  /** Title of the moment. */
  title: string;
  /** The story. One string per paragraph. */
  story: string[];
  /** Optional photo path in public/, e.g. "/photos/first-meeting.jpg". */
  photo?: string;
  /** Optional location, e.g. "Bengaluru". */
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  /** Path in public/, e.g. "/photos/our-evening-walk.jpg". */
  src: string;
  /** Short caption shown under/over the photo. */
  caption: string;
  /** Optional date label. */
  date?: string;
  /** Describe the photo for screen readers — required for accessibility. */
  alt: string;
  /**
   * Optional aspect hint for the masonry layout.
   * "portrait" | "landscape" | "square". Defaults to a sensible mix.
   */
  shape?: "portrait" | "landscape" | "square";
}

export interface OpenWhenLetter {
  id: string;
  /** Envelope label, e.g. "Open when you miss me". */
  title: string;
  /** One-line hint printed on the envelope. */
  subtitle: string;
  /** Letter body — one string per paragraph. */
  body: string[];
  /** How you close the letter. */
  signOff: string;
}

export interface Reason {
  id: string;
  /** The reason itself — one or two sentences. */
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  /** Your personal note about why this song is "ours" — one string per paragraph. */
  note: string[];
  /** Which placeholder slot this fills, e.g. "Our song". */
  label: string;
  /** Optional cover image path in public/, e.g. "/photos/song-cover.jpg". */
  cover?: string;
  /**
   * Optional streaming links. The site NEVER plays or downloads copyrighted
   * music — the button simply opens the link you provide here.
   */
  links?: {
    spotify?: string;
    youtube?: string;
    appleMusic?: string;
  };
}

export interface BucketItem {
  id: string;
  /** The activity, e.g. "Watch the sunset together". */
  title: string;
  /** Optional longer description. */
  description?: string;
  /** Category used for the filter chips. */
  category: "date" | "adventure" | "home" | "milestone";
  /** Mark items shipped as examples so users can tell them apart. */
  isExample: boolean;
}

export interface FuturePlan {
  id: string;
  title: string;
  /** Short italic line under the title, e.g. "Window seats, snacks, and you." */
  hook: string;
  /** The plan itself — one string per paragraph. */
  body: string[];
}

export interface FinalLetter {
  heading: string;
  /** One string per paragraph. */
  body: string[];
  signOff: string;
}
