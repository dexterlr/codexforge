"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectResultPlanPreviewModel } from "@/lib/codexforge/project-result-plan-preview";

export function ProjectResultPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectResultPlanPreviewModel()} />;
}
