import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const ROLLBACK_READINESS_PREVIEW_LANGUAGE =
  "Rollback readiness preview | Rollback readiness preview does not execute rollback | Rollback readiness preview requires explicit operator approval | Rollback readiness preview checks snapshot availability diff reversibility touched files risk notes evidence references and audit references | Rollback execution remains blocked | Rollback readiness checklist | Go to Rollback Readiness Preview";

export { buildRealTrialHardeningStableKey as buildRollbackReadinessPreviewStableKey };

export function buildRollbackReadinessPreviewModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("rollback-readiness-preview");
}

export function summarizeRollbackReadinessPreview(
  model = buildRollbackReadinessPreviewModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
