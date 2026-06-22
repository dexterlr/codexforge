import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_COMMAND_CANDIDATE_LANGUAGE =
  "Tiny real command candidate | Tiny real command candidate does not let the frontend run commands directly | Tiny real command candidate requires explicit operator approval | Command candidate is allowlisted argument-guarded working-directory-guarded timeout-bounded and backend-owned | Denied tiny real command paths remain blocked | Tiny real command checklist | Go to Tiny Real Command Candidate";

export { buildTinyRealControlledTrialStableKey as buildTinyRealCommandCandidateStableKey };

export function buildTinyRealCommandCandidateModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-command-candidate");
}

export function summarizeTinyRealCommandCandidate(
  model = buildTinyRealCommandCandidateModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
