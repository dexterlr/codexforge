"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterImplementationOperatorHandoffModel } from "@/lib/codexforge/first-adapter-implementation-operator-handoff";

export function FirstAdapterImplementationOperatorHandoffPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterImplementationOperatorHandoffModel()} />;
}
