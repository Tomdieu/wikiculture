"use server";

import { getSession } from "@/lib/getSession";
import { CategoryCreateType } from "@/schema/article.schema";
import {
  ArticlePaginationType,
  ArticleType,
  ArticleUpdateType,
  ArticleWithRecommendationType,
  CategoryPaginationType,
  CategoryType,
  TotalArticleCountType,
} from "@/types";

export const createArticle = async () => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ title: "Untitled", tags: [], categories: [] }),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as ArticleType;
  return data;
};

export const getArticle = async (articleId: number) => {
  try {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data as ArticleType;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getFilteredArticle = async (
  filters?: string,
  page: string = "1"
) => {
  try {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/?page=${page}&${filters}`;
    const res = await fetch(url, {
      headers: {
        // Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
      // cache:"no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data as ArticlePaginationType;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getExploreFilteredArticle = async (
  filter: "newest" | "most_read" | "popular" | string,
  category?: string,
  page: string = "1"
) => {
  try {
    const session = await getSession();
    let url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${filter}/?page=${page}`;
    url = category ? `${url}&category=${category}` : url;
    const res = await fetch(url, {
      headers: {
        // Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data as ArticlePaginationType;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getTotalArticles = async () => {
  try {
    const session = await getSession();
    let url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/total/`;

    const res = await fetch(url, {
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as TotalArticleCountType;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getArticles = async (page?: number) => {
  try {
    const session = await getSession();
    const isMine = !["Admin", "Moderator"].includes(session?.user?.user_type!);

    let url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/`;
    url = isMine ? url + "mine/" : url;
    url = page ? url + `?page=${page}` : url;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as ArticlePaginationType;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/all/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as ArticleType[];
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getLatestArticles = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/latest/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as ArticleType[];
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getArticleWithRecommendation = async (articleId: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/with_recommendations/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data as ArticleWithRecommendationType;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Rethrow the error to handle it at the caller level if needed
  }
};

export const getCategories = async () => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/categories/`;
  const res = await fetch(url, {
    headers: {
      // Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as CategoryPaginationType;
  return data;
};

export const getAllCategories = async () => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/categories/all/`;
  const res = await fetch(url, {
    headers: {
      // Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await res.json()) as CategoryType[];
  return data;
};

export const addCategories = async (category: CategoryCreateType) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/categories/`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as CategoryType;
  return data;
};

export const updateArticle = async ({
  articleId,
  data,
}: {
  articleId: number;
  data: ArticleUpdateType;
}) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const _data = (await res.json()) as ArticleType;
  return _data;
};

// updateArticle(1,{title:""})

export const updateIcon = async (articleId: number, icon: string) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      icon: icon,
    }),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as ArticleType;
  return data;
};

export const removeIcon = async (articleId: number) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      icon: null,
    }),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as ArticleType;
  return data;
};

export const replaceCoverImage = async (articleId: number, newUrl: string) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      cover_image: newUrl,
    }),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as ArticleType;
  return data;
};

export const removeCoverImage = async (articleId: number) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      cover_image: null,
    }),
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as ArticleType;
  return data;
};

export const deleteArticle = async (articleId: number) => {
  const session = await getSession();
  const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `token ${session?.user.token}`,
      "Content-Type": "application/json",
    },
  });
};

export const trackUserReadingTime = async (
  articleId: number,
  timeSpent: number
) => {
  try {
    const session = await getSession();

    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/time-tracking/`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ article_id: articleId, time_spent: timeSpent }),
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const likeArticle = async (articleId: number) => {
  try {
    const session = await getSession();

    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/like/`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getArticleLikes = async (articleId: number) => {
  try {
    const session = await getSession();

    const url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/likes/`;

    const res = await fetch(url, {
      headers: {
        // Authorization: `token ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    const data = (await res.json()) as { likes: number; hasLike: boolean };
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const visitorsPerDay = async (
  articleId: string | null,
  startDate = "",
  endDate = "",
  period = "",
  userId: string | null
) => {
  // Construct the URL with query parameters
  let url: string;

  if (articleId === null && userId) {
    url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/users/${userId}/articles-visitors-per-day/`;
  } else {
    url = `${process.env.NEXT_PUBLIC_ARTICLE_URL}/api/articles/${articleId}/visitors-per-day/`;
  }
  const params = new URLSearchParams();

  if (startDate) {
    params.append("start_date", startDate);
  }
  if (endDate) {
    params.append("end_date", endDate);
  }
  if (period) {
    params.append("period", period);
  }

  // Append query parameters to the URL
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-store"
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch visitors per day:", error);
    throw error;
  }
};
