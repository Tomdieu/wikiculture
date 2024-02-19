import {cn} from "@/lib/utils";
import Image from "next/image";


export default function Logo({className}: { className?: string }) {
    return (
        // <h1 className={cn("text-3xl cursor-pointer select-none font-bold bg-gradient-to-r from-blue-600 to-blue-300 via-green-400 bg-clip-text text-transparent", className)}>WikiCulture</h1>
    <div className={"flex items-end"}>
        <h1 className={cn("hidden lg:block text-3xl font-bold cursor-pointer select-none font-serif",className)}> WikiCulture</h1>
        {/*<h1 className={cn("text-3xl cursor-pointer select-none font-bold bg-gradient-to-r from-blue-600 to-blue-300 via-green-400 bg-clip-text text-transparent", className)}>WikiCulture</h1>*/}

    </div>
    )
}

