import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const FIRST_COCKPIT_EVIDENCE_RESULT_RECOVERY_CANDIDATE_LANGUAGE =
  "First cockpit evidence result recovery candidate | First cockpit evidence result recovery candidate does not persist evidence results or execute recovery | First cockpit evidence result recovery candidate requires explicit operator approval | Candidate combines evidence stream file evidence command evidence result decision recovery audit timeline and export previews | Denied first cockpit evidence result recovery paths remain blocked | First cockpit evidence result recovery checklist | Go to First Cockpit Evidence Result Recovery Candidate";

export { buildCockpitEvidenceResultRecoveryStableKey as buildFirstCockpitEvidenceResultRecoveryCandidateStableKey };

export function buildFirstCockpitEvidenceResultRecoveryCandidateModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("first-cockpit-evidence-result-recovery-candidate");
}

export function summarizeFirstCockpitEvidenceResultRecoveryCandidate(
  model = buildFirstCockpitEvidenceResultRecoveryCandidateModel()
): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

