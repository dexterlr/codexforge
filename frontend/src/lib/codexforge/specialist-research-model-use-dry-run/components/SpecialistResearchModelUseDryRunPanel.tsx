"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistResearchModelUseDryRunModel } from "@/lib/codexforge/specialist-research-model-use-dry-run";

export function SpecialistResearchModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistResearchModelUseDryRunModel()} />;
}

