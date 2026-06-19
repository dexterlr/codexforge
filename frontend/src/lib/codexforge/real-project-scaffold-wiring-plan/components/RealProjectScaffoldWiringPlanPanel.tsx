"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealProjectScaffoldWiringPlanModel } from "@/lib/codexforge/real-project-scaffold-wiring-plan";

export function RealProjectScaffoldWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealProjectScaffoldWiringPlanModel()} />;
}
