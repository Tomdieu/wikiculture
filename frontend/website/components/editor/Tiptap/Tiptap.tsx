"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'


import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import Toolbar from "./Toolbar.tsx";

type TiptapProps = {
  editable?: boolean;
  content: string;
  onChange:(value:string)=>void;
};

const Tiptap = ({ content, editable = true ,onChange}: TiptapProps) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, Highlight,Dropcursor,Image],
    content: content,
    editable: editable,
    // injectCSS: true,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
  });

  
  return (
    <div className="w-full px-4">
      {/* {editor && (
        <>
          <BubbleMenu className="border rounded-md" editor={editor} tippyOptions={{ duration: 100 }}>
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn("font-bold rounded-r-none", {
                "is-active bg-stone-400": editor.isActive("bold"),
              })}
              size={"icon"}
              variant={"outline"}
            >
              B
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn("italic rounded-none", { "is-active bg-stone-400": editor.isActive("italic") })}
              size={"icon"}
              variant={"outline"}
            >
              I
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn("line-through rounded-l-none", { "is-active bg-stone-400": editor.isActive("strike") })}
              size={"icon"}
              variant={"outline"}
            >
              S
            </Button>
          </BubbleMenu>
        </>
      )} */}
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
