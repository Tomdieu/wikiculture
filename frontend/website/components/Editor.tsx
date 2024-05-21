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
import { ChangeEvent, useCallback, useEffect } from "react";

interface EditorProps {
    onChange?: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
    value: string;
}

// Our <Editor> component we can reuse later
export default function Editor({ onChange, initialContent, editable, value}: EditorProps) {

    const { resolvedTheme } = useTheme()

    const handleUpload = async (file: File) => {
        // upload file to media service
        const formData = new FormData()
        formData.append("file", file)
        const res = await uploadImage(formData)
        return res.file
    }

    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload,
    });

    // For initialization; on mount, convert the initial HTML to blocks and replace the default editor's content
    useEffect(() => {
        async function loadInitialHTML() {
            if(value){
                const blocks = await editor.tryParseMarkdownToBlocks(value);
                editor.replaceBlocks(editor.document, blocks);
            }
        }
        loadInitialHTML();
    }, [editor,value]);

    // Renders the editor instance using a React component.
    return <BlockNoteView editable={editable} theme={resolvedTheme == "dark" ? "dark" : "light"} className="w-full h-full flex-1 p-0 m-0" editor={editor} onChange={async () => {
        // console.log(JSON.stringify(editor.document, null, 2))
        const html = await editor.blocksToMarkdownLossy(editor.document)
        if (onChange) {
            onChange(html)
            console.log(html)
        }
    }} />;
}
