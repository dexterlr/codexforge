import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_COMMAND_REVIEW_LANGUAGE =
  "Guided operator command review | Guided operator command review does not run commands | Guided operator command review requires explicit operator approval before future execution | Command review explains allowlist arguments working directory environment evidence result and recovery | Denied guided operator command paths remain blocked | Guided operator command review checklist | Go to Guided Operator Command Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorCommandReviewStableKey };

export function buildGuidedOperatorCommandReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-command-review");
}

export function summarizeGuidedOperatorCommandReview(model = buildGuidedOperatorCommandReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
