"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectPlanModelRoutingPreviewModel } from "@/lib/codexforge/project-plan-model-routing-preview";

export function ProjectPlanModelRoutingPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectPlanModelRoutingPreviewModel()} />;
}
