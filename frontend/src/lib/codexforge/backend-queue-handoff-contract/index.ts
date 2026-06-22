import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_QUEUE_HANDOFF_CONTRACT_LANGUAGE =
  "Backend queue handoff contract | Backend queue handoff contract does not create queue jobs | Backend queue handoff requires explicit operator approval | Queue handoff contract defines queued blocked approved denied running completed failed timeout canceled and recovered states | Denied backend queue handoff paths remain blocked | Backend queue handoff checklist | Go to Backend Queue Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendQueueHandoffContractStableKey };

export function buildBackendQueueHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-queue-handoff-contract");
}

export function summarizeBackendQueueHandoffContract(
  model = buildBackendQueueHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
