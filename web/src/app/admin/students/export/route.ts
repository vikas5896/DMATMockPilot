import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { attempts, students } from "@/db/schema";
import { currentAdmin } from "@/lib/auth";

/** CSV of all students with their completed tests. Admins only. */
export async function GET() {
  if (!(await currentAdmin())) return new Response("Not allowed", { status: 401 });
  const db = await getDb();
  const rows = await db.select().from(students).orderBy(desc(students.createdAt));
  const all = await db.select().from(attempts);
  const cell = (v: unknown) => {
    let s = v instanceof Date ? v.toISOString() : v == null ? "" : String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`; // stop spreadsheets from running formulas
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = [
    ["joined", "name", "email", "phone", "last_login", "tests_completed", "results", "source"].join(","),
    ...rows.map((s) => {
      const mine = all.filter((a) => a.studentId === s.id);
      const done = mine.filter((a) => a.status === "completed");
      const results = mine.map((a) => `${a.testId}:${a.status === "completed" ? `${a.score}/${a.maxScore}` : "in progress"}`).join("; ");
      return [s.createdAt, s.name, s.email, s.phone, s.lastLoginAt, done.length, results, s.source].map(cell).join(",");
    }),
  ];
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="students-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
