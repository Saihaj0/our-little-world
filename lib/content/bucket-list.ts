import type { BucketItem } from "./types";

/**
 * THINGS WE STILL HAVE TO DO TOGETHER — the real list.
 *
 * This isn't a race to finish the list. It's a collection of things we want
 * to experience together, one memory at a time. ❤️
 *
 * On the site she can also add her own items; those are saved on HER device
 * only (localStorage) and never leave the browser.
 */
export const bucketItems: BucketItem[] = [
  // ——— Dates ———
  { id: "bucket-sunset-date", title: "Go on a proper sunset date together.", category: "date", isExample: false },
  { id: "bucket-dress-up", title: "Have a dinner date where we dress up for each other.", category: "date", isExample: false },
  { id: "bucket-spontaneous", title: "Go on a spontaneous date without planning every detail.", category: "date", isExample: false },
  { id: "bucket-movie-night", title: "Have a movie night with snacks and absolutely no productive plans.", category: "date", isExample: false },
  { id: "bucket-cafe", title: "Try a new café together.", category: "date", isExample: false },
  { id: "bucket-phones-away", title: "Have a date where we both put our phones away and just enjoy the moment.", category: "date", isExample: false },
  { id: "bucket-recreate-photo", title: "Recreate one of our favourite photos together.", category: "date", isExample: false },
  { id: "bucket-anniversary", title: "Celebrate our anniversary in a way that feels special to us.", category: "date", isExample: false },

  // ——— Adventures ———
  { id: "bucket-train-ride", title: "Take our first long train ride together.", category: "adventure", isExample: false },
  { id: "bucket-new-place", title: "Explore a new place neither of us has visited before.", category: "adventure", isExample: false },
  { id: "bucket-sunrise", title: "Watch a sunrise or sunset together.", category: "adventure", isExample: false },
  { id: "bucket-itinerary", title: "Take a trip where we plan the itinerary together.", category: "adventure", isExample: false },
  { id: "bucket-silly-photos", title: "Take silly photos and make memories we can look back on.", category: "adventure", isExample: false },
  { id: "bucket-playlist", title: "Make a playlist for a journey together.", category: "adventure", isExample: false },
  { id: "bucket-favourite-story", title: "Have an adventure that becomes one of our favourite stories.", category: "adventure", isExample: false },

  // ——— At home / little moments ———
  { id: "bucket-cook", title: "Cook a meal together.", category: "home", isExample: false },
  { id: "bucket-cosy-evening", title: "Have a cosy evening doing absolutely nothing.", category: "home", isExample: false },
  { id: "bucket-photo-album", title: "Make a photo album of our favourite memories.", category: "home", isExample: false },
  { id: "bucket-print-photos", title: "Print our favourite pictures instead of keeping them only on our phones.", category: "home", isExample: false },
  { id: "bucket-dreams-talk", title: "Have a long conversation about our dreams and plans.", category: "home", isExample: false },
  { id: "bucket-tradition", title: "Make a tradition that's just ours.", category: "home", isExample: false },
  { id: "bucket-little-things", title: "Spend an entire day doing little things we both enjoy.", category: "home", isExample: false },
  { id: "bucket-collection", title: "Build a little collection of things that remind us of each other.", category: "home", isExample: false },

  // ——— Milestones ———
  { id: "bucket-one-year", title: "Celebrate one year together on 1 July 2027.", category: "milestone", isExample: false },
  { id: "bucket-special-place", title: "Visit a place that becomes special to us.", category: "milestone", isExample: false },
  { id: "bucket-scrapbook", title: "Make a scrapbook of our story so far.", category: "milestone", isExample: false },
  { id: "bucket-future-letters", title: "Write letters to our future selves and open them later.", category: "milestone", isExample: false },
  { id: "bucket-look-back", title: "Look back at this website together and laugh at how it all began.", category: "milestone", isExample: false },
  { id: "bucket-add-memory", title: "Add a new memory to our timeline every time something meaningful happens.", category: "milestone", isExample: false },
  { id: "bucket-little-wins", title: "Make a tradition of celebrating the little wins in each other's lives.", category: "milestone", isExample: false },
  { id: "bucket-keep-discovering", title: "Keep discovering new things about each other, even years from now.", category: "milestone", isExample: false },
];
