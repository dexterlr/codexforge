import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_FILE_WRITE_CANDIDATE_LANGUAGE =
  "Tiny real file write candidate | Tiny real file write candidate does not let the frontend write files directly | Tiny real file write candidate requires explicit operator approval | File write candidate is sandbox-bounded path-guarded diff-reviewed and backend-owned | Denied tiny real file write paths remain blocked | Tiny real file write checklist | Go to Tiny Real File Write Candidate";

export { buildTinyRealControlledTrialStableKey as buildTinyRealFileWriteCandidateStableKey };

export function buildTinyRealFileWriteCandidateModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-file-write-candidate");
}

export function summarizeTinyRealFileWriteCandidate(
  model = buildTinyRealFileWriteCandidateModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
