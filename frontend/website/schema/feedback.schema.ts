import { z } from "zod";

export const FeedbackSchema = z.object({
    feedback:z.string().min(8,'feedback must contain at least 8 character(s)')
})

export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>