import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_COMMAND_PREVIEW_PACKET_LANGUAGE =
  "Build fix command preview packet | Build fix command preview packet does not run commands | Build fix command preview requires explicit operator approval before future execution | Command preview packet shows allowlist arguments working directory environment evidence result and recovery readiness | Denied build fix command preview paths remain blocked | Build fix command preview checklist | Go to Build Fix Command Preview Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixCommandPreviewPacketStableKey };

export function buildBuildFixCommandPreviewPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-command-preview-packet");
}

export function summarizeBuildFixCommandPreviewPacket(model = buildBuildFixCommandPreviewPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
