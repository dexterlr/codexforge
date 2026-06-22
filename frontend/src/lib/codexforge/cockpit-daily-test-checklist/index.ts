import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_DAILY_TEST_CHECKLIST_LANGUAGE =
  "Cockpit daily test checklist | Cockpit daily test checklist does not run tests from the UI | Cockpit daily test checklist requires explicit operator approval before execution | Daily test checklist covers goal plan diff command approval execution state evidence result recovery audit safety and diagnostics | No test or smoke execution from the cockpit | Cockpit daily test checklist | Go to Cockpit Daily Test Checklist";

export function buildCockpitDailyTestChecklistModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-daily-test-checklist");
}

export function summarizeCockpitDailyTestChecklist(model = buildCockpitDailyTestChecklistModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
