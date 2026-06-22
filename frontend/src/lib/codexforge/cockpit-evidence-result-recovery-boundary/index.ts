import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_EVIDENCE_RESULT_RECOVERY_BOUNDARY_LANGUAGE =
  "Cockpit evidence result recovery boundary | Cockpit evidence result recovery boundary does not persist evidence results or recovery actions | Cockpit evidence result recovery requires explicit operator approval | Cockpit unifies evidence result and recovery in one place | Denied cockpit evidence result recovery paths remain blocked | Cockpit evidence result recovery checklist | Go to Cockpit Evidence Result Recovery Boundary";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitEvidenceResultRecoveryBoundaryStableKey };

export function buildCockpitEvidenceResultRecoveryBoundaryModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-evidence-result-recovery-boundary");
}

export function summarizeCockpitEvidenceResultRecoveryBoundary(
  model = buildCockpitEvidenceResultRecoveryBoundaryModel()
): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

