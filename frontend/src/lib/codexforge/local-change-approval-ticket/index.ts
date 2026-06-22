import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_APPROVAL_TICKET_LANGUAGE =
  "Local change approval ticket | Local change approval ticket does not approve actions | Local change approval ticket requires explicit human approval | Approval ticket keeps file writes and commands blocked | Denied local change approval paths remain blocked | Local change approval checklist | Go to Local Change Approval Ticket";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeApprovalTicketStableKey };

export function buildLocalChangeApprovalTicketModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-approval-ticket");
}

export function summarizeLocalChangeApprovalTicket(
  model = buildLocalChangeApprovalTicketModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
