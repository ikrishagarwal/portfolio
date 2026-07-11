import { gte } from "drizzle-orm";
import { check, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const blogsTable = pgTable(
  "blogs",
  {
    slug: varchar({ length: 255 }).primaryKey(),
    viewCount: integer("views").default(0).notNull(),
  },
  (table) => [check("view_must_be_positive", gte(table.viewCount, 0))],
);
