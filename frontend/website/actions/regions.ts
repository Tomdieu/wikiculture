"use server";

import { RegionPaginationType } from "@/types";


export const getRegions = async (page:string="1") => {
    try{
      const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/regions/?page=${page}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch article");
      }
      const data = await res.json() as RegionPaginationType;
      return data;
    }catch(error){
      console.error("Error fetching cultural areas:", error);
      throw error; // Rethrow the error to handle it at the caller level if needed
    }
  }