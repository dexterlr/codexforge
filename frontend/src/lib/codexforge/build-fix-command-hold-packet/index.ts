import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_COMMAND_HOLD_PACKET_LANGUAGE =
  "Build fix command hold packet | Build fix command hold packet does not run commands | Build fix command hold requires explicit operator approval | Command hold keeps build test smoke git runtime and shell execution blocked | Denied build fix command hold paths remain blocked | Build fix command hold checklist | Go to Build Fix Command Hold Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixCommandHoldPacketStableKey };

export function buildBuildFixCommandHoldPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-command-hold-packet");
}

export function summarizeBuildFixCommandHoldPacket(model = buildBuildFixCommandHoldPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
