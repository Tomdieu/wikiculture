"use client";

import { Button } from "@/components/ui/button";
import {  UserType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { formatTimeSince } from "@/lib/timeSince";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Delete, MoreHorizontal, RefreshCw, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/hooks/use-user";
import UserModal from "./user-modal";
import toast from "react-hot-toast";
import { updateUser } from "@/actions/users";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userColumns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header({ table }) {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <div>
        {" "}
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="w-4 h-4"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    id: "id",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          href={`/dashboard/articles/${id}/`}
          className="font-bold text-sky-400 hover:underline"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    id: "username",
    cell({ row }) {
      const user = row.original;
      return (
        <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
          {user.username}
        </span>
      );
    },
  },
  {
    accessorKey: "first_name",
    id: "first_name",

    header: "First Name",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{user.first_name}</span>;
    },
  },
  {
    accessorKey: "last_name",
    id: "last_name",

    header: "Last name",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{user.last_name}</span>;
    },
  },
  {
    accessorKey: "email",
    id: "email",

    header: "Email",
    cell: ({ row }) => {
      const user = row.original;
      return <a href={`mailto:${user.email}`}>{user.email}</a>;
    },
  },
  {
    accessorKey: "user_type",
    id: "user_type",

    header: "User Type",
  },
  {
    accessorKey: "date_joined",
    id: "date_joined",

    header: "Date Joined",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <p className="line-clamp-1 text-ellipsis">
          {formatTimeSince(user.date_joined)}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { setUser, onOpen } = useUserStore();
      const queryClient = useQueryClient()
      const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

      const promoteTo = async (role:"User"|"Admin"|"Moderator") =>{
        const res = await updateUser(user.id,{user_type:role})
        if(res.id){
          toast.success("Role updated successfully")
          queryClient.invalidateQueries({queryKey: ["users", "page", page]})
        }else{
          toast.error("Something went wrong")
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={()=>{
              setUser(user)
              onOpen()
            }}>
              <RefreshCw className="w-4 h-4 mr-2" /> <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>promoteTo("Moderator")}>Set Moderator</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>promoteTo("Admin")}>Set Admin</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <Trash className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
