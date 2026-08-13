process.env.NEXTAUTH_URL = "https://lightgrey-gull-741202.hostingersite.com";

import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
