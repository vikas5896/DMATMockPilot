import Link from "next/link";
import { CATALOG, type CatalogTest } from "@/lib/exam/catalog";

export type TestStatus = { status: "in_progress" | "completed"; score: number | null; maxScore: number | null };

function TestTile({
  t,
  st,
  signedIn,
  unlocked,
}: {
  t: CatalogTest;
  st?: TestStatus;
  signedIn: boolean;
  unlocked?: boolean;
}) {
  const href = `/test/${t.id}`;
  if (!t.available && !st) {
    return (
      <span
        className="flex items-center justify-between rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-400"
        title="New texts for this test are being written"
      >
        <span>{t.short}</span>
        <span className="text-[11px] uppercase tracking-wide">Coming soon</span>
      </span>
    );
  }
  if (!t.free && !unlocked) {
    return (
      <Link
        href={href}
        className="flex items-center justify-between rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-500 hover:border-brand"
        title="Part of the paid pack"
      >
        <span>{t.short}</span>
        <span aria-label="locked">🔒</span>
      </Link>
    );
  }
  const label = !st
    ? signedIn
      ? "Start"
      : "Sign up free"
    : st.status === "in_progress"
      ? "Continue"
      : "View results";
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition ${
        st?.status === "completed"
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-emerald-500"
          : "border-brand bg-brand-soft text-brand hover:bg-brand hover:text-white"
      }`}
    >
      <span>
        {t.short}{" "}
        {t.free && <span className="ml-1 rounded bg-white/70 px-1.5 py-0.5 text-[10px] uppercase text-emerald-700">free</span>}
      </span>
      <span>
        {st?.status === "completed" && st.score != null ? `${st.score}/${st.maxScore} · ` : ""}
        {label} →
      </span>
    </Link>
  );
}

/** The test catalogue: free tests open (once each), the rest locked until paid packs launch. */
export function TestCatalog({
  statuses,
  signedIn,
  unlocked,
}: {
  statuses?: Record<string, TestStatus>;
  signedIn: boolean;
  /** test types unlocked by the student's packs */
  unlocked?: string[];
}) {
  return (
    <div className="space-y-6">
      {CATALOG.map((group) => (
        <section key={group.kind} className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold">{group.title}</h3>
            <p className="text-xs text-zinc-500">
              {group.tests[0].minutes} min · Test 1 free ·{" "}
              {unlocked?.includes(group.kind) ? "Tests 2–10 unlocked ✓" : `Tests 2–${group.tests.length} with a pack`}
            </p>
          </div>
          <p className="mt-1 text-sm text-zinc-600">{group.blurb}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-2">
              <TestTile t={group.tests[0]} st={statuses?.[group.tests[0].id]} signedIn={signedIn} />
            </div>
            {group.tests.slice(1).map((t) => (
              <TestTile key={t.id} t={t} st={statuses?.[t.id]} signedIn={signedIn} unlocked={unlocked?.includes(t.kind)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
