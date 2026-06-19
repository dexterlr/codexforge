"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualLocalRuntimeAdapterBoundaryModel } from "@/lib/codexforge/actual-local-runtime-adapter-boundary";

export function ActualLocalRuntimeAdapterBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualLocalRuntimeAdapterBoundaryModel()} />;
}
