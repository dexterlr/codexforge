import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_RECOVERY_OPTION_MODEL_LANGUAGE =
  "Cockpit recovery option model | Cockpit recovery option model does not execute recovery | Recovery option requires explicit operator approval before future recovery | Recovery options include rollback retry stop restore explain and manual-review previews | Denied cockpit recovery option paths remain blocked | Cockpit recovery option checklist | Go to Cockpit Recovery Option Model";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitRecoveryOptionModelStableKey };

export function buildCockpitRecoveryOptionModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-recovery-option-model");
}

export function summarizeCockpitRecoveryOptionModel(model = buildCockpitRecoveryOptionModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

