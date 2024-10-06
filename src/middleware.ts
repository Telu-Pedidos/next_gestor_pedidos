import { NextResponse, type NextRequest } from "next/server";
import verifyToken from "./functions/verify-token";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_PROD_URL,
    process.env.NEXT_PUBLIC_DEV_URL,
    "https://res.cloudinary.com"
  ];

  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response("Origem não permitida", { status: 403 });
    }

    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": origin || "",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true"
      }
    });
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  const token = request.cookies.get("token")?.value;
  const isValid = await verifyToken(token || "");

  if (!isValid && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isValid && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/"]
};
