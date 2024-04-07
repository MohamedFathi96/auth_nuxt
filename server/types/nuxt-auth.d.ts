import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "ADMIN" | "USER";
    id: number;
  }
  interface Session {
    user: {
      /** The user's id */
      role: "ADMIN" | "USER";
      id: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "ADMIN" | "USER";
  }
}
