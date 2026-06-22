import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_RESULT_REVIEW_LANGUAGE =
  "Guided operator result review | Guided operator result review does not persist results | Guided operator result review requires explicit operator approval before future persistence | Result review explains success denied blocked failed timeout needs-review and manual-review states | Denied guided operator result paths remain blocked | Guided operator result review checklist | Go to Guided Operator Result Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorResultReviewStableKey };

export function buildGuidedOperatorResultReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-result-review");
}

export function summarizeGuidedOperatorResultReview(model = buildGuidedOperatorResultReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
