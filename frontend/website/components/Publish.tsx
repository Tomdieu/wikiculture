"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { ArticleType } from "@/types";
import { updateArticle } from "@/actions/articles";
import { Check, Copy, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { useArticleStore } from "@/hooks/use-article-store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  article: ArticleType;
};

const Publish = ({ article }: Props) => {
  const origin = useOrigin();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { mutateArticle } = useArticleStore();

  const url = `${origin}/articles/${article.id}`;

  const onPublish = async () => {
    setIsSubmiting(true);

    const promise = updateArticle({
      articleId: article.id,
      data: { is_published: true },
    })
      .then((article) => {
        mutateArticle({ ...article });
      })
      .finally(() => setIsSubmiting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Article published would be display public when approved",
      error: "Failed to publish article",
    });

    
    promise.finally(() => {
      queryClient.invalidateQueries({ queryKey: ["article", article?.id] });
      setIsSubmiting(false);
    });
    router.refresh();
  };

  const onUnPublish = async () => {
    setIsSubmiting(true);

    const promise = updateArticle({
      articleId: article.id,
      data: { is_published: false },
    }).then((article) => {
      mutateArticle({ ...article });
    });

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Article unblished",
      error: "Failed to unpublish article",
    });

    
    

    promise.finally(() => {
      queryClient.invalidateQueries({ queryKey: ["article", article?.id] });
      setIsSubmiting(false);
    });

    router.refresh();
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          Publish{" "}
          {article.is_published && (
            <Globe className="ml-2 w-4 h-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {article.is_published ? (
          <div className="space-y-4 w-full">
            <div className="flex flex-col w-full space-y-2 items-center justify-center gap-x-2">
              <div className="flex space-x-1">
                <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                {article.approved ? (
                  <p className="text-xs font-medium text-sky-500">
                    This article is live on web
                  </p>
                ) : (
                  <p className="text-xs font-medium text-orange-400">
                    This article is waiting to be approved
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4">
                <input
                  value={url}
                  className="col-span-3 text-xs border rounded-l-md h-8 px-1 bg-muted truncate"
                  disabled
                />
                <Button
                  size={"sm"}
                  onClick={onCopy}
                  disabled={copied}
                  className="h-8 rounded-l-none"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                className="w-full text-xs"
                disabled={isSubmiting}
                onClick={onUnPublish}
              >
                Unpublish
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center">
              <Globe className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-2">Publish this article</p>
              <Button
                className="w-full text-xs"
                size={"sm"}
                disabled={isSubmiting}
                onClick={onPublish}
              >
                Publish
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
