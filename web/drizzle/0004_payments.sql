CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"payment_id" text,
	"student_id" integer NOT NULL,
	"pack_slug" text NOT NULL,
	"promo_code" text,
	"amount_inr" integer NOT NULL,
	"status" text DEFAULT 'created' NOT NULL,
	"grant_id" integer,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone,
	CONSTRAINT "payments_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;