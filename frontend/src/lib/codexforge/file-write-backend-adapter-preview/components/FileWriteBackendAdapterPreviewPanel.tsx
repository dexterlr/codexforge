"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteBackendAdapterPreviewModel } from "@/lib/codexforge/file-write-backend-adapter-preview";

export function FileWriteBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteBackendAdapterPreviewModel()} />;
}
