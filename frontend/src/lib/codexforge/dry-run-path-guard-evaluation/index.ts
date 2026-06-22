import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_PATH_GUARD_EVALUATION_LANGUAGE =
  "Dry-run path guard evaluation | Dry-run path guard evaluation does not browse arbitrary files or write files | Dry-run path guard evaluation requires explicit operator approval | Path guard evaluation previews workspace root containment traversal denial generated file policy binary guard and rollback requirements | Denied dry-run path guard paths remain blocked | Dry-run path guard checklist | Go to Dry-Run Path Guard Evaluation";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunPathGuardEvaluationStableKey };

export function buildDryRunPathGuardEvaluationModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-path-guard-evaluation");
}

export function summarizeDryRunPathGuardEvaluation(
  model = buildDryRunPathGuardEvaluationModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
