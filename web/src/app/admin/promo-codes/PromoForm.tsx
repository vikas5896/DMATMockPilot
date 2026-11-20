"use client";

import { useActionState, useState } from "react";
import { deletePromoAction, savePromoAction, type PromoFormState } from "@/app/admin/actions";

export type PromoInitial = {
  code: string;
  percentOff: number;
  label: string | null;
  packSlugs: string[];
  classSlugs: string[];
  appliesToAll: boolean;
  active: boolean;
  maxUses: number | null;
  expiresOn: string | null;
  autoApply: boolean;
};

const f = "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export function PromoForm({
  initial,
  packs,
  classes,
  siteUrl,
  stats,
}: {
  initial?: PromoInitial;
  packs: { slug: string; name: string; priceInr: number | null }[];
  /** live classes with an online price */
  classes: { slug: string; name: string; priceInr: number }[];
  siteUrl: string;
  stats?: { requests: number; sales: number; revenueInr: number };
}) {
  const [state, action, pending] = useActionState<PromoFormState, FormData>(savePromoAction, {});
  const [copied, setCopied] = useState(false);
  const [scope, setScope] = useState<"all" | "selected">(initial && !initial.appliesToAll ? "selected" : "all");
  const isNew = !initial;
  const link = initial ? `${siteUrl}/packs?code=${initial.code}` : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <form action={action} className={`space-y-3 rounded-xl border bg-white p-5 ${isNew ? "border-dashed border-zinc-300" : "border-zinc-200"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-bold">
          {isNew ? "+ New promo code" : initial.code}
          {initial?.autoApply && initial.active && (
            <span className="ml-2 rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">automatic for everyone</span>
          )}
          {initial && !initial.active && <span className="ml-2 rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">paused</span>}
        </h2>
        {stats && (
          <p className="text-sm text-zinc-600">
            <strong>{stats.requests}</strong> requests · <strong>{stats.sales}</strong> sales ·{" "}
            <strong>₹{stats.revenueInr.toLocaleString("en-IN")}</strong>
          </p>
        )}
      </div>
      {initial && (
        <div className="flex items-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm">
          <span className="min-w-0 flex-1 truncate font-mono text-zinc-700">{link}</span>
          <button type="button" onClick={copy} className="shrink-0 font-semibold text-brand underline">
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      )}
      <input type="hidden" name="originalCode" value={initial?.code ?? ""} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Code
          <input
            name="code"
            defaultValue={initial?.code}
            required
            readOnly={!isNew}
            placeholder="RIYA50"
            className={`${f} uppercase ${isNew ? "" : "bg-zinc-50 text-zinc-500"}`}
          />
        </label>
        <label className="text-sm font-medium">
          Discount (%)
          <input name="percentOff" type="number" min={1} max={100} defaultValue={initial?.percentOff ?? 50} required className={f} />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Influencer / note
          <input name="label" defaultValue={initial?.label ?? ""} placeholder="Riya (Instagram @riya_in_germany)" className={f} />
        </label>
        <label className="text-sm font-medium">
          Max sales
          <input name="maxUses" inputMode="numeric" defaultValue={initial?.maxUses ?? ""} placeholder="empty = unlimited" className={f} />
        </label>
        <label className="text-sm font-medium">
          Valid until (last day)
          <input name="expiresOn" type="date" defaultValue={initial?.expiresOn ?? ""} className={f} />
        </label>
      </div>
      <fieldset className="text-sm">
        <legend className="font-medium">Valid for</legend>
        <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
          <label className="flex items-center gap-2">
            <input type="radio" name="scope" value="all" checked={scope === "all"} onChange={() => setScope("all")} className="h-4 w-4 accent-[var(--brand)]" />
            All packs and live classes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="scope"
              value="selected"
              checked={scope === "selected"}
              onChange={() => setScope("selected")}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            Only the ones I tick
          </label>
        </div>
        <div className={`mt-2 grid gap-3 rounded-md border border-zinc-200 p-3 sm:grid-cols-2 ${scope === "all" ? "opacity-40" : ""}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Test packs</p>
            {packs.map((p) => (
              <label key={p.slug} className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="packSlugs"
                  value={p.slug}
                  disabled={scope === "all"}
                  defaultChecked={initial?.packSlugs.includes(p.slug)}
                  className="h-4 w-4 accent-[var(--brand)]"
                />
                {p.name}
                {p.priceInr != null && <span className="text-zinc-500">(₹{p.priceInr.toLocaleString("en-IN")})</span>}
              </label>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Live classes</p>
            {classes.length === 0 && <p className="mt-1 text-xs text-zinc-500">No class has an online price yet.</p>}
            {classes.map((c) => (
              <label key={c.slug} className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="classSlugs"
                  value={c.slug}
                  disabled={scope === "all"}
                  defaultChecked={initial?.classSlugs.includes(c.slug)}
                  className="h-4 w-4 accent-[var(--brand)]"
                />
                {c.name}
                <span className="text-zinc-500">(₹{c.priceInr.toLocaleString("en-IN")})</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 accent-[var(--brand)]" />
        Active (students can use it)
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="autoApply" defaultChecked={initial?.autoApply ?? false} className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
        <span>
          Apply automatically to everyone
          <span className="block text-xs text-zinc-500">
            Only one code at a time. A code a student enters replaces it if it gives more discount (codes never stack).
          </span>
        </span>
      </label>
      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button disabled={pending} className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
          {pending ? "Saving…" : isNew ? "Create code" : "Save"}
        </button>
        {initial && (
          <button
            type="submit"
            formAction={deletePromoAction}
            formNoValidate
            onClick={(e) => {
              const warn = stats && stats.sales > 0 ? ` It has ${stats.sales} sale(s); they stay in the sales history.` : "";
              if (!window.confirm(`Delete the code ${initial.code}? Students can no longer use it.${warn}`)) e.preventDefault();
            }}
            className="text-sm text-red-700 underline hover:text-red-900"
          >
            Delete code
          </button>
        )}
      </div>
    </form>
  );
}
