"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderResultReviewModel } from "@/lib/codexforge/universal-builder-result-review";

export function UniversalBuilderResultReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderResultReviewModel()} />;
}
