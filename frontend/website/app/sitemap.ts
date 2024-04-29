export default async function sitemap(){
    const baseUrl = "https://wikiculture.vercel.app";

    const articles:string[] = [];

    const articleUrls = articles.map(article=>({
        url:`${baseUrl}/article/${article}`,
        lastModified:new Date()
    }))

    return [
        {
            url:baseUrl,
            lastModified:new Date()
        },
        {
            url:`${baseUrl}/login`,
            lastModified:new Date()
        },
        {
            url:`${baseUrl}/register`,
            lastModified:new Date()
        },
        ...articleUrls
    ];
}