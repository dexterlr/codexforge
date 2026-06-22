import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const GOAL_RECOVERY_IMPLICATION_PREVIEW_LANGUAGE =
  "Goal recovery implication preview | Goal recovery implication preview does not execute recovery | Goal recovery implication preview requires explicit operator approval | Goal recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications | Denied goal recovery implication paths remain blocked | Goal recovery implication checklist | Go to Goal Recovery Implication Preview";

export function buildGoalRecoveryImplicationPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("goal-recovery-implication-preview");
}

export function summarizeGoalRecoveryImplicationPreview(
  model = buildGoalRecoveryImplicationPreviewModel()
): string {
  return summarizeGoalCompilerRouteModel(model);
}
