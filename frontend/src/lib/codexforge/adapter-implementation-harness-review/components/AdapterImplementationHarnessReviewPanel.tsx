"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationHarnessReviewModel } from "@/lib/codexforge/adapter-implementation-harness-review";

export function AdapterImplementationHarnessReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationHarnessReviewModel()} />;
}
