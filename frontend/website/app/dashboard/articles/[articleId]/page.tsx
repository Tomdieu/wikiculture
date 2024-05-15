"use client";
import JoditEditor from "jodit-react";
import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import Publish from "@/components/Publish";
import More from "@/components/ArticleSettings";
// import Editor from "@/components/Editor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticle, updateArticle } from "@/actions/articles";
import { useArticleStore } from "@/hooks/use-article-store";
import { Skeleton } from "@/components/ui/skeleton";

import TagInput from "@/components/TagInput";
import CategoryInput from "@/components/CategoryInput";
import { ArticleType } from "@/types";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import PageNotFound from "./404";

// const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ArticlePageParams = {
  params: {
    articleId: number;
  };
};

export default function ArticlePage({
  params: { articleId },
}: ArticlePageParams) {
  const [mounted, setMounted] = useState(false);

  const editor = useRef(null);
  const { article, setArticle, saveArticle, mutateArticle } = useArticleStore();
  const [content, setContent] = useState(article?.content || "");

  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticle(articleId),
  });

  useEffect(() => {
    if (articleId) {
      const _a: Partial<ArticleType> = {};
      setArticle(_a);
    }
  }, [articleId]);

  useEffect(() => {
    if (data) {
      setArticle(data);
      setContent(data.content);
    }
  }, [data, setArticle]);

  const { mutate } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["article", article?.id] });
      toast.success("Article Saved");
    },
    mutationFn: updateArticle,
  });

  // Effect to attach and remove event listener
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();

        event.returnValue = true; // Display a custom message in some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-3 px-10">
        <Cover.Skeleton />
        <Skeleton className="w-[80%] h-14" />
        <Skeleton className="w-[60%] h-10" />
        <Skeleton className="w-[40%] h-7" />
        <Skeleton className="w-[20%] h-2" />
      </div>
    );
  }

  if (isError) {
    return (
      <PageNotFound
        params={{
          articleId: articleId,
        }}
      />
    );
  }

  if(data && article){
    console.log(data.categories)
    return (
      <div className="rounded-sm w-full h-full grid grid-cols-1 gap-y-3 space-y-3 mx-auto container mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-start lg:justify-between">
          <div className="grid grid-cols-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Edit Article
            </h1>
            {/* <p className="mt-3 text-gray-500 dark:text-gray-400 md:text-xl">
                              Share your thoughts and ideas with the world.
                          </p> */}
          </div>
          <div className="flex items-center space-x-2">
            <Publish article={data!} />
            <More article={data!} />
          </div>
        </div>
  
        <Cover url={article.cover_image} />
        <div className="w-full  md:max-w-3xl lg:max-w-4xl mx-auto"></div>
  
        <Toolbar article={(article as ArticleType)!} preview={false} />
        {/* <Editor /> */}
  
        <JoditEditor
          ref={editor}
          // value={content}
          value={article.content!}
          onBlur={(newContent) => {
            mutateArticle({ content: newContent });
          }}
          // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
        <CategoryInput
          onCategoryChange={(categories) => {
            mutateArticle({ categories });
          }}
          categories={article.categories!}
        />
  
        <TagInput
          onTagChange={(tags) => {
            mutateArticle({ tags });
          }}
          tags={article.tags}
        />
        <Button size={"lg"} onClick={saveArticle}>
          <Save className="w-5 h-5 mr-2" />
          Save Article
        </Button>
        <div className="mb-50 h-24"></div>
      </div>
    );
  }

  return null;
  
}
