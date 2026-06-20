"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelBridgeEvidencePacketModel } from "@/lib/codexforge/local-model-bridge-evidence-packet";

export function LocalModelBridgeEvidencePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelBridgeEvidencePacketModel()} />;
}
