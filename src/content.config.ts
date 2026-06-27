import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blogs",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      coverImage: image().optional(),
      draft: z.coerce.boolean().optional().default(false),
    }),
});

export const collections = {
  blog,
};
