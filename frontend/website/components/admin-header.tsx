import React from 'react'
import { Input } from './ui/input'
import UserInfo from './user-info'
import { Bell, Menu, Search } from 'lucide-react'
import { Button } from './ui/button'
import { ModeToggle } from './theme-toggle'


type Props = {}

const AdminHeader = (props: Props) => {
    return (
        <div className='w-full container mx-auto py-5 px-2 flex items-center justify-between space-x-5'>

            <div>
                <Button size={"icon"} variant={"ghost"}>
                    <Menu className='text-muted-foreground'/>
                </Button>
            </div>

            <div className='flex-1 border rounded-lg px-2 flex items-center'>
                <Search className='text-muted-foreground'/>
                <Input type="search" className='flex-1 border-none focus-within:border-none focus-visible:ring-0' placeholder="Search an article" />
            </div>

            <div className="flex space-x-2 gap-5 mx items-center">
                <div className='flex items-center'>
                <Button variant={"link"} className="relative">
                    <Bell className='text-muted-foreground'/>
                    <span className='absolute -top-1 right-1 bg-blue-500 text-stone-50 border border-muted-foreground rounded-full p-1 text-xs h-5 w-5 z-50 flex items-center justify-center'>05</span>
                </Button>
                <ModeToggle/>
                </div>
                <UserInfo />
            </div>


        </div>
    )
}

export default AdminHeader