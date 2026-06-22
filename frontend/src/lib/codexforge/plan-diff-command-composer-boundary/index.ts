import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const PLAN_DIFF_COMMAND_COMPOSER_BOUNDARY_LANGUAGE =
  "Plan diff command composer boundary | Plan diff command composer boundary does not execute plans | Plan diff command composer requires explicit operator approval before execution | Plan diff command composer prepares work proposals without broad execution | Denied plan diff command composer paths remain blocked | Plan diff command composer checklist | Go to Plan Diff Command Composer Boundary";

export function buildPlanDiffCommandComposerBoundaryModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("plan-diff-command-composer-boundary");
}

export function summarizePlanDiffCommandComposerBoundary(
  model = buildPlanDiffCommandComposerBoundaryModel()
): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
