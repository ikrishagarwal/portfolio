CREATE TABLE "blogs" (
	"name" varchar(255) PRIMARY KEY,
	"views" integer DEFAULT 0,
	CONSTRAINT "view_must_be_positive" CHECK ("views" > 0)
);
