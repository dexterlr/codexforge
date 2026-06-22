import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_RECOVERY_REVIEW_LANGUAGE =
  "Guided operator recovery review | Guided operator recovery review does not execute recovery | Guided operator recovery review requires explicit operator approval before future recovery | Recovery review explains rollback retry stop restore explain-failure and manual-review options as blocked previews | Denied guided operator recovery paths remain blocked | Guided operator recovery review checklist | Go to Guided Operator Recovery Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorRecoveryReviewStableKey };

export function buildGuidedOperatorRecoveryReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-recovery-review");
}

export function summarizeGuidedOperatorRecoveryReview(model = buildGuidedOperatorRecoveryReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
