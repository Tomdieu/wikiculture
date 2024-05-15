"use client";
import { uploadImage } from "@/actions/media";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, UploadIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const UploadFile = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["medias"] });
    },
  });

  useEffect(() => {
    setIsSubmiting(isPending);
  }, [isPending]);

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmiting(true);
      setFile(file);

      const formData = new FormData();
      formData.append("file", file);

      mutate(formData, {
        onSuccess(data, variables, context) {
          if (data.id) {
            toast.success("File Uploaded Successfully");
          } else {
            toast.error("Something went wrong");
          }
          setIsSubmiting(false);
          if (data?.id) {
            ref.current?.click();
          }
        },
        onError(error, variables, context) {
          toast.error("Something went wrong");
          ref.current?.click();
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="relative">
          <UploadCloud className="text-muted-foreground w-5 h-5" />
          <span className="sr-only">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload a file</DialogTitle>
        <DialogClose ref={ref} className="hidden"></DialogClose>
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="grid gap-2">
            <div className="group relative flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500">
              <div className="pointer-events-none flex flex-col items-center justiy-center">
                <UploadIcon className="h-8 w-8 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload a file or drag and drop.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                disabled={isSubmiting}
                accept="image/*"
                onChange={(e) => {
                  e.preventDefault();
                  onChange(e.target.files?.[0]);
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                id="image"
                type="file"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
