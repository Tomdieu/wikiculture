import Link from 'next/link'
import React from 'react'
import {Button} from "@/components/ui/button";
import {MoreHorizontalIcon} from "lucide-react";

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="w-full flex flex-col">

            <div className="py-5 px-2 border-b flex items-center justify-between">
               <Link href={"/dashboard"}>
               <h1 className="text-xl font-bold cursor-pointer select-none">WikiCulture</h1>
               </Link>
               <Button size={"icon"} variant={"outline"}>
                    <MoreHorizontalIcon/>
                </Button>
            </div>
        </div>
    )
}

export default Sidebar