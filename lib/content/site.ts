import type { SiteProfile, FuturePlan, FinalLetter } from "./types";

/**
 * SITE-LEVEL COPY — the real words.
 */

export const siteProfile: SiteProfile = {
  herName: "Shivani",
  yourName: "Saihaj",
  heroEyebrow: "A LITTLE CORNER OF THE UNIVERSE",
  heroTitle: "Our Little World",
  heroSubtitle:
    "A little collection of our memories, a hundred reasons I love you, and all the moments we're still waiting to make.",
  heroMotif: "♡",

  /* LIVE COUNTERS in the hero — both optional; delete either to hide it.
   * Dates are read in Indian Standard Time (UTC+05:30): a bare date means
   * midnight IST, so the day count ticks over at midnight Indian time. */
  // The day you became "us" — ISO date. (Real: 1 July 2026.)
  // This is the SINGLE SOURCE OF TRUTH for the anniversary countdown too.
  togetherSince: "2026-07-01",
  // Recurring "Until our next anniversary" countdown beside it — always
  // derived from togetherSince above (no second date to keep in sync).
  // mode: "yearly" (default) counts to 1 July each year; "monthly" counts
  // to the 1st of every month. On the day itself it reads
  // "Happy Anniversary, my love! ❤️".
  anniversary: {
    label: "UNTIL OUR NEXT 1 JULY ♡",
    mode: "yearly",
  },
};

/**
 * ON THE HORIZON — five little dreams.
 */
export const futurePlans: FuturePlan[] = [
  {
    id: "plan-places",
    title: "Places we'll go",
    hook: "A little map of memories.",
    body: [
      "There are so many places I want to explore with you, Dumbo. New cities, cute little cafés, places we've never been, and places we might end up loving for no particular reason.",
      "I want the pictures, the random stops, the trying-new-food-together moments, and all the little stories we'll collect along the way.",
      "And honestly, I don't think the destination will matter as much as having you beside me. Wherever we go, I want us to come back with stories that are ours. ❤️",
    ],
  },
  {
    id: "plan-ordinary",
    title: "Just another day with you",
    hook: "Ordinary days, extraordinary feelings.",
    body: [
      "You know what I look forward to just as much as the big adventures? The ordinary days with you.",
      "Getting food together, going on random walks, talking about absolutely everything and nothing, laughing at the stupidest jokes, and spending time together without needing a special reason.",
      "I want the kind of relationship where even the most uneventful day can become a favourite memory simply because we spent it together.",
      "Because, Dumbo, I don't always need a grand plan. Sometimes, I just want you, a little time, and the chance to annoy you in person. 😭❤️",
    ],
  },
  {
    id: "plan-someday",
    title: "Our someday list",
    hook: "All the things we keep saying we'll do.",
    body: [
      "Let's make a list of all the things we keep saying we should do someday — and then actually do them.",
      "The dates we've talked about, the places we want to visit, the food we want to try, the experiences we've always wanted to share, and even the random ideas that pop into our heads at the most unexpected times.",
      "I don't want all our plans to remain just conversations. I want us to slowly turn them into memories, one little adventure at a time.",
      "And years from now, I hope we'll look back at this list and laugh at how many things we actually managed to do — and how many new ones we added along the way.",
      "Deal, Dumbo? ♡",
    ],
  },
  {
    id: "plan-memories",
    title: "Memories in the making",
    hook: "We haven't lived our favourite stories yet.",
    body: [
      "Sometimes I think about how many memories we haven't made yet, and it makes me genuinely excited.",
      "There are pictures we haven't taken, places we haven't discovered, songs we haven't attached to a memory, and moments we can't even imagine right now that might eventually become some of our favourites.",
      "I want to keep adding little pieces to our story. Not because every moment needs to be extraordinary, but because I want to remember the life we're sharing as it unfolds.",
      "This little world already holds pieces of our beginning. I hope that, with time, it becomes filled with so many more chapters that we can look back and see just how much we've experienced together.",
      "Our story is still being written, my love. And I think that's one of the loveliest things about it. ❤️",
    ],
  },
  {
    id: "plan-spontaneous",
    title: "No plans, just us",
    hook: "The best days aren't always planned.",
    body: [
      "I want those random days when neither of us has a proper plan, but somehow we end up having the best time.",
      "Maybe we decide to go somewhere at the last minute, try a place we've never been to, take a drive, or simply wander around until we find something interesting.",
      "No perfect itinerary, no pressure to make everything special, and no need to know exactly how the day will go.",
      "Just us, a little spontaneity, and whatever adventure we accidentally get ourselves into.",
      "Although, knowing us, we might spend more time deciding where to go than actually going anywhere. 😭",
      "But even then, I'd still want to do it with you, Dumbo. ❤️",
    ],
  },
];

