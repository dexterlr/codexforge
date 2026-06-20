"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectFilePlanPreviewModel } from "@/lib/codexforge/project-file-plan-preview";

export function ProjectFilePlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectFilePlanPreviewModel()} />;
}
