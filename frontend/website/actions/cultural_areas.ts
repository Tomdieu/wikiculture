"use server";

import {
  CulturalAreaListType,
  CulturalAreaPaginationType,
  CulturalAreaType,
} from "@/types";

export const getAllCulturalAreas = async () => {
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
    const data = (await res.json()) as CulturalAreaListType[];
    return data;
  } catch (error) {
    console.error("Error fetching all cultural areas:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getCulturalAreas = async (page: string = "1") => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/cultural-areas/?page=${page}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as CulturalAreaPaginationType;
    return data;
  } catch (error) {
    console.error("Error fetching cultural areas:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getCulturalAreasByName = async (name: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/cultural-areas/get/?name=${name}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as CulturalAreaType;
    return data;
  } catch (error) {
    console.error("Error fetching cultural areas:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};
