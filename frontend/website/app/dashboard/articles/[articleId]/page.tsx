"use client";
// import JoditEditor, { Jodit } from "jodit-react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
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
import { ArticleType, FileType, VillageType } from "@/types";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import PageNotFound from "./not-found";
import { getSession } from "@/lib/getSession";
import JoditEditor from "@/components/editor/JoditEditor";
import VillageInput from "@/components/VillageInput";
import Approve from "@/components/Approve";
import { notFound } from "next/navigation";
import Tiptap from "@/components/editor/Tiptap/Tiptap";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ArticlePageParams = {
  params: {
    articleId: number;
  };
};

export default function ArticlePage({
  params: { articleId },
}: ArticlePageParams) {
  const [mounted, setMounted] = useState(false);

  const { article, setArticle, saveArticle, mutateArticle } = useArticleStore();
  const [content, setContent] = useState(article?.content || "");

  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const { data: userSession } = useQuery({
    queryKey: ["user"],
    queryFn: () => getSession(),
  });

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

  // Effect to attach and remove event listener
  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (unsavedChanges) {
  //       event.preventDefault();

  //       event.returnValue = true; // Display a custom message in some browsers
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [unsavedChanges]);

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
        <Skeleton className="w-[20%] h-7" />
        <Skeleton className="w-[40%] h-7" />
        <Skeleton className="w-[60%] h-10" />

        <Skeleton className="w-[80%] h-11" />
      </div>
    );
  }

  if (isError) {
    return notFound();
  }

  if (data && article?.id) {
    return (
      <div className="rounded-sm w-full h-full grid grid-cols-1 gap-y-3 space-y-3 mx-auto container mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-start lg:justify-between">
          <div className="grid grid-cols-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Edit Article
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {["Admin", "Moderator"].includes(userSession?.user.user_type!) && (
              <>
                {/* Here we make sure that only if an article was created by an admin it can not be un approved */}
                {article.author?.user_type !== "Admin" && (
                  <Approve article={data!} />
                )}
              </>
            )}

            <Publish article={data!} />
            <More article={data!} />
          </div>
        </div>
        <VillageInput
          village={article.village}
          onChange={(village) => {
            if (village) {
              mutateArticle({ village: village });
            }
          }}
        />

        <Cover url={article.cover_image} />
        <div className="w-full  md:max-w-3xl lg:max-w-4xl mx-auto"></div>

        <Toolbar article={(article as ArticleType)!} preview={false} />
        {/* <Editor value={article.content!} onChange={(newConte        <VillageInput/>
nt) => {
          mutateArticle({ content: newContent })
        }} /> */}

        <JoditEditor
          value={article.content!}
          onBlur={(newContent) => {
            mutateArticle({ content: newContent });
          }}
          onChange={(newContent) => {}}
          height={400}
        />
        {/* <Tiptap content={article.content!}  onChange={()=>{}} /> */}
        <CategoryInput
          onCategoryChange={(categories) => {
            mutateArticle({ categories });
          }}
          categories={article.categories || []}
        />

        <TagInput
          onTagChange={(tags) => {
            mutateArticle({ tags });
          }}
          tags={article.tags || []}
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
