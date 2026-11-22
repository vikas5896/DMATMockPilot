-- The "dMAT Explained" webinar now costs ₹49, paid online. Only the price, the fee text and the word "free" in the summary change.
UPDATE "batches"
SET "data" = ("data" || '{"fee":"₹49","priceInr":49}'::jsonb)
  || jsonb_build_object('summary', regexp_replace("data"->>'summary', '^A free ', 'A '))
WHERE "slug" = 'dmat-explained-webinar';
