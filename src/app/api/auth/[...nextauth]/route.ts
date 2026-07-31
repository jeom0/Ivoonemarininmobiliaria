import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
  secret: "super-secret-nextauth-key-12345",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        // Limpiamos espacios accidentales del correo
        const email = credentials.email.trim()
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: email }
          })
          
          if (!user) return null
          
          const isValid = await bcrypt.compare(credentials.password, user.password)
          
          if (!isValid) return null
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            permissions: user.permissions
          }
        } catch (error) {
          console.error("NextAuth Prisma Error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60, // 365 days persistence
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        if (session.permissions) token.permissions = session.permissions;
      }
      
      if (user) {
        token.role = (user as any).role
        token.id = user.id
        token.permissions = (user as any).permissions
        token.image = (user as any).image
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).permissions = token.permissions;
        if (token.image) session.user.image = token.image as string;
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
