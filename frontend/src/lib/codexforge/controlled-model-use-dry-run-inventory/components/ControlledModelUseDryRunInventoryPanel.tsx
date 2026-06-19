"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledModelUseDryRunInventoryModel } from "@/lib/codexforge/controlled-model-use-dry-run-inventory";

export function ControlledModelUseDryRunInventoryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledModelUseDryRunInventoryModel()} />;
}

