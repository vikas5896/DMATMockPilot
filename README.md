# MockPilot – dMAT mock test platform

Realistic, timed mock tests for the **dMAT** (digital Master Test) Core Module. Independent practice platform, not affiliated with g.a.s.t. or APS India.

## What works today (Phase 1)

- Full Core Module mock (3 × 25 min) and single-subtest practice
- Exam-style interface: timer, End Subtest, instructions panel, text size, 1–20 palette, Save and back / forward
- Generated questions, each verified to have exactly one correct answer:
  - **Figure Sequences**: 4×4 matrices; movement (straight, diagonal, border path), bouncing, "+1 step" growth, rotation, colour change
  - **Mathematical Equations**: whole numbers 1–20; 10 substitution tasks + 10 range-based tasks (e.g. `B + C = 2` → B = C = 1)
  - **Latin Squares**: 5×5, letters A–E, deduction depth sets the difficulty
- Strict per-subtest timers, autosave, resume after refresh
- Results with per-subtest scores and a step-by-step solution for every task

## Run locally

```bash
cd web
npm install
npm run dev     # http://localhost:3000
npm test        # generator tests
```

## Going live

See [GO_LIVE.md](GO_LIVE.md) for the step-by-step checklist (domain, Neon, Resend, Vercel).

## Settings, database and admin panel

1. Copy `web/.env.example` to `web/.env.local` and fill it in (never commit `.env.local`):
   - `ADMIN_EMAILS`: comma-separated emails that may log in to `/admin`
   - `AUTH_SECRET`: a long random string (the example file shows how to generate one)
   - `DATABASE_URL`: empty locally (a built-in PGlite database in `web/data/` is used); a PostgreSQL URL (Neon/Supabase) in production
   - `RESEND_API_KEY` and `EMAIL_FROM`: for emailing login codes; locally, codes are printed in the dev server console
2. Database tables: locally they are created on first start; in production `npm run build` applies migrations (`web/drizzle/`) first. After changing `src/db/schema.ts`, run `npm run db:generate`.
3. Admin panel at `/admin`: enquiries (status, notes, CSV export) and live batches (add, edit, hide). Batch changes show on the website immediately.

## Structure

```
web/src/lib/rng.ts               seeded random numbers (same seed = same test)
web/src/lib/exam/                blueprint, types, scoring, attempt storage
web/src/lib/generators/          question generators + tests
web/src/components/exam/         exam UI, question views, results
web/src/app/                     pages: home, /test/[kind]
```

## Next

Accounts and database, server-side timing and scoring, payments (Razorpay), Subject Module question bank, admin question editor.
