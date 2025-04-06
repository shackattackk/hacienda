import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect dashboard routes
  if (isProtectedRoute(req)) await auth.protect();
  
  // Redirect authenticated users from root to dashboard
  if (isPublicRoute(req)) {
    try {
      // Try to protect the route - if it succeeds, user is authenticated
      await auth.protect();
      // If we get here, user is authenticated, so redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (error) {
      // User is not authenticated, continue to landing page
      return NextResponse.next();
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};