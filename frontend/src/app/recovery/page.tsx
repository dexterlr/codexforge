import type { Metadata } from "next";
import RecoveryPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge Recovery flow", description: "Follow safe recovery steps for failed validation, blocked apply, unknown results, and demo issues." };

export default function Page() {
  return <RecoveryPageClient />;
}
