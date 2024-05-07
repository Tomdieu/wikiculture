import {z} from "zod"


export const signUpSchema = z.object({
    email: z.string().email({message:"Email required"}),
    username: z.string().min(5, {message: "username should be at least 5 characters"}).max(100).refine(async (username) => {
        if (username=== "") return false
        if (username.length < 5) return false
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/accounts/check_username/?username=" + username)
        const jsonData = await res.json()
        const {exists} = jsonData
        return exists !== true
    }, {message: "Username already exists"}),
    first_name: z.string().optional().default(""),
    last_name: z.string().optional().default(""),
    password: z.string().min(8).max(100),
    confirmPassword: z.string()
}).refine((data)=>data.confirmPassword === data.password,{
    message:"Password don't match",
    path:['confirmPassword']
})

export type signUpSchemaType = z.infer<typeof signUpSchema>