import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { attempts, type AttemptRow } from "@/db/schema";
import type { CatalogTest } from "@/lib/exam/catalog";
import { scoreAttempt } from "@/lib/exam/score-attempt";
import { newAttempt, type Attempt } from "@/lib/exam/tests";

export async function getAttempt(studentId: number, testId: string): Promise<AttemptRow | null> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.studentId, studentId), eq(attempts.testId, testId)));
  return row ?? null;
}

export async function listAttempts(studentId: number): Promise<AttemptRow[]> {
  const db = await getDb();
  return db.select().from(attempts).where(eq(attempts.studentId, studentId));
}

/** The student's attempt for this test; created on first visit (one per student and test). */
export async function getOrCreateAttempt(studentId: number, test: CatalogTest): Promise<AttemptRow> {
  const existing = await getAttempt(studentId, test.id);
  if (existing) return existing;
  const db = await getDb();
  await db
    .insert(attempts)
    .values({ studentId, testId: test.id, data: newAttempt(test.kind, test.seed) })
    .onConflictDoNothing();
  return (await getAttempt(studentId, test.id))!;
}

/**
 * Save progress. Refused once the attempt is completed (one go per test), and only accepted if the
 * data belongs to this attempt (same test type and seed).
 */
export async function saveAttemptData(
  studentId: number,
  testId: string,
  data: Attempt,
): Promise<{ ok: boolean; error?: string }> {
  const row = await getAttempt(studentId, testId);
  if (!row) return { ok: false, error: "Attempt not found." };
  if (row.status === "completed") return { ok: false, error: "This test is already completed." };
  const stored = row.data as Attempt;
  if (data?.kind !== stored.kind || data?.seed !== stored.seed || !Array.isArray(data.answers)) {
    return { ok: false, error: "Invalid attempt data." };
  }
  const finished = data.status === "finished";
  const db = await getDb();
  if (finished) {
    const { score, max } = scoreAttempt(data);
    await db
      .update(attempts)
      .set({ data, status: "completed", score, maxScore: max, completedAt: new Date(), updatedAt: new Date() })
      .where(eq(attempts.id, row.id));
  } else {
    await db.update(attempts).set({ data, updatedAt: new Date() }).where(eq(attempts.id, row.id));
  }
  return { ok: true };
}
