import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_COMMAND_EVIDENCE_VIEW_LANGUAGE =
  "Cockpit command evidence view | Cockpit command evidence view does not run commands or persist evidence | Command evidence view requires explicit operator approval before future persistence | Command evidence view shows command stdout stderr exit code working directory and approval placeholders | Denied cockpit command evidence paths remain blocked | Cockpit command evidence checklist | Go to Cockpit Command Evidence View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitCommandEvidenceViewStableKey };

export function buildCockpitCommandEvidenceViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-command-evidence-view");
}

export function summarizeCockpitCommandEvidenceView(model = buildCockpitCommandEvidenceViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

