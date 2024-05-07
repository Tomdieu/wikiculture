import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(3,{message:"Username should have atleast 3 character(s)"}).max(120,{message:"Username should be less than 120 character(s)"}).regex(/^[a-zA-Z0-9_]*$/, { message: "Username should only contain alphanumeric characters "}),
    password: z.string().min(4, { message: "Password  must contain atleast 8 character(s)" }).max(100, { message: "Password should be less than 100 character(s)" })
})

export type loginSchemaType = z.infer<typeof loginSchema>