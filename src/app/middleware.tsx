import { AuthConfig } from "@/lib/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(AuthConfig);

const sessionRoutes = ["/account"];
const noSessionRoutes = ["/auth/login"];

export default auth(async (req) => {
  if (sessionRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  if (noSessionRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (req.auth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher:
    "'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',",
};
