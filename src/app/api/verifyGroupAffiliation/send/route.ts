import { NextResponse } from "next/server";
import { Resend } from "resend";
import AccountVerificationEmailTemplate from "../../../../../emails";
import { generateCode } from "@/lib/utils";

export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email;
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const code = generateCode(email);
  try {
    const response = await resend.emails.send({
      from: "Mohak <uncut@bmohak.tech>",
      to: email,
      subject: "Verify your email address",
      react: AccountVerificationEmailTemplate({ Code: code }),
      text: `Verify Your Email
        ---

        Welcome to Uncut! To access our platform and start engaging with the community, please verify your email address by using the provided verification code.

        Verification Code: ${code}

        This code is valid for a limited time and should not be shared with anyone for security reasons.

        Thank you for choosing Uncut.`,
    });
    console.log(response);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
