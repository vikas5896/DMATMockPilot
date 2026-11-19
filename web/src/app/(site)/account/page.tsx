import { Suspense } from "react";
import { TestCatalog, type TestStatus } from "@/components/site/TestCatalog";
import { requireStudent } from "@/lib/auth";
import { listAttempts } from "@/lib/attempt-store";
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
  const rows = await listAttempts(me.id);
  const statuses: Record<string, TestStatus> = Object.fromEntries(
    rows.map((r) => [r.testId, { status: r.status as TestStatus["status"], score: r.score, maxScore: r.maxScore }]),
  );
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
            Every free test can be taken <strong>once</strong>. Your answers are saved as you go, so you can continue
            on another device; afterwards you can review your results any time. 🔒 tests are part of the paid packs,
            launching soon.
          </p>
          <TestCatalog statuses={statuses} signedIn />
        </div>
      </section>
    </>
  );
}
