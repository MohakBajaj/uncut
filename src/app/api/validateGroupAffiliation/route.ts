import { NextResponse } from "next/server";
import z from "zod";

const validateGroupAffiliationSchema = z.object({
  email: z.string().email(),
});

const validateGroupAffiliation = (email: string) =>
  validateGroupAffiliationSchema.safeParse({ email }).success;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!validateGroupAffiliation(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const response = await fetch(
    `http://localhost:5000/auth/validateGroupAffiliation/${email}`,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-server-identity": process.env.SERVER_CONNECTION_SECRET || "",
      }),
    }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export const dynamic = "force-dynamic";
