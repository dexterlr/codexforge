import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_DENIED_PATH_MATRIX_LANGUAGE =
  "Dry-run denied path matrix | Dry-run denied path matrix does not mutate workflow state | Dry-run denied path matrix requires explicit operator approval | Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution | Denied dry-run paths remain blocked | Dry-run denied path checklist | Go to Dry-Run Denied Path Matrix";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunDeniedPathMatrixStableKey };

export function buildDryRunDeniedPathMatrixModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-denied-path-matrix");
}

export function summarizeDryRunDeniedPathMatrix(
  model = buildDryRunDeniedPathMatrixModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
