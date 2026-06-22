import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const GOAL_COMPILER_BOUNDARY_LANGUAGE =
  "Goal compiler boundary | Goal compiler boundary does not call models | Goal compiler requires explicit operator approval before execution | Goal compiler prepares structured intent without broad execution | Denied goal compiler paths remain blocked | Goal compiler checklist | Go to Goal Compiler Boundary";

export function buildGoalCompilerBoundaryModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("goal-compiler-boundary");
}

export function summarizeGoalCompilerBoundary(model = buildGoalCompilerBoundaryModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
