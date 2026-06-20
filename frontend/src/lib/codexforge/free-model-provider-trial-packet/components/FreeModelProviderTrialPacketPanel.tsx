"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelProviderTrialPacketModel } from "@/lib/codexforge/free-model-provider-trial-packet";

export function FreeModelProviderTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelProviderTrialPacketModel()} />;
}
