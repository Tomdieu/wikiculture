import { MetadataRoute } from "next";
import { getAllArticles, getArticles } from "@/actions/articles";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { ArticleType, CulturalAreaPaginationType } from "@/types";

type CustomSitemap = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
};

export default async function sitemap(): Promise<CustomSitemap[]> {
  const baseUrl = "https://wikiculture.vercel.app";
  let articles: ArticleType[] = [];
  let culturalAreas: CulturalAreaPaginationType | null = null;

  try {
    articles = await getAllArticles();
  } catch (error) {}

  try {
    culturalAreas = await getCulturalAreas();
  } catch (error) {}

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: article.updated_at,
    changeFrequency: "weekly",
    priority: 1,
  }));

  const culturalAreaUrls = culturalAreas?.results
    ? culturalAreas.results.map((cult) => ({
        url: `${baseUrl}/cultural-regions/${cult.name}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      }))
    : [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/cultural-regions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...articleUrls,
    ...culturalAreaUrls,
  ];
}
