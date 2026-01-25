import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const isProtectedRoute = createRouteMatcher(["/:locale/admin(.*)"]);
const nextIntlMiddleware = createMiddleware(routing);
const isPublicRoute = createRouteMatcher([
  "/:locale",
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
  "/:locale/bots(.*)",
  "/:locale/bots/:id(.*)",
]);

const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isApiRoute(req)) {
    // Only run Clerk auth for protected API routes
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return NextResponse.next();
  }

  // Handle admin route protection
  if (isProtectedRoute(req)) {
    if (!userId) {
      await auth.protect();
      return;
    }
    if (userId !== process.env.ADMIN_USER_ID) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Skip all static files
    "/api/:path*", // Only JSON API
  ],
};
