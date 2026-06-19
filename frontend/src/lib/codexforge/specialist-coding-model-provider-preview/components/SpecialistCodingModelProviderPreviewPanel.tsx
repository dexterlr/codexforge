"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistCodingModelProviderPreviewModel } from "@/lib/codexforge/specialist-coding-model-provider-preview";

export function SpecialistCodingModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistCodingModelProviderPreviewModel()} />;
}
