import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_RESULT_DECISION_PACKET_LANGUAGE =
  "Build fix result decision packet | Build fix result decision packet does not persist results or make automatic decisions | Build fix result decision requires explicit operator approval before future action | Result decision shows accept retry rollback explain manual review success denied blocked failed timeout and needs-review states | Denied build fix result paths remain blocked | Build fix result decision checklist | Go to Build Fix Result Decision Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixResultDecisionPacketStableKey };

export function buildBuildFixResultDecisionPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-result-decision-packet");
}

export function summarizeBuildFixResultDecisionPacket(model = buildBuildFixResultDecisionPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
