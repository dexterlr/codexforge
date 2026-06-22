import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_QUEUE_PREVIEW_LANGUAGE =
  "Dry-run queue preview | Dry-run queue preview does not create queue jobs | Dry-run queue preview requires explicit operator approval | Queue preview shows preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states without persistence | Denied dry-run queue paths remain blocked | Dry-run queue checklist | Go to Dry-Run Queue Preview";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunQueuePreviewStableKey };

export function buildDryRunQueuePreviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-queue-preview");
}

export function summarizeDryRunQueuePreview(model = buildDryRunQueuePreviewModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
