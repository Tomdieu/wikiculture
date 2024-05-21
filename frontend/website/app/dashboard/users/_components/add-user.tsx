"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { signUpSchema, signUpSchemaType } from "@/schema/register.schema";
import { UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserPlus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

const AddUser = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const page = searchParams.get("page") || "1";
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: signUpSchemaType) {
    const body = JSON.stringify(values);
    setIsSubmiting(true);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/register/",
      {
        method: "POST",
        body: body,
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = (await res.json()) as UserType;
    if (data.id) {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users", "page", page] });
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-muted-foreground"
        >
          <UserPlus className="w-4 h-4" />
          <span className="sr-only">Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent ref={ref} className="max-w-[780px]">
        <div className="w-full h-full">
          <Form {...form}>
            <form
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto space-y-4 w-full"
            >
              <div className="space-y-2 text-left">
                <h2 className="text-3xl font-bold">Create an account</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill the user information to create an account
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Navi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>username</FormLabel>
                      <FormControl>
                        <Input placeholder="ivantom" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="support@wikiculture.cm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is email is not displayed publicly.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="">
                              <SelectValue placeholder="User Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Moderator">Moderator</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is represent the role of a user
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*****************"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Password should be atleast 8 character(s) long
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*****************"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isSubmiting} className="w-full" type="submit">
                  {isSubmiting && (
                    <LoaderIcon className="animate-spin w-4 h-5 mr-2" />
                  )}
                  Create User
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
