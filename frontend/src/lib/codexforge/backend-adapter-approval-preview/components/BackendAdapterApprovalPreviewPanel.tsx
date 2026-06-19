"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterApprovalPreviewModel } from "@/lib/codexforge/backend-adapter-approval-preview";

export function BackendAdapterApprovalPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterApprovalPreviewModel()} />;
}
