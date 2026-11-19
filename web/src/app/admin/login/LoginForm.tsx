"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "../actions";

const field =
  "mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function LoginForm() {
  const [formKey, setFormKey] = useState(0);
  return <Inner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function Inner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, { step: "email", email: "" });

  return (
    <form action={action} className="space-y-4">
      {state.step === "email" ? (
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" defaultValue={state.email} className={field} />
        </label>
      ) : (
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
        className="w-full rounded-md bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Please wait…" : state.step === "email" ? "Send login code" : "Log in"}
      </button>
      {state.step === "code" && (
        <button type="submit" name="resend" value="1" disabled={pending} className="w-full text-sm text-zinc-500 hover:text-brand">
          Send a new code
        </button>
      )}
    </form>
  );
}
