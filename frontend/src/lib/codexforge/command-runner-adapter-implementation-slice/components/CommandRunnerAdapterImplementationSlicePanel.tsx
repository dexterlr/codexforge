"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerAdapterImplementationSliceModel } from "@/lib/codexforge/command-runner-adapter-implementation-slice";

export function CommandRunnerAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerAdapterImplementationSliceModel()} />;
}
