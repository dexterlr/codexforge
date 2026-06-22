import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const FIRST_GUARDED_APPLY_RUN_DRY_RUN_CANDIDATE_LANGUAGE =
  "First guarded apply run dry-run candidate | First guarded apply run dry-run candidate does not execute apply or run | First guarded apply run dry-run candidate requires explicit operator approval | Candidate combines apply packet run packet path guard command guard approval evidence result recovery audit queue denied paths and go no-go review | Denied first guarded apply run dry-run paths remain blocked | First guarded apply run dry-run checklist | Go to First Guarded Apply Run Dry-Run Candidate";

export { buildGuardedApplyRunDryRunStableKey as buildFirstGuardedApplyRunDryRunCandidateStableKey };

export function buildFirstGuardedApplyRunDryRunCandidateModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("first-guarded-apply-run-dry-run-candidate");
}

export function summarizeFirstGuardedApplyRunDryRunCandidate(
  model = buildFirstGuardedApplyRunDryRunCandidateModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
