import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

async function verifyToken(token: string) {
  const response = await fetch(`${BACKEND_URL}/api/auth/verifyToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((res) => res.json());

  return response.success;
}

function checkToken(req: NextRequest) {
  return !req.cookies.has("token") || !req.cookies.has("refreshToken");
}

export default async function middleware(req: NextRequest) {
  if (!checkToken(req)) {
    return NextResponse.redirect(new URL("/login", BACKEND_URL));
  }

  const token = req.cookies.get("token")?.value || "";
  const user = await verifyToken(token);

  if ((user && req.url.includes("/login")) || req.url.includes("/register")) {
    return NextResponse.redirect(new URL("/app", BACKEND_URL));
  }
}

export const config = {
  matcher: ["/app/:path*"],
};
