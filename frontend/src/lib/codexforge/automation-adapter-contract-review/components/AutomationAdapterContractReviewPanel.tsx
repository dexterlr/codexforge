"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAutomationAdapterContractReviewModel } from "@/lib/codexforge/automation-adapter-contract-review";

export function AutomationAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAutomationAdapterContractReviewModel()} />;
}
