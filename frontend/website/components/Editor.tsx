"use client"; // this registers <Editor> as a Client Component
import {
    BlockNoteView, useCreateBlockNote, darkDefaultTheme,
    lightDefaultTheme,
} from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/fonts/inter.css";

import "@blocknote/react/style.css";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean
}

// Our <Editor> component we can reuse later
export default function Editor({ onChange, initialContent, editable }: EditorProps) {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,

    });

    // Renders the editor instance using a React component.
    return <BlockNoteView theme={lightDefaultTheme} className="w-full h-full flex-1" editor={editor} onChange={() => {
        console.log(JSON.stringify(editor.document,null,2))
    }} />;
}
