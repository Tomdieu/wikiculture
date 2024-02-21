"use client"

import Editor from "@/components/editor";
import {ModeToggle} from "@/components/theme-toggle";

export default function Article(){
    return <div className={"w-full h-full py-10"}>
        {/*<ModeToggle/>*/}
        <Editor onChange={()=>{}} />
    </div>
}