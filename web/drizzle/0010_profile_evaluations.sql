CREATE TABLE "profile_evaluations" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"status" text DEFAULT 'submitted' NOT NULL,
	"details" jsonb NOT NULL,
	"doc_name" text NOT NULL,
	"doc_type" text NOT NULL,
	"doc_size" integer NOT NULL,
	"doc_data" "bytea" NOT NULL,
	"note_to_student" text,
	"admin_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"evaluated_at" timestamp with time zone,
	"called_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "profile_evaluations" ADD CONSTRAINT "profile_evaluations_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;