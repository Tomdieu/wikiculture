"use client";
import { Check, Plus, Tags, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/articles";
import { CategoryType } from "@/types";
import { Skeleton } from "./ui/skeleton";

type CategoryInputProps = {
  categories: CategoryType[];
  onCategoryChange?: (categories: CategoryType[]) => void;
  maxTags?: number;
};

export default function CategoryInput({
  categories,
  onCategoryChange,
  maxTags = 5,
}: CategoryInputProps) {
  const [_categories, setCategories] = React.useState<CategoryType[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] =
    useState<CategoryType[]>(categories);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    if (data) {
      setCategories(data?.results);
    }
  }, [data, isSuccess, setCategories]);

  useEffect(()=>{
    if(categories){
      setSelectedCategories(categories)
    }
  },[categories])

  const handleDelete = (id: number) => {
    setSelectedCategories(selectedCategories.filter((_, index) => id !== _.id));
  };

  const getCategoryFromId = (id: number) => {
    return _categories.find((cat) => cat.id == id);
  };

  const handleAddition = (category: CategoryType) => {
    const exists = selectedCategories.find((c) => c.id == category.id);
    if (!exists) {
      setSelectedCategories((previous) => [...previous, category]);
      setSelectedIds([...selectedIds, category.id]);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (selectedCategories && onCategoryChange) {
      onCategoryChange(selectedCategories);
    }
  }, [selectedCategories]);

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
    const newCategory = [...selectedCategories];
    const [draggedTag] = newCategory.splice(draggedIndex, 1);
    newCategory.splice(newIndex, 0, draggedTag);
    setSelectedCategories(newCategory);
  };

  if (isLoading) {
    return <Skeleton className="w-[90%] h-12" />;
  }

  if (isError) {
    return <p>Error : {error.message}</p>;
  }

  if (data) {
    return (
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2">
          <Tags />
          <span className="font-bold">Categories</span>
        </div>
        <p className="text-xs text-muted-foreground">
          You can select more than one category
        </p>
        <div className="border rounded-md py-2 px-2 flex gap-x-2 gap-y-2 flex-wrap">
          {categories?.map((cat, index) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              key={index}
              className="transition flex items-center space-x-2 border select-none rounded-sm px-2 bg-primary-foreground text-muted-foreground gap-2"
            >
              <span className="text-xs">{cat.name}</span>
              <div
                onClick={() => handleDelete(cat.id)}
                className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-3 h-3 " />{" "}
              </div>
            </div>
          ))}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                hidden={Boolean(maxTags === selectedCategories.length)}
                disabled={Boolean(maxTags == selectedCategories.length)}
                className="text-sm text-muted-foreground"
                variant={"outline"}
              >
                <Plus className="w-4 h-4 mr-2" />
                add category
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              alignOffset={8}
              forceMount
              className="w-[200px] p-0"
            >
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>Category not found.</CommandEmpty>
                <CommandGroup>
                  {_categories?.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.id.toString()}
                      disabled={Boolean(selectedIds.includes(category.id))}
                      className={cn(
                        selectedIds.includes(category.id) &&
                          "text-muted-foreground"
                      ,"text-xs")}
                      onSelect={(id) => {
                        // setValue(currentValue === value ? "" : currentValue);
                        const c = getCategoryFromId(parseInt(id));
                        if (c) {
                          handleAddition(c);
                        }
                        setOpen(false);
                      }}
                    >
                      {selectedIds.includes(category.id) && (
                        <Check className="w-5 h-5 mr-2 text-green-400" />
                      )}
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-xs text-muted-foreground",
              maxTags - selectedCategories.length < 3
                ? "text-red-400"
                : "text-primary"
            )}
          >
            {maxTags - selectedCategories.length} categories are remaining
          </span>
          <Button
            onClick={() => setCategories([])}
            size={"sm"}
            className="text-sm"
          >
            Remove all
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
