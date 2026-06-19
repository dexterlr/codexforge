"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelUseDryRunModel } from "@/lib/codexforge/pro-model-use-dry-run";

export function ProModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelUseDryRunModel()} />;
}

