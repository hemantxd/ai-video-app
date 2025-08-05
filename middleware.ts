import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    // Avoid accessing req.nextauth.token here
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;

        if (pathname === "/" || pathname.startsWith("/api/video")) return true;

        return !!token;
      },
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

export const config = { 
  matcher: [

  ],
};
