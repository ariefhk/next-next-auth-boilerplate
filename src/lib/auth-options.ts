import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiInstance } from "@/networks/api-instance";
import { AxiosError } from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await apiInstance.post("/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const userData = {
            id: response?.data.data?.user?.id,
            name: response?.data.data?.user?.name,
            email: response?.data.data?.user?.email,
            token: response?.data.data?.authorization?.token,
          };

          return userData;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log("AXIOS ERR IN AUTH OPTIONS: ", error);
            throw error;
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // jwt: async ({ token, user, account }) => {
    //   if (account && account.access_token) {
    //     // set access_token to the token payload
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    // redirect: async ({ url, baseUrl }) => {
    //   return baseUrl;
    // },
    // session: async ({ session, token, user }) => {
    //   // If we want to make the accessToken available in components, then we have to explicitly forward it here.
    //   return { ...session, token: token.accessToken };
    // },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

function auth( // <-- use this function to access the jwt from React components
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}

export { authOptions, auth };
