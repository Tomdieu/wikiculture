import Logo from "@/components/logo";
import {Button} from "@/components/ui/button";
import Img from "@/components/Img";
import Link from "next/link";


export default function Footer() {
    return (
        <div className={"flex items-center w-full p-6 bg-background z-50"}>
            {/*<Logo/>*/}
            <Link href={"/"}>
                <Img  width={32} height={32} className={"cursor-pointer hidden md:inline-block"}/>
            </Link>
            <a href="https://storyset.com/home">Home illustrations by Storyset</a>
            <div
                className={"w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground md:ml-auto"}>
                <Button variant={"ghost"} size={"sm"}>Privacy Policy</Button>
                <Button variant={"ghost"} size={"sm"}>Terms & Conditions</Button>

            </div>
        </div>
    );
}