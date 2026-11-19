"use server";

import { currentStudent } from "@/lib/auth";
import { saveAttemptData } from "@/lib/attempt-store";
import { canAccess } from "@/lib/access";
import { parseTestId } from "@/lib/exam/catalog";
import type { Attempt } from "@/lib/exam/tests";

/** Called by the exam screen while a student works (debounced) and when a test is finished. */
export async function saveAttemptAction(testId: string, data: Attempt): Promise<{ ok: boolean; error?: string }> {
  const me = await currentStudent();
  if (!me) return { ok: false, error: "Please log in again." };
  const test = parseTestId(testId);
  if (!test || !(await canAccess(me.id, test))) return { ok: false, error: "This test is not available." };
  return saveAttemptData(me.id, testId, data);
}
