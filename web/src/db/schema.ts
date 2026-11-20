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

/** Paid packs (e.g. Section Pack, Full Pack). `kinds` = which test types' tests 2–10 the pack unlocks. */
export const packs = pgTable("packs", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  priceInr: integer("price_inr"),
  validityDays: integer("validity_days").notNull().default(180),
  kinds: jsonb("kinds").$type<string[]>().notNull(),
  published: boolean("published").notNull().default(true),
  sort: integer("sort").notNull().default(0),
});

/** A student asking for a pack. We contact them, they pay, an admin grants access. */
export const accessRequests = pgTable("access_requests", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  packSlug: text("pack_slug").notNull(),
  message: text("message"),
  /** promo code applied when requesting, and the price we quoted */
  promoCode: text("promo_code"),
  quotedPriceInr: integer("quoted_price_inr"),
  /** new → contacted → paid → granted / closed */
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Access given by an admin after payment (or for free), with the payment record. */
export const grants = pgTable("grants", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  packSlug: text("pack_slug").notNull(),
  grantedAt: timestamp("granted_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  amountInr: integer("amount_inr"),
  paymentRef: text("payment_ref"),
  paymentDate: text("payment_date"),
  promoCode: text("promo_code"),
  note: text("note"),
  grantedBy: text("granted_by").notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

/** Promo codes, e.g. one per Instagram influencer, so each one's students can be counted. */
export const promoCodes = pgTable("promo_codes", {
  code: text("code").primaryKey(), // stored in UPPER CASE
  percentOff: integer("percent_off").notNull(),
  label: text("label"), // e.g. influencer name
  /** packs the code works for; empty = all packs */
  packSlugs: jsonb("pack_slugs").$type<string[]>().notNull().default([]),
  active: boolean("active").notNull().default(true),
  maxUses: integer("max_uses"),
  expiresOn: text("expires_on"), // YYYY-MM-DD, last valid day (Indian time)
  /** applied automatically to everyone (at most one code); another valid code with a bigger discount replaces it */
  autoApply: boolean("auto_apply").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type PromoCode = typeof promoCodes.$inferSelect;
export type Pack = typeof packs.$inferSelect;
export type AccessRequest = typeof accessRequests.$inferSelect;
export type Grant = typeof grants.$inferSelect;
export const REQUEST_STATUSES = ["new", "contacted", "paid", "granted", "closed"] as const;
export type Student = typeof students.$inferSelect;
export type AttemptRow = typeof attempts.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export const LEAD_STATUSES = ["new", "contacted", "enrolled", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Online payments through Razorpay. One row per Razorpay order; a paid order creates a grant once. */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(), // Razorpay order_…
  paymentId: text("payment_id"), // Razorpay pay_…
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  packSlug: text("pack_slug").notNull(),
  promoCode: text("promo_code"),
  amountInr: integer("amount_inr").notNull(),
  /** created → paid / failed */
  status: text("status").notNull().default("created"),
  grantId: integer("grant_id"),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});
export type Payment = typeof payments.$inferSelect;
