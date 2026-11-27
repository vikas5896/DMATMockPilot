-- The Complete Germany Plan, sold online like a pack (price and promo codes editable in Admin → Packs / Promo codes).
-- It unlocks every mock test type, because the plan includes the Full Pack. Only approved students can pay for it.
INSERT INTO "packs" ("slug", "name", "description", "price_inr", "validity_days", "kinds", "published", "sort")
VALUES (
  'germany-plan',
  'Complete Germany Plan',
  'dMAT preparation with all mock tests, plus APS guidance, profile building, university shortlisting, application support, blocked account, visa and pre-departure support. For students approved after a free profile evaluation.',
  14999,
  365,
  '["full","figure-sequences","equations","latin-squares","subject"]'::jsonb,
  true,
  30
)
ON CONFLICT ("slug") DO NOTHING;
