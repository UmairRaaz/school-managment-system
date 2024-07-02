import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { TeacherModel } from "@/app/models/teacherModel";
import { AdminModel } from "@/app/models/userModel";
import NextAuth from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";

export const { auth, handlers: { GET, POST }, signIn } = NextAuth({
  providers: [
    CredentialProviders({
      name: "credentials",
      authorize: async (credentials) => {
        const username = credentials.username;
        const password = credentials.password;

        try {
          await dbConnect();
          console.log("Database connected");

          if (!username || !password) {
            console.error("Username or password not provided");
            throw new Error("Please provide email and password");
          }

          let user;
          let passwordMatch = false;

          // Check in AdminModel
          user = await AdminModel.findOne({ username });
          if (user) {
            passwordMatch = password === user.password;
          }

          // Check in TeacherModel if not found in AdminModel
          if (!user) {
            user = await TeacherModel.findOne({ username });
            if (user) {
              passwordMatch = password === user.password;
            }
          }

          // Check in StudentModel if not found in TeacherModel
          if (!user) {
            user = await StudentModel.findOne({ username });
            if (user) {
              passwordMatch = password === user.password;
            }
          }

          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }

          if (!passwordMatch) {
            console.error("Incorrect password");
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin-auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.username = user.username;
        token.image = user?.image || "/profile.png";
        token.email = user?.email || "";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session._id = token._id;
        session.role = token.role;
        session.username = token.username;
        session.image = token?.image || "/profile.png";
        session.email = token?.email || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
});
