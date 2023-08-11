import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        })

        if (!user) {
          return null
        }

        const passwordValid = await compare(credentials.password, user.password)

        if (!passwordValid) {
          return null
        }

        return {
          id: String(user.id),
          email: user.email,
          username: user.username
        }
      }
    })
  ],
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}