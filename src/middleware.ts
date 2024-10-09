import { NextResponse, type NextRequest } from "next/server";
import verifyToken from "./functions/verify-token";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isValid = await verifyToken(token || "");

  if (!isValid && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isValid && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/"]
};
