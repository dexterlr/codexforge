import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const RISK_REVIEW_PACKET_LANGUAGE =
  "Risk review packet | Risk review packet does not execute safety scans from the UI | Risk review packet requires explicit operator approval | Risk review packet reviews files commands models providers connectors runtimes secrets installs deploys persistence recovery and audit risks | Denied risk review paths remain blocked | Risk review checklist | Go to Risk Review Packet";

export function buildRiskReviewPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("risk-review-packet");
}

export function summarizeRiskReviewPacket(model = buildRiskReviewPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
