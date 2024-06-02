"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { changePasswordSchema, changePasswordSchemaType } from "@/schema/register.schema";
import { revalidatePath } from "next/cache";
import { revalidatePage } from "@/actions/revalidate";

type Props = {}

const ChangePassword = (props: Props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      new_password: "",
      current_password: "",
      confirm_password: ""
    },
    mode: "onBlur"
  });

  async function onSubmit(values: changePasswordSchemaType) {
    setIsSubmiting(true);
    revalidatePage("/dashboard/profile")
    setIsSubmiting(false)
  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-4 w-full"
      >
        <div className="space-y-2 text-left">
          <h2 className="text-lg font-bold">Change Your Password</h2>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Fill the information to change your password
          </p>
        </div>
        <div className="space-y-4">

          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="ivantom" {...field} />
                </FormControl>
                <FormDescription>
                  Your current password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmiting} className="w-full" type="submit">
            {isSubmiting && (
              <LoaderIcon className="animate-spin w-4 h-5 mr-2" />
            )}
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChangePassword