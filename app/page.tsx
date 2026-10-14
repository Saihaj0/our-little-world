import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth/session";
import WorldShell from "@/components/world/WorldShell";
import {
  siteProfile,
  timeline,
  gallery,
  openWhenLetters,
  reasons,
  songs,
  bucketItems,
  finalLetter,
  futurePlans,
} from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * The protected homepage.
 *
 * Defense in depth: even though middleware already gates this route, the
 * page re-verifies the session here. If someone deploys with middleware
 * disabled or misconfigured, private content still never renders.
 */
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    redirect("/welcome");
  }

  return (
    <WorldShell
      profile={siteProfile}
      timeline={timeline}
      gallery={gallery}
      letters={openWhenLetters}
      reasons={reasons}
      songs={songs}
      bucketItems={bucketItems}
      finalLetter={finalLetter}
      futurePlans={futurePlans}
    />
  );
}
