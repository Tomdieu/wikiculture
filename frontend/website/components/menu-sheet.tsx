import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

type Props = {};

const MenuSheet = (props: Props) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Menu className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="md:hidden md:w-full p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
