import {withAuth} from "next-auth/middleware"
import type { NextAuthOptions } from "next-auth";


export type {NextMiddlewareWithAuth} from "next-auth/middleware"

// const config = {
//     authorized({auth,request:{nextUrl}}){
//     const isLoggedIn = !!auth?.user;
//     const isOnDashboard = nextUrl.pathname.startwith("/dashboard");
//     if(isOnDashboard){
//         if(!isLoggedIn){
//             return true
//         }
//     }else if(isLoggedIn){
//         return Response.redirect(new URL('/dashboard',nextUrl));
//     }
//     return true
// }
// }

export default withAuth({
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export const config = {
    matcher: [
        "/dashboard/:path*",
    ]
}