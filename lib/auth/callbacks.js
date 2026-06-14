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

    console.log("Account:", profile)

    let dbUser = await User.findOne({ email: token.email });

    if (!dbUser) {
    dbUser = await User.create({
      email: token.email,
      name: profile.name,
      username: profile.given_name,
      avatar: profile.picture, // <-- use profile.picture
    });
  }

  token.id = dbUser._id.toString();
  token.username = dbUser.username;
  token.avatar = profile.picture; // <-- use profile.picture
}

  return token;
},

  //Modify the session object
 async session({ session, token }) {
  console.log("Token:", token)
  session.user.id = token.id;
  session.user.username = token.username;
  session.user.avatar = token?.avatar;
  console.log("Session:", session)
  return session;
}
};


// 1. signIn()

// “Should this user be allowed in?”

// 2. jwt()

// “What do I store in the token?”

// 3. session()

// “What do I expose to the frontend?”