import "server-only";
import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { loginCodes } from "@/db/schema";
import { BRAND } from "@/lib/brand";

/**
 * Admin login with one-time email codes.
 * Admins are listed in ADMIN_EMAILS (.env.local / hosting settings), never in the code.
 */
const COOKIE = "mp_session";
const SESSION_DAYS = 7;
const CODE_MINUTES = 10;
const MAX_ATTEMPTS = 5;

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

async function sendCodeEmail(email: string, code: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      // local development only: no email service configured yet
      console.log(`\n[admin login] code for ${email}: ${code} (valid ${CODE_MINUTES} min)\n`);
      return true;
    }
    console.error("RESEND_API_KEY / EMAIL_FROM not set: cannot send login codes");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: email,
      subject: `Your ${BRAND.name} login code: ${code}`,
      text: `Your ${BRAND.name} admin login code is ${code}.\n\nIt is valid for ${CODE_MINUTES} minutes. If you did not request it, ignore this email.`,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
  return res.ok;
}

/** Step 1: send a code. Says nothing about whether the email is an admin (no account guessing). */
export async function requestLoginCode(rawEmail: string): Promise<{ ok: boolean; error?: string }> {
  const email = rawEmail.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!isAdminEmail(email)) return { ok: true };

  const db = await getDb();
  // simple rate limit: at most one new code per minute
  const [recent] = await db
    .select({ createdAt: loginCodes.createdAt })
    .from(loginCodes)
    .where(and(eq(loginCodes.email, email), gt(loginCodes.createdAt, new Date(Date.now() - 60_000))))
    .limit(1);
  if (recent) return { ok: true };

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await db.insert(loginCodes).values({
    email,
    codeHash: hashCode(email, code),
    expiresAt: new Date(Date.now() + CODE_MINUTES * 60_000),
  });
  const sent = await sendCodeEmail(email, code);
  return sent ? { ok: true } : { ok: false, error: "We could not send the email. Please try again later." };
}

/** Step 2: check the code and start a session. */
export async function verifyLoginCode(rawEmail: string, rawCode: string): Promise<{ ok: boolean; error?: string }> {
  const email = rawEmail.trim().toLowerCase();
  const code = rawCode.replace(/\D/g, "");
  const wrong = { ok: false, error: "That code is not valid or has expired. Request a new one." };
  if (!isAdminEmail(email) || code.length !== 6) return wrong;

  const db = await getDb();
  const [row] = await db
    .select()
    .from(loginCodes)
    .where(and(eq(loginCodes.email, email), isNull(loginCodes.usedAt), gt(loginCodes.expiresAt, new Date())))
    .orderBy(desc(loginCodes.createdAt))
    .limit(1);
  if (!row || row.attempts >= MAX_ATTEMPTS) return wrong;

  const a = Buffer.from(row.codeHash, "hex");
  const b = Buffer.from(hashCode(email, code), "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    await db.update(loginCodes).set({ attempts: row.attempts + 1 }).where(eq(loginCodes.id, row.id));
    return wrong;
  }
  await db.update(loginCodes).set({ usedAt: new Date() }).where(eq(loginCodes.id, row.id));

  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 3600,
  });
  return { ok: true };
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

/** The logged-in admin's email, or null. Also re-checks ADMIN_EMAILS, so removing someone there revokes access. */
export async function currentAdmin(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const email = typeof payload.email === "string" ? payload.email : null;
    return email && payload.role === "admin" && isAdminEmail(email) ? email : null;
  } catch {
    return null;
  }
}

/** Use at the top of every admin page and admin action. */
export async function requireAdmin(): Promise<string> {
  const email = await currentAdmin();
  if (!email) redirect("/admin/login");
  return email;
}
