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
  return NextResponse.json(data);
}