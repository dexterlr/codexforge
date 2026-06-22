import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const FIRST_PLAN_DIFF_COMMAND_COMPOSER_CANDIDATE_LANGUAGE =
  "First plan diff command composer candidate | First plan diff command composer candidate does not execute composed work | First plan diff command composer candidate requires explicit operator approval | Candidate combines plan steps file impact diff preview command preview risk approval hold evidence result recovery audit and model tool handoff | Denied first plan diff command composer paths remain blocked | First plan diff command composer checklist | Go to First Plan Diff Command Composer Candidate";

export function buildFirstPlanDiffCommandComposerCandidateModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("first-plan-diff-command-composer-candidate");
}

export function summarizeFirstPlanDiffCommandComposerCandidate(
  model = buildFirstPlanDiffCommandComposerCandidateModel()
): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
