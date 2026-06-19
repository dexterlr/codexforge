"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerBackendAdapterPreviewModel } from "@/lib/codexforge/command-runner-backend-adapter-preview";

export function CommandRunnerBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerBackendAdapterPreviewModel()} />;
}
