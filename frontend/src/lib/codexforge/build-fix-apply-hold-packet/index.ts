import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_APPLY_HOLD_PACKET_LANGUAGE =
  "Build fix apply hold packet | Build fix apply hold packet does not write files | Build fix apply hold requires explicit operator approval | Apply hold keeps diff apply and file mutation blocked | Denied build fix apply paths remain blocked | Build fix apply hold checklist | Go to Build Fix Apply Hold Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixApplyHoldPacketStableKey };

export function buildBuildFixApplyHoldPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-apply-hold-packet");
}

export function summarizeBuildFixApplyHoldPacket(model = buildBuildFixApplyHoldPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
