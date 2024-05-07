import { z } from "zod";

export const ArticleSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  content: z.string(),
  tags: z.string().array(),
  approved: z.boolean(),
  categories: z.string().array(),
  status: z.enum(['draft', 'published']),
});