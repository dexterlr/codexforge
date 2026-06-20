"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectRuntimePlanPreviewModel } from "@/lib/codexforge/project-runtime-plan-preview";

export function ProjectRuntimePlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectRuntimePlanPreviewModel()} />;
}
