import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_EVIDENCE_PREVIEW_LANGUAGE =
  "Dry-run evidence preview | Dry-run evidence preview does not persist evidence | Dry-run evidence preview requires explicit operator approval | Evidence preview shows diff command stdout stderr exit code approval timestamp redaction operator audit and queue references without capturing runtime evidence | Denied dry-run evidence paths remain blocked | Dry-run evidence checklist | Go to Dry-Run Evidence Preview";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunEvidencePreviewStableKey };

export function buildDryRunEvidencePreviewModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-evidence-preview");
}

export function summarizeDryRunEvidencePreview(model = buildDryRunEvidencePreviewModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
