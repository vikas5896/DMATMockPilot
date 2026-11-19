"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { checkPromoAction, requestAccessAction } from "@/app/(site)/packs/actions";
import { BRAND, waHref } from "@/lib/brand";
import { PROMO_KEY } from "./PromoCatcher";

export type PackInfo = {
  slug: string;
  name: string;
  description: string;
  priceInr: number | null;
  validityDays: number;
};

const months = (days: number) => (days % 30 === 0 ? `${days / 30} months` : `${days} days`);
const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type Applied = { code: string; percentOff: number; finalPriceInr: number };

/** A pack with a promo code field and a "Request access" button: we then contact the student for payment. */
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
  const [codeInput, setCodeInput] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [applied, setApplied] = useState<Applied | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [checking, startCheck] = useTransition();
  const wa = BRAND.contact.whatsapp;

  const apply = (raw: string, silent = false) =>
    startCheck(async () => {
      const r = await checkPromoAction(raw, pack.slug);
      if (r.ok) {
        setCodeInput(r.code);
        setApplied({ code: r.code, percentOff: r.percentOff, finalPriceInr: r.finalPriceInr });
        setCodeError(null);
        try {
          localStorage.setItem(PROMO_KEY, r.code);
        } catch {}
      } else if (!silent) {
        setApplied(null);
        setCodeError(r.error);
      }
    });

  // a code from an influencer link (or typed earlier) is applied automatically
  useEffect(() => {
    if (owned || pack.priceInr == null) return;
    let saved = "";
    try {
      saved = localStorage.getItem(PROMO_KEY) ?? "";
    } catch {}
    if (saved) apply(saved, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeCode = () => {
    setApplied(null);
    setCodeInput("");
    try {
      localStorage.removeItem(PROMO_KEY);
    } catch {}
  };

  const submit = () =>
    start(async () => {
      try {
        const r = await requestAccessAction(pack.slug, message, from, applied?.code);
        if (!r.ok) {
          setError(r.error ?? "Something went wrong.");
          setState("error");
        } else setState(r.already ? "already" : "done");
      } catch {
        setError("Something went wrong. Please try again or message us on WhatsApp.");
        setState("error");
      }
    });

  const finalPrice = applied ? applied.finalPriceInr : pack.priceInr;

  return (
    <div className={`flex flex-col rounded-xl border-2 bg-white p-6 ${highlight ? "border-brand" : "border-zinc-200"}`}>
      <h3 className="text-xl font-bold">{pack.name}</h3>
      <p className="mt-2 flex items-baseline gap-3">
        {pack.priceInr == null ? (
          <span className="text-3xl font-bold">Price on request</span>
        ) : applied ? (
          <>
            <span className="text-3xl font-bold text-emerald-700">{rupees(applied.finalPriceInr)}</span>
            <span className="text-lg text-zinc-400 line-through">{rupees(pack.priceInr)}</span>
          </>
        ) : (
          <span className="text-3xl font-bold">{rupees(pack.priceInr)}</span>
        )}
      </p>
      <p className="text-sm text-zinc-500">Access for {months(pack.validityDays)}</p>
      <p className="mt-4 flex-1 text-zinc-700">{pack.description}</p>

      {/* promo code */}
      {!owned && pack.priceInr != null && state !== "done" && state !== "already" && (
        <div className="mt-4">
          {applied ? (
            <p className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              <span>
                🎉 Code <strong>{applied.code}</strong> applied: {applied.percentOff}% off
              </span>
              <button type="button" onClick={removeCode} className="text-xs text-emerald-900 underline">
                Remove
              </button>
            </p>
          ) : showCode || codeInput ? (
            <div>
              <div className="flex gap-2">
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  placeholder="Promo code"
                  aria-label="Promo code"
                  className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm uppercase outline-none focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => apply(codeInput)}
                  disabled={checking || !codeInput.trim()}
                  className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft disabled:opacity-50"
                >
                  {checking ? "…" : "Apply"}
                </button>
              </div>
              {codeError && <p className="mt-1 text-sm text-red-700">{codeError}</p>}
            </div>
          ) : (
            <button type="button" onClick={() => setShowCode(true)} className="text-sm text-brand underline">
              Have a promo code?
            </button>
          )}
        </div>
      )}

      <div className="mt-5">
        {owned ? (
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
            ✓ You have this pack (until {owned}).
          </p>
        ) : !signedIn ? (
          <>
            <Link
              href={`/login?next=${encodeURIComponent(from)}`}
              className="block rounded-md bg-brand px-4 py-3 text-center font-semibold text-white hover:bg-brand-dark"
            >
              Sign up to request access
            </Link>
            {applied && <p className="mt-2 text-xs text-zinc-500">Your code is saved and applied after you sign up.</p>}
          </>
        ) : state === "done" || state === "already" ? (
          <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-900" role="status">
            <p className="font-semibold">{state === "done" ? "Request sent!" : "You have already requested this pack."}</p>
            <p className="mt-1">
              We will contact you on WhatsApp or by phone with the payment details
              {state === "done" && finalPrice != null ? ` (${rupees(finalPrice)})` : ""}. Your tests unlock as soon as
              the payment is confirmed.
            </p>
            {wa && (
              <a
                href={waHref(
                  wa,
                  `Hi ${BRAND.name}, I requested the ${pack.name}${applied ? ` with code ${applied.code}` : ""}. How can I pay?`,
                )}
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
              disabled={pending || checking}
              className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {pending ? "Sending…" : finalPrice != null ? `Request access · ${rupees(finalPrice)}` : "Request access"}
            </button>
            <p className="mt-2 text-xs text-zinc-500">No online payment yet: we contact you with the payment details.</p>
          </>
        )}
      </div>
    </div>
  );
}
