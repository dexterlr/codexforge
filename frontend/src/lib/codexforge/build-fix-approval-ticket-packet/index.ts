import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_APPROVAL_TICKET_PACKET_LANGUAGE =
  "Build fix approval ticket packet | Build fix approval ticket packet does not approve actions | Build fix approval ticket requires explicit human approval | Approval ticket keeps file writes commands evidence persistence result persistence recovery and audit blocked | Denied build fix approval paths remain blocked | Build fix approval ticket checklist | Go to Build Fix Approval Ticket Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixApprovalTicketPacketStableKey };

export function buildBuildFixApprovalTicketPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-approval-ticket-packet");
}

export function summarizeBuildFixApprovalTicketPacket(model = buildBuildFixApprovalTicketPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
