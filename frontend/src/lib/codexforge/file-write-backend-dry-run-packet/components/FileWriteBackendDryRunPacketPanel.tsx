"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteBackendDryRunPacketModel } from "@/lib/codexforge/file-write-backend-dry-run-packet";

export function FileWriteBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteBackendDryRunPacketModel()} />;
}
