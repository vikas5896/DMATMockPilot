import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-center text-xl font-bold text-brand">{BRAND.name}</p>
        <h1 className="mt-1 text-center text-2xl font-bold">Admin login</h1>
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
