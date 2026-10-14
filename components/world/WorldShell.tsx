"use client";

/**
 * The unlocked site shell: cinematic intro (skippable within the session),
 * navigation, every section, footer, back-to-top, and the ambient world
 * behind it all.
 *
 * All personal content arrives as props from the protected server
 * component — nothing here fetches private data over an unprotected route.
 */

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AmbientBackground from "./AmbientBackground";
import Intro from "./Intro";
import Navigation from "./Navigation";
import BackToTop from "./BackToTop";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Gallery from "@/components/sections/Gallery";
import Letters from "@/components/sections/Letters";
import Reasons from "@/components/sections/Reasons";
import Songs from "@/components/sections/Songs";
import BucketList from "@/components/sections/BucketList";
import { FinalLetterSection, FuturePlansSection } from "@/components/sections/FinalLetter";
import Footer from "@/components/world/Footer";
import type {
  SiteProfile,
  TimelineEntry,
  GalleryPhoto,
  OpenWhenLetter,
  Reason,
  Song,
  BucketItem,
  FinalLetter,
  FuturePlan,
} from "@/lib/content";

const INTRO_SEEN_KEY = "olw:intro-seen";

interface WorldShellProps {
  profile: SiteProfile;
  timeline: TimelineEntry[];
  gallery: GalleryPhoto[];
  letters: OpenWhenLetter[];
  reasons: Reason[];
  songs: Song[];
  bucketItems: BucketItem[];
  finalLetter: FinalLetter;
  futurePlans: FuturePlan[];
}

export default function WorldShell(props: WorldShellProps) {
  const [introDone, setIntroDone] = useState<boolean | null>(null);

  // Decide whether to show the intro: sessionStorage flag means "already
  // entered during this browser session". This is a convenience only —
  // authentication is exclusively the HTTP-only cookie.
  useEffect(() => {
    try {
      setIntroDone(sessionStorage.getItem(INTRO_SEEN_KEY) === "1");
    } catch {
      setIntroDone(false);
    }
  }, []);

  // Lock scrolling while the intro is on screen.
  useEffect(() => {
    if (introDone === false) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [introDone]);

  return (
    <>
      <AmbientBackground />

      <AnimatePresence>
        {introDone === false && (
          <Intro
            key="intro"
            herName={props.profile.herName}
            skipImmediately={false}
            onEnter={() => {
              document.body.style.overflow = "";
              setIntroDone(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Render the world immediately underneath so the intro can fade
          away over it — but hidden from assistive tech until entered. */}
      <div aria-hidden={introDone === false} className={introDone === false ? "invisible" : ""}>
        <Navigation />
        <main>
          <Hero profile={props.profile} />
          <Timeline entries={props.timeline} />
          <Gallery photos={props.gallery} />
          <Letters letters={props.letters} />
          <Reasons reasons={props.reasons} />
          <Songs songs={props.songs} />
          <BucketList items={props.bucketItems} />
          <FuturePlansSection plans={props.futurePlans} />
          <FinalLetterSection letter={props.finalLetter} />
        </main>
        <Footer herName={props.profile.herName} />
        <BackToTop />
      </div>
    </>
  );
}
