import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export default async function middleware(req: NextRequest) {
  if (!req.cookies.has("token") || !req.cookies.get("refreshToken")) {
    return NextResponse.redirect(new URL("/login", BACKEND_URL));
  }

  const token = req.cookies.get("token")?.value || "";
  const refreshToken = req.cookies.get("refreshToken")?.value || "";

  const response = await fetch(`${BACKEND_URL}/auth/verifyToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
      "x-refresh-token": refreshToken,
    },
  }).then((res) => res.json());
  if (response.success) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/:path*", "/app/:path*"],
};
