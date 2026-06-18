"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerAdapterPreviewModel } from "@/lib/codexforge/command-runner-adapter-preview";

export function CommandRunnerAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerAdapterPreviewModel()} />;
}
