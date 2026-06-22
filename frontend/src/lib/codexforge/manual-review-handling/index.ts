import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const MANUAL_REVIEW_HANDLING_LANGUAGE =
  "Manual review handling | Manual review handling does not execute recovery | Manual review handling requires explicit operator approval | Manual review handling previews review reasons blocked action summary evidence gaps result gaps audit gaps and next safe operator choices | Manual review recovery remains blocked | Manual review checklist | Go to Manual Review Handling";

export { buildRealTrialHardeningStableKey as buildManualReviewHandlingStableKey };

export function buildManualReviewHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("manual-review-handling");
}

export function summarizeManualReviewHandling(
  model = buildManualReviewHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
