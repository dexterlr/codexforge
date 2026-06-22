import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_EXECUTION_STATE_PANEL_LANGUAGE =
  "Cockpit execution state panel | Cockpit execution state panel does not release execution | Execution state requires explicit operator approval before future run | Execution state shows blocked pending approved running failed and complete preview states | Denied cockpit execution paths remain blocked | Cockpit execution state checklist";

export { buildUnifiedCockpitStableKey as buildCockpitExecutionStatePanelStableKey };

export function buildCockpitExecutionStatePanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-execution-state-panel");
}

export function summarizeCockpitExecutionStatePanel(model = buildCockpitExecutionStatePanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
