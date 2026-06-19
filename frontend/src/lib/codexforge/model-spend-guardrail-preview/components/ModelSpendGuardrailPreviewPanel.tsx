"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelSpendGuardrailPreviewModel } from "@/lib/codexforge/model-spend-guardrail-preview";

export function ModelSpendGuardrailPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelSpendGuardrailPreviewModel()} />;
}
