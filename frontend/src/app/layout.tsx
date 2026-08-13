import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ---------------- FONTS ---------------- */

type RootFontVariables = React.CSSProperties & {
  "--font-geist-sans": string;
  "--font-geist-mono": string;
};

const rootFontVariables: RootFontVariables = {
  "--font-geist-sans":
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  "--font-geist-mono":
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

/* ---------------- META ---------------- */

export const metadata: Metadata = {
  title: {
    default: "CodexForge",
    template: "%s - CodexForge",
  },
  description:
    "CodexForge is a local-first personal AI operating system and creation workspace built around approval-gated Jarvis orchestration.",
  applicationName: "CodexForge",
  keywords: [
    "CodexForge",
    "AI workspace",
    "AI creation platform",
    "local-first",
    "AI planning",
    "AI execution",
  ],
  authors: [{ name: "CodexForge" }],
  creator: "CodexForge",
  openGraph: {
    title: "CodexForge",
    description:
      "Local-first personal AI workspace for bounded planning, creation, review, validation, and safe execution.",
    siteName: "CodexForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodexForge",
    description:
      "Local-first personal AI workspace for bounded planning, creation, review, validation, and safe execution.",
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
    <html lang="en" suppressHydrationWarning style={rootFontVariables}>
      <body
        style={{
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
