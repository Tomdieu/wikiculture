"use server";

import { RegionPaginationType, RegionType } from "@/types";


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
      console.error("Error fetching regions:", error);
      throw error; // Rethrow the error to handle it at the caller level if needed
    }
  }

  export const getAllRegions = async () => {
    try{
      const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/regions/all/`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch article");
      }
      const data = await res.json() as RegionType[];
      return data;
    }catch(error){
      console.error("Error fetching regions:", error);
      throw error; // Rethrow the error to handle it at the caller level if needed
    }
  }