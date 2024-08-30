import type { NextAuthConfig } from "next-auth";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/dashboard")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return `${baseUrl}`;
      } else {
        return baseUrl;
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
