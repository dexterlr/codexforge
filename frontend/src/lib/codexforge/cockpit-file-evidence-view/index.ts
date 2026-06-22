import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_FILE_EVIDENCE_VIEW_LANGUAGE =
  "Cockpit file evidence view | Cockpit file evidence view does not write files or persist evidence | File evidence view requires explicit operator approval before future persistence | File evidence view shows path guard diff before after approval and rollback placeholders | Denied cockpit file evidence paths remain blocked | Cockpit file evidence checklist | Go to Cockpit File Evidence View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitFileEvidenceViewStableKey };

export function buildCockpitFileEvidenceViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-file-evidence-view");
}

export function summarizeCockpitFileEvidenceView(model = buildCockpitFileEvidenceViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

