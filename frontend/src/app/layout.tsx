import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ---------------- FONTS ---------------- */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ---------------- META ---------------- */

export const metadata: Metadata = {
  title: {
    default: "CodexForge",
    template: "%s • CodexForge",
  },
  description:
    "CodexForge is a local-first AI developer workspace for planning, memory, research, and safe execution.",
  applicationName: "CodexForge",
  keywords: [
    "CodexForge",
    "AI workspace",
    "developer tools",
    "local-first",
    "AI planning",
    "AI execution",
  ],
  authors: [{ name: "CodexForge" }],
  creator: "CodexForge",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "CodexForge",
    description:
      "Local-first AI developer workspace for planning, memory, research, and safe execution.",
    url: "http://localhost:3000",
    siteName: "CodexForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodexForge",
    description:
      "Local-first AI developer workspace for planning, memory, research, and safe execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ---------------- VIEWPORT ---------------- */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050710",
};

/* ---------------- LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}