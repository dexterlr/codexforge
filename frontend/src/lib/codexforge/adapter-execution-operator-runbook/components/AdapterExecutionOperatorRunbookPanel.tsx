"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionOperatorRunbookModel } from "@/lib/codexforge/adapter-execution-operator-runbook";

export function AdapterExecutionOperatorRunbookPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionOperatorRunbookModel()} />;
}
