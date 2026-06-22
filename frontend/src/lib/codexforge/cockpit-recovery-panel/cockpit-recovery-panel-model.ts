import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_RECOVERY_PANEL_LANGUAGE =
  "Cockpit recovery panel | Cockpit recovery panel does not execute recovery | Recovery panel requires explicit operator approval before future recovery | Recovery panel shows rollback retry stop restore and explain-failure options as previews | Denied cockpit recovery paths remain blocked | Cockpit recovery checklist";

export { buildUnifiedCockpitStableKey as buildCockpitRecoveryPanelStableKey };

export function buildCockpitRecoveryPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-recovery-panel");
}

export function summarizeCockpitRecoveryPanel(model = buildCockpitRecoveryPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
