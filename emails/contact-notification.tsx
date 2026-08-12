import type { CSSProperties } from "react";
import { Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "@/emails/_components/email-layout";
import { emailBrand } from "@/lib/email/brand";
import type { ContactFormPayload } from "@/lib/email/types";

type ContactNotificationEmailProps = Partial<ContactFormPayload> & {
  submittedAt?: string;
};

export function ContactNotificationEmail({
  name = "Jane Doe",
  email = "jane@company.com",
  subject = "Next.js product build",
  message = "We need a full-stack developer for a SaaS dashboard. Stack is Next.js and Node. Timeline is 8 weeks.",
  submittedAt,
}: ContactNotificationEmailProps = {}) {
  const receivedAt =
    submittedAt ??
    new Date().toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    });

  return (
    <EmailLayout
      preview={`New message from ${name}: ${subject}`}
      title={`New contact: ${subject}`}
    >
      <Heading style={heading}>New portfolio inquiry</Heading>
      <Text style={lead}>
        A contact form submission arrived on your portfolio. Reply directly to
        the sender using the email below.
      </Text>

      <Section style={metaBox}>
        <Text style={metaLabel}>Received</Text>
        <Text style={metaValue}>{receivedAt}</Text>
      </Section>

      <Hr style={divider} />

      <Field label="Name" value={name} />
      <Field label="Email" value={email} href={`mailto:${email}`} />
      <Field label="Subject" value={subject} />

      <Section style={messageBox}>
        <Text style={fieldLabel}>Message</Text>
        <Text style={messageValue}>{message}</Text>
      </Section>

      <Section style={ctaBox}>
        <Link href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`} style={cta}>
          Reply to {name}
        </Link>
      </Section>
    </EmailLayout>
  );
}

function Field({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <Section style={fieldBox}>
      <Text style={fieldLabel}>{label}</Text>
      {href ? (
        <Link href={href} style={fieldLink}>
          {value}
        </Link>
      ) : (
        <Text style={fieldValue}>{value}</Text>
      )}
    </Section>
  );
}

const heading: CSSProperties = {
  margin: "0 0 12px",
  color: emailBrand.ink,
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

const lead: CSSProperties = {
  margin: "0 0 20px",
  color: emailBrand.muted,
  fontSize: "15px",
  lineHeight: "24px",
};

const metaBox: CSSProperties = {
  backgroundColor: emailBrand.footerBg,
  borderRadius: "8px",
  padding: "14px 16px",
  borderLeft: `3px solid ${emailBrand.accent}`,
};

const metaLabel: CSSProperties = {
  margin: "0 0 4px",
  color: emailBrand.muted,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const metaValue: CSSProperties = {
  margin: 0,
  color: emailBrand.ink,
  fontSize: "14px",
  fontWeight: 600,
};

const divider: CSSProperties = {
  borderColor: emailBrand.border,
  margin: "24px 0",
};

const fieldBox: CSSProperties = {
  marginBottom: "16px",
};

const fieldLabel: CSSProperties = {
  margin: "0 0 6px",
  color: emailBrand.muted,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const fieldValue: CSSProperties = {
  margin: 0,
  color: emailBrand.ink,
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "22px",
};

const fieldLink: CSSProperties = {
  color: emailBrand.accentDark,
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
};

const messageBox: CSSProperties = {
  backgroundColor: emailBrand.footerBg,
  borderRadius: "8px",
  padding: "16px",
  border: `1px solid ${emailBrand.border}`,
};

const messageValue: CSSProperties = {
  margin: 0,
  color: emailBrand.ink,
  fontSize: "15px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap",
};

const ctaBox: CSSProperties = {
  marginTop: "24px",
  textAlign: "center",
};

const cta: CSSProperties = {
  display: "inline-block",
  backgroundColor: emailBrand.accent,
  color: "#06110c",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "8px",
};

export default ContactNotificationEmail;

ContactNotificationEmail.PreviewProps = {
  name: "Jane Doe",
  email: "jane@company.com",
  subject: "Next.js product build",
  message:
    "We need a full-stack developer for a SaaS dashboard. Stack is Next.js and Node. Timeline is 8 weeks.",
  submittedAt: "12 Aug 2026, 6:00 pm",
} satisfies ContactNotificationEmailProps;
