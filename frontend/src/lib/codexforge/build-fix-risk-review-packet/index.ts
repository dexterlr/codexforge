import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_RISK_REVIEW_PACKET_LANGUAGE =
  "Build fix risk review packet | Build fix risk review packet does not approve or execute actions | Build fix risk review requires explicit operator approval | Risk review explains file mutation command execution secrets traversal install deploy runtime adapter provider connector and model risks | Denied build fix risk paths remain blocked | Build fix risk review checklist | Go to Build Fix Risk Review Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixRiskReviewPacketStableKey };

export function buildBuildFixRiskReviewPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-risk-review-packet");
}

export function summarizeBuildFixRiskReviewPacket(model = buildBuildFixRiskReviewPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
