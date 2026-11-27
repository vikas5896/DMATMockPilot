import { Suspense } from "react";
import { TestCatalog } from "@/components/site/TestCatalog";
import { requireStudent } from "@/lib/auth";
import { catalogStatuses, listAttempts } from "@/lib/attempt-store";
import { activeGrants, listPacks, openRequests, unlockedKinds } from "@/lib/access";
import Link from "next/link";
import { studentLogoutAction } from "../login/actions";
import { studentClasses } from "@/lib/payments";
import { PLAN_PACK } from "@/lib/pricing";
import { latestEvaluation } from "@/lib/evaluation-store";

const EVAL_TEXT: Record<string, string> = {
  submitted: "⏳ Your profile is under evaluation (up to 48 hours).",
  fit: "✓ Profile evaluated: good news, it’s a fit! We will call you.",
  not_fit: "Your profile evaluation result is ready.",
  call_done: "🎉 Profile evaluated and call done: confirm your seat in the Complete Germany Plan.",
};

export const metadata = { title: "My tests", robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16 text-zinc-500">Loading your tests…</div>}>
      <Account />
    </Suspense>
  );
}

async function Account() {
  const me = await requireStudent("/account");
  const [rows, statuses, grantsActive, open, packList, kinds, classes, evaluation] = await Promise.all([
    listAttempts(me.id),
    catalogStatuses(me.id),
    activeGrants(me.id),
    openRequests(me.id),
    listPacks(),
    unlockedKinds(me.id),
    studentClasses(me.id),
    latestEvaluation(me.id),
  ]);
  const hasPlan = grantsActive.some((g) => g.packSlug === PLAN_PACK);
  const packName = (slug: string) => packList.find((p) => p.slug === slug)?.name ?? slug;
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });
  const done = rows.filter((r) => r.status === "completed").length;

  return (
    <>
      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 pb-10 pt-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">My tests</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Hello, {me.name?.split(" ")[0]}!</h1>
            <p className="mt-2 text-white/85">
              {done === 0
                ? "Start with your free full mock, or try one section first."
                : `You have completed ${done} test${done > 1 ? "s" : ""}. Keep going!`}
            </p>
          </div>
          <div className="rounded-lg bg-white/10 px-4 py-3 text-sm">
            <p>{me.email}</p>
            <p className="text-white/75">{me.phone}</p>
            <form action={studentLogoutAction}>
              <button className="mt-2 text-white underline hover:no-underline">Log out</button>
            </form>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {evaluation && !hasPlan && (
            <Link
              href="/profile-evaluation"
              className="mb-6 block rounded-lg border-2 border-violet-300 bg-violet-50 px-4 py-3 text-sm text-violet-900 hover:bg-violet-100"
            >
              <strong>Free profile evaluation:</strong> {EVAL_TEXT[evaluation.status] ?? "See your status"} →
            </Link>
          )}
          {classes.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-bold">Your live classes</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {classes.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/live-classes/${c.slug}`}
                    className="rounded-lg border border-brand/30 bg-white px-4 py-3 text-sm hover:border-brand"
                  >
                    <span className="font-semibold text-brand">✓ Booked: {c.title}</span>
                    {c.when && <span className="mt-1 block text-zinc-600">{c.when}</span>}
                    <span className="mt-1 block text-xs text-zinc-500">We send the joining link on WhatsApp before the session.</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <p className="mb-6 text-sm text-zinc-600">
            Every test can be taken <strong>once</strong>. Your answers are saved as you go, so you can continue on
            another device; afterwards you can review your results any time. 🔒 tests unlock with a{" "}
            <Link href="/packs" className="text-brand underline">
              pack
            </Link>
            .
          </p>
          {(grantsActive.length > 0 || open.length > 0) && (
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {grantsActive.map((g) => (
                <p key={`g${g.id}`} className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  ✓ <strong>{packName(g.packSlug)}</strong> active until {fmt(g.expiresAt)}
                </p>
              ))}
              {open.map((r) =>
                r.packSlug === PLAN_PACK && r.status === "approved" ? (
                  evaluation?.status === "call_done" ? null : (
                  <Link
                    key={`r${r.id}`}
                    href="/plans/complete-germany-plan"
                    className="rounded-lg border-2 border-violet-300 bg-violet-50 px-4 py-3 text-sm text-violet-900 hover:bg-violet-100"
                  >
                    🎉 You’re approved for the <strong>Complete Germany Plan</strong>. Confirm your seat →
                  </Link>
                  )
                ) : (
                  <p key={`r${r.id}`} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    ⏳ <strong>{packName(r.packSlug)}</strong> requested: we will contact you with the payment details.
                  </p>
                ),
              )}
            </div>
          )}
          <TestCatalog statuses={statuses} signedIn unlocked={[...kinds]} />
          {kinds.size < 5 && (
            <p className="mt-8 text-center">
              <Link href="/packs" className="inline-block rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
                Unlock more tests →
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
