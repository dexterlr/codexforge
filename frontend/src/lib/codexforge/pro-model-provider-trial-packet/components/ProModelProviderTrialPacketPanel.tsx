"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelProviderTrialPacketModel } from "@/lib/codexforge/pro-model-provider-trial-packet";

export function ProModelProviderTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelProviderTrialPacketModel()} />;
}
