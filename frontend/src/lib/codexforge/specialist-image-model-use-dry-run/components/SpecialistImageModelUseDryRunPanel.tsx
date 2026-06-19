"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistImageModelUseDryRunModel } from "@/lib/codexforge/specialist-image-model-use-dry-run";

export function SpecialistImageModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistImageModelUseDryRunModel()} />;
}

