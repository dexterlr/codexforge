import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const CONTEXT_REQUIREMENT_PREVIEW_LANGUAGE =
  "Context requirement preview | Context requirement preview does not browse arbitrary files from the UI | Context requirement preview requires explicit operator approval | Context requirement preview lists workspace project stack files commands risks evidence and confidence needs | Denied context requirement paths remain blocked | Context requirement checklist | Go to Context Requirement Preview";

export function buildContextRequirementPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("context-requirement-preview");
}

export function summarizeContextRequirementPreview(model = buildContextRequirementPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
