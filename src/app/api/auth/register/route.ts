import { validateEmail, validatePassword, validateUsername } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, username, password } = body;

  if (
    !email ||
    !username ||
    !password ||
    !validateEmail(email) ||
    !validateUsername(username) ||
    !validatePassword(password)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const response = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
    },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
