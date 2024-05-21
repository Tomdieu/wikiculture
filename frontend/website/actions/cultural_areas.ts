import { CulturalAreaListType } from "@/types";

export const getCulturalAreas = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/cultural-areas/all/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json() as CulturalAreaListType[];
    return data
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};
