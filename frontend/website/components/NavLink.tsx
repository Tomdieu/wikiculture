"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const NavLink = () => {
  const pathName = usePathname();
  return (
    <nav className="hidden ml-auto md:flex gap-4 sm:gap-6 items-center">
        {['explore','articles','about'].map((link,index)=>(
          <Link
          className={cn("text-sm font-medium hover:underline underline-offset-4 capitalize",{
            'font-bold':pathName.includes(`/${link}`)
          })}
          href={`/${link}`}
          key={index}
        >
          {link}
        </Link> 
        ))}
      
      <form method="get" action="/search">
        <Input type="search" name="query" placeholder="Search article" />
      </form>
    </nav>
  );
};

export default NavLink;
