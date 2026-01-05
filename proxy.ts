import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes - require authentication and check admin user ID
  if (isAdminRoute(req)) {
    const { userId } = await auth();

    // If not authenticated, protect the route (will trigger Clerk sign-in)
    if (!userId) {
      await auth.protect();
      return;
    }

    // If authenticated but not admin, redirect to home
    if (userId !== process.env.ADMIN_USER_ID) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
