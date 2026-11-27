import Link from "next/link";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import { activeGrants, getPack, planApproval } from "@/lib/access";
import { currentStudent } from "@/lib/auth";
import { latestEvaluation } from "@/lib/evaluation-store";
import { PLAN_PACK } from "@/lib/pricing";

type Cta = { href: string; label: string; note?: string };

const START: Cta = {
  href: "/profile-evaluation",
  label: "Start my free profile evaluation",
  note: "Takes 3 minutes: your degree details and your transcript or semester results. We reply within 48 hours.",
};

/**
 * The Complete Germany Plan button, by where the visitor is:
 * new → free evaluation; under evaluation / fit → their status; approved after the call → pay; enrolled → My tests.
 * `block` = full-width (plan cards); `showNote` = the small line under the button.
 */
export function EvaluationCta({ block = false, showNote = true, start = START }: { block?: boolean; showNote?: boolean; start?: Cta }) {
  return (
    <Suspense fallback={<View cta={start} block={block} showNote={showNote} />}>
      <Live block={block} showNote={showNote} start={start} />
    </Suspense>
  );
}

async function Live({ block, showNote, start }: { block: boolean; showNote: boolean; start: Cta }) {
  await connection(); // depends on the visitor
  return <View cta={await ctaFor(start)} block={block} showNote={showNote} />;
}

async function ctaFor(start: Cta): Promise<Cta> {
  const me = await currentStudent().catch(() => null);
  if (!me) return start;
  const [grants, approval, evaluation] = await Promise.all([activeGrants(me.id), planApproval(me.id), latestEvaluation(me.id)]);
  if (grants.some((g) => g.packSlug === PLAN_PACK)) {
    return { href: "/account", label: "✓ You’re enrolled: go to My tests", note: "We guide you on WhatsApp through your next steps." };
  }
  if (approval) {
    const plan = await getPack(PLAN_PACK);
    const price = plan?.priceInr != null ? ` ₹${plan.priceInr.toLocaleString("en-IN")}` : "";
    return {
      href: "/plans/complete-germany-plan",
      label: `Pay${price} and confirm your seat`,
      note: "Your profile is evaluated and approved. UPI, cards or netbanking.",
    };
  }
  if (evaluation?.status === "submitted") {
    return { href: "/profile-evaluation", label: "View your evaluation status", note: "Your profile is under evaluation (up to 48 hours)." };
  }
  if (evaluation?.status === "fit" || evaluation?.status === "call_done") {
    return { href: "/profile-evaluation", label: "View your evaluation status", note: "Good news: your profile is a fit. We will call you." };
  }
  if (evaluation?.status === "not_fit") {
    return { href: "/profile-evaluation", label: "See your evaluation result" };
  }
  return start;
}

function View({ cta, block, showNote }: { cta: Cta; block: boolean; showNote: boolean }): ReactNode {
  return (
    <>
      <Link
        href={cta.href}
        className={`${block ? "block text-center" : "inline-block"} rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark`}
      >
        {cta.label}
      </Link>
      {showNote && cta.note && <p className={`mt-3 text-sm text-zinc-600 ${block ? "text-center" : ""}`}>{cta.note}</p>}
    </>
  );
}
