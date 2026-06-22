import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_PLAN_SUMMARY_PANEL_LANGUAGE =
  "Cockpit plan summary panel | Cockpit plan summary panel does not execute plans | Plan summary requires explicit operator approval before future execution | Plan summary shows file-write and command-runner readiness in one page | Denied cockpit plan paths remain blocked | Cockpit plan summary checklist";

export { buildUnifiedCockpitStableKey as buildCockpitPlanSummaryPanelStableKey };

export function buildCockpitPlanSummaryPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-plan-summary-panel");
}

export function summarizeCockpitPlanSummaryPanel(model = buildCockpitPlanSummaryPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
