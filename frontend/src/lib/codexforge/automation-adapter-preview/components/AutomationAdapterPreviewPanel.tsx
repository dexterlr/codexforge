"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAutomationAdapterPreviewModel } from "@/lib/codexforge/automation-adapter-preview";

export function AutomationAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAutomationAdapterPreviewModel()} />;
}
