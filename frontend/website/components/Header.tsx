import React from "react";
import { ModeToggle } from "./theme-toggle";

import Link from "next/link";

import { getSession } from "@/lib/getSession";
import UserInfo from "./user-info";
import { Input } from "./ui/input";
import NavLink from "./NavLink";
import HeaderSheet from "./HeaderSheet";


type Props = {};

const Header = async (props: Props) => {
  const session = await getSession();
  return (
    <div className="flex items-center justify-between p-3  xl:p-6 border-b">
      <Link className="flex items-center justify-center" href="/">
        <h1 className="text-2xl font-bold">Wikiculture</h1>
      </Link>
      <div className="flex items-center space-x-3">
        <NavLink />
        <ModeToggle />
        {session?.user && <UserInfo />}
        <HeaderSheet session={session} />
      </div>
    </div>
  );
};

export default Header;
