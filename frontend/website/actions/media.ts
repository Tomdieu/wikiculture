"use server";

import { getSession } from "@/lib/getSession";
import { FilePaginatorType, FileType } from "@/types";

export const getMedia = async (page?:string) =>{
    try {
    const session = await getSession();
        let url = `${process.env.NEXT_PUBLIC_MEDIA_URL}/api/media/`
        const isMine = !(["Admin","Moderator"].includes(session?.user?.user_type!)); 
        url = isMine ? url + "my_files/" : url;
        url = page ? url + `?page=${page}`  : url;
        const res = await fetch(url, {
            headers: {
                Authorization: `token ${session?.user.token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch article");
        }
        const data = (await res.json()) as FilePaginatorType;
        return data;
    } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
    }
}

export const uploadImage = async (formData:FormData) => {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_MEDIA_URL}/api/upload/`;

    const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `token ${session?.user.token}`,
        },
    });

    return (await res.json()) as FileType;
};

export const replaceImage = async (formData:FormData) => {
    "use server";
    const session = await getSession();
    try {
        const url = `${process.env.NEXT_PUBLIC_MEDIA_URL}/api/replace-file/`;
        
        const res = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `token ${session?.user.token}`,
            },
        });

        if (!res.ok) {
            // If response is not okay (HTTP status not in the range 200-299)
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return (await res.json()) as FileType;
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error("An error occurred during image upload:", error);
        // You can throw the error again or handle it as needed
        throw error;
    }
};

export const deleteFile = async (fileUrl: string) => {
    const session = await getSession();
    try {
        const url = `${process.env.NEXT_PUBLIC_MEDIA_URL}/api/delete-file/`;

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ url: fileUrl }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${session?.user.token}`,
            },
        });

        if (!res.ok) {
            // If response is not okay (HTTP status not in the range 200-299)
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error("An error occurred during image upload:", error);
        // You can throw the error again or handle it as needed
        throw error;
    }
};
