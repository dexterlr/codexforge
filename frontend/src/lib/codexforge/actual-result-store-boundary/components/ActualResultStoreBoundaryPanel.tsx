"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualResultStoreBoundaryModel } from "@/lib/codexforge/actual-result-store-boundary";

export function ActualResultStoreBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualResultStoreBoundaryModel()} />;
}
