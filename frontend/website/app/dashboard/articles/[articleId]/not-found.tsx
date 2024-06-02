"use client"
import { useParams } from "next/navigation";
import React from "react";

const PageNotFound = () => {
  const {articleId} = useParams()
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="text-3xl font-semibold text-red-400">Article with id {articleId} Not Found</h1>
    </div>
  );
};

export default PageNotFound;
