import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const EXECUTION_HOLD_PREVIEW_LANGUAGE =
  "Execution hold preview | Execution hold preview does not release execution | Execution hold preview requires explicit operator approval | Execution hold preview keeps apply run model provider connector queue persistence recovery and audit capture behind backend-owned guards | Denied execution hold paths remain blocked | Execution hold checklist | Go to Execution Hold Preview";

export function buildExecutionHoldPreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("execution-hold-preview");
}

export function summarizeExecutionHoldPreview(model = buildExecutionHoldPreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
