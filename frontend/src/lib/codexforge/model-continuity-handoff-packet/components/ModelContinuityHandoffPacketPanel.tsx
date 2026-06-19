"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelContinuityHandoffPacketModel } from "@/lib/codexforge/model-continuity-handoff-packet";

export function ModelContinuityHandoffPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelContinuityHandoffPacketModel()} />;
}
