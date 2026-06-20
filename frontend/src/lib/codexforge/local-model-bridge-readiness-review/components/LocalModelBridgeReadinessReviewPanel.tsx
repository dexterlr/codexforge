"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelBridgeReadinessReviewModel } from "@/lib/codexforge/local-model-bridge-readiness-review";

export function LocalModelBridgeReadinessReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelBridgeReadinessReviewModel()} />;
}
