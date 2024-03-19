import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export default async function middleware(req: NextRequest) {
  // check if tokens exists
  const token = req.cookies.get("token");
  const refreshToken = req.cookies.get("refreshToken");
  if (!refreshToken || !token) {
    return NextResponse.redirect(`${BACKEND_URL}/login`);
  }

  // validate token
  const response = await fetch(`${BACKEND_URL}/api/auth/verifyToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token?.value || "",
    },
  }).then((res) => res.json());

  if (!response.success) {
    return NextResponse.redirect(`${BACKEND_URL}/login`);
  }

  // if token is valid, return next response
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
