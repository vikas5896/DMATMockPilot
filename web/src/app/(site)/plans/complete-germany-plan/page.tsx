import { connection } from "next/server";
import { Suspense } from "react";
import { PlanCheckout } from "@/components/site/PlanCheckout";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Complete Germany Plan – Confirm your seat",
    description: "Confirm your seat in the DMAT Mock Prep Complete Germany Plan after your free profile evaluation.",
    path: "/plans/complete-germany-plan",
  }),
  robots: { index: false, follow: true },
};

export default function CompletePlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Complete Germany Plan"
        title="Confirm your seat"
        intro="The Complete Germany Plan opens after a free profile evaluation. If we invited you, log in with the same email and complete your payment below."
      />
      <Section>
        <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
          <Checkout />
        </Suspense>
      </Section>
    </>
  );
}

async function Checkout() {
  await connection(); // per request: login, approval and expiry depend on the visitor and the time
  return <PlanCheckout />;
}
