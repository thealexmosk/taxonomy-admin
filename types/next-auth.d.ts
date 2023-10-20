import { User as NextUser } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

type User = NextUser & {
  role?: string
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}
