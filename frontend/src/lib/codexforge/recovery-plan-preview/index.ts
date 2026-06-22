import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const RECOVERY_PLAN_PREVIEW_LANGUAGE =
  "Recovery plan preview | Recovery plan preview does not execute recovery | Recovery plan preview requires explicit operator approval | Recovery plan preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery paths | Denied recovery plan paths remain blocked | Recovery plan checklist | Go to Recovery Plan Preview";

export function buildRecoveryPlanPreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("recovery-plan-preview");
}

export function summarizeRecoveryPlanPreview(model = buildRecoveryPlanPreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
