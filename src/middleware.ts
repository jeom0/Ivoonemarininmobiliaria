import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Simple in-memory store for rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export default withAuth(
  function middleware(req) {
    // Apply Rate Limiting to all /api routes
    if (req.nextUrl.pathname.startsWith("/api")) {
      const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
      const limit = 100; // 100 requests per minute
      const windowMs = 60 * 1000; // 1 minute window
      const now = Date.now();

      const record = rateLimitMap.get(ip);
      if (!record || record.resetTime < now) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      } else {
        record.count++;
        if (record.count > limit) {
          return NextResponse.json(
            { error: "Too Many Requests. Please try again later." },
            { status: 429 }
          );
        }
      }
    }
    
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
  matcher: ["/admin/:path*", "/api/:path*"],
}
