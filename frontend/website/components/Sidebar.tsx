"use client";
import Link from "next/link";
import React from "react";
import { ChevronRight, Dot } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import sidebarData from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const Sidebar = (props: Props) => {
  const path = usePathname();
  const {} = useQuery({
    queryKey:["user"],
    
  })
  return (
    <div className="w-full flex flex-col h-screen overflow-y-auto">
      <div className="py-5 px-4 border-b border-b-stone-100 dark:border-b-stone-600 flex items-center justify-between relative">
        <Link href={"/dashboard"}>
          <h1 className="transition-all duration-500 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold cursor-pointer select-none">
            WikiCulture
          </h1>
        </Link>
      </div>
      <div className="flex flex-col space-y-3 px-4 py-3 justify-center">
        <div className="flex flex-col space-y-2 flex-1">
          {sidebarData.map((item, index) => (
            <React.Fragment key={index}>
              {item.sublinks ? (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex-1">
                    <div
                      className={cn(
                        "rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full"
                      )}
                    >
                      <div className="flex items-center space-x-3 flex-1 w-full">
                        <div className="border-none rounded-md flex items-center justify-center p-2">
                          <item.icon className="md:h-5 md:w-5 lg:w-6 lg:h-6" />
                        </div>
                        <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                          {item.text}
                        </span>
                      </div>
                      <ChevronRight size={16} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-8 transition-all ease-in-out duration-500">
                    <div className="flex flex-col space-y-2 border-l">
                      {item.sublinks.map((sublink, subIndex) => (
                        <Link href={sublink.link} key={subIndex}>
                         
                          <div
                            className={cn(
                              "flex items-center space-x-3 flex-1 cursor-pointer text-none truncate ml-1",
                              sublink.link === path &&
                                "bg-primary text-stone-50 dark:text-stone-950 rounded-md py-1 sm:py-2"
                            )}
                          >
                            <div className="border-none rounded-md flex items-center justify-center p-2">
                              <sublink.icon className="md:h-5 md:w-5 lg:w-6 lg:h-6" />
                            </div>
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                              {sublink.text}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link href={item.link}>
                  <div
                    className={cn(
                      "rounded-md select-none flex items-center justify-between space-x-3 py-2 px-3 cursor-pointer w-full",
                      item.link === path &&
                        "bg-primary text-stone-50 dark:text-stone-950"
                    )}
                  >
                    <div className="flex items-center space-x-3 flex-1 w-full">
                      <div className="border-none rounded-md flex items-center justify-center p-2 truncate">
                        <item.icon size={24} className="md:h-5 md:w-5 lg:w-6 lg:h-6"/>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                        {item.text}
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
