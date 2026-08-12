import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import { emailBrand } from "@/lib/email/brand";

type EmailLayoutProps = {
  preview: string;
  title: string;
  children: ReactNode;
};

export function EmailLayout({ preview, title, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <title>{title}</title>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandName}>{emailBrand.name}</Text>
            <Text style={brandRole}>{emailBrand.role}</Text>
          </Section>

          <Section style={card}>{children}</Section>

          <Section style={footer}>
            <Text style={footerText}>
              {emailBrand.name} · {emailBrand.location}
            </Text>
            <Text style={footerLinks}>
              <Link href={emailBrand.links.portfolio} style={link}>
                Portfolio
              </Link>
              {" · "}
              <Link href={emailBrand.links.caseStudies} style={link}>
                Case studies
              </Link>
              {" · "}
              <Link href={emailBrand.links.linkedin} style={link}>
                LinkedIn
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footerMuted}>
              <Link href={`mailto:${emailBrand.email}`} style={linkMuted}>
                {emailBrand.email}
              </Link>
              {" · "}
              {emailBrand.phone}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: CSSProperties = {
  margin: 0,
  padding: "24px 12px",
  backgroundColor: emailBrand.surface,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container: CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
};

const header: CSSProperties = {
  backgroundColor: emailBrand.accentDark,
  borderRadius: "12px 12px 0 0",
  padding: "28px 32px 24px",
  textAlign: "center",
};

const brandName: CSSProperties = {
  margin: "0 0 4px",
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

const brandRole: CSSProperties = {
  margin: 0,
  color: "rgba(255,255,255,0.82)",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const card: CSSProperties = {
  backgroundColor: emailBrand.card,
  border: `1px solid ${emailBrand.border}`,
  borderTop: "none",
  borderRadius: "0 0 12px 12px",
  padding: "32px",
};

const footer: CSSProperties = {
  marginTop: "20px",
  padding: "16px 8px 0",
  textAlign: "center",
};

const footerText: CSSProperties = {
  margin: "0 0 8px",
  color: emailBrand.muted,
  fontSize: "13px",
  fontWeight: 600,
};

const footerLinks: CSSProperties = {
  margin: "0 0 12px",
  fontSize: "13px",
  lineHeight: "22px",
};

const link: CSSProperties = {
  color: emailBrand.accentDark,
  fontWeight: 600,
  textDecoration: "none",
};

const linkMuted: CSSProperties = {
  color: emailBrand.muted,
  textDecoration: "none",
};

const hr: CSSProperties = {
  borderColor: emailBrand.border,
  margin: "12px 0",
};

const footerMuted: CSSProperties = {
  margin: 0,
  color: emailBrand.muted,
  fontSize: "12px",
  lineHeight: "20px",
};
