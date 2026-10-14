import type { Song } from "./types";

/**
 * SONGS THAT FEEL LIKE US — five slots with the real personal notes.
 *
 * Song titles/artists are intentionally left as fill-in placeholders —
 * add the real songs and, if you want, streaming links:
 *   links: { spotify: "https://…", youtube: "https://…", appleMusic: "https://…" }
 * With no link supplied, the UI honestly says so instead of faking playback.
 */
export const songs: Song[] = [
  {
    id: "song-ours",
    label: "Our song",
    title: "Dil Ye Bekarar Kyun Hai",
    artist: "Pritam, Mohit Chauhan & Shreya Ghoshal",
    note: [
      "Some songs are just songs, and then there are songs that somehow start feeling connected to a person.",
      "This is the one I want to associate with us. The one that makes me think of you, our story, and the little world we're building together.",
      "Maybe one day we'll hear it somewhere unexpectedly and look at each other with that little smile that says we both know what it means.",
      "Until then, this one belongs in our little world. ♡",
    ],
    links: {
      spotify: "https://open.spotify.com/track/074jI4LCbzZxhm223m6ori?si=8f39a4139e4c4c8c",
    },
  },
  {
    id: "song-concert",
    label: "The Karan Aujla Concert",
    title: "Boyfriend",
    artist: "Karan Aujla",
    note: [
      "This song reminds me of the beginning of our story and the concert where our feelings started changing.",
      "It's funny to think that a moment we experienced as part of an ordinary day out would become something I look back on with so much affection.",
      "If this song takes me anywhere, it's back to the beginning of us.",
    ],
    links: {
      spotify: "https://open.spotify.com/track/3ExgWVPWOQts9RVBkqpdic?si=77e094e60ec24431",
    },

  },
  {
    id: "song-miss-you",
    label: "When I miss you",
    title: "Bin Tere",
    artist: "Vishal-Shekhar, Shafqat Amanat Ali & Sunidhi Chauhan",
    note: [
      "For the days when I wish I could be right next to you instead of just thinking about you.",
      "Until I can steal a hug in person, this song will have to do a little of the work for me.",
    ],
    links: {
      spotify: "https://open.spotify.com/track/3bZPdEskcnMdepwCaDSJRl?si=fb2c99994d014655",
    },
  },
  {
    id: "song-dumbo",
    label: "For my Dumbo",
    title: "Tum Se Hi",
    artist: "Pritam, Mohit Chauhan & Irshad Kamil",
    note: [
      "No complicated explanation for this one. It makes me think of you, and that's enough.",
      "Consider this your personal soundtrack, madam. You are welcome. ❤️",
    ],
    links: {
      spotify: "https://open.spotify.com/track/7eQl3Yqv35ioqUfveKHitE?si=8d1d3c8e376a471c",
    },
  },
  {
    id: "song-future",
    label: "Our future",
    title: "Just the Two of Us",
    artist: "Grover Washington Jr. & Bill Withers",
    note: [
      "For all the things we haven't done yet, the places we haven't visited, and the memories we haven't made.",
      "Here's to the chapters still waiting for us.",
    ],
    links: {
      spotify: "https://open.spotify.com/track/5fdNHVZHbWB1AaXk4RBGVD?si=a27c2686a4184b66",
    },
  },
];




