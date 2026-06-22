import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_SAFETY_COACH_PANEL_LANGUAGE =
  "Cockpit safety coach panel | Cockpit safety coach panel does not override approval | Safety coach requires explicit operator approval before any future execution | Safety coach explains why file writes commands providers runtimes and adapters remain blocked | Denied cockpit safety coach paths remain blocked | Cockpit safety coach checklist";

export { buildUnifiedCockpitStableKey as buildCockpitSafetyCoachPanelStableKey };

export function buildCockpitSafetyCoachPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-safety-coach-panel");
}

export function summarizeCockpitSafetyCoachPanel(model = buildCockpitSafetyCoachPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
