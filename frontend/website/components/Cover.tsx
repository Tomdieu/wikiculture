"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { ImageIcon, X } from 'lucide-react'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useParams } from 'next/navigation'
import { Skeleton } from './ui/skeleton'
import { deleteFile } from '@/actions/media'
import { toast } from 'sonner'
import { useArticleStore } from '@/hooks/use-article-store'

type CoverProps = {
    url?: string,
    preview?: boolean
}

const Cover = ({ url, preview }: CoverProps) => {
    const params = useParams()
    const converImage = useCoverImage()
    const {mutateArticle} = useArticleStore()

    // useEffect(()=>{

    // },[url])

    const onRemove = async () => {
        // delete the old image
        // using params.articleId as number
        if(url){

            const promise = deleteFile(url);
            toast.promise(promise,{
                success:"Cover image deleted successfully",
                error:"Could not delete cover image",
                loading:"Deleting cover image"
            })

            mutateArticle({
                cover_image:""
            })

        }
    }

    return (
        <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && "bg-muted")}>
            {/* {!!url && (
            )} */}
                <Image src={url || "/default-thumb.png"} fill alt='Cover' className='object-cover' />

            {url && !preview && (
                <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
                    <Button className='text-muted-foreground text-xs ' variant={"outline"} size={"sm"} onClick={()=>converImage.onReplace(url)}>
                        <ImageIcon className='h-4 w-4 mr-2' />
                        Change cover
                    </Button>
                    <Button className='text-muted-foreground text-xs ' variant={"outline"} size={"sm"} onClick={onRemove}>
                        <X className='h-4 w-4 mr-2' />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton(){
    return <Skeleton className='w-full h-[12vh]' />
}

export default Cover