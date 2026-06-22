import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const FILE_IMPACT_PLAN_PREVIEW_LANGUAGE =
  "File impact plan preview | File impact plan preview does not write files | File impact plan preview requires explicit operator approval | File impact plan preview describes new modified reviewed blocked rollback-relevant and evidence-relevant files | Denied file impact plan paths remain blocked | File impact plan checklist | Go to File Impact Plan Preview";

export function buildFileImpactPlanPreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("file-impact-plan-preview");
}

export function summarizeFileImpactPlanPreview(model = buildFileImpactPlanPreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
