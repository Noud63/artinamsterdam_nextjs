import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authCallbacks } from "./callbacks";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour - refresh session hourly
  },

  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: true,
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "email" },
        password: { label: "Password:", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
    return null;
  }
        await dbConnect();

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).select("+password");



        if (!user) return null;

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password,
        );

            console.log("Password matches:", passwordMatches);

        if (!passwordMatches) return null;

            

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: authCallbacks,
};
