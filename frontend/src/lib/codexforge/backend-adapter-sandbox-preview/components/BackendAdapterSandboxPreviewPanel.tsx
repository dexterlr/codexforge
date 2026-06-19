"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterSandboxPreviewModel } from "@/lib/codexforge/backend-adapter-sandbox-preview";

export function BackendAdapterSandboxPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterSandboxPreviewModel()} />;
}
