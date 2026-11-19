"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { LEAD_STATUSES, leads, type LeadStatus } from "@/db/schema";
import { logout, requestLoginCode, requireAdmin, verifyLoginCode } from "@/lib/auth";
import { BATCHES_TAG, deleteBatch, getStoredBatch, saveBatch } from "@/lib/batch-store";
import { fieldsToBatch, formDataToFields, type BatchFields } from "@/lib/batch-form";

// ---------- login ----------
export type LoginState = { step: "email" | "code"; email: string; error?: string; info?: string };

export async function loginAction(prev: LoginState, fd: FormData): Promise<LoginState> {
  const email = String(fd.get("email") ?? prev.email).trim().toLowerCase();

  if (prev.step === "email" || fd.get("resend")) {
    const r = await requestLoginCode(email);
    if (!r.ok) return { step: "email", email, error: r.error };
    return {
      step: "code",
      email,
      info: "If this email has admin access, a 6-digit code is on its way. It is valid for 10 minutes.",
    };
  }

  const r = await verifyLoginCode(email, String(fd.get("code") ?? ""));
  if (!r.ok) return { ...prev, error: r.error, info: undefined };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---------- enquiries ----------
export async function setLeadStatusAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const status = String(fd.get("status")) as LeadStatus;
  if (!Number.isInteger(id) || !LEAD_STATUSES.includes(status)) return;
  const db = await getDb();
  await db.update(leads).set({ status }).where(eq(leads.id, id));
  redirect(String(fd.get("back") || "/admin/enquiries"));
}

export async function setLeadNotesAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  const notes = String(fd.get("notes") ?? "").slice(0, 2000).trim() || null;
  const db = await getDb();
  await db.update(leads).set({ notes }).where(eq(leads.id, id));
  redirect(String(fd.get("back") || "/admin/enquiries"));
}

// ---------- batches ----------
export type BatchFormState = { errors?: string[]; fields?: BatchFields };

export async function saveBatchAction(prev: BatchFormState, fd: FormData): Promise<BatchFormState> {
  await requireAdmin();
  const fields = formDataToFields(fd);
  const original = String(fd.get("originalSlug") ?? "") || undefined;
  const parsed = fieldsToBatch(fields);
  if (!parsed.ok) return { errors: parsed.errors, fields };
  if (parsed.batch.slug !== original && (await getStoredBatch(parsed.batch.slug))) {
    return { errors: ["Another batch already uses this web address (slug)."], fields };
  }
  await saveBatch(parsed.batch, original);
  updateTag(BATCHES_TAG); // public pages show the change immediately
  redirect(`/admin/batches?saved=${encodeURIComponent(parsed.batch.slug)}`);
}

export async function deleteBatchAction(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if (slug) await deleteBatch(slug);
  updateTag(BATCHES_TAG);
  redirect("/admin/batches?deleted=1");
}
