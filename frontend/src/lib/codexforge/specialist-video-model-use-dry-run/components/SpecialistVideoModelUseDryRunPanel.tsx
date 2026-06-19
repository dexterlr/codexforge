"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistVideoModelUseDryRunModel } from "@/lib/codexforge/specialist-video-model-use-dry-run";

export function SpecialistVideoModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistVideoModelUseDryRunModel()} />;
}

