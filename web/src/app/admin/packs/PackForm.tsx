"use client";

import { useActionState } from "react";
import { savePackAction, type PackFormState } from "@/app/admin/actions";

type Initial = {
  slug: string;
  name: string;
  description: string;
  priceInr: number | null;
  validityDays: number;
  kinds: string[];
  published: boolean;
  sort: number;
};

const KINDS: [string, string][] = [
  ["full", "Full dMAT Mocks 2–10"],
  ["figure-sequences", "Figure Sequences 2–10"],
  ["equations", "Mathematical Equations 2–10"],
  ["latin-squares", "Latin Squares 2–10"],
  ["subject", "General Academic Module 2–10"],
];

const f = "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export function PackForm({ initial }: { initial?: Initial }) {
  const [state, action, pending] = useActionState<PackFormState, FormData>(savePackAction, {});
  const isNew = !initial;
  return (
    <form action={action} className={`space-y-3 rounded-xl border bg-white p-5 ${isNew ? "border-dashed border-zinc-300" : "border-zinc-200"}`}>
      <h2 className="font-bold">{isNew ? "+ New pack" : initial.name}</h2>
      <input type="hidden" name="originalSlug" value={initial?.slug ?? ""} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name
          <input name="name" defaultValue={initial?.name} required className={f} />
        </label>
        <label className="text-sm font-medium">
          Short name (slug)
          <input name="slug" defaultValue={initial?.slug} required readOnly={!isNew} className={`${f} ${isNew ? "" : "bg-zinc-50 text-zinc-500"}`} placeholder="core-pack" />
        </label>
        <label className="text-sm font-medium">
          Price (₹)
          <input name="priceInr" inputMode="numeric" defaultValue={initial?.priceInr ?? ""} className={f} placeholder="empty = on request" />
        </label>
        <label className="text-sm font-medium">
          Access (days)
          <input name="validityDays" type="number" min={1} defaultValue={initial?.validityDays ?? 180} className={f} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Description (shown to students)
        <textarea name="description" defaultValue={initial?.description} className={`${f} min-h-16`} />
      </label>
      <fieldset className="text-sm">
        <legend className="font-medium">Unlocks</legend>
        <div className="mt-1 grid gap-1 sm:grid-cols-2">
          {KINDS.map(([k, label]) => (
            <label key={k} className="flex items-center gap-2">
              <input type="checkbox" name="kinds" value={k} defaultChecked={initial?.kinds.includes(k)} className="h-4 w-4 accent-[var(--brand)]" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} className="h-4 w-4 accent-[var(--brand)]" />
          Show on website
        </label>
        <label className="flex items-center gap-2">
          Order
          <input name="sort" type="number" defaultValue={initial?.sort ?? 100} className="w-20 rounded-md border border-zinc-300 px-2 py-1" />
        </label>
      </div>
      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
        {pending ? "Saving…" : isNew ? "Create pack" : "Save"}
      </button>
    </form>
  );
}
