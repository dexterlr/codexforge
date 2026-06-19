"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistCodingModelUseDryRunModel } from "@/lib/codexforge/specialist-coding-model-use-dry-run";

export function SpecialistCodingModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistCodingModelUseDryRunModel()} />;
}

