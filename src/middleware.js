import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.get("auth");
  const currentPath = request.nextUrl.pathname;

  // If user has auth cookie and tries to access login page, redirect to home
  if (authCookie && currentPath === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user does not have auth cookie and tries to access home, redirect to login
  if (!authCookie && currentPath === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"], // Middleware applies to '/' and '/login' routes
};
