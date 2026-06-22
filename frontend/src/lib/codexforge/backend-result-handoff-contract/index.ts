import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_RESULT_HANDOFF_CONTRACT_LANGUAGE =
  "Backend result handoff contract | Backend result handoff contract does not persist results | Backend result handoff requires explicit operator approval | Result handoff contract defines success denied blocked failed timeout needs-review manual-review and retryable states | Denied backend result handoff paths remain blocked | Backend result handoff checklist | Go to Backend Result Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendResultHandoffContractStableKey };

export function buildBackendResultHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-result-handoff-contract");
}

export function summarizeBackendResultHandoffContract(
  model = buildBackendResultHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
