"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectApprovalPlanPreviewModel } from "@/lib/codexforge/project-approval-plan-preview";

export function ProjectApprovalPlanPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectApprovalPlanPreviewModel()} />;
}
