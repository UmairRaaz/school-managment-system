import { NextResponse } from 'next/server';
import { auth } from "@/app/auth";

export default auth((req) => {
    const { auth, nextUrl } = req;
    const isLoggedIn = !!auth;

    if (isLoggedIn && (nextUrl.pathname.startsWith('/admin-auth/login') ||
        nextUrl.pathname.startsWith('/admin-auth/signup'))) {
        return NextResponse.redirect(new URL('/admin-dashboard', nextUrl.origin));
    }

    if (!isLoggedIn && nextUrl.pathname.startsWith('/admin-dashboard')) {
        return NextResponse.redirect(new URL('/admin-auth/login', nextUrl.origin));
    }

    console.log("isLoggedIn", isLoggedIn);
    return NextResponse.next();
});

export const config = {
    matcher: ["/admin-dashboard/:path*", "/", "/admin-auth/login", "/admin-auth/signup"]
};
