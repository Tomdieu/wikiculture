import { Tag, Tags, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const KeyCodes = {
  comma: 188,
  enter: 13,
  backSpace: 8,
  space: 32,
};

type TagInputProps = {
  tags?: string[];
  onTagChange?: (tags: string[]) => void;
  maxTags?:number
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

export default function TagInput({ tags, onTagChange,maxTags=10 }: TagInputProps) {
  const [_tags, setTags] = React.useState<string[]>(tags || []);
  const [value, setValue] = useState("");

  useEffect(()=>{
    if(_tags && onTagChange){
      onTagChange(_tags)
    }
  },[_tags])

  const handleDelete = (i: number) => {
    setTags(_tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag.length >= 1 && !_tags.includes(trimmedTag)) {
      setTags([..._tags, trimmedTag]);
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newIndex: number
  ) => {
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
    const newTags = [..._tags];
    const [draggedTag] = newTags.splice(draggedIndex, 1);
    newTags.splice(newIndex, 0, draggedTag);
    setTags(newTags);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(event.target.value.replaceAll(/[A_Za_z]/g,''))
    setValue(event.target.value.replaceAll(/[^A-Za-z0-9\-]/g, ""));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (delimiters.includes(event.keyCode)) {
      if (value.length >= 1) {
        handleAddition(value);

        setValue("");
      }
    }
    if (event.keyCode == KeyCodes.backSpace) {
      // remove last inserted tag
      if (value == "") {
        const lastTagIndex = _tags.length - 1;
        handleDelete(lastTagIndex);
      } else {
        // remove last chars from the value instead
        setValue(value.substring(0, value.length - 1));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-center gap-2">
        <Tag />
        <span className="font-bold">Tags</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Press enter or add a comma after each tag
      </p>
      <div className="border rounded-md py-2 px-2 flex gap-x-2 gap-y-2 flex-wrap">
        {_tags.map((tag, index) => (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            key={index}
            className="flex items-center space-x-2 border select-none rounded-sm px-2 bg-primary-foreground text-muted-foreground gap-2"
          >
            <span className="text-sm">{tag}</span>
            <div
              onClick={() => handleDelete(index)}
              className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-3 h-3 " />{" "}
            </div>
          </div>
        ))}
        <Input
          disabled={maxTags == _tags.length}
          className={cn("flex-1 border-none focus-within:border-none focus-visible:ring-0 shadow-none",maxTags == _tags.length && "opacity-0")}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className={cn("text-xs text-muted-foreground",maxTags-_tags.length < 3 ? "text-red-400":"text-primary")}>{maxTags-_tags.length} tags are remaining</span>
        <Button onClick={()=>setTags([])} size={"sm"} className="text-sm">Remove all</Button>
      </div>
    </div>
  );
}
