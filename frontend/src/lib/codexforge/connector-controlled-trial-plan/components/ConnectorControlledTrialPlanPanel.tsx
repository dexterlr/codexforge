"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildConnectorControlledTrialPlanModel } from "@/lib/codexforge/connector-controlled-trial-plan";

export function ConnectorControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildConnectorControlledTrialPlanModel()} />;
}
