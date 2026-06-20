"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectBuilderOperatorReviewModel } from "@/lib/codexforge/project-builder-operator-review";

export function ProjectBuilderOperatorReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectBuilderOperatorReviewModel()} />;
}
