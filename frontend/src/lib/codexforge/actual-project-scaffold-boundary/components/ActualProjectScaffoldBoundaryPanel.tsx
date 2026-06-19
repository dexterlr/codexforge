"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualProjectScaffoldBoundaryModel } from "@/lib/codexforge/actual-project-scaffold-boundary";

export function ActualProjectScaffoldBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualProjectScaffoldBoundaryModel()} />;
}
