import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_GOAL_COMPOSER_POLISH_LANGUAGE =
  "Cockpit goal composer polish | Cockpit goal composer polish does not call models | Cockpit goal composer polish requires explicit operator approval before execution | Goal composer keeps goal intake separate from backend-owned guarded execution | No direct execution from the goal composer | Cockpit goal composer checklist | Go to Cockpit Goal Composer Polish";

export function buildCockpitGoalComposerPolishModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-goal-composer-polish");
}

export function summarizeCockpitGoalComposerPolish(model = buildCockpitGoalComposerPolishModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
