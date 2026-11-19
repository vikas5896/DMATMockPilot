import "server-only";
import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { loginCodes, students, type Student } from "@/db/schema";
import { BRAND } from "@/lib/brand";

/**
 * Login with one-time email codes, for two kinds of users:
 * - admins: listed in ADMIN_EMAILS (settings, never in the code)
 * - students: anyone with an email; they also give their name and phone on first sign-up
 */
const ADMIN_COOKIE = "mp_session";
const STUDENT_COOKIE = "mp_student";
const ADMIN_DAYS = 7;
const STUDENT_DAYS = 30;
const CODE_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const adminEmails = () =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

export const isAdminEmail = (email: string) => adminEmails().includes(email.trim().toLowerCase());

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET is missing or too short (set it in .env.local)");
  return new TextEncoder().encode(s);
}

const hashCode = (email: string, code: string) =>
  createHash("sha256").update(`${email}:${code}:${process.env.AUTH_SECRET}`).digest("hex");

async function sendCodeEmail(email: string, code: string, purpose: "admin" | "student"): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      // local development only: no email service configured
      console.log(`\n[${purpose} login] code for ${email}: ${code} (valid ${CODE_MINUTES} min)\n`);
      return true;
    }
    console.error("RESEND_API_KEY / EMAIL_FROM not set: cannot send login codes");
    return false;
  }
  const what = purpose === "admin" ? "admin login" : "login";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: email,
      subject: `Your ${BRAND.name} ${what} code: ${code}`,
      text: `Your ${BRAND.name} ${what} code is ${code}.\n\nIt is valid for ${CODE_MINUTES} minutes. If you did not request it, you can ignore this email.`,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
  return res.ok;
}

/** Create and email a code (at most one per minute per address). */
async function issueCode(email: string, purpose: "admin" | "student"): Promise<{ ok: boolean; error?: string }> {
  const db = await getDb();
  const [recent] = await db
    .select({ createdAt: loginCodes.createdAt })
    .from(loginCodes)
    .where(and(eq(loginCodes.email, email), gt(loginCodes.createdAt, new Date(Date.now() - 60_000))))
    .limit(1);
  if (recent) return { ok: true }; // the code sent less than a minute ago is still valid

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await db.insert(loginCodes).values({
    email,
    codeHash: hashCode(email, code),
    expiresAt: new Date(Date.now() + CODE_MINUTES * 60_000),
  });
  const sent = await sendCodeEmail(email, code, purpose);
  return sent ? { ok: true } : { ok: false, error: "We could not send the email. Please try again later." };
}

/** Check a code; marks it used on success. */
async function checkCode(email: string, rawCode: string): Promise<boolean> {
  const code = rawCode.replace(/\D/g, "");
  if (code.length !== 6) return false;
  const db = await getDb();
  const [row] = await db
    .select()
    .from(loginCodes)
    .where(and(eq(loginCodes.email, email), isNull(loginCodes.usedAt), gt(loginCodes.expiresAt, new Date())))
    .orderBy(desc(loginCodes.createdAt))
    .limit(1);
  if (!row || row.attempts >= MAX_ATTEMPTS) return false;
  const a = Buffer.from(row.codeHash, "hex");
  const b = Buffer.from(hashCode(email, code), "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    await db.update(loginCodes).set({ attempts: row.attempts + 1 }).where(eq(loginCodes.id, row.id));
    return false;
  }
  await db.update(loginCodes).set({ usedAt: new Date() }).where(eq(loginCodes.id, row.id));
  return true;
}

async function setCookie(name: string, payload: Record<string, unknown>, days: number) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${days}d`)
    .sign(secret());
  (await cookies()).set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: days * 24 * 3600,
  });
}

async function readCookie(name: string): Promise<Record<string, unknown> | null> {
  const token = (await cookies()).get(name)?.value;
  if (!token) return null;
  try {
    return (await jwtVerify(token, secret())).payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

const WRONG_CODE = "That code is not valid or has expired. Request a new one.";

// ---------------- admins ----------------

/** Says nothing about whether the email is an admin (no account guessing). */
export async function requestLoginCode(rawEmail: string): Promise<{ ok: boolean; error?: string }> {
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!isAdminEmail(email)) return { ok: true };
  return issueCode(email, "admin");
}

export async function verifyLoginCode(rawEmail: string, rawCode: string): Promise<{ ok: boolean; error?: string }> {
  const email = rawEmail.trim().toLowerCase();
  if (!isAdminEmail(email) || !(await checkCode(email, rawCode))) return { ok: false, error: WRONG_CODE };
  await setCookie(ADMIN_COOKIE, { email, role: "admin" }, ADMIN_DAYS);
  return { ok: true };
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
}

/** The logged-in admin's email, or null. Re-checks ADMIN_EMAILS, so removing someone there revokes access. */
export async function currentAdmin(): Promise<string | null> {
  const p = await readCookie(ADMIN_COOKIE);
  const email = typeof p?.email === "string" ? p.email : null;
  return email && p?.role === "admin" && isAdminEmail(email) ? email : null;
}

/** Use at the top of every admin page and admin action. */
export async function requireAdmin(): Promise<string> {
  const email = await currentAdmin();
  if (!email) redirect("/admin/login");
  return email;
}

// ---------------- students ----------------

export async function requestStudentCode(rawEmail: string): Promise<{ ok: boolean; error?: string }> {
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) return { ok: false, error: "Please enter a valid email address." };
  return issueCode(email, "student");
}

/** Verify the code; creates the account on first login. Returns whether the profile still needs name/phone. */
export async function verifyStudentCode(
  rawEmail: string,
  rawCode: string,
): Promise<{ ok: boolean; error?: string; needsProfile?: boolean }> {
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || !(await checkCode(email, rawCode))) return { ok: false, error: WRONG_CODE };
  const db = await getDb();
  await db.insert(students).values({ email }).onConflictDoNothing();
  const [s] = await db
    .update(students)
    .set({ lastLoginAt: new Date() })
    .where(eq(students.email, email))
    .returning();
  await setCookie(STUDENT_COOKIE, { sid: s.id, email, role: "student" }, STUDENT_DAYS);
  return { ok: true, needsProfile: !s.name || !s.phone };
}

export async function studentLogout() {
  (await cookies()).delete(STUDENT_COOKIE);
}

/** The logged-in student, or null. */
export async function currentStudent(): Promise<Student | null> {
  const p = await readCookie(STUDENT_COOKIE);
  if (p?.role !== "student" || typeof p.sid !== "number") return null;
  const db = await getDb();
  const [s] = await db.select().from(students).where(eq(students.id, p.sid));
  return s ?? null;
}

/** For student pages and actions: logged in AND name/phone filled in, otherwise off to the login page. */
export async function requireStudent(next: string): Promise<Student> {
  const s = await currentStudent();
  if (!s || !s.name || !s.phone) redirect(`/login?next=${encodeURIComponent(next)}`);
  return s;
}
