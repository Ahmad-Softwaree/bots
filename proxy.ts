import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();

    // Protect admin routes - only allow specific admin user ID
    if (isAdminRoute(req)) {
      if (!userId || userId !== process.env.ADMIN_USER_ID) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }
  },
  {
    // Enable proxy mode for latest Clerk version
    signInUrl: "/",
    signUpUrl: "/",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
