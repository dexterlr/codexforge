import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_RUN_CONTRACT_LANGUAGE =
  "Backend guarded run contract | Backend guarded run contract does not run commands | Backend guarded run requires explicit operator approval | Run contract defines command allowlist arguments working directory environment names evidence result audit queue and recovery requirements | Denied backend guarded run paths remain blocked | Backend guarded run checklist | Go to Backend Guarded Run Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedRunContractStableKey };

export function buildBackendGuardedRunContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-run-contract");
}

export function summarizeBackendGuardedRunContract(
  model = buildBackendGuardedRunContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
