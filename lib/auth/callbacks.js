import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export const authCallbacks = {
  //Invoked on successful signin
  async signIn({ account }) {
    return account.provider === "google";
  },

  async jwt({ token, profile, account }) {
    if (account && account.provider === "google") {
      await dbConnect();

      const email = token.email?.toLowerCase();
      const isOwner = email === process.env.ADMIN_EMAIL?.toLowerCase();

      const dbUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            ...(profile?.given_name && { username: profile.given_name }),
            ...(profile?.picture && { avatar: profile.picture }),
          },
          ...(!isOwner && {
            $setOnInsert: {
              role: "user",
            },
          }),
          ...(isOwner && {
            $set: {
              username: profile?.given_name,
              avatar: profile?.picture,
              role: "admin",
            },
          }),
        },
        {
          returnDocument: "after",
          upsert: true,
        },
      );

      token.id = dbUser._id.toString();
      token.username = dbUser.username;
      token.avatar = dbUser.avatar;
      token.role = dbUser.role;
    }

    return token;
  },

  //Modify the session object
  async session({ session, token }) {
    // console.log("Token:", token)
    session.user.id = token.id;
    session.user.username = token.username;
    session.user.avatar = token?.avatar;
    session.user.role = token.role;
    console.log("Session:", session)
    return session;
  },
};

// 1. signIn()

// “Should this user be allowed in?”

// 2. jwt()

// “What do I store in the token?”

// 3. session()

// “What do I expose to the frontend?”
