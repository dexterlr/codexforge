import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_EVIDENCE_STREAM_MODEL_LANGUAGE =
  "Cockpit evidence stream model | Cockpit evidence stream model does not persist evidence | Evidence stream requires explicit operator approval before future persistence | Evidence stream shows planned file command approval operator and timestamp placeholders | Denied cockpit evidence stream paths remain blocked | Cockpit evidence stream checklist | Go to Cockpit Evidence Stream Model";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitEvidenceStreamModelStableKey };

export function buildCockpitEvidenceStreamModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-evidence-stream-model");
}

export function summarizeCockpitEvidenceStreamModel(model = buildCockpitEvidenceStreamModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

