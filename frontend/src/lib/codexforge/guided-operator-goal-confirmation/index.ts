import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_GOAL_CONFIRMATION_LANGUAGE =
  "Guided operator goal confirmation | Guided operator goal confirmation does not send prompts or call models | Guided operator goal confirmation requires explicit operator approval before future model routing | Goal confirmation explains what the operator asked for before any action | Denied guided operator goal paths remain blocked | Guided operator goal confirmation checklist | Go to Guided Operator Goal Confirmation";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorGoalConfirmationStableKey };

export function buildGuidedOperatorGoalConfirmationModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-goal-confirmation");
}

export function summarizeGuidedOperatorGoalConfirmation(model = buildGuidedOperatorGoalConfirmationModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
