"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterAuditPreviewModel } from "@/lib/codexforge/backend-adapter-audit-preview";

export function BackendAdapterAuditPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterAuditPreviewModel()} />;
}
