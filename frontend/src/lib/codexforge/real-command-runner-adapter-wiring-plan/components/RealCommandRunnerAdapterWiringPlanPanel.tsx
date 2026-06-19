"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealCommandRunnerAdapterWiringPlanModel } from "@/lib/codexforge/real-command-runner-adapter-wiring-plan";

export function RealCommandRunnerAdapterWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealCommandRunnerAdapterWiringPlanModel()} />;
}
