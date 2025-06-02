import { sendCandidateHiredEmail } from "@/lib/emails/send-hired";
import { NextRequest } from "next/server";

// app/api/emails/hired/route.ts
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await sendCandidateHiredEmail(body);
}
