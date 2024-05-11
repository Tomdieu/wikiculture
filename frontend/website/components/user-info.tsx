"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from 'next-auth/react'


type Props = {}

const UserInfo = (props: Props) => {
    const {data:session} = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
                <Avatar className="rounded-full p-0.5">
                    <AvatarImage className='rounded-full' src={session?.user?.image || ""} />
                    <AvatarFallback className='rounded-full shadow-sm uppercase'>{session?.user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserInfo