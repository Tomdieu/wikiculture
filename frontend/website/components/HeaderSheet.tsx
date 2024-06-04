"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session|null;
};

const HeaderSheet = ({ session }: Props) => {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <AlignJustifyIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-2">
          {["explore", "articles", "cultural-regions", "search", "about"].map(
            (link, index) => (
              <SheetClose asChild key={index}>
                <Link
                  key={index}
                  className={cn(
                    "text-sm font-medium hover:underline underline-offset-4 capitalize",
                    { underline: pathName.includes(`/${link}`) }
                  )}
                  href={`/${link}`}
                >
                  {link}
                </Link>
              </SheetClose>
            )
          )}

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
