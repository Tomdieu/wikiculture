"use server"

import { revalidatePath } from "next/cache"


export const revalidatePage = (page: string) => {
    revalidatePath(page)
}