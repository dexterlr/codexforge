import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_COMMAND_GUARD_EVALUATION_LANGUAGE =
  "Dry-run command guard evaluation | Dry-run command guard evaluation does not run commands | Dry-run command guard evaluation requires explicit operator approval | Command guard evaluation previews allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture | Denied dry-run command guard paths remain blocked | Dry-run command guard checklist | Go to Dry-Run Command Guard Evaluation";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunCommandGuardEvaluationStableKey };

export function buildDryRunCommandGuardEvaluationModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-command-guard-evaluation");
}

export function summarizeDryRunCommandGuardEvaluation(
  model = buildDryRunCommandGuardEvaluationModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
