import type { Metadata } from "next";
import ReviewInboxPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge Review inbox", description: "Review validation, evidence, recovery, run history, and demo handoffs." };

export default function Page() {
  return <ReviewInboxPageClient />;
}
