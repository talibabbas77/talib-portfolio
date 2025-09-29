import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Talib Portfolio",
  description: "Professional portfolio showcasing Talib's work and expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StarsBackground className="min-h-screen">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </StarsBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
