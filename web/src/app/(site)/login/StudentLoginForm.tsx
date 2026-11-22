"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { track } from "@/lib/pixel";
import { studentLoginAction, type StudentLoginState } from "./actions";

const field =
  "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function StudentLoginForm({ next, startAtProfile, email }: { next: string; startAtProfile?: boolean; email?: string }) {
  const [k, setK] = useState(0);
  return (
    <Inner
      key={k}
      initial={{ step: startAtProfile ? "profile" : "email", email: email ?? "", next }}
      onReset={() => setK((x) => x + 1)}
    />
  );
}

function Inner({ initial, onReset }: { initial: StudentLoginState; onReset: () => void }) {
  const [state, action, pending] = useActionState<StudentLoginState, FormData>(studentLoginAction, initial);
  // A new account reaches the profile step right after its first code check: count that as a sign-up for ads.
  const signedUp = useRef(false);
  useEffect(() => {
    if (state.step === "profile" && initial.step !== "profile" && !signedUp.current) {
      signedUp.current = true;
      track("CompleteRegistration");
    }
  }, [state.step, initial.step]);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={state.next} />

      {state.step === "email" && (
        <>
          <label className="block text-sm font-medium">
            Email address
            <input name="email" type="email" required autoComplete="email" defaultValue={state.email} className={field} />
          </label>
          <p className="text-xs text-zinc-500">We will email you a 6-digit code. No password needed.</p>
        </>
      )}

      {state.step === "code" && (
        <>
          <input type="hidden" name="email" value={state.email} />
          <p className="text-sm text-zinc-600">
            Code sent to <strong>{state.email}</strong>.{" "}
            <button type="button" onClick={onReset} className="text-brand underline">
              Change
            </button>
          </p>
          <label className="block text-sm font-medium">
            6-digit code
            <input
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={7}
              required
              autoFocus
              className={`${field} text-center text-2xl tracking-[0.4em]`}
            />
          </label>
          <p className="text-xs text-zinc-500">Can&apos;t find it? Check your spam or promotions folder.</p>
        </>
      )}

      {state.step === "profile" && (
        <>
          <p className="text-sm text-zinc-600">
            Almost done. Tell us who you are, so we can send your results and help with your preparation.
          </p>
          <label className="block text-sm font-medium">
            Full name
            <input name="name" required autoComplete="name" defaultValue={state.name} className={field} autoFocus />
          </label>
          <label className="block text-sm font-medium">
            Mobile number (WhatsApp)
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="98765 43210"
              defaultValue={state.phone}
              className={field}
            />
          </label>
          <label className="flex items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="consent"
              defaultChecked={state.consent}
              className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
            />
            <span>
              I agree to be contacted about my tests and preparation. See our{" "}
              <Link href="/privacy" className="text-brand underline">
                privacy policy
              </Link>
              .
            </span>
          </label>
        </>
      )}

      {state.info && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.info}</p>}
      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {pending
          ? "Please wait…"
          : state.step === "email"
            ? "Send code"
            : state.step === "code"
              ? "Continue"
              : "Save and continue"}
      </button>
      {state.step === "code" && (
        <button type="submit" name="resend" value="1" disabled={pending} className="w-full text-sm text-zinc-500 hover:text-brand">
          Send a new code
        </button>
      )}
    </form>
  );
}
