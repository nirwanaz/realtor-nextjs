import { connectToMongoDB } from "@/backend/config/db";
import UserModel from "@/backend/models/user.model";
import Errorhandler from "@/backend/utils/errorHandler";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, User } from "next-auth";

const nextAuthConfig: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                connectToMongoDB();

                const { email, password } = credentials as {
                    email: string,
                    password: string
                };

                const user = await UserModel.findOne({ email }).select("+password");

                if (!user) {
                    throw new Errorhandler("Invalid Email or Password", 404);
                }

                const isPasswordMatched = await bcrypt.compare(
                    password,
                    user.password
                )

                if (!isPasswordMatched) {
                    throw new Errorhandler("Invalid Email or Password", 404);
                }

                return user as User;
            },

        }),
    ],
    callbacks: {
        jwt: async ({ token, user }: any) => {
            
            user && (token.user = user);

            if (token.user && token.user._id) {
                const updatedUser = await UserModel.findById(token.user._id);

                if (updatedUser) {
                    token.user = updatedUser;
                }
            }

            return token;
        },
        session: async({ session, token }: any) => {
            session.user = token.user;

            delete session.user?.password;

            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, nextAuthConfig);
}