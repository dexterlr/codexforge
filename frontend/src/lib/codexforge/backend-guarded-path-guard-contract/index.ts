import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_PATH_GUARD_CONTRACT_LANGUAGE =
  "Backend guarded path guard contract | Backend guarded path guard contract does not browse arbitrary files or write files | Backend guarded path guard requires explicit operator approval | Path guard contract defines workspace root containment traversal denial generated file policy binary guard and rollback requirements | Denied backend guarded path guard paths remain blocked | Backend guarded path guard checklist | Go to Backend Guarded Path Guard Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedPathGuardContractStableKey };

export function buildBackendGuardedPathGuardContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-path-guard-contract");
}

export function summarizeBackendGuardedPathGuardContract(
  model = buildBackendGuardedPathGuardContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
