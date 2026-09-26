import type { NextAuthConfig } from "next-auth";

export default {
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.ADMIN_SECRET_KEY,

  pages: {
    signIn: "/admin/login",
  },

  providers: [],

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isLoginPage) {
        return true;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;