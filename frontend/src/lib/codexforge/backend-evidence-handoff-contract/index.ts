import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_EVIDENCE_HANDOFF_CONTRACT_LANGUAGE =
  "Backend evidence handoff contract | Backend evidence handoff contract does not persist evidence | Backend evidence handoff requires explicit operator approval | Evidence handoff contract defines diff command stdout stderr exit code approval timestamp operator audit and redaction fields | Denied backend evidence handoff paths remain blocked | Backend evidence handoff checklist | Go to Backend Evidence Handoff Contract";

export { buildBackendApprovalHandoffStableKey as buildBackendEvidenceHandoffContractStableKey };

export function buildBackendEvidenceHandoffContractModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-evidence-handoff-contract");
}

export function summarizeBackendEvidenceHandoffContract(
  model = buildBackendEvidenceHandoffContractModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
