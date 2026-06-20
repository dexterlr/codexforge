"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectRecoveryPlanPreviewModel } from "@/lib/codexforge/project-recovery-plan-preview";

export function ProjectRecoveryPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectRecoveryPlanPreviewModel()} />;
}
