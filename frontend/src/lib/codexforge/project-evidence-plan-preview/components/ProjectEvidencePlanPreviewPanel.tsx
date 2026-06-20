"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectEvidencePlanPreviewModel } from "@/lib/codexforge/project-evidence-plan-preview";

export function ProjectEvidencePlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectEvidencePlanPreviewModel()} />;
}
