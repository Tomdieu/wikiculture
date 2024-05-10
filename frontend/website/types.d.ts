
export declare interface UserType {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    bio?:string;
    image?:string;
    user_type: "User"|"Moderator"|"Admin";
    date_joined: string;
}


export declare interface NextAuthUserType extends UserType{
    token:string;
}

export declare interface CreateArticleType {
    slug?:string;
    title?:string;
    content?:string;
    tags?:string[];
    categories?:number[];
    is_published?:boolean
}

export declare interface _A_TYPE extends Omit<ArticleType,"categories">{

}

export declare interface ArticleUpdateType extends Partial<_A_TYPE>{
    categories?:number[];
}

export declare interface ArticleType {
    id:number;
    slug:string;
    icon:string;
    title:string;
    cover_image:string;
    content:string;
    tags:string[];
    approved:boolean;
    categories:CategoryType[];
    is_published:boolean;
    author:UserType;
    created_at:string;
    updated_at:string;
    updated:boolean
    history:ArticleHistoryType[]
}

export declare interface ArticleHistoryType {
    history_id:number;
    id?:number;
    slug?:string;
    icon:string;
    title?:string;
    cover_image:string;
    content?:string;
    tags?:string[];
    approved:boolean;
    categories:number[];
    author:UserType;
    created_at:string;
    updated_at:string;
    updated:boolean;
    history_date:string;
    history_change_reason:string;
    history_type:string;
    history_user:number
}

export declare interface FileType {
    name:string;
    user_id:number;
    category:string,
    file:string,
    uploaded_at:string,
    size:number
}

declare interface CategoryType {
    id:number;
    name:string;
    is_cultural:boolean;
    description?:string;
    parent:number
}