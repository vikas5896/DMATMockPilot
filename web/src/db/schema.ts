import { boolean, integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import type { Batch } from "@/content/site/batches";

/** Enquiries from the website forms. */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest").notNull(),
  batch: text("batch"),
  message: text("message"),
  /** new → contacted → enrolled / closed */
  status: text("status").notNull().default("new"),
  notes: text("notes"),
});

/** Live-class batches, edited in the admin panel. `data` holds the public fields (see Batch). */
export const batches = pgTable("batches", {
  slug: text("slug").primaryKey(),
  data: jsonb("data").$type<Omit<Batch, "slug">>().notNull(),
  sort: integer("sort").notNull().default(0),
  published: boolean("published").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/** One-time login codes (stored hashed). */
export const loginCodes = pgTable("login_codes", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  attempts: integer("attempts").notNull().default(0),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Student accounts (sign-up with name, email, phone; login with an email code). */
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

/**
 * One row per student and test (e.g. "full-1"): each test can be taken once.
 * `data` holds the whole attempt (answers, timers, progress) so it can be resumed on any device.
 */
export const attempts = pgTable(
  "attempts",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    testId: text("test_id").notNull(),
    status: text("status").notNull().default("in_progress"), // in_progress | completed
    data: jsonb("data").notNull(),
    score: integer("score"),
    maxScore: integer("max_score"),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("attempts_student_test").on(t.studentId, t.testId)],
);

export type Student = typeof students.$inferSelect;
export type AttemptRow = typeof attempts.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export const LEAD_STATUSES = ["new", "contacted", "enrolled", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
