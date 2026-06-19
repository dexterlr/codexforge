"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistResearchModelProviderPreviewModel } from "@/lib/codexforge/specialist-research-model-provider-preview";

export function SpecialistResearchModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistResearchModelProviderPreviewModel()} />;
}
