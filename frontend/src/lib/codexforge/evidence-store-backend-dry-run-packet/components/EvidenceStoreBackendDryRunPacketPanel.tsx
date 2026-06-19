"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreBackendDryRunPacketModel } from "@/lib/codexforge/evidence-store-backend-dry-run-packet";

export function EvidenceStoreBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreBackendDryRunPacketModel()} />;
}
