"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelUseDryRunModel } from "@/lib/codexforge/free-model-use-dry-run";

export function FreeModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelUseDryRunModel()} />;
}

