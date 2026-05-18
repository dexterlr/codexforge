import type { Metadata } from "next";
import { buildStabilizationCommandCenterSummary } from "@/lib/codexforge/stabilization-command-center";
import StabilizationPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Stabilization Command Center",
  description:
    "CodexForge read-only stabilization dashboard for build, smoke, verification, regression, queue, apply gate, and handoff posture.",
};

export default function StabilizationPage() {
  const initialData = buildStabilizationCommandCenterSummary();
  return <StabilizationPageClient initialData={initialData} />;
}
