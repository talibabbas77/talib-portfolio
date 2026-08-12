import { render } from "@react-email/render";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import type { ContactFormPayload } from "@/lib/email/types";

export async function renderContactNotificationEmail(
  payload: ContactFormPayload
) {
  return render(
    ContactNotificationEmail({
      ...payload,
      submittedAt: new Date().toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Karachi",
      }),
    })
  );
}

export async function renderContactConfirmationEmail(
  name: string,
  subject: string
) {
  return render(ContactConfirmationEmail({ name, subject }));
}
