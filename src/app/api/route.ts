import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = await fetch("http://localhost:5000/", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
    }),
  });
  const data = await response.json();
  console.log(response);
  return NextResponse.json(data);
}
