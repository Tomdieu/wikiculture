"use client"
import { getArticleWithRecommendation } from "@/actions/articles";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import React from "react";
import parseHtml from "html-react-parser";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import Article from "../../_components/Article";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import ShowArticle from "./_components/ShowArticle";

type Props = {
  params: {
    articleId: number;
  };
};


const ArticleDetail =  ({ params: { articleId } }: Props) => {
  
  const {data,isLoading,isError} = useQuery({
    queryKey:["article",articleId],
    queryFn:()=>getArticleWithRecommendation(articleId)
  })

  if(isLoading){
    return (
      <p>Loading...</p>
    )
  }

  if(isError){
    return <p>Something went wrong</p>
  }

  if(!isLoading && data){
    return <ShowArticle articleData={data}/>
  }

  return null;
};

export default ArticleDetail;
