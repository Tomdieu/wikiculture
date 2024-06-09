"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { Session } from "next-auth";

type NavLinkProps = {
  session: Session|null;
};

const NavLink = ({ session }: NavLinkProps) => {
  const pathName = usePathname();
  const url = session?.user ? "/dashboard/articles" : "/login";

  return (
    <nav className="hidden ml-auto md:flex gap-4 sm:gap-6 items-center">
      {["explore", "articles", "about"].map((link, index) => (
        <Link
          className={cn(
            "text-sm font-medium hover:underline underline-offset-4 capitalize",
            {
              "font-bold": pathName.includes(`/${link}`),
            }
          )}
          href={`/${link}`}
          key={index}
        >
          {link}
        </Link>
      ))}

      <Link
        href={url}
        className="flex items-center justify-center gap-1 p-2 bg-stone-950 text-white rounded-full hover:shadow-md"
      >
        <SquarePen className="w-5 h-5" />
        <span className="text-sm">Write</span>
      </Link>
    </nav>
  );
};

export default NavLink;
