import type { TimelineEntry } from "./types";

/**
 * OUR STORY — the real timeline.
 *
 * Dates for the earlier chapters are still approximate (marked softly);
 * entry 6 carries the real date: 1 July 2026.
 * `story` is an array: each string is one paragraph.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "moment-concert",
    order: 1,
    date: "The concert",
    title: "Somewhere between the music and you",
    story: [
      "I don't think I went to that Karan Aujla concert knowing that something about my life was about to change. I went for the music, the atmosphere, and the experience. But somewhere along the way, without either of us planning it, something started changing between us.",
      "Maybe it was the way we looked at each other, maybe it was the feeling of being around you, or maybe it was just the beginning of something neither of us had figured out yet.",
      "I don't know exactly when my feelings started becoming something more. I just know that when I look back now, that concert feels like the beginning of a story I never want to stop telling.",
      "Funny how a concert can give you memories of songs, but the best thing it can leave you with is a person. ♡",
    ],
    photo: "/photos/IMG_9418.jpg",
  },
  {
    id: "moment-hanging-out",
    order: 2,
    date: "After the concert",
    title: "I started looking forward to you",
    story: [
      "After the concert, we started hanging out more, and somewhere in those moments, you became more than just someone I liked spending time with.",
      "I started enjoying the little things about being around you. The conversations, the time we spent together, and the feeling of getting to know you a little more each time.",
      "Nothing needed to be extraordinary. Somehow, the ordinary moments felt special because they were with you.",
      "I think that's one of my favourite things about us. We didn't need some perfect movie scene for something to feel meaningful. We just needed a little time together.",
      "And Dumbo, if I could go back and relive those early days, I would. Not because I would change anything, but because I'd love to experience the beginning of falling for you all over again. ❤️",
    ],
  },
  {
    id: "moment-became-you",
    order: 3,
    date: "Somewhere along the way",
    title: "My favourite person, without even trying",
    story: [
      "I can't point to one exact moment when I knew my feelings had become serious. It wasn't necessarily one grand gesture or one perfect conversation.",
      "It was the fact that I kept wanting to spend time with you. That getting to know you made me want to know you even more. That the more I discovered about you, the more there was to love.",
      "Your eyes, your kindness, your nature, and all those little things that make you who you are started becoming things I held close to my heart.",
      "And somehow, without even trying, you became my favourite person.",
      "If someone had told me that the girl I was getting to know would eventually become my girl, I probably would've smiled like an idiot.",
      "Actually, who am I kidding? I still do. ♡",
    ],
    photo: "/photos/WhatsApp Image 2026-10-14 at 2.06.30 PM.jpeg",
  },
  {
    id: "moment-distance",
    order: 4,
    date: "The internships",
    title: "Different places, the same feelings",
    story: [
      "Then came our internships, and suddenly, we had distance between us.",
      "It wasn't necessarily the easiest change. When you're getting closer to someone, being unable to spend time together in the same way can feel strange. You start appreciating the moments you do get together even more.",
      "But I don't want to remember that chapter only for the distance. I want to remember it as a part of our story, too — a time when we were both doing our own things while something between us continued to grow.",
      "We didn't have to be in the same place every day for you to matter to me. You were still you, my favourite person, even when life had us doing different things.",
      "And maybe that's one of the things I want us to remember: our story doesn't have to be perfect or effortless to be worth it. It just has to be ours. ❤️",
    ],
  },
  {
    id: "moment-before-telling",
    order: 5,
    date: "The days before",
    title: "There was something I wanted you to know",
    story: [
      "At some point, keeping my feelings to myself stopped feeling like enough.",
      "I knew what you meant to me, and I wanted you to know it, too. Not just through the time we spent together or the way I felt around you, but through the words I had been wanting to say.",
      "I can't pretend I wasn't nervous about putting those feelings into words. Telling someone how you feel means letting them see a part of you that you've been keeping close.",
      "But you were worth taking that chance for.",
      "I didn't need some perfectly written speech or a dramatic movie moment. I just wanted to be honest with you.",
      "And so, on 1 July, I finally did. ♡",
    ],
  },
  {
    id: "moment-became-us",
    order: 6,
    date: "1 July 2026",
    title: "The easiest yes to remember",
    story: [
      "This is the day our story became official. The day I finally told you how I felt and got to call you my girl.",
      "1 July will always mean something special to me. Not because a date on a calendar magically changes everything, but because it marks the day we chose to give this feeling a name and give us a chance.",
      "If I could tell the version of me from before that day one thing, it would be this: take the chance. Tell her. Be honest. Some feelings deserve to be spoken instead of kept quietly in your heart.",
      "And to you, Dumbo, thank you for saying yes to me.",
      "You probably have no idea how happy that makes me. Well, actually, you probably do, because I don't think I'm particularly good at hiding it.",
      "I'm your idiot, you're my Dumbo, and this is our little world.",
      "Happy beginning to us, my love. ❤️",
    ],
    photo: "/photos/WhatsApp Image 2026-10-14 at 2.07.27 PM.jpeg",
  },
  {
    id: "moment-only-beginning",
    order: 7,
    date: "Today",
    title: "My favourite story is still being written",
    story: [
      "Sometimes I think about how our story began — a concert, some feelings, spending more time together, a period of distance, and finally the day I told you what was in my heart.",
      "None of it had to be perfectly planned for it to become something meaningful.",
      "And now, I don't just want to remember how we got here. I want to be excited about everything still waiting for us.",
      "The dates we'll go on, the places we'll visit, the train rides we'll take, the ordinary evenings that somehow become our favourite memories, the silly arguments we'll probably have, and all the little moments we'll collect along the way.",
      "I want to keep learning about you. I want to keep finding new reasons to love you, even though you make that ridiculously easy already.",
      "I can't promise that every day will be perfect. But I can promise that what we have matters to me, and I want to keep showing up for it.",
      "This website is called Our Little World for a reason. It's a little place to keep the memories we've made and the ones we haven't made yet.",
      "And if there's one thing I hope you remember whenever you open it, it's this:",
      "Of all the people I could have met in this big world, I'm so glad I met you.",
      "I love you, Dumbo. And I'm really looking forward to the rest of our story. ❤️",
    ],
  },
];
