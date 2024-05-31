"use server";

import {
  ArticleToModeratePagination,
  ModerationRecordCreateType,
} from "@/types";
import { getSession } from "@/lib/getSession";

export const getArticleToModerate = async (page?: string) => {
  try {
    const session = await getSession();

    let url = `${process.env.NEXT_PUBLIC_MODERATOR_URL}/api/article-to-moderate/`;
    url = page ? url + `?page=${page}` : url;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorText = (await res.json()) as { detail: string };
      throw new Error(JSON.stringify(errorText), { cause: res.text });
    }
    const data = (await res.json()) as ArticleToModeratePagination;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const moderateArticle = async (data: ModerationRecordCreateType) => {
  try {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_MODERATOR_URL}/api/moderate-article/`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorText = (await res.json()) as { detail: string };
      throw new Error(JSON.stringify(errorText), { cause: res.text });
    }
    const data = (await res.json()) as { message: string };
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};
