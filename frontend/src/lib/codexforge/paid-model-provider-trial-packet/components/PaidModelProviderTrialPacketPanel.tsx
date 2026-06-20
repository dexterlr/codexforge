"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelProviderTrialPacketModel } from "@/lib/codexforge/paid-model-provider-trial-packet";

export function PaidModelProviderTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelProviderTrialPacketModel()} />;
}
