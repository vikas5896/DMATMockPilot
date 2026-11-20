import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revokeGrantAction } from "@/app/admin/actions";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { accessRequests, attempts, classEnrollments, grants, students } from "@/db/schema";
import { listAllBatches } from "@/lib/batch-store";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { parseTestId } from "@/lib/exam/catalog";
import { WA, waLink } from "@/lib/wa-templates";
import { GrantForm } from "./GrantForm";

export const metadata = { title: "Student" };
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ [k: string]: string | string[] | undefined }> };

export default function StudentPage(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <StudentDetail {...props} />
    </Suspense>
  );
}

const fmt = (d: Date | null) => (d ? d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }) : "—");

async function StudentDetail({ params, searchParams }: Props) {
  const email = await requireAdmin();
  const id = Number((await params).id);
  const sp = await searchParams;
  if (!Number.isInteger(id)) notFound();
  const db = await getDb();
  const [[s], tests, reqs, gs, packList, enrols, classes] = await Promise.all([
    db.select().from(students).where(eq(students.id, id)),
    db.select().from(attempts).where(eq(attempts.studentId, id)).orderBy(desc(attempts.startedAt)),
    db.select().from(accessRequests).where(eq(accessRequests.studentId, id)).orderBy(desc(accessRequests.createdAt)),
    db.select().from(grants).where(eq(grants.studentId, id)).orderBy(desc(grants.grantedAt)),
    listPacks(),
    db.select().from(classEnrollments).where(eq(classEnrollments.studentId, id)),
    listAllBatches(),
  ]);
  if (!s) notFound();
  const packName = (slug: string) => packList.find((p) => p.slug === slug)?.name ?? slug;
  const now = new Date();
  const lastDone = tests.find((t) => t.status === "completed");
  // granting from a request: use its price and promo code (else the newest open request)
  const reqId = typeof sp.request === "string" ? Number(sp.request) : 0;
  const fromRequest =
    reqs.find((r) => r.id === reqId) ?? reqs.find((r) => ["new", "contacted", "paid"].includes(r.status));

  return (
    <AdminShell email={email} active="/admin/students" title={s.name ?? s.email}>
      {sp.granted && (
        <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Access granted. The tests are unlocked for this student now.
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <section className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
            <p className="text-lg font-bold">{s.name ?? "(profile not finished)"}</p>
            <p>
              <a href={`mailto:${s.email}`} className="text-brand hover:underline">
                {s.email}
              </a>
            </p>
            {s.phone && <p>{s.phone}</p>}
            <p className="mt-2 text-xs text-zinc-500">
              Joined {fmt(s.createdAt)} · last login {fmt(s.lastLoginAt)}
            </p>
          </div>
          {s.phone && (
            <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5 text-sm">
              <p className="font-semibold">Contact on WhatsApp</p>
              <a href={waLink(s.phone, WA.welcome(s.name))} target="_blank" rel="noreferrer" className="block text-emerald-700 hover:underline">
                Welcome message →
              </a>
              {lastDone && (
                <a
                  href={waLink(s.phone, WA.result(s.name, parseTestId(lastDone.testId)?.title ?? lastDone.testId, `${lastDone.score}/${lastDone.maxScore}`))}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-emerald-700 hover:underline"
                >
                  About their latest result →
                </a>
              )}
              <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="block text-zinc-700 hover:underline">
                Call {s.phone}
              </a>
            </div>
          )}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
            <p className="font-semibold">Tests</p>
            {tests.length === 0 ? (
              <p className="mt-1 text-zinc-500">None yet.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {tests.map((t) => (
                  <li key={t.id} className="flex justify-between gap-2">
                    <span>{parseTestId(t.testId)?.title ?? t.testId}</span>
                    <span className="font-semibold">{t.status === "completed" ? `${t.score}/${t.maxScore}` : "in progress"}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
            <p className="font-semibold">Packs</p>
            {gs.length === 0 ? (
              <p className="mt-1 text-zinc-500">No packs yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-zinc-100">
                {gs.map((g) => {
                  const active = !g.revokedAt && g.expiresAt > now;
                  return (
                    <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                      <span>
                        <strong>{packName(g.packSlug)}</strong> · {g.amountInr != null ? `₹${g.amountInr}` : "no amount"}
                        {g.promoCode ? ` · code ${g.promoCode}` : ""}
                        {g.paymentRef ? ` · ref ${g.paymentRef}` : ""} · granted {fmt(g.grantedAt)} by {g.grantedBy}
                        <br />
                        <span className={active ? "text-emerald-700" : "text-zinc-400"}>
                          {g.revokedAt ? `revoked ${fmt(g.revokedAt)}` : active ? `active until ${fmt(g.expiresAt)}` : `expired ${fmt(g.expiresAt)}`}
                        </span>
                        {g.note && <span className="block text-xs text-zinc-500">{g.note}</span>}
                      </span>
                      {active && (
                        <form action={revokeGrantAction}>
                          <input type="hidden" name="id" value={g.id} />
                          <input type="hidden" name="studentId" value={s.id} />
                          <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50">Revoke</button>
                        </form>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {enrols.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
              <p className="font-semibold">Live classes</p>
              <ul className="mt-2 space-y-1">
                {enrols.map((e) => (
                  <li key={e.id}>
                    <strong>{classes.find((b) => b.slug === e.classSlug)?.title ?? e.classSlug}</strong>
                    {e.amountInr != null ? ` · ₹${e.amountInr}` : ""}
                    {e.promoCode ? ` · code ${e.promoCode}` : ""} · enrolled {fmt(e.createdAt)}
                    {e.paymentRef ? <span className="block text-xs text-zinc-500">{e.paymentRef}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reqs.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
              <p className="font-semibold">Requests</p>
              <ul className="mt-2 space-y-1">
                {reqs.map((r) => (
                  <li key={r.id}>
                    {fmt(r.createdAt)} · {packName(r.packSlug)}
                    {r.quotedPriceInr != null ? ` · ₹${r.quotedPriceInr}` : ""}
                    {r.promoCode ? ` · code ${r.promoCode}` : ""} · <strong>{r.status}</strong>
                    {r.message && <span className="block text-xs text-zinc-600">“{r.message}”</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <GrantForm
            studentId={s.id}
            packs={packList.map((p) => ({ slug: p.slug, name: p.name, priceInr: p.priceInr, validityDays: p.validityDays }))}
            defaultPack={typeof sp.pack === "string" ? sp.pack : fromRequest?.packSlug}
            requestId={fromRequest?.id}
            quote={
              fromRequest
                ? { packSlug: fromRequest.packSlug, priceInr: fromRequest.quotedPriceInr, promoCode: fromRequest.promoCode }
                : undefined
            }
          />
          <p className="text-xs text-zinc-500">
            <Link href="/admin/students" className="hover:text-brand">
              ← All students
            </Link>
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
