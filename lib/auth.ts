//steps:
// 1. providers
// 2. authorize
// 3.0 jwt
// 3.1 sessions

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
        },

        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                throw new Error("Missing credentials");
            }

            try {
                await dbConnect();
                const user = await User.findOne({email: credentials.email});
                if(!user) {
                    throw new Error("User not found");
                }
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if(!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }
                return {
                    id: user._id.toString(),
                    email: user.email
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        }

    })
  ],

  callbacks:{
    async jwt({token, user}) { 
        if(user) {
            token.id = user.id;
        }
        return token;
    },
    async session({session, token}) {
        if(session.user) {
            session.user.id = token.id as string
        }
        return session;
    }
  },

  pages:{

  }

};

//1:39:00