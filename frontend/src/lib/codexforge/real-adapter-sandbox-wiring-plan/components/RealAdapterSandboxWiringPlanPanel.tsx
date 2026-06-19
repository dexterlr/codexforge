"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealAdapterSandboxWiringPlanModel } from "@/lib/codexforge/real-adapter-sandbox-wiring-plan";

export function RealAdapterSandboxWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealAdapterSandboxWiringPlanModel()} />;
}
