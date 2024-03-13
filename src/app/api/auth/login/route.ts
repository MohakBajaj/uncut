import { validateEmail, validatePassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (
    !email ||
    !password ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.success) {
    return NextResponse.json(data, { status: 401 });
  }

  const res = NextResponse.json({
    success: data.success,
    message: data.message,
    user: data.user,
  });

  res.cookies.set("token", data.tokens.token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60,
  });
  res.cookies.set("refreshToken", data.tokens.refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
  });

  return res;
}

export const dynamic = "force-dynamic";
