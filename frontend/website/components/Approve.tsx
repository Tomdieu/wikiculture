import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { ArticleType } from "@/types";
  import { useRouter } from "next/navigation";
import { Button } from './ui/button';
import { VerifiedIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    article:ArticleType
}

const Approve = ({article}: Props) => {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost">
                Approve <VerifiedIcon className={cn("w-4 h-4 ml-2",{"text-sky-blue":article.approved})} />
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="flex flex-col items-center space-y-4 w-full">
            <VerifiedIcon className={cn("w-10 h-10",{"text-sky-blue":article.approved})} />
            <p className="text-sm text-muted-foreground">Approve this aticle</p>
            <div className="flex space-x-3 items-center justify-between w-full">
                <Button size="sm" className="w-full">Approve</Button>
                <Button size="sm" className="w-full">Reject</Button>
                </div>
                </div>
            </PopoverContent>
        </Popover>

  )
}

export default Approve