"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "@/schema/article.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategories } from "@/actions/articles";
import toast from "react-hot-toast";
import { useRef } from "react";

export function AddCategory() {
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      is_cultural: false,
    },
    shouldFocusError:true,
  });

  const ref = useRef<HTMLButtonElement>(null)

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addCategories,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // toast.success("New Article Added");
    },
  });

  async function onSubmit({
    name,
    description,
    is_cultural,
  }: z.infer<typeof CategorySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    // const data = await addCategories({name,description,is_cultural});
    mutate({ name, description, is_cultural },{onSettled(data, error, variables, context) {
      toast.success("Category added")
      if(data?.id){
        ref.current?.click()
      }
    },onError(error, variables, context) {
      toast.error("Could add the category")
    },});
  }
  return (
    <Dialog>
      <DialogTrigger  asChild>
        <Button variant="outline" size={"sm"}>
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Add a new category to your list.
              </DialogDescription>
            </DialogHeader>

            <DialogClose ref={ref}  className="hidden">
            </DialogClose>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Food" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      {/* <Input type="text" placeholder="describe your category" {...field} /> */}
                      <Textarea
                        placeholder="describe your category"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
