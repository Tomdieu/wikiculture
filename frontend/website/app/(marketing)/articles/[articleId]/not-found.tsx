"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PageNotFound = () => {
    const { articleId } = useParams()
    return (
        <div className="h-full w-full flex flex-col space-y-2 items-center justify-center">
            <h1 className="text-3xl font-semibold text-red-400">Article with id {articleId} Not Found</h1>
            <Button variant={"default"} asChild>
                <Link href="/articles">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to artilces
                </Link>
            </Button>
        </div>
    );
};

export default PageNotFound;
