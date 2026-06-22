import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_APPROVAL_TICKET_CONTRACT_LANGUAGE =
  "Backend approval ticket contract | Backend approval ticket contract does not persist approvals | Backend approval ticket requires explicit human approval | Approval ticket contract defines approval scope operator identity target action denied paths and expiry | Denied backend approval ticket paths remain blocked | Backend approval ticket checklist | Go to Backend Approval Ticket Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendApprovalTicketContractStableKey };

export function buildBackendApprovalTicketContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-approval-ticket-contract");
}

export function summarizeBackendApprovalTicketContract(
  model = buildBackendApprovalTicketContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
