import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const RETRY_READINESS_PREVIEW_LANGUAGE =
  "Retry readiness preview | Retry readiness preview does not execute retry | Retry readiness preview requires explicit operator approval | Retry readiness preview checks retry reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity | Retry execution remains blocked | Retry readiness checklist | Go to Retry Readiness Preview";

export { buildRealTrialHardeningStableKey as buildRetryReadinessPreviewStableKey };

export function buildRetryReadinessPreviewModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("retry-readiness-preview");
}

export function summarizeRetryReadinessPreview(
  model = buildRetryReadinessPreviewModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
