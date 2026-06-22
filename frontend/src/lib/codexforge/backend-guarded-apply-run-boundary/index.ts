import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_APPLY_RUN_BOUNDARY_LANGUAGE =
  "Backend guarded apply run boundary | Backend guarded apply run boundary does not execute apply or run | Backend guarded apply run requires explicit operator approval | Apply run boundary separates frontend preview from backend-owned guarded apply and command run | Denied backend guarded apply run paths remain blocked | Backend guarded apply run checklist | Go to Backend Guarded Apply Run Boundary";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedApplyRunBoundaryStableKey };

export function buildBackendGuardedApplyRunBoundaryModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-apply-run-boundary");
}

export function summarizeBackendGuardedApplyRunBoundary(
  model = buildBackendGuardedApplyRunBoundaryModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
