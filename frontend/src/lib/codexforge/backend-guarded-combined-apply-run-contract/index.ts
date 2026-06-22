import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_COMBINED_APPLY_RUN_CONTRACT_LANGUAGE =
  "Backend guarded combined apply run contract | Backend guarded combined apply run contract does not write files or run commands | Backend guarded combined apply run requires explicit operator approval | Combined contract defines apply then run ordering evidence chaining result capture queue state and recovery requirements | Denied backend guarded combined apply run paths remain blocked | Backend guarded combined apply run checklist | Go to Backend Guarded Combined Apply Run Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedCombinedApplyRunContractStableKey };

export function buildBackendGuardedCombinedApplyRunContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-combined-apply-run-contract");
}

export function summarizeBackendGuardedCombinedApplyRunContract(
  model = buildBackendGuardedCombinedApplyRunContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
