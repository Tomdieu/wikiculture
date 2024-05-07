import { User } from 'next-auth';
import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module 'next-auth' {
    interface User extends NextAuthUserType {
        user_type?: string | null;
    }
    interface AdapterUser extends NextAuthUserType {
        user_type: string;
    }
    export interface Session {
        user: NextAuthUserType;
    }


}

