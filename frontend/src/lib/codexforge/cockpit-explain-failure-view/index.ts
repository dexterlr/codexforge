import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_EXPLAIN_FAILURE_VIEW_LANGUAGE =
  "Cockpit explain failure view | Cockpit explain failure view does not call models | Explain failure requires explicit operator approval before future model assistance | Explain failure shows deterministic failure categories without provider calls | Denied cockpit explain failure paths remain blocked | Cockpit explain failure checklist | Go to Cockpit Explain Failure View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitExplainFailureViewStableKey };

export function buildCockpitExplainFailureViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-explain-failure-view");
}

export function summarizeCockpitExplainFailureView(model = buildCockpitExplainFailureViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

