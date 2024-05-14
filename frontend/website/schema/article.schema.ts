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

export const CategorySchema = z.object({
  name:z.string(),
  description:z.string(),
  is_cultural:z.boolean()
})

export type CategoryCreateType = z.infer<typeof CategorySchema>;