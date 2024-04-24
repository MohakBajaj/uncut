import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    return NextResponse.json({ success: false });
  }
  const res = await fetch("http://localhost:3000/api/auth/verifyToken", {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
  if (res.success) {
    return NextResponse.json({ success: true, res });
  }
  return NextResponse.json({ success: false });
}
