"use client"
import {
  updateUserSchema,
  updateUserSchemaType,
} from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { updateUser } from "@/actions/users";
import { UserType } from "@/types";
import { revalidatePage } from "@/actions/revalidate";


type ChangeUserInfoProps = {
  user: UserType
}

const ChangeUserInfo = ({ user }: ChangeUserInfoProps) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<updateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email || "",
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type,
    },
    mode:"onBlur"
  });

  async function onSubmit(values: updateUserSchemaType) {
    setIsSubmiting(true);
    const res = await updateUser(user.id, { ...values })
    if (res.id) {
      toast.success("User updated successfully")
    } else {
      toast.error("Something went wrong")
    }
    setTimeout(() => {
      setIsSubmiting(false)
      revalidatePage("/dashboard/profile")
    }, 1000)

  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-4 w-full"
      >
        <div className="space-y-2 text-left">
          <h2 className="text-lg font-bold">Change Your Informations</h2>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Fill the information to update your account
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

          <Button disabled={isSubmiting} className="w-full" type="submit">
            {isSubmiting && (
              <LoaderIcon className="animate-spin w-4 h-5 mr-2" />
            )}
            Update profile
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChangeUserInfo;