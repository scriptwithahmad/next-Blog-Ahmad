import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnect";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Eamil or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Eamil or Password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
});
