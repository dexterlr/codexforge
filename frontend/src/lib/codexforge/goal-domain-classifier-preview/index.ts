import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const GOAL_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE =
  "Goal domain classifier preview | Goal domain classifier preview does not call models | Goal domain classifier preview requires explicit operator approval before execution | Goal domain classifier previews app website dashboard game server research creative trading data docs integration and local project domains | Denied goal domain classifier paths remain blocked | Goal domain classifier checklist | Go to Goal Domain Classifier Preview";

export function buildGoalDomainClassifierPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("goal-domain-classifier-preview");
}

export function summarizeGoalDomainClassifierPreview(model = buildGoalDomainClassifierPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
