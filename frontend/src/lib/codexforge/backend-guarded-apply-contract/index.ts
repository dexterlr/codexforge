import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_APPLY_CONTRACT_LANGUAGE =
  "Backend guarded apply contract | Backend guarded apply contract does not write files or apply diffs | Backend guarded apply requires explicit operator approval | Apply contract defines path guard diff rollback evidence result audit queue and recovery requirements | Denied backend guarded apply paths remain blocked | Backend guarded apply checklist | Go to Backend Guarded Apply Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedApplyContractStableKey };

export function buildBackendGuardedApplyContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-apply-contract");
}

export function summarizeBackendGuardedApplyContract(
  model = buildBackendGuardedApplyContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
