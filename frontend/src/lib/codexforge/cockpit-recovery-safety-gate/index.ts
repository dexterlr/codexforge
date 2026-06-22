import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_RECOVERY_SAFETY_GATE_LANGUAGE =
  "Cockpit recovery safety gate | Cockpit recovery safety gate does not release recovery | Recovery safety gate requires explicit operator approval | Recovery safety gate blocks rollback retry restore export command and file mutation until approved | Denied cockpit recovery safety paths remain blocked | Cockpit recovery safety checklist | Go to Cockpit Recovery Safety Gate";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitRecoverySafetyGateStableKey };

export function buildCockpitRecoverySafetyGateModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-recovery-safety-gate");
}

export function summarizeCockpitRecoverySafetyGate(model = buildCockpitRecoverySafetyGateModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

