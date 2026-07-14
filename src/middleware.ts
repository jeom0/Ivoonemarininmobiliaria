import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
          return token?.role === "ADMIN"
        }
        return true
      }
    },
    pages: {
      signIn: "/admin/login",
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"],
}
