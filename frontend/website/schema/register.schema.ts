import { getSession } from "@/lib/getSession"
import { z } from "zod"


export const updateUserSchema = z.object({
    email: z.string().email({ message: "Email required" }),
    username: z.string().min(5, { message: "username should be at least 5 characters" }).max(100).refine(async (username) => {
        if (username === "") return false
        if (username.length < 5) return false
        const session = await getSession()
        if (session) {

            if (session.user.username === username) {
                return true
            }
        }
        console.log("User Sessions : ", session?.user)
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/check_username/" + username)
        const jsonData = await res.json()
        const { exists } = jsonData
        return exists !== true
    }, { message: "Username already exists" }),
    first_name: z.string().optional().default(""),
    last_name: z.string().optional().default(""),
    user_type: z.string().optional().default("User"),
})

export type updateUserSchemaType = z.infer<typeof updateUserSchema>

export const signUpSchema = z.object({
    email: z.string().email({ message: "Email required" }),
    username: z.string().min(5, { message: "username should be at least 5 characters" }).max(100).refine(async (username) => {
        if (username === "") return false
        if (username.length < 5) return false

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/check_username/" + username)
        const jsonData = await res.json()
        const { exists } = jsonData
        return exists !== true
    }, { message: "Username already exists" }),
    first_name: z.string().optional().default(""),
    last_name: z.string().optional().default(""),
    user_type: z.string().optional().default("User"),
    password: z.string().min(8).max(100),
    confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, {
    message: "Password don't match",
    path: ['confirmPassword']
})

export type signUpSchemaType = z.infer<typeof signUpSchema>

export const changePasswordSchema = z.object({
    current_password: z.string().min(4),
    new_password: z.string().min(8).max(100),
    confirm_password: z.string()
}).refine((data) => data.confirm_password === data.new_password, { message: "Confirm password does not match", path: ["confirm_password"] })

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>