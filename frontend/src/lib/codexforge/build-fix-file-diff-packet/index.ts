import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_FILE_DIFF_PACKET_LANGUAGE =
  "Build fix file diff packet | Build fix file diff packet does not write files | Build fix file diff requires explicit operator approval before future apply | File diff packet shows path guard before after diff and rollback preview | Denied build fix file diff paths remain blocked | Build fix file diff checklist | Go to Build Fix File Diff Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixFileDiffPacketStableKey };

export function buildBuildFixFileDiffPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-file-diff-packet");
}

export function summarizeBuildFixFileDiffPacket(model = buildBuildFixFileDiffPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
