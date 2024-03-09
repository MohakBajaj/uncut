import { verifyCode } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }
  // Verify the code
  if (!verifyCode(email, code)) {
    return NextResponse.json({ error: "Invalid Code" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Code Verified" });
}
