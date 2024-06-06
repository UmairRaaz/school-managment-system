import { auth } from "@/app/auth";

export default auth((req) => {
    const { auth, nextUrl } = req;
    const isLoggedIn = !!auth;

    if (isLoggedIn && (nextUrl.pathname.startsWith('/admin-auth/login') ||
        nextUrl.pathname.startsWith('/admin-auth/signup'))) {
        return Response.redirect(new URL('/admin-dashboard', nextUrl));
    }

    if (!isLoggedIn && nextUrl.pathname.startsWith('/admin-dashboard')) {
        return Response.redirect(new URL('/admin-auth/login', nextUrl));
    }

    console.log("isLoggedIn", isLoggedIn);
});

export const config = {
    matcher: ["/admin-dashboard/:path*", "/", "/admin-auth/login", "/admin-auth/signup"]
};
