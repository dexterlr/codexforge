import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_PLAN_REVIEW_LANGUAGE =
  "Guided operator plan review | Guided operator plan review does not execute plans | Guided operator plan review requires explicit operator approval before future execution | Plan review explains intended file changes commands risks evidence result and recovery in plain language | Denied guided operator plan paths remain blocked | Guided operator plan review checklist | Go to Guided Operator Plan Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorPlanReviewStableKey };

export function buildGuidedOperatorPlanReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-plan-review");
}

export function summarizeGuidedOperatorPlanReview(model = buildGuidedOperatorPlanReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
