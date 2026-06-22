import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_PROJECT_CONTEXT_PACKET_LANGUAGE =
  "Build fix project context packet | Build fix project context packet does not browse arbitrary files | Build fix project context requires explicit operator approval before future indexing | Project context shows bounded workspace summary without reading secrets | Denied build fix project context paths remain blocked | Build fix project context checklist | Go to Build Fix Project Context Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixProjectContextPacketStableKey };

export function buildBuildFixProjectContextPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-project-context-packet");
}

export function summarizeBuildFixProjectContextPacket(model = buildBuildFixProjectContextPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
