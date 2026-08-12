import nodemailer from "nodemailer";

const REQUIRED_ENV = [
  "EMAIL_HOST",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
] as const;

export function getMissingEmailEnvVars() {
  return REQUIRED_ENV.filter((key) => !process.env[key]);
}

export function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function verifyEmailTransporter(
  transporter: nodemailer.Transporter
) {
  await transporter.verify();
}
