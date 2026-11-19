import { and, desc, eq, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { currentAdmin } from "@/lib/auth";

/** CSV download of enquiries (same filters as the table). Admins only. */
export async function GET(request: Request) {
  if (!(await currentAdmin())) return new Response("Not allowed", { status: 401 });
  const sp = new URL(request.url).searchParams;
  const where: SQL[] = [];
  for (const k of ["interest", "status", "batch"] as const) {
    const v = sp.get(k);
    if (v) where.push(eq(leads[k], v));
  }
  const db = await getDb();
  const rows = await db.select().from(leads).where(where.length ? and(...where) : undefined).orderBy(desc(leads.createdAt));

  const cols = ["createdAt", "name", "email", "phone", "interest", "batch", "status", "message", "notes"] as const;
  const cell = (v: unknown) => {
    let s = v instanceof Date ? v.toISOString() : v == null ? "" : String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`; // stop spreadsheets from running formulas
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enquiries-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
