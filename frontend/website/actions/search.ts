"use server";

export const searchArticles = async (query: string, page: string = "1") => {
    try {
        const url = `${process.env.NEXT_PUBLIC_SEARCH_URL}/api/search/?query=${query}&page=${page}`;
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = (await res.json());
        return data;
    } catch (error) {

    }
}