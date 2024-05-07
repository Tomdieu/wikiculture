declare interface UserType {
    id: number,
    username: string,
    first_name?: string,
    last_name?: string,
    email: string,
    image?:string;
    user_type: string;
    date_joined: string,
}

export interface NextAuthUserType extends UserType{
    token:string;
}