import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_APPROVAL_TICKET_LANGUAGE =
  "Tiny real approval ticket | Tiny real approval ticket does not persist hidden approvals | Tiny real approval ticket requires explicit human approval | Approval ticket previews operator identity scope expiry replay protection denied paths and backend authorization checks | Denied tiny real approval paths remain blocked | Tiny real approval checklist | Go to Tiny Real Approval Ticket";

export { buildTinyRealControlledTrialStableKey as buildTinyRealApprovalTicketStableKey };

export function buildTinyRealApprovalTicketModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-approval-ticket");
}

export function summarizeTinyRealApprovalTicket(
  model = buildTinyRealApprovalTicketModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
