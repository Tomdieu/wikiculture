"use server";

import { VillagesPaginationType } from "@/types";

export const getVillages = async (page:string="1",query:string='') => {
  try {
    const url = query === "" ? `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/villages/?page=${page}`:`${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/villages/search/?page=${page}&query=${query}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as VillagesPaginationType;
    return data;
  } catch (error) {
    console.error("Error fetching cultural areas:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};
