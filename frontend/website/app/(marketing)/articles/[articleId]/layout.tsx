import { getArticle } from "@/actions/articles";
import { cleanHtml } from "@/lib/cleanHtml";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { articleId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.articleId;

  // fetch data
  const article = await getArticle(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: cleanHtml(article.content).slice(0, 100),
    openGraph: {
      title: article.title,
      description: cleanHtml(article.content).slice(0, 100),
      images: [
        `${article.cover_image}`,
        "/wikiculture-high-resolution-logo-transparent.png",
        ...previousImages,
      ],
    },
    twitter: {
      title: article.title,
      description: cleanHtml(article.content).slice(0, 100),
      images: [
        `${article.cover_image}`,
        "/wikiculture-high-resolution-logo-transparent.png",
        ...previousImages,
      ],
    },
  };
}

const ArticleLayoutPage = ({ children }: Props) => {
  return <>{children}</>;
};

export default ArticleLayoutPage;
