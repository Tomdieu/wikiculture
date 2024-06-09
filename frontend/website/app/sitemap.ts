import { getAllArticles, getArticles } from "@/actions/articles";
import { getCulturalAreas } from "@/actions/cultural_areas";

export default async function sitemap() {
  const baseUrl = "https://wikiculture.vercel.app";

  const articles = await getAllArticles();
  const culturalAreas = await getCulturalAreas()


  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(),
  }));

  const culturalAreaUrls = culturalAreas.results.map((cult)=>({
    url: `${baseUrl}/articles/${cult.name}`,
    lastModified: new Date(),
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cultural-regions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
    },
    ...articleUrls,
    ...culturalAreaUrls
  ];
}
