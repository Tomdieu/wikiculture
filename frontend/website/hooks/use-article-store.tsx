import { updateArticle } from "@/actions/articles";
import { ArticleType, ArticleUpdateType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ArticleStore = {
  article?: Partial<ArticleType>;
  isOpenVersion:boolean,
  setArticle: (article: Partial<ArticleType>) => void;
  updateArticle: (article: ArticleType) => void;
  deleteArticle: () => void;
  mutateArticle: (data: Partial<ArticleType>) => void;
  saveArticle: () => void;
  openVersionModel:()=>void;
  onCloseVersionModel:()=>void;
};

export const useArticleStore = create(
  persist<ArticleStore>(
    (set, get) => ({
      article: undefined,
      isOpenVersion:false,
      setArticle: (article) => set({ article }),
      updateArticle: (newArticleValue) => set({ article: newArticleValue }),
      deleteArticle: () => set({ article: undefined }),
      mutateArticle: (data) =>
        set((state) => ({ article: { ...state.article, ...data } })),
      saveArticle: async () => {
        const article = get().article;
        if (article) {
          try {
            const categories_id = article.categories?.map((cat) => cat.id);
            delete article.history
            delete article.author
            const _article: ArticleUpdateType = {
              ...article,
              categories: categories_id,
            };

            const newData = await updateArticle({
              articleId: article.id!,
              data: _article,
            });
            set({ article: newData }); // Update store's state with new data
            toast.success("Updated Article");
          } catch (error) {
            toast.error("Could not save article");
          }
        }
      },
      openVersionModel:()=>set({isOpenVersion:true}),
      onCloseVersionModel:()=>set({isOpenVersion:false})
    }),
    {
      name: "article-store", // Name for the persisted store
      storage: createJSONStorage(() => sessionStorage), // JSON storage middleware for persistence
    }
  )
);
