import React from 'react'
import { motion } from "framer-motion"
import { ArticleType, NotificationType } from '@/types'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/formatDate'
import { useRouter } from 'next/navigation'
import { formatTimeSince } from '@/lib/timeSince'
import Link from 'next/link'

type Props = {
    notification: NotificationType,
    index: number
}

const Notification = ({ notification, index }: Props) => {
    const router = useRouter()
    const article = JSON.parse(notification.data) as ArticleType;
    const gotToArticle = () => {

        router.push(`/dashboard/articles/${article.id}/`)
    }
    return (
        <motion.div variants={{
            hidden: {
                opacity: 0
            },
            visible: {
                opacity: 1,
                transition: {
                    duration: 200,
                    delay: 100
                }
            }
        }} animate={{ opacity: 1 }} className='border p-2 rounded-sm space-y-2 w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-sm'>{notification.type == "article_approved" ? `Your article ${article.title} was approved` : notification.message}</p>
                <span className='text-xs text-muted-foreground'>{formatTimeSince(notification.timestamp)}</span>
            </div>
            {["article_approved", "article_rejected"].includes(notification.type) && (

                <div className="w-full">
                    <Button asChild variant={"default"} size="sm" className="text-xs">
                        <Link href={`/dashboard/articles/${article.id}/`}>
                            View Article
                        </Link>
                    </Button>
                </div>
            )}
        </motion.div>
    )
}

export default Notification