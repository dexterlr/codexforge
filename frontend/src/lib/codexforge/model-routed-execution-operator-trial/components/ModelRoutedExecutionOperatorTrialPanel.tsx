"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutedExecutionOperatorTrialModel } from "@/lib/codexforge/model-routed-execution-operator-trial";

export function ModelRoutedExecutionOperatorTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutedExecutionOperatorTrialModel()} />;
}
