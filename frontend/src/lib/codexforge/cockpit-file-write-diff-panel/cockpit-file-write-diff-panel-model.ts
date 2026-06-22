import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_FILE_WRITE_DIFF_PANEL_LANGUAGE =
  "Cockpit file-write diff panel | Cockpit file-write diff panel does not write files | File-write diff panel requires explicit operator approval before future apply | Diff panel shows path guard diff approval evidence result and rollback readiness | Denied cockpit file-write paths remain blocked | Cockpit file-write diff checklist";

export { buildUnifiedCockpitStableKey as buildCockpitFileWriteDiffPanelStableKey };

export function buildCockpitFileWriteDiffPanelModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-file-write-diff-panel");
}

export function summarizeCockpitFileWriteDiffPanel(model = buildCockpitFileWriteDiffPanelModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