/**
 * THE FINAL LETTER — the emotional centrepiece at the very end.
 */
export const finalLetter: FinalLetter = {
  heading: "Until I'm there, and every day after ❤️",
  body: [
    "My Dumbo,",
    "If you've made it all the way to the end of this little world, then you've officially reached the part where your idiot boyfriend tries to put everything he feels into words.",
    "And honestly, I don't even know where to begin.",
    "Maybe I should begin with that Karan Aujla concert. It's strange to think that somewhere in that chapter of our lives, something started between us that would eventually become one of the most important things to me.",
    "We started hanging out, getting to know each other, and letting those feelings grow. Then life took us in different directions for our internships, and distance became another part of our story.",
    "And then came 1 July 2026.",
    "The day I finally found the courage to tell you what my heart had been trying to say for a while.",
    "Sometimes, I think about how much courage it takes to tell someone that they've become important to you. You can't know exactly how things will turn out. You just know that what you're feeling deserves to be said.",
    "I'm so glad I said it.",
    "And I'm so glad it's you.",
    "Dumbo, when I say that I love everything about you, I really do mean it. I love your eyes. I love your kindness. I love your nature and the person you are. I love all the things that make you different from everyone else, including the things I might not have found the right words to describe yet.",
    "I don't think love is always about finding one perfect reason. Sometimes it's the accumulation of so many little things that you stop trying to explain it and simply realise that this person has become incredibly important to you.",
    "That's what you are to me.",
    "And I want you to know that I don't just love the idea of us. I care about the real relationship we're building — the conversations, the laughter, the learning, the ordinary days, and even the moments when we need to understand each other a little better.",
    "I want us to be able to tell each other the truth. I want us to feel safe enough to talk about what bothers us, celebrate each other's wins, and support each other when life gets difficult.",
    "I want to keep learning how to love you in the ways that make you feel loved.",
    "Because you deserve more than pretty words on a website. You deserve kindness, effort, patience, honesty, and someone who tries to understand you rather than assuming he already knows everything.",
    "And yes, I will still annoy you. I am your idiot, after all. We can't have unrealistic expectations. 😭",
    "But underneath all the jokes, I mean this with my whole heart: I'm grateful that we found each other.",
    "I know there are so many things waiting for us. Our dates, our adventures, our first long train ride, the places we want to explore, the pictures we'll take, the songs that will become ours, and all the little traditions we haven't even thought of yet.",
    "I want to experience those things with you.",
    "I want the exciting memories, but I also want the simple ones. Sitting together after a long day. Laughing at something completely stupid. Talking about our plans. Sharing a meal. Being able to look at you and feel happy that, out of all the things I could be doing, I'm spending that moment with you.",
    "I can't tell you exactly what every chapter of our future will look like. But I know that I want to keep writing this story with you, one day and one memory at a time.",
    "And that's why I made this little world.",
    "Not because a website could ever contain everything I feel for you. It can't. Not even close.",
    "I made it because I wanted you to have somewhere you could come back to. Somewhere filled with reminders of how our story began, the things I love about you, the memories we make, and the things I'm looking forward to sharing with you.",
    "A little corner of the universe that says, in all the ways I know how to say it: you matter to me.",
    "So whenever you open this website, I hope you smile.",
    "I hope you remember that there's a boy who is very happy that you said yes to him on 1 July.",
    "I hope you remember that your eyes, your kindness, your heart, and all the little things that make you Dumbo are loved more than you probably realise.",
    "And I hope that, as time passes, we get to add so many more memories here that the website becomes a reminder of just how much life we've shared.",
    "My favourite part of our story isn't just how it began.",
    "It's that we're still at the beginning.",
    "There is so much more to discover, so much more to experience, and so many more reasons for me to fall in love with you in new ways.",
    "Thank you for being you.",
    "Thank you for being part of my life.",
    "And thank you for giving us a beginning.",
    "I love you, Dumbo. More than this little website could ever explain.",
    "Until I'm there, and every day after.",
  ],
  signOff: "Always, your princess❤️",
};
