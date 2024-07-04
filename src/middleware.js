import { NextResponse } from "next/server"
import { authconfig } from "./app/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authconfig)



export async function middleware(request) {
    const {nextUrl} = request
    const session = await auth()
    console.log("session", session)
    const isLoggedIn = !!session?.user;

    if (isLoggedIn && (nextUrl.pathname.startsWith('/admin-auth/login') ||
        nextUrl.pathname.startsWith('/admin-auth/signup'))) {
        return NextResponse.redirect(new URL('/admin-dashboard', nextUrl.origin));
    }

    if (!isLoggedIn && nextUrl.pathname.startsWith('/admin-dashboard')) {
        return NextResponse.redirect(new URL('/admin-auth/login', nextUrl.origin));
    }

    console.log("isLoggedIn", isLoggedIn);
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin-dashboard/:path*", "/", "/admin-auth/login", "/admin-auth/signup"]
};
