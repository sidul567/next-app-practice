import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials): any {
        console.log("credentials", credentials);

        const user = {
          email: credentials?.email,
          password: credentials?.password,
        };

        if (user.email === "abc@gmail.com" && user.password === "123") {
          return {
            userId: 1,
            ...user,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.userId = token.userId;
      }

      return session;
    },
  },
  secret: "123",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
