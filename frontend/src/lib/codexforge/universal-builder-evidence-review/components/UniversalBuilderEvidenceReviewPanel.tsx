"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderEvidenceReviewModel } from "@/lib/codexforge/universal-builder-evidence-review";

export function UniversalBuilderEvidenceReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderEvidenceReviewModel()} />;
}
