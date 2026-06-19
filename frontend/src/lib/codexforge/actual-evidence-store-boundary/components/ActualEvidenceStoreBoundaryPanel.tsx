"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualEvidenceStoreBoundaryModel } from "@/lib/codexforge/actual-evidence-store-boundary";

export function ActualEvidenceStoreBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualEvidenceStoreBoundaryModel()} />;
}
