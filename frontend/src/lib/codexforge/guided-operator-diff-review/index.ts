import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_DIFF_REVIEW_LANGUAGE =
  "Guided operator diff review | Guided operator diff review does not write files | Guided operator diff review requires explicit operator approval before future apply | Diff review explains before after path guard rollback and denied mutation | Denied guided operator diff paths remain blocked | Guided operator diff review checklist | Go to Guided Operator Diff Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorDiffReviewStableKey };

export function buildGuidedOperatorDiffReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-diff-review");
}

export function summarizeGuidedOperatorDiffReview(model = buildGuidedOperatorDiffReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
