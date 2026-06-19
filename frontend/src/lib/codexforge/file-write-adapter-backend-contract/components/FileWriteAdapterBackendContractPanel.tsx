"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteAdapterBackendContractModel } from "@/lib/codexforge/file-write-adapter-backend-contract";

export function FileWriteAdapterBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteAdapterBackendContractModel()} />;
}
