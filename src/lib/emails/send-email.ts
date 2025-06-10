import { config } from "@/lib/config";
import nodemailer from "nodemailer";

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
}) {
  try {
    await transporter.sendMail({
      from: `Tommy <${config.gmailUser}>`,
      to,
      subject,
      html,
    });

    return { success: true, error : null };
  } catch (error) {
    return { success: false, error };
  }
}
