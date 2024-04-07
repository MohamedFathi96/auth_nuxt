// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "~/server/models/user.model";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { username, password } = credentials!;
        try {
          const user = await getUser("NAME", credentials.username);
          // Return null if user data could not be retrieved
          if (!user || !user.verified)
            throw createError({
              statusCode: 201,
              statusMessage: "Unauthorized",
            });
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch)
            throw createError({
              statusCode: 201,
              statusMessage: "Unauthorized",
            });

          return { ...user, password: undefined, resetPassword: undefined };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };
      return session;
    },
  },
});
