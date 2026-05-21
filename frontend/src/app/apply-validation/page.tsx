import type { Metadata } from "next";
import ApplyValidationPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Apply safely, then validate",
  description: "CodexForge apply and validation hardening for reviewable diff, approval policy, rollback, validation output, and result routing.",
};

export default function ApplyValidationPage() {
  return <ApplyValidationPageClient />;
}
