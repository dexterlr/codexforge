"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingAdapterImplementationSliceModel } from "@/lib/codexforge/packaging-adapter-implementation-slice";

export function PackagingAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingAdapterImplementationSliceModel()} />;
}
