"use client";

import Link from "next/link";
import { useActionState } from "react";
import { deleteBatchAction, saveBatchAction, type BatchFormState } from "@/app/admin/actions";
import type { BatchFields } from "@/lib/batch-form";

const f =
  "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "block text-sm font-medium";
const hint = "mt-1 block text-xs font-normal text-zinc-500";

export function BatchForm({ initial, originalSlug }: { initial: BatchFields; originalSlug?: string }) {
  const [state, action, pending] = useActionState<BatchFormState, FormData>(saveBatchAction, {});
  const v = state.fields ?? initial;

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <form action={action} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6">
        <input type="hidden" name="originalSlug" value={originalSlug ?? ""} />
        {state.errors && (
          <ul className="list-disc rounded-md bg-red-50 px-8 py-3 text-sm text-red-700" role="alert">
            {state.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <label className={`${label} sm:col-span-2`}>
            Title
            <input name="title" defaultValue={v.title} className={f} required />
          </label>
          <label className={label}>
            Web address (slug)
            <input name="slug" defaultValue={v.slug} className={f} required placeholder="core-batch-may" />
            <span className={hint}>The page will be /live-classes/your-slug</span>
          </label>
          <label className={label}>
            For which exam sitting
            <input name="forSitting" defaultValue={v.forSitting} className={f} placeholder="March 2027 sitting" />
          </label>
          <label className={`${label} sm:col-span-2`}>
            Summary
            <textarea name="summary" defaultValue={v.summary} className={`${f} min-h-20`} required />
          </label>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-3">
          <label className={label}>
            Type
            <select name="kind" defaultValue={v.kind} className={f}>
              <option value="course">Course</option>
              <option value="masterclass">Masterclass</option>
              <option value="webinar">Webinar</option>
            </select>
          </label>
          <label className={label}>
            Status
            <select name="status" defaultValue={v.status} className={f}>
              <option value="open">Registrations open</option>
              <option value="soon">Opening soon</option>
              <option value="full">Full</option>
            </select>
          </label>
          <label className={label}>
            Fee
            <input name="fee" defaultValue={v.fee} className={f} placeholder="₹4,999 or Free" />
            <span className={hint}>Empty = &ldquo;Announced soon&rdquo;</span>
          </label>
          <label className={label}>
            Online price (₹)
            <input name="priceInr" inputMode="numeric" defaultValue={v.priceInr} className={f} placeholder="e.g. 4999" />
            <span className={hint}>
              Set a price to let students pay online (Razorpay) and use promo codes. Empty = registration form only (e.g. free webinars).
            </span>
          </label>
          <label className={label}>
            Start date
            <input name="start" type="date" defaultValue={v.start} className={f} required />
          </label>
          <label className={label}>
            End date
            <input name="end" type="date" defaultValue={v.end} className={f} required />
          </label>
          <label className={label}>
            Instructor
            <input name="instructor" defaultValue={v.instructor} className={f} />
            <span className={hint}>Empty = &ldquo;To be announced&rdquo;</span>
          </label>
          <label className={label}>
            Days
            <input name="days" defaultValue={v.days} className={f} required placeholder="Mon, Wed, Fri" />
          </label>
          <label className={label}>
            Time (IST)
            <input name="time" defaultValue={v.time} className={f} required placeholder="7:00–8:30 pm IST" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={label}>
              Sessions
              <input name="sessions" type="number" min={1} defaultValue={v.sessions} className={f} required />
            </label>
            <label className={label}>
              Length
              <input name="sessionLength" defaultValue={v.sessionLength} className={f} />
            </label>
          </div>
        </fieldset>

        <label className={label}>
          What&apos;s included
          <textarea name="includes" defaultValue={v.includes} className={`${f} min-h-24 font-mono`} />
          <span className={hint}>One item per line.</span>
        </label>
        <label className={label}>
          Syllabus
          <textarea name="syllabus" defaultValue={v.syllabus} className={`${f} min-h-48 font-mono`} />
          <span className={hint}>
            One block per topic: a title line, then one point per line starting with &ldquo;- &rdquo;. Leave an empty
            line between blocks.
          </span>
        </label>

        <fieldset className="flex flex-wrap items-end gap-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4 accent-[var(--brand)]" />
            Show on website
          </label>
          <label className={`${label} w-28`}>
            Order
            <input name="sort" type="number" defaultValue={v.sort} className={f} />
          </label>
          <span className="pb-2 text-xs text-zinc-500">Lower numbers appear first.</span>
        </fieldset>

        <div className="flex gap-3 border-t border-zinc-100 pt-5">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save batch"}
          </button>
          <Link href="/admin/batches" className="rounded-md px-4 py-2.5 text-zinc-600 hover:text-brand">
            Cancel
          </Link>
        </div>
      </form>

      {originalSlug && (
        <aside className="space-y-4">
          <a
            href={`/live-classes/${originalSlug}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-zinc-200 bg-white p-4 text-sm text-brand hover:border-brand"
          >
            View the public page ↗
          </a>
          <form
            action={deleteBatchAction}
            onSubmit={(e) => {
              if (!confirm("Delete this batch from the website? Enquiries for it are kept.")) e.preventDefault();
            }}
            className="rounded-xl border border-red-200 bg-white p-4"
          >
            <input type="hidden" name="slug" value={originalSlug} />
            <p className="text-sm text-zinc-600">To hide a batch temporarily, untick &ldquo;Show on website&rdquo; instead.</p>
            <button className="mt-3 rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
              Delete batch
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}
