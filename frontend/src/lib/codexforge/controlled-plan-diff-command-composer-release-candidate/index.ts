import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const CONTROLLED_PLAN_DIFF_COMMAND_COMPOSER_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled plan diff command composer release candidate | Controlled plan diff command composer release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit or promote memory from the frontend | Controlled plan diff command composer release requires explicit operator approval | Release candidate prepares CodexForge for backend-owned work proposal approval without broad execution | Denied controlled plan diff command composer paths remain blocked | Controlled plan diff command composer release checklist | Go to Controlled Plan Diff Command Composer Release Candidate";

export function buildControlledPlanDiffCommandComposerReleaseCandidateModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("controlled-plan-diff-command-composer-release-candidate");
}

export function summarizeControlledPlanDiffCommandComposerReleaseCandidate(
  model = buildControlledPlanDiffCommandComposerReleaseCandidateModel()
): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
