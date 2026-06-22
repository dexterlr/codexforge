import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_AUDIT_HANDOFF_CONTRACT_LANGUAGE =
  "Backend audit handoff contract | Backend audit handoff contract does not persist audit logs | Backend audit handoff requires explicit operator approval | Audit handoff contract defines goal context approval file command evidence result recovery queue and operator signoff records | Denied backend audit handoff paths remain blocked | Backend audit handoff checklist | Go to Backend Audit Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendAuditHandoffContractStableKey };

export function buildBackendAuditHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-audit-handoff-contract");
}

export function summarizeBackendAuditHandoffContract(
  model = buildBackendAuditHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
