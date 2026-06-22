import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const DONE_CRITERIA_PREVIEW_LANGUAGE =
  "Done criteria preview | Done criteria preview does not claim execution happened | Done criteria preview requires explicit operator approval before execution | Done criteria preview defines expected success blocked denied failed manual-review retryable recovered and operator-accepted outcomes | Denied done criteria paths remain blocked | Done criteria checklist | Go to Done Criteria Preview";

export function buildDoneCriteriaPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("done-criteria-preview");
}

export function summarizeDoneCriteriaPreview(model = buildDoneCriteriaPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
