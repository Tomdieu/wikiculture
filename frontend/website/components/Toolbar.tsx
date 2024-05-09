"use client";

import React, { ElementRef, useRef, useState } from "react";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticle, updateArticle } from "@/actions/articles";
import { ArticleType, ArticleUpdateType } from "@/types";
import { useArticleStore } from "@/hooks/use-article-store";

type ToolbarProps = {
  article: ArticleType;
  preview?: boolean;
};

const Toolbar = ({ article, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(article?.title||"Untileds");
  const converImage = useCoverImage();
  const { mutateArticle } = useArticleStore();

  // const queryClient = useQueryClient()

  // const { mutate } = useMutation({
  //     onSettled: () => {
  //         queryClient.invalidateQueries({ queryKey: ["article", article?.id] })

  //     },
  //     mutationFn: updateArticle
  // })

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(article?.title);
      inputRef?.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);

    mutateArticle({ title: value });

    // mutate({
    //     articleId: article.id, data: {
    //         title: value
    //     }
    // })
  };

  const onInput = (value: string) => {
    setValue(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    // mutate({ articleId: article.id, data: { icon } })
    mutateArticle({ icon });
  };

  const onRemoveIcon = () => {
    // mutate({ articleId: article.id, data: { icon: "" } })
    mutateArticle({ icon: "" });
  };

  return (
    <div className="group relative">
      {!!article.icon && !preview && (
        <div className="flex items-center gax-x-2 group/icon">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {article.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!article.icon && preview && (
        <p className="text-6xl pt-6">{article.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!article.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!article.cover_image && !preview && (
          <Button
            onClick={converImage.onOpen}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          placeholder="Title"
          onChange={(e) => onInput(e.target.value)}
          className="text-3xl placeholder:text-muted-foreground lg:text-5xl bg-transparent font-bold break-words outline-none text-stone-700 dark:text-stone-200 resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-3xl lg:text-5xl font-bold break-words text-stone-700 dark:text-stone-200"
        >
          {article.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
