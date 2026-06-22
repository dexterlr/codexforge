import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_GO_NO_GO_REVIEW_LANGUAGE =
  "Real trial go no-go review | Real trial go no-go review does not release execution | Real trial go no-go review requires explicit operator approval | Go no-go review reports preview-only status blocked execution and required future backend guards | Denied real trial go no-go paths remain blocked | Real trial go no-go checklist | Go to Real Trial Go No Go Review";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialGoNoGoReviewStableKey };

export function buildRealTrialGoNoGoReviewModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-go-no-go-review");
}

export function summarizeRealTrialGoNoGoReview(model = buildRealTrialGoNoGoReviewModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
