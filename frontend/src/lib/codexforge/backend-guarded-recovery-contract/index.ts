import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_RECOVERY_CONTRACT_LANGUAGE =
  "Backend guarded recovery contract | Backend guarded recovery contract does not execute recovery | Backend guarded recovery requires explicit operator approval | Recovery contract defines rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements | Denied backend guarded recovery paths remain blocked | Backend guarded recovery checklist | Go to Backend Guarded Recovery Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedRecoveryContractStableKey };

export function buildBackendGuardedRecoveryContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-recovery-contract");
}

export function summarizeBackendGuardedRecoveryContract(
  model = buildBackendGuardedRecoveryContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
