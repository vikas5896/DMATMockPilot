import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { attempts, leads, students } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { listAllBatches } from "@/lib/batch-store";
import { INTERESTS, type Interest } from "@/lib/leads";

export const metadata = { title: "Dashboard" };

export default function AdminHome() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const email = await requireAdmin();
  const db = await getDb();
  const [[{ total }], [{ fresh }], byInterest, latest, batches] = await Promise.all([
    db.select({ total: count() }).from(leads),
    db.select({ fresh: count() }).from(leads).where(eq(leads.status, "new")),
    db.select({ interest: leads.interest, n: count() }).from(leads).groupBy(leads.interest),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
    listAllBatches(),
  ]);
  const [[{ studentCount }], [{ testsDone }]] = await Promise.all([
    db.select({ studentCount: count() }).from(students),
    db.select({ testsDone: count() }).from(attempts).where(eq(attempts.status, "completed")),
  ]);
  const regs = await db.select({ batch: leads.batch, n: count() }).from(leads).where(eq(leads.interest, "live-classes")).groupBy(leads.batch);
  const regsFor = (slug: string) => regs.find((r) => r.batch === slug)?.n ?? 0;

  const cards = [
    { label: "New enquiries", value: fresh, href: "/admin/enquiries?status=new", strong: true },
    { label: "All enquiries", value: total, href: "/admin/enquiries" },
    { label: "Students signed up", value: studentCount, href: "/admin/students", strong: true },
    { label: "Tests completed", value: testsDone, href: "/admin/students", strong: false },
    ...(Object.keys(INTERESTS) as Interest[]).map((k) => ({
      label: INTERESTS[k],
      value: byInterest.find((b) => b.interest === k)?.n ?? 0,
      href: `/admin/enquiries?interest=${k}`,
      strong: false,
    })),
  ];

  return (
    <AdminShell email={email} active="/admin" title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`rounded-xl border p-4 transition hover:border-brand ${c.strong ? "border-brand bg-brand-soft" : "border-zinc-200 bg-white"}`}
          >
            <p className="text-sm text-zinc-600">{c.label}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Latest enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-brand">
              View all →
            </Link>
          </div>
          {latest.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">No enquiries yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-zinc-100">
              {latest.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span>
                    <span className="font-medium">{l.name}</span>{" "}
                    <span className="text-zinc-500">· {INTERESTS[l.interest as Interest] ?? l.interest}</span>
                  </span>
                  <span className="text-xs text-zinc-500">{l.createdAt.toLocaleDateString("en-IN")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Live batches · registrations</h2>
            <Link href="/admin/batches" className="text-sm text-brand">
              Manage →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-zinc-100">
            {batches.map((b) => (
              <li key={b.slug} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <Link href={`/admin/enquiries?batch=${b.slug}`} className="hover:text-brand">
                  {b.title} {!b.published && <span className="text-xs text-zinc-400">(hidden)</span>}
                </Link>
                <span className="font-semibold tabular-nums">{regsFor(b.slug)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
