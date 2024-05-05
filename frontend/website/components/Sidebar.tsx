import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button";
import { BarChart2, Bell, ChevronRight, ChevronsLeft, Files, FolderClosed, LibraryBig, LogOut, MessageSquareMore, MoreHorizontalIcon, Plus, Upload, Users } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"



type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="w-full flex flex-col ">

            <div className="py-5 px-4 border-b border-b-stone-100 flex items-center justify-between relative">
                <Link href={"/dashboard"}>
                    <h1 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-bold cursor-pointer select-none">WikiCulture</h1>
                </Link>
            </div>
            <div className="flex flex-col space-y-3 px-4 py-3 flex-1 justify-center overflow-y-auto">
                <div className='flex flex-col space-y-2 flex-1'>
                    <div className='rounded-md select-none flex items-center space-x-3 bg-primary text-primary-foreground py-3 px-3 cursor-pointer hover:bg-stone-600'>
                        <BarChart2 size={24} />
                        <span>Dashboard</span>
                    </div>
                    <Collapsible>
                        <CollapsibleTrigger className='w-full flex-1'>
                            <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                                <div className="flex items-center space-x-3 flex-1 w-full">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Users />

                                    </div>
                                    <span>Users</span>
                                </div>
                                <ChevronRight />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="flex flex-col space-y-2 border-l mx-5 px-4">
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Users />

                                    </div>
                                    <span>Users</span>
                                </div>
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Plus size={24} />

                                    </div>
                                    <span>Moderators</span>
                                </div>
                            </div>

                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger className='w-full flex-1'>
                            <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                                <div className="flex items-center space-x-3 flex-1 w-full">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <LibraryBig size={24} />

                                    </div>
                                    <span>Articles</span>
                                </div>
                                <ChevronRight />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="flex flex-col space-y-2 border-l mx-5 px-4">
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Files />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Plus size={24} />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                            </div>

                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger className='w-full flex-1'>
                            <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                                <div className="flex items-center space-x-3 flex-1 w-full">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <LibraryBig size={24} />

                                    </div>
                                    <span>Articles</span>
                                </div>
                                <ChevronRight />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="flex flex-col space-y-2 border-l mx-5 px-4">
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Files />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Plus size={24} />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                            </div>

                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger className='w-full flex-1'>
                            <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                                <div className="flex items-center space-x-3 flex-1 w-full">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <LibraryBig size={24} />

                                    </div>
                                    <span>Articles</span>
                                </div>
                                <ChevronRight />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="flex flex-col space-y-2 border-l mx-5 px-4">
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Files />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Plus size={24} />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                            </div>

                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger className='w-full flex-1'>
                            <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                                <div className="flex items-center space-x-3 flex-1 w-full">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <FolderClosed />

                                    </div>
                                    <span>Media</span>
                                </div>
                                <ChevronRight />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="flex flex-col space-y-2 border-l mx-5 px-4">
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Files />

                                    </div>
                                    <span>All Articles</span>
                                </div>
                                <div className="flex items-center space-x-3 flex-1 cursor-pointer text-none">
                                    <div className="border rounded-md flex items-center justify-center p-2">
                                        <Upload />

                                    </div>
                                    <span>Upload File</span>
                                </div>
                            </div>

                        </CollapsibleContent>
                    </Collapsible>
                    <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                        <div className="flex items-center space-x-3 flex-1 w-full">
                            <div className="border rounded-md flex items-center justify-center p-2">
                                <MessageSquareMore />

                            </div>
                            <span>Comments</span>
                        </div>
                    </div>
                    <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                        <div className="flex items-center space-x-3 flex-1 w-full">
                            <div className="border rounded-md flex items-center justify-center p-2">
                                <Bell />

                            </div>
                            <span>Notifications</span>
                        </div>
                    </div>
                </div>
                <div className='rounded-md select-none flex items-center justify-between space-x-3 py-3 px-3 cursor-pointer w-full'>

                        <div className="flex items-center space-x-3 flex-1 w-full">
                            <div className="border rounded-md flex items-center justify-center p-2">
                                <LogOut />

                            </div>
                            <span>Logout</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Sidebar