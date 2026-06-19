"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstControlledModelUseTrialPacketModel } from "@/lib/codexforge/first-controlled-model-use-trial-packet";

export function FirstControlledModelUseTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstControlledModelUseTrialPacketModel()} />;
}
