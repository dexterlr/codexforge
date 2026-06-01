import { buildDefaultAssistedCodingGoals } from "./assisted-coding-goal";
import { buildAssistedCodingHandoff } from "./assisted-coding-handoff";
import { selectAssistedCodingNextAction } from "./assisted-coding-next-action";
import { buildAssistedCodingReviewState } from "./assisted-coding-review-state";
import { buildAssistedCodingRouteRecommendation } from "./assisted-coding-route-recommendation";
import { buildAssistedCodingSafetyState } from "./assisted-coding-safety-state";
import { buildDefaultAssistedCodingSteps } from "./assisted-coding-step";
import type { AssistedCodingGoalId, AssistedCodingModeSummary } from "./assisted-coding-mode-types";

export function buildAssistedCodingModeSummary(selectedGoalId: AssistedCodingGoalId = "small-ui-issue"): AssistedCodingModeSummary {
  const goals = buildDefaultAssistedCodingGoals();
  const selectedGoal = goals.find((goal) => goal.id === selectedGoalId) ?? goals[0];
  const nextAction = selectAssistedCodingNextAction(selectedGoal);
  return {
    title: "Assisted coding mode",
    subtitle: "Choose a goal and CodexForge will guide the next safe step.",
    primaryAction: "Choose a coding goal",
    goals,
    steps: buildDefaultAssistedCodingSteps(),
    nextAction,
    safety: buildAssistedCodingSafetyState(),
    routeRecommendation: buildAssistedCodingRouteRecommendation(nextAction),
    reviewState: buildAssistedCodingReviewState(true),
    handoff: buildAssistedCodingHandoff(nextAction),
  };
}
