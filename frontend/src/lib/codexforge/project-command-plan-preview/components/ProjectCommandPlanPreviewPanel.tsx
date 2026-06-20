"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectCommandPlanPreviewModel } from "@/lib/codexforge/project-command-plan-preview";

export function ProjectCommandPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectCommandPlanPreviewModel()} />;
}
