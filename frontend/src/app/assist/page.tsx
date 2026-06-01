import type { Metadata } from "next";
import AssistPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge Assisted coding mode", description: "Choose a coding goal and get the next safe step without automatic execution." };

export default function Page() {
  return <AssistPageClient />;
}
