import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_GOAL_INTAKE_PANEL_LANGUAGE =
  "Cockpit goal intake panel | Cockpit goal intake panel does not send prompts | Goal intake requires explicit operator approval before future model routing | Goal intake supports apps websites dashboards games research workflows data and integrations | Denied cockpit goal intake paths remain blocked | Cockpit goal intake checklist";

export { buildUnifiedCockpitStableKey as buildCockpitGoalIntakePanelStableKey };

export function buildCockpitGoalIntakePanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-goal-intake-panel");
}

export function summarizeCockpitGoalIntakePanel(model = buildCockpitGoalIntakePanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
