"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedContextPacketValidationModel } from "@/lib/codexforge/shared-context-packet-validation";

export function SharedContextPacketValidationPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedContextPacketValidationModel()} />;
}

