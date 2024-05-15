"use server"

import { ArticleToModeratePagination, ModerationRecordPagination } from "@/types";
import { getSession } from "@/lib/getSession";

export const getArticleToModerate = async (page?:string) => {
    try {
        const session = await getSession();
        // const isAuthorize = !(["Admin","Moderator"].includes(session?.user?.user_type)); 
        // if(!isAuthorize){
        //     throw new Error("Not Authorized")
        // }
        let url = `${process.env.NEXT_PUBLIC_MODERATOR_URL}/api/article-to-moderate/`
        url = page ? url + `?page=${page}`  : url;
        const res = await fetch(url, {
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(res.headers)
        console.log(res.bodyUsed)
        // if (!res.ok) {
        //     throw new Error("Failed to fetch articles to moderate",{cause:res.text});
        // }
        const data = (await res.json()) as ArticleToModeratePagination;
        return data;

    } catch (error) {
        console.error("Error fetching article:", error);
        throw error; 
    }
}