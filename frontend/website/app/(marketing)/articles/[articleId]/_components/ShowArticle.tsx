import { ArticleWithRecommendationType } from '@/types'
import { getArticleWithRecommendation, trackUserReadingTime } from "@/actions/articles";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import React, { useMemo } from "react";
import parseHtml from "html-react-parser";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Article from '@/app/(marketing)/_components/Article';
import { useState, useEffect } from "react"
import _ from "lodash"


type Props = {
    articleData: ArticleWithRecommendationType
}

const ShowArticle = ({ articleData }: Props) => {
    const {
        data: article,
        recommendations,
        related_articles,
    } = articleData;
    const [timeSpent, setTimeSpent] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null|NodeJS.Timeout>(null);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    useEffect(() => {
        // Start the timer when the component mounts
        const id = setInterval(() => {
            setTimeSpent(prevTime => prevTime + 1);
        }, 1000);
        setIntervalId(id);

        // Cleanup the timer when the component unmounts
        return () => clearInterval(id);
    }, []);


    const handleScroll = () => {
        // Get the scroll position
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Get the total scrollable height
        let scrollHeight = document.documentElement.scrollHeight;
        // Get the height of the viewport
        let clientHeight = document.documentElement.clientHeight;
        // Check if the user has scrolled to the bottom
        if (scrollTop + clientHeight >= scrollHeight) {
            if (!hasReachedEnd) {
                sendTimeSpent();
                if (intervalId !== null) {

                    clearInterval(intervalId);
                }
                alert("Scroll to end")
                setHasReachedEnd(true);
            }
        }
    };

    const sendTimeSpent = async () => {
        try {
              
              const res = await trackUserReadingTime(article.id,timeSpent);
              if(res.user){
                console.log("Sent")
              }
        } catch (error) {
            console.error('Error sending reading time data:', error);
        }
    };



    const throttledHandleScroll = useMemo(() => _.throttle(handleScroll, 200), [hasReachedEnd]);

    useEffect(() => {
        window.addEventListener('scroll', throttledHandleScroll);

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [throttledHandleScroll]);

    return (
        <div className="w-full h-full min-h-lvh container mx-auto py-8 space-y-4">
            <div className="flex flex-col md:flex-row w-full md:space-x-3">
                <div className="w-full md:w-3/4">
                    <article className="space-y-3">
                        <div className="flex items-center space-x-3 text-xs">
                            <time
                                dateTime={article.created_at}
                                className="text-gray-500 text-xs font-bold"
                            >
                                {formatDate(article.created_at)}
                            </time>
                            <span className="text-gray-400">1 min read</span>
                            <Link
                                href={`/author/${article.author.username}`}
                                className="hover:underline text-blue-500"
                            >
                                <span className="text-xs font-medium ">
                                    {article.author.username}
                                </span>
                            </Link>
                            <Link href={"#"} className="text-gray-400">
                                Chats: 2
                            </Link>
                            <div className="space-x-1">
                                {article.categories.map((cat, index) => (
                                    <Link
                                        key={index}
                                        href={"#"}
                                        className="rounded p-1 hover:underline bg-green-50 text-green-700"
                                    >
                                        <span className="">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 py-5">
                            <h1 className="text-5xl">
                                {article.icon} {article.title}
                            </h1>
                            {article.cover_image && (
                                <div className="relative w-full h-[35vh]">
                                    <Image
                                        src={article.cover_image}
                                        fill
                                        alt={article.title}
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div>{parseHtml(article.content)}</div>
                            <div className="flex space-x-2 flex-wrap">
                                {article.tags.map((tag) => (
                                    <span className="text-blue-800 bg-blue-100 font-bold text-xs p-1 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between space-x-3">
                            <div className="flex items-center  space-x-3">
                                <h3 className="text-xl">Share : </h3>
                                <div className="border rounded flex">
                                    <Link
                                        href={`http://twitter.com/share?text=${article.title}&url=`}
                                        className="p-1 text-green-600 hover:bg-green-200"
                                    >
                                        Twitter
                                    </Link>
                                    <Separator orientation="vertical" className="h-full" />
                                    <Link
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=`}
                                        className="p-1 text-green-600 hover:bg-green-200"
                                    >
                                        LinkedIn
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>287</span>
                                <Heart />
                            </div>
                        </div>
                        <div>
                            <Textarea placeholder="Type your comment..."></Textarea>
                        </div>
                    </article>
                </div>
                <div className="w-full md:w-1/4 p-0 space-y-3">
                    {article.village && (
                        <div className="w-full grid grid-cols-2 md:grid-cols-1">
                            <div>
                                <h1 className={"text font-bold"}>Cultural Area</h1>
                                <Link
                                    href={`/articles/?cultural_area=${article.village?.region.cultural_area.name}`}
                                    className={"text-sm text-muted-foreground hover:underline"}
                                >
                                    {article.village?.region.cultural_area.name}
                                </Link>
                            </div>
                            <div>
                                <h1 className={"text font-bold"}>Region</h1>
                                <Link
                                    href={`/articles/?region=$article.village?.region.name}`}
                                    className={"text-sm text-muted-foreground hover:underline"}
                                >
                                    {article.village?.region.name}
                                </Link>
                            </div>
                            <div>
                                <h1 className={"text font-bold"}>Village</h1>
                                <Link
                                    href={`/articles/?village=${article.village?.name}`}
                                    className={"text-sm text-muted-foreground hover:underline"}
                                >
                                    {article.village?.name}
                                </Link>
                            </div>
                        </div>
                    )}
                    <Separator />
                    {recommendations && (
                        <div>
                            <h1 className="font-bold text-xl">Recommended Articles</h1>
                            <div className="grid grid-cols-1 space-y-2">
                                {recommendations.map((article) => <Link href={`/articles/${article.id}/`}>
                                    <Article article={article} key={article.id} />
                                </Link>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Separator className="" />
            <div className="space-y-3">
                <h1 className="font-bold text-2xl">Related Articles</h1>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    {related_articles.map((article, index) => (
                        <Link href={`/articles/${article.id}/`}>
                            <Article article={article} key={index} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShowArticle