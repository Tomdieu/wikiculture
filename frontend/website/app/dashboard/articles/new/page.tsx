import { createArticle } from '@/actions/articles'
import { notFound, redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

type Props = {}

const CreateArticlePage = async (props: Props) => {
  try {
    const article = await createArticle();

    if (article.id) {
      const url = `/dashboard/articles/${article.id}/`
      return redirect(url);
    } else {
      throw new Error("Could Not Create Article");
    }
  } catch (error) {
    console.error(error);
    return (
      <div className="w-full h-full flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-col gap-y-2 max-w-sm w-full" role="alert">
        <strong className="font-bold">Error</strong>
        <p className="block sm:inline line-clamp-3">{error.message || "There was an error creating the article."}</p>
        <Button asChild variant={"secondary"}>
          <Link href={"/dashboard/articles/new"}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry
          </Link>
        </Button>
      </div>
      </div>
    );
  }
}

export default CreateArticlePage
