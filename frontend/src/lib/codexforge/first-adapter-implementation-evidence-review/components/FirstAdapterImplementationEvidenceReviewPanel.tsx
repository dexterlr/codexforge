"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterImplementationEvidenceReviewModel } from "@/lib/codexforge/first-adapter-implementation-evidence-review";

export function FirstAdapterImplementationEvidenceReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterImplementationEvidenceReviewModel()} />;
}
