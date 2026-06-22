import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_COMMAND_HANDOFF_CONTRACT_LANGUAGE =
  "Backend command handoff contract | Backend command handoff contract does not run commands | Backend command handoff requires explicit operator approval | Command handoff contract defines allowlist arguments working directory environment names evidence result and recovery requirements | Denied backend command handoff paths remain blocked | Backend command handoff checklist | Go to Backend Command Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendCommandHandoffContractStableKey };

export function buildBackendCommandHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-command-handoff-contract");
}

export function summarizeBackendCommandHandoffContract(
  model = buildBackendCommandHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
