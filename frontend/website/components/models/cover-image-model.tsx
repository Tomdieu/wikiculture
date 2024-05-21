"use client"

import { updateArticle } from "@/actions/articles"
import { replaceImage, uploadImage } from "@/actions/media"
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"

import { useCoverImage } from "@/hooks/use-cover-image"
import { LoaderIcon, UploadIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useArticleStore } from "@/hooks/use-article-store"
import { FileType } from "@/types"
import { useSession } from "next-auth/react"
import { toast } from "sonner"


export const CoverImageModel = () => {
    const params = useParams()
    const coverImage = useCoverImage()
    const { data: session } = useSession()
    const [_file, setFile] = useState<File>()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const { article,mutateArticle } = useArticleStore()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["article", article?.id] })

        },
        mutationFn: updateArticle
    })


    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmiting(true)
            setFile(file)

            if (coverImage.url) {
                // replace the coverImage url
                const formData = new FormData()

                formData.append("file", file)
                formData.append("replaceTargetUrl",coverImage.url)
                const res = await replaceImage(formData)
                
                if(res.file){
                    toast.success("Cover image replace successfully")
                }

                mutateArticle({
                    cover_image:res.file
                })


                // mutate({
                //     articleId: parseInt(params.articleId as string),
                //     data: {
                //         cover_image: res.file
                //     }
                // })

            } else {
                const formData = new FormData()

                formData.append("file", file)

                const res = await uploadImage(formData)

                if(res.file){
                    mutateArticle({
                        cover_image:res.file
                    })
                    // mutate({
                    //     articleId:article?.id!,
                    //     data:{
                    //         cover_image:res.file
                    //     }
                    // })
                }



            }

            setIsSubmiting(false)
            coverImage.onClose()
        }
    }

    const onClose = () => {
        setFile(undefined)
        setIsSubmiting(false)
        coverImage.onClose()
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm sm:max-w-md lg:max-w-3xl">
                <DialogHeader>
                    <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">Cover Image</h2>
                </DialogHeader>
                <div className="relative">
                    {isSubmiting && (
                        <div className="absolute z-50 w-full h-full flex items-center justify-center opacity-100">
                            <LoaderIcon className="animate-spin w-10 h-10 text-muted-foreground" />
                        </div>
                    )}

                    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                        <div className="grid gap-2">
                            <div className="group relative flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500">
                                <div className="pointer-events-none flex flex-col items-center justiy-center">
                                    <UploadIcon className="h-8 w-8 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Upload a file or drag and drop.</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input disabled={isSubmiting} accept="image/*" onChange={(e) => { e.preventDefault(); onChange(e.target.files?.[0]) }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" id="image" type="file" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
