import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_TIMELINE_REVIEW_LANGUAGE =
  "Guided operator timeline review | Guided operator timeline review does not persist audit logs | Guided operator timeline review requires explicit operator approval before future persistence | Timeline review shows goal plan diff command risk approval holds evidence result recovery and completion | Denied guided operator timeline paths remain blocked | Guided operator timeline review checklist | Go to Guided Operator Timeline Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorTimelineReviewStableKey };

export function buildGuidedOperatorTimelineReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-timeline-review");
}

export function summarizeGuidedOperatorTimelineReview(model = buildGuidedOperatorTimelineReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
