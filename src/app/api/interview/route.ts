import { sendInterviewEmail } from "@/lib/emails/send-interview-email";
import { NextRequest } from "next/server";

// app/api/interview/route.ts
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await sendInterviewEmail(body);
}
