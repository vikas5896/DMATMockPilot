import Link from "next/link";
import { PackCard } from "@/components/site/PackCard";
import { ButtonLink } from "@/components/site/ui";
import { activeGrants, getPack, planApproval } from "@/lib/access";
import { currentStudent } from "@/lib/auth";
import { paymentsEnabled } from "@/lib/payments";
import { PLAN_PACK } from "@/lib/pricing";
import { autoOffers } from "@/lib/promo";

/**
 * Complete Germany Plan checkout: log in → (not approved: book the free evaluation) → pay. Already enrolled: a note.
 * Call inside a Suspense boundary after connection(): it depends on the visitor.
 */
export async function PlanCheckout({ from = "/plans/complete-germany-plan" }: { from?: string }) {
  const [me, plan] = await Promise.all([currentStudent(), getPack(PLAN_PACK)]);
  const signedIn = !!(me?.name && me.phone);
  const next = encodeURIComponent(from);

  if (!plan || !plan.published) {
    return <p className="text-zinc-600">The Complete Germany Plan is not open for payment right now. Please contact us.</p>;
  }
  if (!signedIn) {
    return (
      <div className="max-w-xl space-y-4">
        <p className="text-zinc-700">Log in with the email address you used for your profile evaluation to see your plan.</p>
        <ButtonLink href={`/login?next=${next}`}>Log in</ButtonLink>
      </div>
    );
  }
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });
  const [grants, approval, offers] = await Promise.all([
    activeGrants(me!.id),
    planApproval(me!.id),
    autoOffers([{ kind: "pack", slug: PLAN_PACK }]),
  ]);
  const owned = grants.find((g) => g.packSlug === PLAN_PACK);
  if (owned) {
    return (
      <div className="max-w-xl rounded-xl border-2 border-emerald-300 bg-emerald-50 p-6 text-emerald-900">
        <p className="text-lg font-bold">✓ You are enrolled in the Complete Germany Plan.</p>
        <p className="mt-1 text-sm">
          Your mock tests are unlocked in{" "}
          <Link href="/account" className="underline">
            My tests
          </Link>{" "}
          until {fmt(owned.expiresAt)}. We will contact you on WhatsApp for your next steps.
        </p>
      </div>
    );
  }
  if (!approval) {
    return (
      <div className="max-w-xl space-y-4">
        <p className="text-zinc-700">
          This plan opens after a free profile evaluation, and we take a limited number of students each intake. Submit your
          profile first: once we have evaluated it and spoken with you, you can confirm your seat here.
        </p>
        <ButtonLink href="/profile-evaluation">Your free profile evaluation</ButtonLink>
      </div>
    );
  }
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-3 text-[15px] text-zinc-700">
        <p className="text-lg font-semibold text-zinc-900">Welcome, {me!.name?.split(" ")[0]}! Your seat is reserved.</p>
        <p>The Complete Germany Plan includes:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>dMAT preparation: live classes and all mock tests</li>
          <li>APS guidance and profile building</li>
          <li>University shortlisting and application support (SOP, CV, recommendations)</li>
          <li>Blocked account, insurance and visa guidance</li>
          <li>Pre-departure support</li>
        </ul>
        <p className="text-sm text-zinc-500">
          No one can guarantee an admission or a visa; we guide you through every step. See our{" "}
          <Link href="/terms" className="underline">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/refund-policy" className="underline">
            refund policy
          </Link>
          .
        </p>
      </div>
      <PackCard
        pack={plan}
        signedIn
        requested
        from={from}
        highlight
        payOnline={paymentsEnabled()}
        autoOffer={offers[PLAN_PACK]}
      />
    </div>
  );
}
