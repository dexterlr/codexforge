import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_PREFLIGHT_REVIEW_LANGUAGE =
  "Tiny real preflight review | Tiny real preflight review does not execute apply or run | Tiny real preflight review requires explicit operator approval | Preflight review verifies goal plan diff command approval ticket path guard command guard evidence result audit and recovery readiness | Denied tiny real preflight paths remain blocked | Tiny real preflight checklist | Go to Tiny Real Preflight Review";

export { buildTinyRealControlledTrialStableKey as buildTinyRealPreflightReviewStableKey };

export function buildTinyRealPreflightReviewModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-preflight-review");
}

export function summarizeTinyRealPreflightReview(
  model = buildTinyRealPreflightReviewModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
