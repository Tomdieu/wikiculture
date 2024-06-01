"use server";

import { getSession } from "@/lib/getSession";
import { NotificationPaginationType } from "../types";

export const getNotifications = async (page:string="1") => {
  try {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_NOTIFICATION_URL}/api/notifications/?page=${page}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data as NotificationPaginationType;
  } catch (error) {}
};
