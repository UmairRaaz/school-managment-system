import dbConnect from "@/libs/dbConnect";
import { StudentModel } from "@/models/studentModel";
import { TeacherModel } from "@/models/teacherModel";
import { AdminModel } from "@/models/userModel";
import { compare } from "bcryptjs";
import NextAuth from "next-auth"
import CredentialProviders from 'next-auth/providers/credentials'
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

          let user = await AdminModel.findOne({ username });
          console.log("User lookup result:", user);
          if (!user) {
            // If user is not found in AdminModel, try finding in TeacherModel
            user = await TeacherModel.findOne({ username });
            console.log("Teacher lookup result:", user);

            if (!user) {
              // If user is not found in TeacherModel, try finding in StudentModel
              user = await StudentModel.findOne({ username });
              console.log("Student lookup result:", user);

              if (!user) {
                console.error("User not found");
              }
            }
          }
          console.log(user)
          const passwordMatch = password == user.password;
          console.log("Password match result:", passwordMatch);

          if (!passwordMatch) {
            console.error("Incorrect password");
            throw new Error("Incorrect password");
          }

          console.log("Login succeeded", user);
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      }


    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin-auth/login"
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
      console.log("session", token)
      if (token) {
          session._id = token._id,
          session.role = token.role,
          session.username = token.username,
          session.image = token?.image || "/profile.png";
          session.email = token?.email || "";
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 86400,
  }
})