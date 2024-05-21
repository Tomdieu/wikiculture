import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUserStore } from "@/hooks/use-user";
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
import { UserType } from "@/types";

type Props = {
};

const UserModal = (props: Props) => {
  const { isOpen, onClose, user } = useUserStore();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<updateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username!,
      email: user?.email!,
      first_name: user?.first_name!,
      last_name: user?.last_name!,
      user_type: user?.user_type!,
    },
  });

  async function onSubmit(values: updateUserSchemaType) {
    const body = JSON.stringify(values);
    setIsSubmiting(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto space-y-4 w-full"
          >
            <div className="space-y-2 text-left">
              <h2 className="text-3xl font-bold">Update user</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Fill the user information to update the user account
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
                Update user
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
