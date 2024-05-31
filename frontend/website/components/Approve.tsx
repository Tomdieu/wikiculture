"use client"
import React, { useRef, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { ArticleType } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from './ui/button';
import { Loader, VerifiedIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackSchema, FeedbackSchemaType } from '@/schema/feedback.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import toast from 'react-hot-toast';
import { moderateArticle } from '@/actions/moderators';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    article: ArticleType
    onSuccess?:()=>void;
}

const RejectForm = ({article,onSuccess}:Props) => {

    const queryClient = useQueryClient();

    const form = useForm<FeedbackSchemaType>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            feedback: ""
        }
    })

    const [isSubmitting,setIsSubmitting] = useState(false)

    async function onSubmit({feedback}: FeedbackSchemaType) { 
        setIsSubmitting(true)
        
        const res = await moderateArticle({article:article.id,feedback:feedback,decision:"approved"})
        if(res.message){
            toast.success('Article reject successfully')
            if(onSuccess){
                onSuccess()
            }
        }
        else{
            toast.error("Something went wrong")
        }
        setIsSubmitting(false)
        queryClient.invalidateQueries({ queryKey: ["article", article?.id] });
        
    }


    return (
        <Form {...form}>
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                                <Textarea placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button disabled={isSubmitting} className='w-full'>
                    {isSubmitting && <Loader className='w-4 h-4 animate-spin'/>}
                        Submit
                    </Button>
            </form>
        </Form>
    )
}

const Approve = ({ article }: Props) => {
    const queryClient = useQueryClient();
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleApprove = async () => {
        const res = await moderateArticle({article:article.id,feedback:"",decision:"approved"})
        if(res.message){
            toast.success("Article approve successfully")
        }
        else{
            toast.error("Something went wrong")
        }
        queryClient.invalidateQueries({ queryKey: ["article", article?.id] });

    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    Approve <VerifiedIcon className={cn("w-4 h-4 ml-2", { "text-orange-500": article.approved })} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                {!article.approved && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <VerifiedIcon className={cn("w-10 h-10", { "text-orange-500": article.approved })} />
                        <p className="text-sm text-muted-foreground">Approve this aticle</p>
                        <div className="flex space-x-3 items-center justify-between w-full">
                            <Button size="sm" className="w-full" onClick={handleApprove}>Approve</Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="w-full">Reject</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        Reject Article : {article.title}
                                    </DialogHeader>
                                    <RejectForm onSuccess={()=>{closeRef.current?.click()}} article={article}/>
                                    <DialogClose ref={closeRef}/>
                                </DialogContent>

                            </Dialog>


                        </div>
                    </div>
                )}

                {article.approved && (<div className='flex flex-col items-center space-y-4 w-full'>
                <VerifiedIcon className={cn("w-10 h-10", { "text-orange-500": article.approved })} />
                <p className="text-sm text-muted-foreground">Reject this aticle</p>
                <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="w-full">Reject</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        Reject Article : {article.title}
                                    </DialogHeader>
                                    <RejectForm onSuccess={()=>{closeRef.current?.click()}} article={article}/>
                                    <DialogClose ref={closeRef}/>
                                </DialogContent>

                            </Dialog>
                </div>)}

            </PopoverContent>
        </Popover>

    )
}

export default Approve