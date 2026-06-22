import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_RESULT_PANEL_LANGUAGE =
  "Cockpit result panel | Cockpit result panel does not persist results | Result panel requires explicit operator approval before future persistence | Result panel shows success denied blocked failed timeout and needs-review states | Denied cockpit result paths remain blocked | Cockpit result checklist";

export { buildUnifiedCockpitStableKey as buildCockpitResultPanelStableKey };

export function buildCockpitResultPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-result-panel");
}

export function summarizeCockpitResultPanel(model = buildCockpitResultPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
