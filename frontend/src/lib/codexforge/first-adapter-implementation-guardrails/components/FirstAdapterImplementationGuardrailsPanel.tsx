"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterImplementationGuardrailsModel } from "@/lib/codexforge/first-adapter-implementation-guardrails";

export function FirstAdapterImplementationGuardrailsPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterImplementationGuardrailsModel()} />;
}
