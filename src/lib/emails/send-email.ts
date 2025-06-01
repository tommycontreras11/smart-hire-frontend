import nodemailer from "nodemailer";
import { config } from "@/lib/config";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmailUser,
    pass: config.gmailAppPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 465,
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<any> {
  try {
    await transporter.sendMail({
      from: `Tommy <${config.gmailUser}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
