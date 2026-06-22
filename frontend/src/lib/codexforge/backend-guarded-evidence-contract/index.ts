import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_EVIDENCE_CONTRACT_LANGUAGE =
  "Backend guarded evidence contract | Backend guarded evidence contract does not persist evidence | Backend guarded evidence requires explicit operator approval | Evidence contract defines diff command stdout stderr exit code approval timestamp redaction operator audit and queue references | Denied backend guarded evidence paths remain blocked | Backend guarded evidence checklist | Go to Backend Guarded Evidence Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedEvidenceContractStableKey };

export function buildBackendGuardedEvidenceContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-evidence-contract");
}

export function summarizeBackendGuardedEvidenceContract(
  model = buildBackendGuardedEvidenceContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
