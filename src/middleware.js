import { auth } from "@/app/auth"


export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    if (isLoggedIn && (nextUrl.pathname == "/admin-auth/login" || nextUrl.pathname == "/admin-auth/signup")) {
        return Response.redirect(new URL("/", nextUrl))
    }

    if (isLoggedIn && (nextUrl.pathname == "/admin-auth/login" || nextUrl.pathname == "/admin-auth/signup")) {
        return Response.redirect(new URL("/admin-auth/login", nextUrl))
    }
    console.log("isLoggedIn", isLoggedIn)

})

export const config = {
    matcher: ["/admin-dashboard", "/", "/admin-auth/login", "/admin-auth/signup"]
}
