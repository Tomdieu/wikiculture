import { NextAuthUserType } from "@/types";
import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'ivantom'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '************'
                }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/login/",{
                    method:"POST",
                    body:JSON.stringify({username:credentials.username,password:credentials.password}),
                    headers: { "Content-Type": "application/json" }
                })

                const data = await res.json();
                const {user,token} = data;
                const userData = {...user,token};
                if (res.ok && !userData.token) {
                    return null;
                }

                if(res.ok && userData.token){

                    return userData
                }

            }
        })
    ],
    pages: {
        signIn: '/login',
        // signOut: '/'
    },
    debug:true, //process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",

    },
    callbacks:{
        jwt({token,user}) {

            token.user = user as User;
            
            // return token;
            return {...token,...user};
        },
        session({session,token}) {
            delete token.exp;
            delete token.iat;
            delete token.sub;
            delete token.jti;
            delete token.picture;
            delete token.user;
            session.user = token;
            
            return session;
        },
        
    },
    secret: process.env.NEXTAUTH_SCRET,
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }