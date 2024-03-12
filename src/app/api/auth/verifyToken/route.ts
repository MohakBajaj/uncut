import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const response = await fetch("http://localhost:5000/auth/verifyToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
      authorization: token,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
