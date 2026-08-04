import { NextResponse, type NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'none'; base-uri 'none'; object-src 'none'"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export const config = {
  matcher: ["/jarvis-websites/:path*"],
};
