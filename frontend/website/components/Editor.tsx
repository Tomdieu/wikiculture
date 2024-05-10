"use client"; // this registers <Editor> as a Client Component
import {
    BlockNoteView, useCreateBlockNote, darkDefaultTheme,
    lightDefaultTheme,
} from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/fonts/inter.css";

import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { uploadImage } from "@/actions/media";

interface EditorProps {
    onChange?: (value: string) => void;
    initialContent?: string;
    editable?: boolean
}

// Our <Editor> component we can reuse later
export default function Editor({ onChange, initialContent, editable }: EditorProps) {

    const { resolvedTheme } = useTheme()

    const handleUpload = async (file:File)=>{
        // upload file to media service
        const formData = new FormData()
        formData.append("file",file)
        const res = await uploadImage(formData)
        return res.file
    }

    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile:handleUpload,
        
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView theme={resolvedTheme == "dark" ? "dark" : "light"} className="w-full h-full flex-1" editor={editor} onChange={() => {
        // console.log(JSON.stringify(editor.document, null, 2))
    }} />;
}
