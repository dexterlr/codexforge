import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const FIRST_APPROVED_LOCAL_CHANGE_CANDIDATE_LANGUAGE =
  "First approved local change candidate | First approved local change candidate does not write files or run commands | First approved local change candidate requires explicit operator approval | Candidate combines local goal plan diff command approval holds evidence result recovery audit and cockpit trial view | Denied first approved local change paths remain blocked | First approved local change checklist | Go to First Approved Local Change Candidate";

export { buildFirstLocalChangeTrialStableKey as buildFirstApprovedLocalChangeCandidateStableKey };

export function buildFirstApprovedLocalChangeCandidateModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("first-approved-local-change-candidate");
}

export function summarizeFirstApprovedLocalChangeCandidate(
  model = buildFirstApprovedLocalChangeCandidateModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
