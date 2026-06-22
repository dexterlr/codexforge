import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const MODEL_TOOL_ROUTING_HINT_PREVIEW_LANGUAGE =
  "Model tool routing hint preview | Model tool routing hint preview does not call models providers or tools | Model tool routing hint preview requires explicit operator approval | Model tool routing hint preview explains cheapest capable local private paid pro specialist and domain-fit routing hints without executing calls | Denied model tool routing hint paths remain blocked | Model tool routing hint checklist | Go to Model Tool Routing Hint Preview";

export function buildModelToolRoutingHintPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("model-tool-routing-hint-preview");
}

export function summarizeModelToolRoutingHintPreview(model = buildModelToolRoutingHintPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
