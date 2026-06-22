import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_RECOVERY_PREVIEW_LANGUAGE =
  "Dry-run recovery preview | Dry-run recovery preview does not execute recovery | Dry-run recovery preview requires explicit operator approval | Recovery preview shows rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options as non-executing preview actions | Denied dry-run recovery paths remain blocked | Dry-run recovery checklist | Go to Dry-Run Recovery Preview";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunRecoveryPreviewStableKey };

export function buildDryRunRecoveryPreviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-recovery-preview");
}

export function summarizeDryRunRecoveryPreview(
  model = buildDryRunRecoveryPreviewModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
