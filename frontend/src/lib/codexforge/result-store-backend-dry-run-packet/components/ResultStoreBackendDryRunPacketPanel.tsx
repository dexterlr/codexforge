"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreBackendDryRunPacketModel } from "@/lib/codexforge/result-store-backend-dry-run-packet";

export function ResultStoreBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreBackendDryRunPacketModel()} />;
}
