import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const CONTROLLED_GOAL_COMPILER_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled goal compiler release candidate | Controlled goal compiler release candidate does not call models providers connectors write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend | Controlled goal compiler release requires explicit operator approval | Release candidate prepares CodexForge for backend-owned and model-assisted goal compilation without broad execution | Denied controlled goal compiler paths remain blocked | Controlled goal compiler release checklist | Go to Controlled Goal Compiler Release Candidate";

export function buildControlledGoalCompilerReleaseCandidateModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("controlled-goal-compiler-release-candidate");
}

export function summarizeControlledGoalCompilerReleaseCandidate(
  model = buildControlledGoalCompilerReleaseCandidateModel()
): string {
  return summarizeGoalCompilerRouteModel(model);
}
