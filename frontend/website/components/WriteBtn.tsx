import { getSession } from "@/lib/getSession";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

const WriteBtn = async () => {
  const session = await getSession();
  const url = session ? "/dashboard/articles" : "/login";
  return (
    <Link
      href={url}
      className="flex items-center justify-center gap-1 p-2 bg-stone-950 text-white rounded-full hover:shadow-md"
    >
      <SquarePen className="w-5 h-5" />
      <span className="text-sm">Write</span>
    </Link>
  );
};

export default WriteBtn;
