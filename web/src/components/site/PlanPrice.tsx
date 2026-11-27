import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { getPack, PACKS_TAG } from "@/lib/access";
import { PLAN_PACK } from "@/lib/pricing";

/** The Complete Germany Plan price as set in Admin → Packs (falls back to the text in content/site/plans.ts). */
export function PlanPrice({ fallback }: { fallback: string }) {
  return (
    <Suspense fallback={fallback}>
      <LivePrice fallback={fallback} />
    </Suspense>
  );
}

async function LivePrice({ fallback }: { fallback: string }) {
  "use cache";
  cacheTag(PACKS_TAG);
  cacheLife("hours");
  const p = await getPack(PLAN_PACK).catch(() => null);
  return p?.priceInr != null ? `₹${p.priceInr.toLocaleString("en-IN")}` : fallback;
}
