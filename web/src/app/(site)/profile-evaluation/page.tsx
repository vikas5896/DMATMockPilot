import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { EvaluationForm } from "@/components/site/EvaluationForm";
import { PlanCheckout } from "@/components/site/PlanCheckout";
import { ButtonLink, PageHero, Section } from "@/components/site/ui";
import { activeGrants } from "@/lib/access";
import { currentStudent } from "@/lib/auth";
import { EVALUATION_HOURS } from "@/lib/evaluation";
import { latestEvaluation, type EvaluationSummary } from "@/lib/evaluation-store";
import { PLAN_PACK } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Profile Evaluation – Study in Germany",
  description:
    "Get a free profile evaluation for your Master's in Germany. Share your degree details and transcript; we review your profile within 48 hours and call you if the Complete Germany Plan is a good fit.",
  path: "/profile-evaluation",
});

const STEPS = [
  ["Submit your profile", "Your degree details and one document: your transcript or all-semester results."],
  ["We evaluate it", `Our team reviews your profile within ${EVALUATION_HOURS} hours, at no cost.`],
  ["We call you", "If your profile is a good fit, we call you to discuss your plan and next steps."],
  ["Confirm your seat", "After the call, you can join the Complete Germany Plan right here."],
];

export default function ProfileEvaluationPage() {
  return (
    <>
      <PageHero
        eyebrow="Study in Germany"
        title="Free profile evaluation"
        intro="Tell us about your studies and share your transcript. We take a limited number of students each intake, so we only invite you to the Complete Germany Plan when we are confident we can help you."
      />
      <Section>
        <ol className="mb-10 grid gap-4 md:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-xl border border-zinc-200 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
              <h2 className="mt-2 font-semibold">{t}</h2>
              <p className="mt-1 text-sm text-zinc-600">{d}</p>
            </li>
          ))}
        </ol>
        <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
          <Evaluation />
        </Suspense>
      </Section>
    </>
  );
}

const fmt = (d: Date) =>
  d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

async function Evaluation() {
  await connection(); // depends on the visitor
  const me = await currentStudent();
  if (!me?.name || !me.phone) {
    return (
      <div className="max-w-xl space-y-4">
        <p className="text-zinc-700">
          Log in or sign up with your email first (we send you a 6-digit code). This way you can check your evaluation status here
          any time.
        </p>
        <ButtonLink href={`/login?next=${encodeURIComponent("/profile-evaluation")}`}>Log in to start</ButtonLink>
      </div>
    );
  }
  const [e, grants] = await Promise.all([latestEvaluation(me.id), activeGrants(me.id)]);
  if (grants.some((g) => g.packSlug === PLAN_PACK)) return <PlanCheckout from="/profile-evaluation" />;
  if (!e) {
    return (
      <div className="max-w-3xl">
        <EvaluationForm />
      </div>
    );
  }
  return <Status e={e} phone={me.phone} />;
}

function Status({ e, phone }: { e: EvaluationSummary; phone: string }) {
  const note = e.noteToStudent && <p className="mt-3 whitespace-pre-line rounded-md bg-white/70 p-3 text-sm">{e.noteToStudent}</p>;
  if (e.status === "submitted") {
    return (
      <div className="max-w-2xl rounded-xl border-2 border-amber-300 bg-amber-50 p-6 text-amber-950" role="status">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">⏳ Under evaluation</p>
        <p className="mt-2 text-lg font-bold">Your profile is under evaluation.</p>
        <p className="mt-1">
          It takes up to {EVALUATION_HOURS} hours. If your profile fits, our team will call you on <strong>{phone}</strong>.
        </p>
        <p className="mt-3 text-sm text-amber-800">
          Submitted {fmt(e.createdAt)}: {e.details.degree}, {e.details.university} · document “{e.docName}”
        </p>
      </div>
    );
  }
  if (e.status === "fit") {
    return (
      <div className="max-w-2xl rounded-xl border-2 border-emerald-300 bg-emerald-50 p-6 text-emerald-950" role="status">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">✓ Profile evaluated</p>
        <p className="mt-2 text-lg font-bold">Good news: your profile is a fit for the Complete Germany Plan.</p>
        <p className="mt-1">
          Our team will call you on <strong>{phone}</strong> to discuss your plan. After the call, you can confirm your seat on this
          page.
        </p>
        {note}
      </div>
    );
  }
  if (e.status === "call_done") {
    return (
      <div className="space-y-6">
        <p className="max-w-2xl rounded-xl border-2 border-violet-300 bg-violet-50 p-4 text-violet-950" role="status">
          🎉 <strong>Profile evaluated and call done.</strong> Your seat in the Complete Germany Plan is reserved: confirm it below.
        </p>
        {e.noteToStudent && <p className="max-w-2xl whitespace-pre-line text-sm text-zinc-700">{e.noteToStudent}</p>}
        <PlanCheckout from="/profile-evaluation" />
      </div>
    );
  }
  return (
    <div className="max-w-2xl rounded-xl border border-zinc-300 bg-zinc-50 p-6 text-zinc-800" role="status">
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Profile evaluated</p>
      <p className="mt-2 text-lg font-bold">Thank you for your patience.</p>
      <p className="mt-1">
        We don’t think the Complete Germany Plan is the right fit for you at this time. You can still prepare for the dMAT with our
        mock tests and live classes.
      </p>
      {note}
      <p className="mt-4">
        <Link href="/plans" className="font-semibold text-brand underline">
          See mock tests and live classes →
        </Link>
      </p>
    </div>
  );
}
