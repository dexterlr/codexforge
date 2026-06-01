import type { Metadata } from "next";
import SafetyCoachPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge safety coach", description: "Plain-English explanations for preview, apply, evidence, validation, recovery, and rollback." };

export default function Page() {
  return <SafetyCoachPageClient />;
}
