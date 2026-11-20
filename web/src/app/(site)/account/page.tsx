import { Suspense } from "react";
import { TestCatalog } from "@/components/site/TestCatalog";
import { requireStudent } from "@/lib/auth";
import { catalogStatuses, listAttempts } from "@/lib/attempt-store";
import { activeGrants, listPacks, openRequests, unlockedKinds } from "@/lib/access";
import Link from "next/link";
import { studentLogoutAction } from "../login/actions";

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
  const [rows, statuses, grantsActive, open, packList, kinds] = await Promise.all([
    listAttempts(me.id),
    catalogStatuses(me.id),
    activeGrants(me.id),
    openRequests(me.id),
    listPacks(),
    unlockedKinds(me.id),
  ]);
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
              {open.map((r) => (
                <p key={`r${r.id}`} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  ⏳ <strong>{packName(r.packSlug)}</strong> requested: we will contact you with the payment details.
                </p>
              ))}
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
