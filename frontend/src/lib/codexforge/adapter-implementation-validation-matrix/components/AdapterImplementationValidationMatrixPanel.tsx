"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationValidationMatrixModel } from "@/lib/codexforge/adapter-implementation-validation-matrix";

export function AdapterImplementationValidationMatrixPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationValidationMatrixModel()} />;
}
