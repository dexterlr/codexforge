import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const COMMAND_EXPECTATION_PREVIEW_LANGUAGE =
  "Command expectation preview | Command expectation preview does not run commands | Command expectation preview requires explicit operator approval | Command expectation preview lists likely build smoke validation lint test and hygiene command candidates as review-only expectations | Denied command expectation paths remain blocked | Command expectation checklist | Go to Command Expectation Preview";

export function buildCommandExpectationPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("command-expectation-preview");
}

export function summarizeCommandExpectationPreview(model = buildCommandExpectationPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
