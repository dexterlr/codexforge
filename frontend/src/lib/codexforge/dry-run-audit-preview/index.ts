import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_AUDIT_PREVIEW_LANGUAGE =
  "Dry-run audit preview | Dry-run audit preview does not persist audit logs | Dry-run audit preview requires explicit operator approval | Audit preview shows goal plan diff apply command approval evidence result recovery queue operator and denied-path records without persistence | Denied dry-run audit paths remain blocked | Dry-run audit checklist | Go to Dry-Run Audit Preview";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunAuditPreviewStableKey };

export function buildDryRunAuditPreviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-audit-preview");
}

export function summarizeDryRunAuditPreview(model = buildDryRunAuditPreviewModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
