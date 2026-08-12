import type { CSSProperties } from "react";
import { Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "@/emails/_components/email-layout";
import { emailBrand } from "@/lib/email/brand";

type ContactConfirmationEmailProps = {
  name?: string;
  subject?: string;
};

export function ContactConfirmationEmail({
  name = "Jane Doe",
  subject = "Next.js product build",
}: ContactConfirmationEmailProps = {}) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <EmailLayout
      preview={`Thanks ${firstName}. Your message about "${subject}" was received.`}
      title="Message received"
    >
      <Heading style={heading}>Thanks, {firstName}</Heading>
      <Text style={lead}>
        Your message about{" "}
        <span style={strong}>&ldquo;{subject}&rdquo;</span> reached my inbox. I
        read every brief that comes through the portfolio form.
      </Text>

      <Section style={stepsBox}>
        <Text style={stepsTitle}>What happens next</Text>
        <Text style={stepItem}>
          1. I review the scope, stack, and timeline you shared.
        </Text>
        <Text style={stepItem}>
          2. You get a reply within one business day if the fit looks clear.
        </Text>
        <Text style={stepItem}>
          3. If it is a match, we schedule a short call or continue over email.
        </Text>
      </Section>

      <Hr style={divider} />

      <Text style={bodyText}>
        While you wait, you can browse recent work on the site. Case studies cover
        Next.js, MERN, Shopify, CRM automation, and AI integrations from client
        projects.
      </Text>

      <Section style={ctaRow}>
        <Link href={emailBrand.links.caseStudies} style={ctaPrimary}>
          View case studies
        </Link>
        <Link href={`${emailBrand.siteUrl}/contact`} style={ctaSecondary}>
          Contact page
        </Link>
      </Section>

      <Text style={signOff}>Regards,</Text>
      <Text style={signOffName}>{emailBrand.name}</Text>
      <Text style={signOffRole}>{emailBrand.role}</Text>
    </EmailLayout>
  );
}

ContactConfirmationEmail.PreviewProps = {
  name: "Jane Doe",
  subject: "Next.js product build",
} satisfies ContactConfirmationEmailProps;

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

const strong: CSSProperties = {
  color: emailBrand.ink,
  fontWeight: 700,
};

const stepsBox: CSSProperties = {
  backgroundColor: emailBrand.footerBg,
  borderRadius: "8px",
  padding: "18px 20px",
  borderLeft: `3px solid ${emailBrand.accent}`,
};

const stepsTitle: CSSProperties = {
  margin: "0 0 12px",
  color: emailBrand.accentDark,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const stepItem: CSSProperties = {
  margin: "0 0 8px",
  color: emailBrand.ink,
  fontSize: "14px",
  lineHeight: "22px",
};

const divider: CSSProperties = {
  borderColor: emailBrand.border,
  margin: "24px 0",
};

const bodyText: CSSProperties = {
  margin: "0 0 20px",
  color: emailBrand.muted,
  fontSize: "14px",
  lineHeight: "22px",
};

const ctaRow: CSSProperties = {
  marginBottom: "24px",
  textAlign: "center",
};

const ctaPrimary: CSSProperties = {
  display: "inline-block",
  backgroundColor: emailBrand.accent,
  color: "#06110c",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  marginRight: "8px",
  marginBottom: "8px",
};

const ctaSecondary: CSSProperties = {
  display: "inline-block",
  border: `1px solid ${emailBrand.border}`,
  color: emailBrand.accentDark,
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
  padding: "11px 20px",
  borderRadius: "8px",
  marginBottom: "8px",
};

const signOff: CSSProperties = {
  margin: "0 0 4px",
  color: emailBrand.muted,
  fontSize: "14px",
  lineHeight: "22px",
};

const signOffName: CSSProperties = {
  margin: "0 0 2px",
  color: emailBrand.ink,
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "22px",
};

const signOffRole: CSSProperties = {
  margin: 0,
  color: emailBrand.muted,
  fontSize: "14px",
  lineHeight: "22px",
};

export default ContactConfirmationEmail;
