"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualPackagingBoundaryModel } from "@/lib/codexforge/actual-packaging-boundary";

export function ActualPackagingBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualPackagingBoundaryModel()} />;
}
