CREATE TABLE "class_enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"class_slug" text NOT NULL,
	"amount_inr" integer,
	"promo_code" text,
	"payment_ref" text,
	"source" text DEFAULT 'online' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "pack_slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "class_slug" text;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "applies_to_all" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "class_slugs" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "class_enrollments" ADD CONSTRAINT "class_enrollments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "class_enrollments_student_class" ON "class_enrollments" USING btree ("student_id","class_slug");--> statement-breakpoint
-- codes that were limited to certain packs stay limited (only to those packs, no classes)
UPDATE "promo_codes" SET "applies_to_all" = false WHERE "pack_slugs" <> '[]'::jsonb;
