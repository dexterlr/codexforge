"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationPackagingReviewModel } from "@/lib/codexforge/adapter-implementation-packaging-review";

export function AdapterImplementationPackagingReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationPackagingReviewModel()} />;
}
