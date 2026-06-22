import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const GUARDED_APPLY_RUN_DRY_RUN_BOUNDARY_LANGUAGE =
  "Guarded apply run dry-run boundary | Guarded apply run dry-run boundary does not execute apply or run | Guarded apply run dry-run requires explicit operator approval | Dry-run boundary separates frontend preview from future backend-owned guarded apply and command run | Denied guarded apply run dry-run paths remain blocked | Guarded apply run dry-run checklist | Go to Guarded Apply Run Dry-Run Boundary";

export { buildGuardedApplyRunDryRunStableKey as buildGuardedApplyRunDryRunBoundaryStableKey };

export function buildGuardedApplyRunDryRunBoundaryModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("guarded-apply-run-dry-run-boundary");
}

export function summarizeGuardedApplyRunDryRunBoundary(
  model = buildGuardedApplyRunDryRunBoundaryModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
