import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_FRICTION_REVIEW_LANGUAGE =
  "Guided operator friction review | Guided operator friction review does not mutate workflow state | Guided operator friction review requires explicit operator approval before future workflow changes | Friction review identifies confusing labels missing next steps unsafe ambiguity and overloaded phase navigation | Denied guided operator friction paths remain blocked | Guided operator friction review checklist | Go to Guided Operator Friction Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorFrictionReviewStableKey };

export function buildGuidedOperatorFrictionReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-friction-review");
}

export function summarizeGuidedOperatorFrictionReview(model = buildGuidedOperatorFrictionReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
