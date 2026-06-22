import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_EVIDENCE_PANEL_LANGUAGE =
  "Cockpit evidence panel | Cockpit evidence panel does not persist evidence | Evidence panel requires explicit operator approval before future persistence | Evidence panel shows diff stdout stderr exit code approval and operator placeholders | Denied cockpit evidence paths remain blocked | Cockpit evidence checklist";

export { buildUnifiedCockpitStableKey as buildCockpitEvidencePanelStableKey };

export function buildCockpitEvidencePanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-evidence-panel");
}

export function summarizeCockpitEvidencePanel(model = buildCockpitEvidencePanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
