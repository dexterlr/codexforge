"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingBackendDryRunPacketModel } from "@/lib/codexforge/packaging-backend-dry-run-packet";

export function PackagingBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingBackendDryRunPacketModel()} />;
}
