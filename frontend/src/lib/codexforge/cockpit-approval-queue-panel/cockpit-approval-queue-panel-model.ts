import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_APPROVAL_QUEUE_PANEL_LANGUAGE =
  "Cockpit approval queue panel | Cockpit approval queue panel does not approve actions | Approval queue requires explicit human approval | Approval queue keeps file writes and commands blocked | Denied cockpit approval paths remain blocked | Cockpit approval queue checklist";

export { buildUnifiedCockpitStableKey as buildCockpitApprovalQueuePanelStableKey };

export function buildCockpitApprovalQueuePanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-approval-queue-panel");
}

export function summarizeCockpitApprovalQueuePanel(model = buildCockpitApprovalQueuePanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
