// import React, { Component, createRef } from 'react';
// import Editor, { Jodit } from "jodit-react";
// import { FileType } from '@/types';
// import { getSession } from '@/lib/getSession';
// import { useQuery } from '@tanstack/react-query';

// type Props = {
//     value: string;
//     onBlur: (value: string) => void;
//     onChange: (value: string) => void;
// };


// class JoditEditor extends Component<Props> {
//     editor = createRef<Jodit>();
//     url = process.env.NEXT_PUBLIC_MEDIA_URL;

//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             user: null,
//             isError: false,
//             isLoading: true,
//         };
//     }

//     async componentDidMount() {
//         try {
//             const user = await getSession();
//             this.setState({ user, isLoading: false });
//         } catch (error) {
//             this.setState({ isError: true, isLoading: false });
//         }
//     }

//     getImageUrlParts(imageUrl: string) {
//         const url = document.createElement('a');
//         url.href = imageUrl;
//         const baseUrl = url.origin + url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);
//         const isRelativePath = !url.protocol || url.protocol === location.protocol;
//         const relativePath = isRelativePath ? url.pathname.slice(baseUrl.length) : '';
//         return {
//             baseUrl,
//             relativePath
//         };
//     }

//     getConfig() {
//         const { user } = this.state as {
//             user: null,
//             isError: boolean,
//             isLoading: boolean,
//         };
//         return {
//             readonly: false,
//             placeholder: 'Start typing...',
//             editHTMLDocumentMode: true,
//             uploader: {
//                 url: this.url + "/api/upload/",
//                 headers: {
//                     "Authorization": `token ${user?.user.token}`
//                 },
//                 filesVariableName: function (i: number) {
//                     return "file";
//                 },
//                 withCredentials: false,
//                 pathVariableName: "path",
//                 format: "json",
//                 method: "POST",
//                 prepareData: function (formData: FormData) {
//                     var file = formData.getAll("files[0]")[0];
//                     formData.append("file", file);
//                     return formData;
//                 },
//                 isSuccess: function (resp: any) {
//                     return !resp.error;
//                 },
//                 getMessage: function (resp: any) {
//                     return resp.msgs.join("\n");
//                 },
//                 process: (resp: FileType) => {
//                     const { baseUrl, relativePath } = this.getImageUrlParts(resp.file);
//                     return {
//                         files: resp.file,
//                         error: resp.id ? 1 : 0,
//                         message: "",
//                         baseurl: baseUrl,
//                         path: relativePath
//                     };
//                 },
//                 defaultHandlerSuccess: async (resp: any) => {
//                     console.log(resp);
//                     const [tagName, attr] = ['img', 'src'];
//                     const em = document.createElement(tagName) as HTMLImageElement;
//                     em.setAttribute(attr, resp.files);

//                     console.log(em);

//                     this.editor.current?.selection?.insertImage(em, null, 250);

//                     const elm = this.editor.current?.createInside?.element(tagName) as HTMLImageElement;
//                     elm?.setAttribute(attr, resp.files);
//                     if (elm) {
//                         this.editor.current?.selection?.insertImage(elm, null, 250);
//                     }
//                 }
//             },
//         };
//     }

//     render() {
//         const { value, onBlur, onChange } = this.props;
//         const config = this.getConfig();

//         return (
//             <Editor
//                 ref={this.editor}
//                 value={value}
//                 onBlur={onBlur}
//                 config={config}
//                 onChange={onChange}
//             />
//         )
//     }
// }

// export default JoditEditor;

import React, { useMemo, useRef } from 'react'
import Editor, { Jodit } from "jodit-react";
import { FileType } from '@/types';
import { getSession } from '@/lib/getSession';
import { useQuery } from '@tanstack/react-query';


type Props = {
    value: string;
    onBlur: (value: string) => void;
    onChange: (value: string) => void;
}

const JoditEditor = ({ value, onBlur, onChange }: Props) => {
    const editor = useRef<Jodit>(null);
    const url = process.env.NEXT_PUBLIC_MEDIA_URL;

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
        [editor.current]
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