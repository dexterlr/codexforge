"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationOperatorTrialReviewModel } from "@/lib/codexforge/adapter-implementation-operator-trial-review";

export function AdapterImplementationOperatorTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationOperatorTrialReviewModel()} />;
}
