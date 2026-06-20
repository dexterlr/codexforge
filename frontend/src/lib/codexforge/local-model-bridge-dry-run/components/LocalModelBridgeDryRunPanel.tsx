"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelBridgeDryRunModel } from "@/lib/codexforge/local-model-bridge-dry-run";

export function LocalModelBridgeDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelBridgeDryRunModel()} />;
}
