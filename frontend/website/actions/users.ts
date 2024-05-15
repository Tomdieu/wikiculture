"use server"

import { getSession } from "@/lib/getSession";
import { UserPaginationType, UserType } from "@/types";


export const getUsers = async (page?:string) => {
    try {
        const session = await getSession();

        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`;
        url = page ? url + `?page=${page}` : url;

        const res = await fetch(url, {
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        }
        )
        const data = (await res.json()) as UserPaginationType;
        return data;
    } catch (error) {
        console.log("Error fetching users.")
        throw error;
    }
}

export const getModerators = async (page?:string) => {
    try {
        const session = await getSession();

        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/moderator/`;
        url = page ? url + `?page=${page}` : url;
        const res = await fetch(url, {
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        }
        )
        const data = (await res.json()) as UserPaginationType;
        return data;
    } catch (error) {
        console.log("Error fetching users.")
        throw error;
    }
}


export const getUser = async (userId: number) => {
    try {
        const session = await getSession();

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/`;
        const res = await fetch(url, {
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        }
        )
        const data = (await res.json()) as UserType;
        return data;
    } catch (error) {
        console.log("Error fetching user.")
        throw error;
    }
}


export const deleteUser = async (userId: number) => {
    try {
        const session = await getSession();

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        }
        )
        const data = (await res.json()) as UserType;
        return data;
    } catch (error) {
        console.log("Error fetching user.")
        throw error;
    }
}
