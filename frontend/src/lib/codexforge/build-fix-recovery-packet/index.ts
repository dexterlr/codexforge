import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_RECOVERY_PACKET_LANGUAGE =
  "Build fix recovery packet | Build fix recovery packet does not execute recovery | Build fix recovery requires explicit operator approval before future recovery | Recovery packet shows rollback retry stop restore explain failure and manual review options as blocked previews | Denied build fix recovery paths remain blocked | Build fix recovery checklist | Go to Build Fix Recovery Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixRecoveryPacketStableKey };

export function buildBuildFixRecoveryPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-recovery-packet");
}

export function summarizeBuildFixRecoveryPacket(model = buildBuildFixRecoveryPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
