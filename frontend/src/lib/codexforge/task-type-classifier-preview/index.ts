import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const TASK_TYPE_CLASSIFIER_PREVIEW_LANGUAGE =
  "Task type classifier preview | Task type classifier preview does not execute tasks | Task type classifier preview requires explicit operator approval before execution | Task type classifier previews build fix refactor generate research analyze configure test document and automate task types | Denied task type classifier paths remain blocked | Task type classifier checklist | Go to Task Type Classifier Preview";

export function buildTaskTypeClassifierPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("task-type-classifier-preview");
}

export function summarizeTaskTypeClassifierPreview(model = buildTaskTypeClassifierPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
