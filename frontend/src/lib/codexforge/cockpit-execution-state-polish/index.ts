import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_EXECUTION_STATE_POLISH_LANGUAGE =
  "Cockpit execution state polish | Cockpit execution state polish does not release execution from the frontend | Cockpit execution state polish requires backend-owned guarded execution | Execution state shows preview blocked approved queued applying running completed failed stopped manual-review and recovered states | No direct execution state mutation from the cockpit | Cockpit execution state checklist | Go to Cockpit Execution State Polish";

export function buildCockpitExecutionStatePolishModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-execution-state-polish");
}

export function summarizeCockpitExecutionStatePolish(model = buildCockpitExecutionStatePolishModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
