import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_RESULT_SUMMARY_MODEL_LANGUAGE =
  "Cockpit result summary model | Cockpit result summary model does not persist results | Result summary requires explicit operator approval before future persistence | Result summary supports success denied blocked failed timeout and needs-review states | Denied cockpit result summary paths remain blocked | Cockpit result summary checklist | Go to Cockpit Result Summary Model";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitResultSummaryModelStableKey };

export function buildCockpitResultSummaryModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-result-summary-model");
}

export function summarizeCockpitResultSummaryModel(model = buildCockpitResultSummaryModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

