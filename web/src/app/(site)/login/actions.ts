"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { students } from "@/db/schema";
import { currentStudent, requestStudentCode, studentLogout, verifyStudentCode } from "@/lib/auth";
import { safeNext } from "@/lib/safe-next";

export type StudentLoginState = {
  step: "email" | "code" | "profile";
  email: string;
  next: string;
  error?: string;
  info?: string;
  name?: string;
  phone?: string;
  /** kept so the tick box stays ticked after an error (forms are reset after each submit) */
  consent?: boolean;
};

const PHONE_RE = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export async function studentLoginAction(prev: StudentLoginState, fd: FormData): Promise<StudentLoginState> {
  const next = safeNext(fd.get("next") ?? prev.next);

  if (prev.step === "profile") {
    const me = await currentStudent();
    if (!me) return { step: "email", email: "", next, error: "Your session expired. Please log in again." };
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const keep = { ...prev, name, phone, consent };
    if (name.length < 2 || name.length > 100) return { ...keep, error: "Please enter your full name." };
    if (!PHONE_RE.test(phone)) {
      return { ...keep, error: "Please enter a valid Indian mobile number, e.g. 98765 43210." };
    }
    if (!consent) return { ...keep, error: "Please agree to be contacted." };
    const db = await getDb();
    await db.update(students).set({ name, phone }).where(eq(students.id, me.id));
    redirect(next);
  }

  const email = String(fd.get("email") ?? prev.email).trim().toLowerCase();
  if (prev.step === "email" || fd.get("resend")) {
    const r = await requestStudentCode(email);
    if (!r.ok) return { step: "email", email, next, error: r.error };
    return { step: "code", email, next, info: `We sent a 6-digit code to ${email}. It is valid for 10 minutes.` };
  }

  const r = await verifyStudentCode(email, String(fd.get("code") ?? ""));
  if (!r.ok) return { ...prev, error: r.error, info: undefined };
  if (r.needsProfile) return { step: "profile", email, next };
  redirect(next);
}

export async function studentLogoutAction() {
  await studentLogout();
  redirect("/");
}
