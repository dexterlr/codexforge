"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistTradingModelUseDryRunModel } from "@/lib/codexforge/specialist-trading-model-use-dry-run";

export function SpecialistTradingModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistTradingModelUseDryRunModel()} />;
}

