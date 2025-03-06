import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  console.warn("REQUEST ENTERED MIDDLEWARE", {
    href: request.nextUrl.href,
    // headers: new Map(request.headers),
  });

  // Avoid recursive fetching
  if (request.nextUrl.pathname.includes("/bravo")) {
    return NextResponse.next();
  }

  const bravoURL = new URL("/bravo", request.nextUrl.origin);
  console.warn(`fetching ${bravoURL.href}`);
  const response = await fetch(bravoURL);
  console.warn(`response from ${bravoURL.href}`, {
    // headers: new Map(response.headers),
    status: response.status,
  });

  return NextResponse.next();
};

export const config = {
  matcher: [
    // Skip all internal paths (_next) and paths to the makeswift api handlers
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],

  // Only enable this to see that the fetch to `/bravo` does re-enter middleware
  // when using the node runtime.
  // runtime: "nodejs",
};
