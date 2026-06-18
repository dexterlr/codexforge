"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstCommandRunnerAdapterImplementationReviewModel } from "@/lib/codexforge/first-command-runner-adapter-implementation-review";

export function FirstCommandRunnerAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstCommandRunnerAdapterImplementationReviewModel()} />;
}
