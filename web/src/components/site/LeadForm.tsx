"use client";

import { track } from "@/lib/pixel";
import Link from "next/link";
import { useState } from "react";
import { INTERESTS, validateLead, type Interest, type LeadInput } from "@/lib/leads";

type Props = {
  defaultInterest?: Interest;
  /** pre-selected live class batch (slug) */
  batch?: string;
  batchTitle?: string;
  submitLabel?: string;
  /** hide the interest dropdown when the page already decides it */
  fixedInterest?: boolean;
};

const field =
  "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function LeadForm({ defaultInterest = "other", batch, batchTitle, submitLabel = "Send", fixedInterest }: Props) {
  const [form, setForm] = useState<LeadInput>({
    name: "",
    email: "",
    phone: "",
    interest: defaultInterest,
    batch,
    message: "",
    consent: false,
    website: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validateLead(form);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Something went wrong.");
      track("Lead", { content_name: form.interest });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6" role="status">
        <p className="text-lg font-semibold text-emerald-800">Thank you, {form.name.split(" ")[0]}!</p>
        <p className="mt-1 text-emerald-900">
          We have received your request{batchTitle ? ` for “${batchTitle}”` : ""} and will contact you at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6" noValidate>
      {batchTitle && (
        <p className="rounded-md bg-brand-soft px-3 py-2 text-sm text-brand">
          Registering for: <strong>{batchTitle}</strong>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Full name
          <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" required />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            className={field}
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Mobile number (WhatsApp)
          <input
            className={field}
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="98765 43210"
            required
          />
        </label>
        {!fixedInterest && (
          <label className="block text-sm font-medium">
            I am interested in
            <select className={field} value={form.interest} onChange={(e) => set("interest", e.target.value as Interest)}>
              {Object.entries(INTERESTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <label className="block text-sm font-medium">
        Message <span className="font-normal text-zinc-500">(optional)</span>
        <textarea
          className={`${field} min-h-24`}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Your degree, target intake, questions…"
        />
      </label>
      {/* honeypot, hidden from people */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
      />
      <label className="flex items-start gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
        />
        <span>
          I agree to be contacted about my request. See our{" "}
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
        disabled={state === "sending"}
        className="rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
