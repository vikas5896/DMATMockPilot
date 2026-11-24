"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import {
  checkPromoAction,
  confirmGuestPaymentAction,
  confirmPaymentAction,
  createGuestClassOrderAction,
  createOrderAction,
  paymentFailedAction,
} from "@/app/(site)/packs/actions";
import { BRAND } from "@/lib/brand";
import { loadCheckout, type Applied, type RazorpayResponse } from "./PackCard";
import { track } from "@/lib/pixel";
import { PROMO_KEY } from "./PromoCatcher";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Book a seat in a paid live class: price, promo code and Razorpay checkout. The enquiry form stays as an alternative. */
export function ClassPayCard({
  slug,
  title,
  priceInr,
  autoOffer,
  signedIn,
  enrolled,
  payOnline,
  enquiry,
}: {
  slug: string;
  title: string;
  priceInr: number;
  autoOffer?: Applied | null;
  signedIn: boolean;
  enrolled: boolean;
  payOnline: boolean;
  /** the enquiry form, shown on "Prefer bank transfer?" */
  enquiry: ReactNode;
}) {
  const router = useRouter();
  const item = `class:${slug}`;
  const [applied, setApplied] = useState<Applied | null>(autoOffer ?? null);
  const [codeInput, setCodeInput] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeNote, setCodeNote] = useState<string | null>(null);
  const [checking, startCheck] = useTransition();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(!payOnline);
  // one-step booking for visitors who are not logged in
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", consent: false });
  const [bookedEmail, setBookedEmail] = useState<string | null>(null);

  const apply = (raw: string, silent = false) =>
    startCheck(async () => {
      const r = await checkPromoAction(raw, item);
      if (r.ok) {
        const o = r.offer;
        setApplied(o ? { code: o.code, percentOff: o.percentOff, finalPriceInr: o.finalPriceInr, auto: o.auto } : null);
        setCodeError(null);
        setCodeNote(silent ? null : (r.note ?? null));
        setCodeInput("");
        setShowCode(false);
        try {
          if (o && !o.auto) localStorage.setItem(PROMO_KEY, o.code);
        } catch {}
      } else if (!silent) {
        setCodeNote(null);
        setCodeError(r.error);
      }
    });

  // a code from an influencer link is applied automatically (if it is valid for this class)
  useEffect(() => {
    if (enrolled) return;
    let saved = "";
    try {
      saved = localStorage.getItem(PROMO_KEY) ?? "";
    } catch {}
    if (saved) apply(saved, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeCode = () => {
    setApplied(autoOffer ?? null);
    setCodeNote(null);
    try {
      localStorage.removeItem(PROMO_KEY);
    } catch {}
  };

  const finalPrice = applied ? applied.finalPriceInr : priceInr;

  const pay = async () => {
    setPayError(null);
    setPaying(true);
    try {
      const asGuest = !signedIn;
      const [order, loaded] = await Promise.all([
        asGuest ? createGuestClassOrderAction(slug, guest, applied?.code) : createOrderAction(item, applied?.code),
        loadCheckout(),
      ]);
      if (!order.ok) throw new Error(order.error);
      if (!loaded || !window.Razorpay) throw new Error("Could not load the payment window. Check your internet connection and try again.");
      track("InitiateCheckout", { value: order.amountPaise / 100, currency: "INR", content_name: title });
      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: "INR",
        name: BRAND.name,
        description: title + (applied ? ` (code ${applied.code})` : ""),
        prefill: order.prefill,
        theme: { color: "#8c0a55" },
        handler: async (r: RazorpayResponse) => {
          setPaying(true);
          const confirm = asGuest ? confirmGuestPaymentAction : confirmPaymentAction;
          const c = await confirm(r.razorpay_order_id, r.razorpay_payment_id, r.razorpay_signature).catch(() => ({
            ok: false,
            error: "Please message us on WhatsApp with your payment ID.",
          }));
          setPaying(false);
          if (c.ok) {
            setPaid(true);
            if (asGuest) setBookedEmail(guest.email.trim().toLowerCase());
            track("Purchase", { value: order.amountPaise / 100, currency: "INR", content_name: title }, order.orderId);
            router.refresh();
          } else setPayError(`${c.error} (Payment ID: ${r.razorpay_payment_id})`);
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      rzp.on("payment.failed", (r) => {
        void paymentFailedAction(order.orderId, r.error?.description ?? "failed");
        setPayError(r.error?.description ? `Payment failed: ${r.error.description}` : "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (e) {
      setPayError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  if (enrolled || paid) {
    return (
      <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 text-emerald-900" role="status">
        <p className="text-lg font-bold">✓ {paid ? "Payment successful. Your seat is booked!" : "You're enrolled in this class."}</p>
        <p className="mt-1 text-sm">We will send you the joining link on WhatsApp before the first session. Check your email for the confirmation.</p>
        {bookedEmail && (
          <p className="mt-3 text-sm">
            Your account is ready:{" "}
            <Link href={`/login?next=${encodeURIComponent("/account")}`} className="font-semibold underline">
              log in with {bookedEmail}
            </Link>{" "}
            to see your booking and take your free full dMAT mock test.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-brand bg-white p-5">
        <p className="flex items-baseline gap-3">
          <span className={`text-3xl font-bold ${applied ? "text-emerald-700" : ""}`}>{rupees(finalPrice)}</span>
          {applied && <span className="text-lg text-zinc-400 line-through">{rupees(priceInr)}</span>}
        </p>

        <div className="mt-3">
          {applied && (
            <p className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              <span>
                {applied.auto ? "🏷️ Offer" : "🎉 Code"} <strong>{applied.code}</strong>: {applied.percentOff}% off
                {applied.auto ? ", applied automatically" : ""}
              </span>
              {!applied.auto && (
                <button type="button" onClick={removeCode} className="text-xs text-emerald-900 underline">
                  Remove
                </button>
              )}
            </p>
          )}
          {codeNote && <p className="mb-2 text-xs text-zinc-600">{codeNote}</p>}
          {applied && !applied.auto ? null : showCode ? (
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
              {applied?.auto ? "Have another promo code?" : "Have a promo code?"}
            </button>
          )}
        </div>

        <div className="mt-4">
          {!payOnline ? null : !signedIn ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void pay();
              }}
              className="space-y-3"
            >
              <label className="block text-sm">
                <span className="font-medium">Full name</span>
                <input
                  required
                  autoComplete="name"
                  value={guest.name}
                  onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-brand"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium">Email</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={guest.email}
                  onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-brand"
                />
                <span className="mt-1 block text-xs text-zinc-500">Your confirmation and account are linked to this email.</span>
              </label>
              <label className="block text-sm">
                <span className="font-medium">Mobile number (WhatsApp)</span>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="98765 43210"
                  value={guest.phone}
                  onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-brand"
                />
              </label>
              <label className="flex items-start gap-2 text-xs text-zinc-600">
                <input
                  type="checkbox"
                  required
                  checked={guest.consent}
                  onChange={(e) => setGuest({ ...guest, consent: e.target.checked })}
                  className="mt-0.5"
                />
                <span>
                  I agree to be contacted about my booking. See our{" "}
                  <Link href="/privacy" className="underline">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
              {payError && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {payError}
                </p>
              )}
              <button
                type="submit"
                disabled={paying || checking}
                className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
              >
                {paying ? "Opening payment…" : `Pay ${rupees(finalPrice)} & book your seat`}
              </button>
              <p className="text-xs text-zinc-500">
                Already have an account?{" "}
                <Link href={`/login?next=${encodeURIComponent(`/live-classes/${slug}#register`)}`} className="underline">
                  Log in
                </Link>
              </p>
            </form>
          ) : (
            <>
              {payError && (
                <p className="mb-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {payError}
                </p>
              )}
              <button
                type="button"
                onClick={pay}
                disabled={paying || checking}
                className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
              >
                {paying ? "Opening payment…" : `Pay ${rupees(finalPrice)} & book your seat`}
              </button>
            </>
          )}
          {payOnline && (
            <p className="mt-2 text-xs text-zinc-500">
              UPI, cards or netbanking via Razorpay. Your seat is confirmed right after payment.{" "}
              <button type="button" onClick={() => setShowEnquiry((v) => !v)} className="underline">
                Prefer bank transfer or have a question?
              </button>
            </p>
          )}
        </div>
      </div>
      {showEnquiry && enquiry}
    </div>
  );
}
