import {
  renderContactConfirmationEmail,
  renderContactNotificationEmail,
} from "@/lib/email/render-contact-emails";
import {
  createEmailTransporter,
  verifyEmailTransporter,
} from "@/lib/email/transporter";
import type { ContactFormPayload } from "@/lib/email/types";
import { saveContactSubmission } from "@/lib/admin/save-submission";

export async function sendContactEmails(payload: ContactFormPayload) {
  const transporter = createEmailTransporter();
  await verifyEmailTransporter(transporter);

  const [notificationHtml, confirmationHtml] = await Promise.all([
    renderContactNotificationEmail(payload),
    renderContactConfirmationEmail(payload.name, payload.subject),
  ]);

  const from = process.env.EMAIL_FROM!;
  const to = process.env.EMAIL_TO!;

  await Promise.all([
    transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: `Portfolio inquiry: ${payload.subject}`,
      html: notificationHtml,
    }),
    transporter.sendMail({
      from,
      to: payload.email,
      replyTo: to,
      subject: `Message received - ${payload.subject}`,
      html: confirmationHtml,
    }),
  ]);

  await saveContactSubmission(payload);
}
