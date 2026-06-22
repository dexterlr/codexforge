import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_AUDIT_TIMELINE_PACKET_LANGUAGE =
  "Build fix audit timeline packet | Build fix audit timeline packet does not persist audit logs | Build fix audit timeline requires explicit operator approval before future persistence | Audit timeline shows goal context plan diff command risk approval evidence result recovery and operator placeholders | Denied build fix audit timeline paths remain blocked | Build fix audit timeline checklist | Go to Build Fix Audit Timeline Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixAuditTimelinePacketStableKey };

export function buildBuildFixAuditTimelinePacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-audit-timeline-packet");
}

export function summarizeBuildFixAuditTimelinePacket(model = buildBuildFixAuditTimelinePacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
