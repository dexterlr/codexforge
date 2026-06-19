"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelUseDryRunModel } from "@/lib/codexforge/local-model-use-dry-run";

export function LocalModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelUseDryRunModel()} />;
}

