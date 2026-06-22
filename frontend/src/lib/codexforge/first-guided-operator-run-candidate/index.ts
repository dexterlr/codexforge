import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const FIRST_GUIDED_OPERATOR_RUN_CANDIDATE_LANGUAGE =
  "First guided operator run candidate | First guided operator run candidate does not call models write files run commands persist evidence or execute recovery | First guided operator run candidate requires explicit operator approval | Candidate combines goal confirmation plan review diff review command review approval holds evidence result recovery timeline friction safety and completion | Denied first guided operator run paths remain blocked | First guided operator run checklist | Go to First Guided Operator Run Candidate";

export { buildGuidedOperatorRunStableKey as buildFirstGuidedOperatorRunCandidateStableKey };

export function buildFirstGuidedOperatorRunCandidateModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("first-guided-operator-run-candidate");
}

export function summarizeFirstGuidedOperatorRunCandidate(model = buildFirstGuidedOperatorRunCandidateModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
