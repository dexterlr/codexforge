import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_QUEUE_STATE_CONTRACT_LANGUAGE =
  "Backend guarded queue state contract | Backend guarded queue state contract does not create queue jobs | Backend guarded queue state requires explicit operator approval | Queue state contract defines preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states | Denied backend guarded queue state paths remain blocked | Backend guarded queue state checklist | Go to Backend Guarded Queue State Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedQueueStateContractStableKey };

export function buildBackendGuardedQueueStateContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-queue-state-contract");
}

export function summarizeBackendGuardedQueueStateContract(
  model = buildBackendGuardedQueueStateContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
