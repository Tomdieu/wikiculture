"use client";
import { usePathname } from "next/navigation";
import React from "react";

import {
  AlignJustifyIcon,
  Book,
  Globe,
  InfoIcon,
  MapIcon,
  Search,
} from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import Img from "./Img";

type Props = {
  session: Session | null;
};

const links = [
  { name: "explore", icon: MapIcon },
  { name: "articles", icon: Book },
  { name: "cultural-regions", icon: Globe },
  { name: "search", icon: Search },
  { name: "about", icon: InfoIcon },
];

const HeaderSheet = ({ session }: Props) => {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <AlignJustifyIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-2">
        <SheetClose asChild>
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <Img className="w-10 h-10" />
            <h1 className="font-bold text-xl">Wikiculture</h1>
          </Link>
        </SheetClose>
        <div className="flex flex-col space-y-2">
          {links.map((link, index) => (
            <SheetClose asChild key={index}>
              <Link
                key={index}
                className={cn(
                  "text-sm font-medium hover:underline underline-offset-4 capitalize hover:bg-slate-300 rounded-md p-1",
                  { underline: pathName.includes(`/${link.name}`) }
                )}
                href={`/${link.name}`}
              >
                <div className="flex items-center">
                  <link.icon className="w-5 h-5" />
                  <span className="ml-2">{link.name}</span>
                </div>
              </Link>
            </SheetClose>
          ))}

          {!session && (
            <>
              <SheetClose asChild>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/login"
                >
                  Sign In
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/register"
                >
                  Sign Up
                </Link>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
