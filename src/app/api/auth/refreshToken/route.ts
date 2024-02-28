import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("authorization");
  const refreshToken = req.headers.get("refreshtoken");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 }
    );
  }

  const response = await fetch("http://localhost:5000/auth/refreshToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
      token: token,
      refreshtoken: refreshToken,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
