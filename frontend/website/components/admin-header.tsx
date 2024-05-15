"use client";
import React from "react";
import { Input } from "./ui/input";
import UserInfo from "./user-info";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MenuSheet from "./menu-sheet";

type Props = {
  className?: string;
};

const AdminHeader = ({ className }: Props) => {
  const pathName = usePathname();
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full container mx-auto py-5 px-2 flex items-center justify-between space-x-5",
          pathName !== "/dashboard" && "justify-between md:justify-end "
        )}
      >
        <div className="flex md:hidden">
          {/* <Button size={"icon"} variant={"ghost"}>
            <Menu className="text-muted-foreground" />
          </Button> */}
          <MenuSheet/>
        </div>
        {pathName == "/dashboard" && (
          <div className="flex-1 border rounded-lg px-2 flex items-center">
            <Search className="text-muted-foreground" />
            <Input
              type="search"
              className="flex-1 border-none focus-within:border-none focus-visible:ring-0"
              placeholder="Search an article"
            />
          </div>
        )}

        <div className="flex space-x-1 gap-1 md:gap-5 mx items-center">
          <div className="flex items-center">
            <ModeToggle />
          </div>
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
