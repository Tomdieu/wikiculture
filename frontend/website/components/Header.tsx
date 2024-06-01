import React from "react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { getSession } from "@/lib/getSession";
import UserInfo from "./user-info";

type Props = {};

const Header = async (props: Props) => {
  const session = await getSession();
  return (
    <div className="flex items-center justify-between p-3  xl:p-6 border-b">
      <Link className="flex items-center justify-center" href="/">
        <h1 className="text-2xl font-bold">Wikiculture</h1>
      </Link>
      <div className="flex items-center space-x-3">
        <nav className="hidden ml-auto sm:flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/articles"
          >
            Articles
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          {session?.user && (
<Link
className="text-sm border rounded-full p-2 border-primary-foreground  shadow font-medium hover:bg-primary hover:text-primary-foreground underline-offset-4"
href="/dashboard/articles/new"
>
Create an article
</Link>
          )}
          
        </nav>
        <ModeToggle />
        {session?.user && <UserInfo />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="sm:hidden">
              <MoreHorizontalIcon className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Explore
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Articles
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/login"
              >
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/register"
              >
                Sign Up
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
