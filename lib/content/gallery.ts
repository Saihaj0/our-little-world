import type { GalleryPhoto } from "./types";

/**
 * PHOTO GALLERY
 *
 * The entries below point at tasteful SVG placeholders in public/photos/
 * so the gallery looks finished before you add real photos.
 *
 * TO USE YOUR OWN PHOTOS:
 *   1. Copy your images into public/photos/ (jpg, webp or png work best).
 *   2. Update `src` to the file's path, e.g. "/photos/IMG_2048.jpg".
 *   3. Update `caption`, `date` and `alt` — `alt` describes the photo
 *      for screen readers (e.g. "Us on a rooftop at sunset").
 *   4. Optionally set `shape` to "portrait" | "landscape" | "square"
 *      so the masonry layout packs them nicely.
 *
 * NOTE ON PRIVACY: this site is password-protected at the server, but a
 * static deployment (e.g. Vercel static export or any plain file host)
 * cannot truly hide files in public/. Only upload photos you're both
 * comfortable with, and keep the password gate in front of the site.
 */
export const gallery: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.44.47 PM.jpeg",
    caption: "The beginning of something special.",
    alt: "The beginning of something special",
    shape: "portrait",
  },
  {
    id: "photo-2",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.02.47 PM.jpeg",
    caption: "A moment I want to remember.",
    alt: "A moment I want to remember",
    shape: "landscape",
  },
  {
    id: "photo-3",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.04.43 PM.jpeg",
    caption: "My favourite person, doing her thing.",
    alt: "My favourite person, doing her thing",
    shape: "square",
  },
  {
    id: "photo-4",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.05.25 PM.jpeg",
    caption: "One for the memory books.",
    alt: "One for the memory books",
    shape: "portrait",
  },
  {
    id: "photo-5",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.17.33 PM.jpeg",
    caption: "A little moment, a big feeling.",
    alt: "A little moment, a big feeling",
    shape: "landscape",
  },
  {
    id: "photo-6",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.27.05 PM.jpeg",
    caption: "Just you being you.",
    alt: "Just you being you",
    shape: "square",
  },
  {
    id: "photo-7",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.03.43 PM.jpeg",
    caption: "One of our chapters.",
    alt: "One of our chapters",
    shape: "portrait",
  },
  {
    id: "photo-8",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.06.07 PM.jpeg",
    caption: "More memories to come. ♡",
    alt: "More memories to come",
    shape: "landscape",
  },
  {
    id: "photo-9",
    src: "/photos/WhatsApp Image 2026-10-14 at 2.42.12 PM.jpeg",
    caption: "How am I supposed to act normal when you look like this?",
    alt: "A candid photo of my beautiful girl ❤️",
    shape: "square",
  },
];
