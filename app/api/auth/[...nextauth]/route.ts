import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, // this gon exist trust
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ]
})

export { handler as GET, handler as POST }

