import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_RESULT_CONTRACT_LANGUAGE =
  "Backend guarded result contract | Backend guarded result contract does not persist results | Backend guarded result requires explicit operator approval | Result contract defines success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states | Denied backend guarded result paths remain blocked | Backend guarded result checklist | Go to Backend Guarded Result Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedResultContractStableKey };

export function buildBackendGuardedResultContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-result-contract");
}

export function summarizeBackendGuardedResultContract(
  model = buildBackendGuardedResultContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
