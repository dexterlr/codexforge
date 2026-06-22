import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_RESULT_DECISION_VIEW_LANGUAGE =
  "Cockpit result decision view | Cockpit result decision view does not make automatic decisions | Result decision requires explicit operator approval before future action | Result decision shows accept retry rollback explain and needs-review options as previews | Denied cockpit result decision paths remain blocked | Cockpit result decision checklist | Go to Cockpit Result Decision View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitResultDecisionViewStableKey };

export function buildCockpitResultDecisionViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-result-decision-view");
}

export function summarizeCockpitResultDecisionView(model = buildCockpitResultDecisionViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

