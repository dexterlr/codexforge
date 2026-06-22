import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_RECOVERY_HANDOFF_CONTRACT_LANGUAGE =
  "Backend recovery handoff contract | Backend recovery handoff contract does not execute recovery | Backend recovery handoff requires explicit operator approval | Recovery handoff contract defines rollback retry stop restore explain-failure manual-review and safety-stop requirements | Denied backend recovery handoff paths remain blocked | Backend recovery handoff checklist | Go to Backend Recovery Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendRecoveryHandoffContractStableKey };

export function buildBackendRecoveryHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-recovery-handoff-contract");
}

export function summarizeBackendRecoveryHandoffContract(
  model = buildBackendRecoveryHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
