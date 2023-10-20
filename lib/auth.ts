import { NextAuthOptions } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

import { env } from "@/env.mjs"

type UserProfile = {
  id: string
  name?: string
  email: string
  image?: string
  role?: string[]
}

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: env.COGNITO_CLIENT_ID!,
      clientSecret: env.COGNITO_CLIENT_SECRET!,
      issuer: env.COGNITO_ISSUER,
      profile(profile): UserProfile {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile["cognito:groups"],
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        const user = token.user as UserProfile

        session.user.id = user.id
        session.user.name = user.name
        session.user.email = token.email
        session.user.role = user.role?.[0]
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}
