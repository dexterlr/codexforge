import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const CONTROLLED_FIRST_LOCAL_CHANGE_TRIAL_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled first local change trial release candidate | Controlled first local change trial release candidate does not call models write files run commands persist evidence or execute recovery | Controlled first local change trial release requires explicit operator approval | Release candidate moves CodexForge toward the first approved local project change | Denied controlled first local change paths remain blocked | Controlled first local change trial release checklist | Go to Controlled First Local Change Trial Release Candidate";

export { buildFirstLocalChangeTrialStableKey as buildControlledFirstLocalChangeTrialReleaseCandidateStableKey };

export function buildControlledFirstLocalChangeTrialReleaseCandidateModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("controlled-first-local-change-trial-release-candidate");
}

export function summarizeControlledFirstLocalChangeTrialReleaseCandidate(
  model = buildControlledFirstLocalChangeTrialReleaseCandidateModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
