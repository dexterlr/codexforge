import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const MODEL_TOOL_HANDOFF_PREVIEW_LANGUAGE =
  "Model tool handoff preview | Model tool handoff preview does not call models providers connectors or tools | Model tool handoff preview requires explicit operator approval | Model tool handoff preview explains local private cheapest capable paid pro specialist and domain-fit routing handoff without executing calls | Denied model tool handoff paths remain blocked | Model tool handoff checklist | Go to Model Tool Handoff Preview";

export function buildModelToolHandoffPreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("model-tool-handoff-preview");
}

export function summarizeModelToolHandoffPreview(model = buildModelToolHandoffPreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
