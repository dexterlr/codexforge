import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_EVIDENCE_REVIEW_LANGUAGE =
  "Guided operator evidence review | Guided operator evidence review does not persist evidence | Guided operator evidence review requires explicit operator approval before future persistence | Evidence review explains what diff command stdout stderr exit code approval timestamp and audit evidence would show | Denied guided operator evidence paths remain blocked | Guided operator evidence review checklist | Go to Guided Operator Evidence Review";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorEvidenceReviewStableKey };

export function buildGuidedOperatorEvidenceReviewModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-evidence-review");
}

export function summarizeGuidedOperatorEvidenceReview(model = buildGuidedOperatorEvidenceReviewModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
