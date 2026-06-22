import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const FIRST_TINY_REAL_CONTROLLED_CANDIDATE_LANGUAGE =
  "First tiny real controlled candidate | First tiny real controlled candidate does not allow broad apply or run | First tiny real controlled candidate requires explicit operator approval | Candidate combines sandbox file write command candidate approval ticket backend hold path guard command guard preflight evidence result audit recovery denied paths and operator signoff | Denied first tiny real controlled paths remain blocked | First tiny real controlled checklist | Go to First Tiny Real Controlled Candidate";

export { buildTinyRealControlledTrialStableKey as buildFirstTinyRealControlledCandidateStableKey };

export function buildFirstTinyRealControlledCandidateModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("first-tiny-real-controlled-candidate");
}

export function summarizeFirstTinyRealControlledCandidate(
  model = buildFirstTinyRealControlledCandidateModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
