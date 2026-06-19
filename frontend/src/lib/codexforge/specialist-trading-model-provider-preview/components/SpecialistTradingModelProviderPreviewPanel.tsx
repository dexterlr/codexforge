"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistTradingModelProviderPreviewModel } from "@/lib/codexforge/specialist-trading-model-provider-preview";

export function SpecialistTradingModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistTradingModelProviderPreviewModel()} />;
}
