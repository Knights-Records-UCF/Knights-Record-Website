// shared auth options module (under your lib folder)
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const isAdmin = (email?: string | null) =>
  !!email && adminEmails.includes(email.toLowerCase()); 

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      return isAdmin(user.email);
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.isAdmin = isAdmin(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
};