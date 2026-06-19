"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistVideoModelProviderPreviewModel } from "@/lib/codexforge/specialist-video-model-provider-preview";

export function SpecialistVideoModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistVideoModelProviderPreviewModel()} />;
}
