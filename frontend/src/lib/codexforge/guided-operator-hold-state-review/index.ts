import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_HOLD_STATE_REVIEW_LANGUAGE =
  "Guided operator hold state review | Guided operator hold state review does not release execution locks | Guided operator hold state review requires explicit operator approval | Hold state review keeps file mutation command execution persistence export recovery and queues blocked | Denied guided operator hold paths remain blocked | Guided operator hold state checklist | Go to Guided Operator Hold State Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorHoldStateReviewStableKey };

export function buildGuidedOperatorHoldStateReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-hold-state-review");
}

export function summarizeGuidedOperatorHoldStateReview(model = buildGuidedOperatorHoldStateReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
