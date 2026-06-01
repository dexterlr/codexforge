import type { Metadata } from "next";
import OnboardingPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge onboarding", description: "Learn the safe CodexForge coding flow in a few minutes." };

export default function Page() {
  return <OnboardingPageClient />;
}
