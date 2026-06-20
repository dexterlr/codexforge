"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistModelProviderTrialPacketModel } from "@/lib/codexforge/specialist-model-provider-trial-packet";

export function SpecialistModelProviderTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistModelProviderTrialPacketModel()} />;
}
