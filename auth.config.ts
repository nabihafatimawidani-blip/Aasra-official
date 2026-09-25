import type { NextAuthConfig } from "next-auth";

export default {
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