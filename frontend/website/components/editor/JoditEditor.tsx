"use client"
import React, { useMemo, useRef } from 'react'
import Editor, { Jodit } from "jodit-react";
import { FileType } from '@/types';
import { getSession } from '@/lib/getSession';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';


type Props = {
    value: string;
    onBlur: (value: string) => void;
    onChange: (value: string) => void;
}

const JoditEditor = ({ value, onBlur, onChange }: Props) => {
    const editor = useRef<Jodit>(null);
    const url = process.env.NEXT_PUBLIC_MEDIA_URL;
    const { theme } = useTheme();

    const { data: user, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => getSession()

    })

    function getImageUrlParts(imageUrl: string) {
        // Create an anchor element to parse the URL
        const url = document.createElement('a');
        url.href = imageUrl;

        // Extract base URL
        const baseUrl = url.origin + url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);

        // Check if it's a relative path
        const isRelativePath = !url.protocol || url.protocol === location.protocol;

        // Extract real relative path if it's a relative path
        const relativePath = isRelativePath ? url.pathname.slice(baseUrl.length) : '';

        return {
            baseUrl,
            relativePath
        };
    }

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typings...',
            editHTMLDocumentMode: true,
            theme:theme==="dark"?"dark":"light",
            uploader: {
                url: url + "/api/upload/",
                headers: {
                    "Authorization": `token ${user?.user.token}`
                },

                filesVariableName: function (i: number) {
                    return "file";
                },
                withCredentials: false,
                pathVariableName: "path",
                format: "json",
                method: "POST",
                prepareData: function (formData: FormData) {
                    var file = formData.getAll("files[0]")[0];
                    formData.append("file", file);
                    return formData;
                },
                isSuccess: function (resp: any) {

                    return !resp.error;
                },
                getMessage: function (resp: any) {

                    return resp.msgs.join("\n");
                },
                process: function (resp: FileType) {

                    const { baseUrl, relativePath } = getImageUrlParts(resp.file)

                    return {
                        files: resp.file,
                        error: resp.id ? 1 : 0,
                        message: "",
                        baseurl: baseUrl,
                        path: relativePath
                    };
                },
                defaultHandlerSuccess: async (resp: any) => {
                    console.log(resp)
                    const [tagName, attr] = ['img', 'src']
                    const em = document.createElement(tagName) as HTMLImageElement;
                    em.setAttribute(attr, resp.files)

                    console.log(em)

                    editor?.current?.selection?.insertImage(em, null, 250)

                    editor.current?.create?.element(tagName)
                    const elm = editor.current?.createInside?.element(tagName) as HTMLImageElement;
                    elm?.setAttribute(attr, resp.files);
                    if (elm) {
                        editor?.current?.selection?.insertImage(elm, null, 250);
                    }
                }
            },
        }),
        [editor.current,theme]
    );

    return (
        <Editor

            ref={editor}
            value={value}
            onBlur={onBlur}
            config={config}
            onChange={onChange}
        />
    )
}

export default JoditEditor