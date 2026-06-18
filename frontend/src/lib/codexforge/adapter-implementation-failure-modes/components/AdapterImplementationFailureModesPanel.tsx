"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationFailureModesModel } from "@/lib/codexforge/adapter-implementation-failure-modes";

export function AdapterImplementationFailureModesPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationFailureModesModel()} />;
}
