import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_RESULT_PREVIEW_LANGUAGE =
  "Dry-run result preview | Dry-run result preview does not persist results | Dry-run result preview requires explicit operator approval | Result preview shows success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states without claiming execution happened | Denied dry-run result paths remain blocked | Dry-run result checklist | Go to Dry-Run Result Preview";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunResultPreviewStableKey };

export function buildDryRunResultPreviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-result-preview");
}

export function summarizeDryRunResultPreview(model = buildDryRunResultPreviewModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
