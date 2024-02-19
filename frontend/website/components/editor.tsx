"use client";

import {BlockNoteEditor} from "@blocknote/core";
import {BlockNoteView, useBlockNote} from "@blocknote/react";
import "@blocknote/core/style.css"
import {useTheme} from "next-themes";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean
}

export const Editor = ({editable, onChange, initialContent}: EditorProps) => {
    const {resolvedTheme} = useTheme()
    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        }
    })
    return (
        <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"}/>

    )
}

export default Editor;

