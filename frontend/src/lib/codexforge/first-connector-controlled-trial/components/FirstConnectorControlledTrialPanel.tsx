"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstConnectorControlledTrialModel } from "@/lib/codexforge/first-connector-controlled-trial";

export function FirstConnectorControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstConnectorControlledTrialModel()} />;
}
