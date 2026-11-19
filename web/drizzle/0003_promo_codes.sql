CREATE TABLE "promo_codes" (
	"code" text PRIMARY KEY NOT NULL,
	"percent_off" integer NOT NULL,
	"label" text,
	"pack_slugs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"max_uses" integer,
	"expires_on" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "access_requests" ADD COLUMN "promo_code" text;--> statement-breakpoint
ALTER TABLE "access_requests" ADD COLUMN "quoted_price_inr" integer;--> statement-breakpoint
ALTER TABLE "grants" ADD COLUMN "promo_code" text;--> statement-breakpoint
UPDATE "packs" SET "price_inr" = 1599 WHERE "slug" = 'full-pack' AND "price_inr" = 1499;
