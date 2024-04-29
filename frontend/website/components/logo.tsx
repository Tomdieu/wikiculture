import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Logo({className}: { className?: string }) {
    return (
        <div className={"flex items-end"}>
            <Link href={"/"}>
                <h1 className={cn("hidden lg:block text-2xl lg:text-3xl font-bold cursor-pointer select-none", className)}> WikiCulture</h1>
            </Link>
        </div>
    )
}

