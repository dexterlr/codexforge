"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelOutputEvidencePacketModel } from "@/lib/codexforge/model-output-evidence-packet";

export function ModelOutputEvidencePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelOutputEvidencePacketModel()} />;
}
