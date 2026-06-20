"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectPackagingPlanPreviewModel } from "@/lib/codexforge/project-packaging-plan-preview";

export function ProjectPackagingPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectPackagingPlanPreviewModel()} />;
}
