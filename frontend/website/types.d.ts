export declare interface UserType {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  bio?: string;
  image?: string;
  user_type: "User" | "Moderator" | "Admin";
  date_joined: string;
}

export declare interface NextAuthUserType extends UserType {
  token: string;
}

export declare interface CreateArticleType {
  slug?: string;
  title?: string;
  content?: string;
  tags?: string[];
  categories?: number[];
  is_published?: boolean;
}

export declare interface _A_TYPE extends Omit<ArticleType, "categories"|"village"> {}

export declare interface ArticleUpdateType extends Partial<_A_TYPE> {
  categories?: number[];
  village?:number;
}

declare interface CulturalAreaType {
  id: number;
  name: string;
  description: string;
}

declare interface RegionType {
  id: number;
  name: string;
  description: string;
  cultural_area: CulturalAreaType;
}

declare interface VillageType {
  id: number;
  name: string;
  description: string;
  region: RegionType;
}

declare interface VillageListType {
  id: number;
  name: string;
  description: string;
}

declare interface RegionListType {
  id: number;
    name: string;
    description: string;
    villages: VillageListType[];
}

declare interface CulturalAreaListType {
  id: number;
  name: string;
  description: string;
  regions: RegionListType[];
}

export declare interface ArticleType {
  id: number;
  slug: string;
  icon: string;
  title: string;
  cover_image: string;
  content: string;
  tags: string[];
  approved: boolean;
  categories: CategoryType[];
  is_published: boolean;
  author: UserType;
  village?: VillageType;
  created_at: string;
  updated_at: string;
  updated: boolean;
  history: ArticleHistoryType[];
}

export declare interface ArticleHistoryType {
  history_id: number;
  id?: number;
  slug?: string;
  icon: string;
  title?: string;
  cover_image: string;
  content?: string;
  tags?: string[];
  approved: boolean;
  categories: CategoryType[];
  author: UserType;
  created_at: string;
  updated_at: string;
  updated: boolean;
  history_date: string;
  history_change_reason: string | null;
  history_type: string;
  history_user: number;
}

export declare interface FileType {
  name: string;
  user_id: number;
  category: string;
  file: string;
  uploaded_at: string;
  size: number;
  id: number;
}

declare interface CategoryType {
  id: number;
  name: string;
  is_cultural: boolean;
  description?: string;
  parent: number;
}

declare interface PaginationType {
  count: number;
  next?: string;
  prevoius?: string;
}

declare interface ArticlePaginationType extends PaginationType {
  results: ArticleType[];
}

declare interface CategoryPaginationType extends PaginationType {
  results: CategoryType[];
}

declare interface UserPaginationType extends PaginationType {
  results: UserType[];
}

declare interface FilePaginatorType extends PaginationType {
  results: FileType[];
}

declare interface TotalArticleCountType {
  total: number;
}

declare interface ModerationRecordType {
  moderator: UserType;
  article: ArticleType;
  decision: "pending" | "approved" | "rejected";
  feedback: string;
}

declare interface ModerationRecordPagination extends PaginationType {
  results: ModerationRecordType[];
}

declare interface ModerationRecordCreateType {
  article: number;
  decision: "pending" | "approved" | "rejected";
  feedback?: string;
}

declare interface ArticleToModerate {
  id: number;
  title: string;
  content: string;
  approved: boolean;
}

declare interface ArticleToModeratePagination extends PaginationType {
  results: ArticleToModerate[];
}

declare interface ArticleWithRecommendationType {
  data: ArticleType;
  recommendations: ArticleType[];
  related_articles:ArticleType[];
}

declare interface CulturalAreaPaginationType extends PaginationType {
  results:CulturalAreaType[]
}

declare interface RegionPaginationType extends PaginationType {
  results:RegionType[]
}

declare interface VillagesPaginationType extends PaginationType {
results:VillageType[]
}
