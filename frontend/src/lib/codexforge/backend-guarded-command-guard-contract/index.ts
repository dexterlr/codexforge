import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_COMMAND_GUARD_CONTRACT_LANGUAGE =
  "Backend guarded command guard contract | Backend guarded command guard contract does not run commands | Backend guarded command guard requires explicit operator approval | Command guard contract defines allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture | Denied backend guarded command guard paths remain blocked | Backend guarded command guard checklist | Go to Backend Guarded Command Guard Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedCommandGuardContractStableKey };

export function buildBackendGuardedCommandGuardContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-command-guard-contract");
}

export function summarizeBackendGuardedCommandGuardContract(
  model = buildBackendGuardedCommandGuardContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
