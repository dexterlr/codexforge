import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const FIRST_GOAL_COMPILER_CANDIDATE_LANGUAGE =
  "First goal compiler candidate | First goal compiler candidate does not execute compiled goals | First goal compiler candidate requires explicit operator approval | Candidate combines raw goal domain task target context files commands risk approval evidence done recovery and routing hints | Denied first goal compiler paths remain blocked | First goal compiler checklist | Go to First Goal Compiler Candidate";

export function buildFirstGoalCompilerCandidateModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("first-goal-compiler-candidate");
}

export function summarizeFirstGoalCompilerCandidate(model = buildFirstGoalCompilerCandidateModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
