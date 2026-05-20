import type { Metadata } from "next";
import { buildFutureHealthProbeModel } from "@/lib/codexforge/future-guarded-health-probe";
import HealthProbePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Future Guarded Health Probe",
  description:
    "CodexForge Phase 71 Future Guarded Health Probe metadata-only/manual-first request, allowlist, approval, policy, preflight, execution bridge, result, and readiness update review.",
};

export default function HealthProbePage() {
  return <HealthProbePageClient initialData={buildFutureHealthProbeModel()} />;
}
