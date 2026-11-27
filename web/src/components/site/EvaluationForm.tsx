"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DOC_ACCEPT, EVALUATION_FIELDS, MAX_DOC_BYTES, validateEvaluation } from "@/lib/evaluation";
import { track } from "@/lib/pixel";

const field =
  "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

/** Free profile evaluation form with one document upload. After sending, the page shows the status. */
export function EvaluationForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string"));
    const v = validateEvaluation(raw);
    if (!v.ok) return setError(v.error);
    const file = fd.get("document");
    if (!(file instanceof File) || !file.size) return setError("Please attach your transcript or semester results.");
    if (file.size > MAX_DOC_BYTES) return setError("The file is larger than 4 MB. Please upload a smaller PDF or photo.");
    if (fd.get("consent") !== "on") return setError("Please agree that we may review your document.");
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/profile-evaluation", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({ ok: false, error: "The upload did not work. Please try a smaller file (max. 4 MB)." }))) as {
        ok: boolean;
        error?: string;
      };
      if (!data.ok) throw new Error(data.error ?? "Something went wrong.");
      track("Lead", { content_name: "profile-evaluation" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {EVALUATION_FIELDS.map((f) => (
          <label key={f.key} className="block text-sm font-medium">
            {f.label} {f.optional && <span className="font-normal text-zinc-500">(optional)</span>}
            <input name={f.key} className={field} placeholder={f.placeholder} maxLength={f.max} required={!f.optional} />
          </label>
        ))}
      </div>
      <label className="block text-sm font-medium">
        Transcript or all-semester results
        <span className="block font-normal text-zinc-500">One file: PDF, JPG or PNG, max. 4 MB. Combine your semesters into one PDF if you can.</span>
        <input
          name="document"
          type="file"
          accept={DOC_ACCEPT}
          required
          className="mt-2 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:font-semibold file:text-brand"
        />
      </label>
      <label className="block text-sm font-medium">
        Anything else? <span className="font-normal text-zinc-500">(optional)</span>
        <textarea name="message" className={`${field} min-h-20`} maxLength={2000} placeholder="Backlogs, gap years, budget, questions…" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="flex items-start gap-2 text-sm text-zinc-700">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
        <span>
          I agree that the DMAT Mock Prep team may review my document to evaluate my profile and contact me. See our{" "}
          <Link href="/privacy" className="text-brand underline">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {sending ? "Uploading…" : "Submit for free evaluation"}
      </button>
    </form>
  );
}
