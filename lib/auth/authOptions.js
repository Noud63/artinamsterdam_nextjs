import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authCallbacks } from "./callbacks";
import GoogleProvider from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import Nodemailer from "next-auth/providers/nodemailer";
import { mailjet } from "@/lib/mailjet";

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
       allowDangerousEmailAccountLinking: true
  }),


  Nodemailer({
    server: {
      host: "in-v3.mailjet.com",
      port: 587,
      auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
      },
    },
    from: process.env.MAIL_FROM,
  })
],
  callbacks: authCallbacks,
};
