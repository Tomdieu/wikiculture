"use client"
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from './ui/button'
import { FileStack, MoreHorizontal, SaveAllIcon, Trash } from 'lucide-react'
import { ArticleType } from '@/types'
import { useArticleStore } from '@/hooks/use-article-store'
type Props = {
    article:ArticleType
}

const ArticleSettings = ({article}: Props) => {

    const {saveArticle,openVersionModel} = useArticleStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <MoreHorizontal className='text-muted-foreground'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' alignOffset={8} forceMount>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className='w-full space-y-1 space-x-1'>
                    <DropdownMenuGroup>

                    <DropdownMenuItem onClick={saveArticle} className='cursor-pointer text-sm w-full flex items-center text-green-500 dark:text-green-500'>
                            
                            <SaveAllIcon className='w-4 h-4 mr-2' />
                            Save
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={openVersionModel} className='cursor-pointer text-sm w-full flex items-center text-blue-500 dark:text-blue-500'>
                            
                            <FileStack className='w-4 h-4 mr-2' />
                            Versions
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className='my-4' />
                    <DropdownMenuGroup>

                        <DropdownMenuItem className='cursor-pointer text-sm w-full flex items-center text-red-400 dark:text-red-300'>
                            <Trash className='w-4 h-4 mr-2' />
                            Delete Article
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ArticleSettings