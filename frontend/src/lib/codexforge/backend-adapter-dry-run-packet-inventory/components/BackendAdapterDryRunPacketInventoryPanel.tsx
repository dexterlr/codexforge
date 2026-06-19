"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterDryRunPacketInventoryModel } from "@/lib/codexforge/backend-adapter-dry-run-packet-inventory";

export function BackendAdapterDryRunPacketInventoryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterDryRunPacketInventoryModel()} />;
}
