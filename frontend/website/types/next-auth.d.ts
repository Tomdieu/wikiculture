import { NextAuthUserType } from '@/types';
import { User } from 'next-auth';
import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module 'next-auth' {


    interface User extends NextAuthUserType{}
    interface AdapterUser extends NextAuthUserType {
        user_type: string;
    }
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends User{
    }
}
