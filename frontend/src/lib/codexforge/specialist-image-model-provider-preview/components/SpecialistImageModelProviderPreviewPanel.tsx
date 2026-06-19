"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistImageModelProviderPreviewModel } from "@/lib/codexforge/specialist-image-model-provider-preview";

export function SpecialistImageModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistImageModelProviderPreviewModel()} />;
}
