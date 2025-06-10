// src/app/api/route.ts
import { sendInterviewEmail } from "@/lib/emails/send-interview-email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await sendInterviewEmail(body);

  console.log("response: ", response);	

  return NextResponse.json({ success: true, response });
}
