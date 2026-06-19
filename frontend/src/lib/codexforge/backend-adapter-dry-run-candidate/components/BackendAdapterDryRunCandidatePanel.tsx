"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterDryRunCandidateModel } from "@/lib/codexforge/backend-adapter-dry-run-candidate";

export function BackendAdapterDryRunCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterDryRunCandidateModel()} />;
}
