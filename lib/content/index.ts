/**
 * Central content index — import everything from here:
 *
 *   import { siteProfile, timeline, gallery } from "@/lib/content";
 *
 * The real content lives here — edit the individual files in this folder
 * to tweak any words. The only fill-ins left are the five song
 * titles/artists in songs.ts (marked "[Add …]") and the next-meetup
 * date in site.ts.
 */

export * from "./types";
export { siteProfile, futurePlans, finalLetter } from "./site";
export { timeline } from "./timeline";
export { gallery } from "./gallery";
export { openWhenLetters } from "./letters";
export { reasons } from "./reasons";
export { songs } from "./songs";
export { bucketItems } from "./bucket-list";
