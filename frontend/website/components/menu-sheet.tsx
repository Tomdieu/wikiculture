"use client"
import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { ChevronRight, Dot, LoaderIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import sidebarData, { filterSidebarDataByUserType } from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";

type Props = {};

const MenuSheet = (props: Props) => {
  const path = usePathname();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getSession()

  })
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Menu className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="md:hidden md:w-full p-0">
        <div className="w-full flex flex-col h-screen overflow-y-auto">
          <div className="py-5 px-4 border-b border-b-stone-100 dark:border-b-stone-600 flex items-center justify-between relative">
            <Link href={"/dashboard"}>
              <h1 className="transition-all duration-500 text-xl sm:text-2xl lg:text-3xl font-medium cursor-pointer select-none">
                WikiCulture
              </h1>
            </Link>
          </div>
          <div className="flex flex-col space-y-3 px-4 py-3 justify-center h-full">
            <div className="flex flex-col space-y-2 flex-1">
              {isLoading && (
                <div className="flex flex-1 w-full h-full items-center justify-center">
                  <LoaderIcon className="animate-spin h-5 w-5" />
                </div>
              )}
              {!isError && data?.user && filterSidebarDataByUserType(data.user.user_type).map((item, index) => (
                <React.Fragment key={index}>
                  {item.sublinks ? (
                    <Collapsible>
                      <CollapsibleTrigger className="w-full flex-1">
                        <div
                          className={cn(
                            "rounded-md select-none flex items-center justify-between space-x-3 py-3 px-1 cursor-pointer w-full"
                            ,)}
                        >
                          <div className="flex items-center space-x-3 flex-1 w-full">
                            <div className="border-none rounded-md flex items-center justify-center p-2">
                              <item.icon className="md:h-5 md:w-5 lg:w-6 lg:h-6" />
                            </div>
                            <span className="text-xs sm:text-sm md:text-base ">
                              {item.text}
                            </span>
                          </div>
                          <ChevronRight size={16} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-8 transition-all ease-in-out duration-500">
                        <div className="flex flex-col space-y-2 border-l">
                          {item.sublinks.map((sublink, subIndex) => (
                            <SheetClose asChild>
                              <Link href={sublink.link} key={subIndex} >

                                <div
                                  className={cn(
                                    "flex items-center space-x-3 flex-1 cursor-pointer text-none truncate ml-1 py-1",
                                    sublink.link === path &&
                                    "bg-primary text-stone-50 dark:text-stone-950 rounded-md "
                                  )}
                                >
                                  <div className="border-none rounded-md flex items-center justify-center p-2">
                                    <sublink.icon className="md:h-5 md:w-5 lg:w-6 lg:h-6" />
                                  </div>
                                  <span className="text-xs sm:text-sm md:text-base line-clamp-1">
                                    {sublink.text}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>

                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SheetClose asChild>
                      <Link href={item.link} key={index} >

                        <div
                          className={cn(
                            "flex items-center space-x-3 flex-1 cursor-pointer text-none truncate ml-1 py-1",
                            item.link === path &&
                            "bg-primary text-stone-50 dark:text-stone-950 rounded-md "
                          )}
                        >
                          <div className="border-none rounded-md flex items-center justify-center p-2">
                            <item.icon className="md:h-5 md:w-5 lg:w-6 lg:h-6" />
                          </div>
                          <span className="text-xs sm:text-sm md:text-base line-clamp-1">
                            {item.text}
                          </span>
                        </div>
                      </Link>
                    </SheetClose>

                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
