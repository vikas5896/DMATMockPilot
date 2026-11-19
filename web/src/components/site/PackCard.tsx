"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { requestAccessAction } from "@/app/(site)/packs/actions";
import { BRAND, waHref } from "@/lib/brand";

export type PackInfo = {
  slug: string;
  name: string;
  description: string;
  priceInr: number | null;
  validityDays: number;
};

const months = (days: number) => (days % 30 === 0 ? `${days / 30} months` : `${days} days`);

/** A pack with a "Request access" button: we then contact the student for payment and unlock it. */
export function PackCard({
  pack,
  signedIn,
  requested,
  owned,
  from,
  highlight,
}: {
  pack: PackInfo;
  signedIn: boolean;
  requested?: boolean;
  owned?: string; // expiry date text when the student already has it
  from: string;
  highlight?: boolean;
}) {
  const [state, setState] = useState<"idle" | "done" | "already" | "error">(requested ? "already" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  const wa = BRAND.contact.whatsapp;

  const submit = () =>
    start(async () => {
      try {
        const r = await requestAccessAction(pack.slug, message, from);
        if (!r.ok) {
          setError(r.error ?? "Something went wrong.");
          setState("error");
        } else setState(r.already ? "already" : "done");
      } catch {
        setError("Something went wrong. Please try again or message us on WhatsApp.");
        setState("error");
      }
    });

  return (
    <div className={`flex flex-col rounded-xl border-2 bg-white p-6 ${highlight ? "border-brand" : "border-zinc-200"}`}>
      <h3 className="text-xl font-bold">{pack.name}</h3>
      <p className="mt-2 text-3xl font-bold">
        {pack.priceInr != null ? `₹${pack.priceInr.toLocaleString("en-IN")}` : "Price on request"}
      </p>
      <p className="text-sm text-zinc-500">Access for {months(pack.validityDays)}</p>
      <p className="mt-4 flex-1 text-zinc-700">{pack.description}</p>

      <div className="mt-6">
        {owned ? (
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
            ✓ You have this pack (until {owned}).
          </p>
        ) : !signedIn ? (
          <Link
            href={`/login?next=${encodeURIComponent(from)}`}
            className="block rounded-md bg-brand px-4 py-3 text-center font-semibold text-white hover:bg-brand-dark"
          >
            Sign up to request access
          </Link>
        ) : state === "done" || state === "already" ? (
          <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-900" role="status">
            <p className="font-semibold">{state === "done" ? "Request sent!" : "You have already requested this pack."}</p>
            <p className="mt-1">We will contact you on WhatsApp or by phone with the payment details. Your tests unlock as soon as the payment is confirmed.</p>
            {wa && (
              <a
                href={waHref(wa, `Hi ${BRAND.name}, I requested the ${pack.name}. How can I pay?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-semibold text-emerald-700 underline"
              >
                Don&apos;t want to wait? Message us on WhatsApp →
              </a>
            )}
          </div>
        ) : (
          <>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional: your exam date or questions"
              className="mb-3 min-h-16 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            {error && (
              <p className="mb-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={submit}
              disabled={pending}
              className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {pending ? "Sending…" : "Request access"}
            </button>
            <p className="mt-2 text-xs text-zinc-500">No online payment yet: we contact you with the payment details.</p>
          </>
        )}
      </div>
    </div>
  );
}
