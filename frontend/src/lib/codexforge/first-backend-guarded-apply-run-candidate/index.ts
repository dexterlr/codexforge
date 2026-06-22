import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const FIRST_BACKEND_GUARDED_APPLY_RUN_CANDIDATE_LANGUAGE =
  "First backend guarded apply run candidate | First backend guarded apply run candidate does not execute apply or run | First backend guarded apply run candidate requires explicit operator approval | Candidate combines apply contract run contract path guard command guard approval evidence result recovery audit queue denied paths and go no-go review | Denied first backend guarded apply run paths remain blocked | First backend guarded apply run checklist | Go to First Backend Guarded Apply Run Candidate";

export { buildBackendGuardedApplyRunStableKey as buildFirstBackendGuardedApplyRunCandidateStableKey };

export function buildFirstBackendGuardedApplyRunCandidateModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("first-backend-guarded-apply-run-candidate");
}

export function summarizeFirstBackendGuardedApplyRunCandidate(
  model = buildFirstBackendGuardedApplyRunCandidateModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
