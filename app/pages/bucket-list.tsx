"use client";

import BucketList from "@/components/sections/BucketList";
import { bucketItems } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * Bucket list page — the "On the Horizon / someday list" section as its own
 * screen. The middleware already enforces authentication; this page re-verifies
 * nothing new, it just renders the real BucketList component with the real items.
 */
export default function BucketListPage() {
  return <BucketList items={bucketItems} />;
}
