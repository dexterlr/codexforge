"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeAdapterImplementationSliceModel } from "@/lib/codexforge/local-runtime-adapter-implementation-slice";

export function LocalRuntimeAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeAdapterImplementationSliceModel()} />;
}
