"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBoundedAdapterImplementationSliceInventoryModel } from "@/lib/codexforge/bounded-adapter-implementation-slice-inventory";

export function BoundedAdapterImplementationSliceInventoryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBoundedAdapterImplementationSliceInventoryModel()} />;
}
