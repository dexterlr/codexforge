import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const FIRST_REAL_CONTROLLED_OPERATOR_TRIAL_CANDIDATE_LANGUAGE =
  "First real controlled operator trial candidate | First real controlled operator trial candidate does not execute the real trial | First real controlled operator trial candidate requires explicit operator approval | Candidate combines goal context file write command approval hold evidence result recovery audit operator checklist denied path checklist and go no-go review | Denied first real controlled operator trial paths remain blocked | First real controlled operator trial checklist | Go to First Real Controlled Operator Trial Candidate";

export { buildRealControlledOperatorTrialPacketStableKey as buildFirstRealControlledOperatorTrialCandidateStableKey };

export function buildFirstRealControlledOperatorTrialCandidateModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("first-real-controlled-operator-trial-candidate");
}

export function summarizeFirstRealControlledOperatorTrialCandidate(
  model = buildFirstRealControlledOperatorTrialCandidateModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
