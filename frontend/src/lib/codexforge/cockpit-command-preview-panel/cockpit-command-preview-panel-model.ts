import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_COMMAND_PREVIEW_PANEL_LANGUAGE =
  "Cockpit command preview panel | Cockpit command preview panel does not run commands | Command preview panel requires explicit operator approval before future execution | Command panel shows allowlist arguments working directory environment evidence result and recovery readiness | Denied cockpit command paths remain blocked | Cockpit command preview checklist";

export { buildUnifiedCockpitStableKey as buildCockpitCommandPreviewPanelStableKey };

export function buildCockpitCommandPreviewPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-command-preview-panel");
}

export function summarizeCockpitCommandPreviewPanel(model = buildCockpitCommandPreviewPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
