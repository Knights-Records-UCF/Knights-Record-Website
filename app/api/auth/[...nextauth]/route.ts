import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",") // incase we have multiple emails
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean); // remove empty strings

// Func checks if emaiil is in adminEmail list
const isAdmin = (email?: string | null) => {
    return !!email && adminEmails.includes(email.toLowerCase());
};

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, // this gon exist trust
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    session : {
        strategy : "jwt", // default
    },
    callbacks : {
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
                (session.user as any).isAdmin = token.isAdmin ?? "user";;
            }
            return session;
        }
    }

})

export { handler as GET, handler as POST }

