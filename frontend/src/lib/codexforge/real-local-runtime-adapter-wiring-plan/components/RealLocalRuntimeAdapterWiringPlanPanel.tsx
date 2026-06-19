"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealLocalRuntimeAdapterWiringPlanModel } from "@/lib/codexforge/real-local-runtime-adapter-wiring-plan";

export function RealLocalRuntimeAdapterWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealLocalRuntimeAdapterWiringPlanModel()} />;
}
