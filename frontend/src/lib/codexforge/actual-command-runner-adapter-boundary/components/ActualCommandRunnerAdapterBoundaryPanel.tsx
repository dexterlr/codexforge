"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualCommandRunnerAdapterBoundaryModel } from "@/lib/codexforge/actual-command-runner-adapter-boundary";

export function ActualCommandRunnerAdapterBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualCommandRunnerAdapterBoundaryModel()} />;
}
