"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualFileWriteAdapterBoundaryModel } from "@/lib/codexforge/actual-file-write-adapter-boundary";

export function ActualFileWriteAdapterBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualFileWriteAdapterBoundaryModel()} />;
}
