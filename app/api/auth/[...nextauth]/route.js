import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentails",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          await connectDb();
          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user) {
            return null;
          }
          const matching = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!matching) {
            return null;
          }
          return user;
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      },
      pages: {
        signIn: "/sign-in",
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    // When using the Credentials Provider the user object is the response returned from the authorize callback and the profile object is the raw body of the HTTP POST submission.
    // oauth accounts have profile
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDb();
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            await User.create({
              email: profile.email,
              username: profile.name,
              image: profile.picture,
            });
          }
          return true;
        } catch (error) {
          console.log("error in signin");
          console.error(`Error: ${error.message}`);
          return false;
        }
      }
      if (account.provider === "credentials") {
        if (user) return true;
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
