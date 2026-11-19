"use client";

import { useActionState, useState } from "react";
import { grantAccessAction, type GrantState } from "@/app/admin/actions";

type P = { slug: string; name: string; priceInr: number | null; validityDays: number };

const f = "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export function GrantForm({
  studentId,
  packs,
  defaultPack,
  requestId,
  quote,
}: {
  studentId: number;
  packs: P[];
  defaultPack?: string;
  requestId?: number;
  /** price and promo code from the student's request */
  quote?: { packSlug: string; priceInr: number | null; promoCode: string | null };
}) {
  const [state, action, pending] = useActionState<GrantState, FormData>(grantAccessAction, {});
  const [slug, setSlug] = useState(defaultPack && packs.some((p) => p.slug === defaultPack) ? defaultPack : packs[0]?.slug);
  const pack = packs.find((p) => p.slug === slug);
  const q = quote && quote.packSlug === slug ? quote : null;
  const amount = q?.priceInr ?? pack?.priceInr ?? "";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="grid gap-4 rounded-xl border-2 border-brand bg-white p-5 sm:grid-cols-2" id="grant">
      <h2 className="text-lg font-bold sm:col-span-2">Grant access</h2>
      <input type="hidden" name="studentId" value={studentId} />
      {requestId ? <input type="hidden" name="requestId" value={requestId} /> : null}
      <label className="text-sm font-medium">
        Pack
        <select name="packSlug" value={slug} onChange={(e) => setSlug(e.target.value)} className={f}>
          {packs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
              {p.priceInr != null ? ` (₹${p.priceInr})` : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium">
        Access for (days)
        <input key={slug} name="validityDays" type="number" min={1} defaultValue={pack?.validityDays ?? 180} className={f} />
      </label>
      <label className="text-sm font-medium">
        Amount received (₹)
        <input key={`a${slug}`} name="amount" inputMode="numeric" defaultValue={amount} className={f} />
        <span className="mt-1 block text-xs font-normal text-zinc-500">Enter 0 for free access (e.g. live-class students).</span>
      </label>
      <label className="text-sm font-medium">
        Payment date
        <input name="paymentDate" type="date" defaultValue={today} className={f} />
      </label>
      <label className="text-sm font-medium">
        Promo code
        <input key={`c${slug}`} name="promoCode" defaultValue={q?.promoCode ?? ""} placeholder="none" className={`${f} uppercase`} />
        <span className="mt-1 block text-xs font-normal text-zinc-500">Counts this sale for the influencer.</span>
      </label>
      <label className="text-sm font-medium">
        UPI / bank reference
        <input name="paymentRef" placeholder="e.g. UPI ref 4321…" className={f} />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Note (only for admins)
        <input name="note" className={f} />
      </label>
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input type="checkbox" name="notify" defaultChecked className="h-4 w-4 accent-[var(--brand)]" />
        Email the student that the pack is active
      </label>
      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2" role="alert">
          {state.error}
        </p>
      )}
      <button
        disabled={pending || !packs.length}
        className="rounded-md bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {pending ? "Granting…" : "Grant access"}
      </button>
    </form>
  );
}
