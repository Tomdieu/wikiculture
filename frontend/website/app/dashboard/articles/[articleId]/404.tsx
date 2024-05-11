import React from "react";

type Props = {
  params: {
    articleId: number;
  };
};

const PageNotFound = ({ params: { articleId } }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="text-3xl font-extrabold">404 - Page Not Found</h1>
    </div>
  );
};

export default PageNotFound;
