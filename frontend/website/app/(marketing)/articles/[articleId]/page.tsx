"use client"
import { getArticleWithRecommendation } from "@/actions/articles";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ShowArticle from "./_components/ShowArticle";
import ArticleSkeleton from "./_components/ArticleSkeleton";
import { notFound } from "next/navigation";

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
      <>
       <ArticleSkeleton/>
      </>
    )
  }

  if(isError){
    return notFound()
  }

  if(!isLoading && data){
    return <ShowArticle articleData={data}/>
  }

  return null;
};

export default ArticleDetail;
