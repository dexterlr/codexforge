import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_PLAN_SUMMARY_POLISH_LANGUAGE =
  "Cockpit plan summary polish | Cockpit plan summary polish does not execute plans | Cockpit plan summary polish requires explicit operator approval before execution | Plan summary shows goal steps risks files commands approval and evidence expectations | No direct execution from the plan summary | Cockpit plan summary checklist | Go to Cockpit Plan Summary Polish";

export function buildCockpitPlanSummaryPolishModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-plan-summary-polish");
}

export function summarizeCockpitPlanSummaryPolish(model = buildCockpitPlanSummaryPolishModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
