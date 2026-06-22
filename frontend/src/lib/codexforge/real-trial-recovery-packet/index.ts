import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_RECOVERY_PACKET_LANGUAGE =
  "Real trial recovery packet | Real trial recovery packet does not execute recovery | Real trial recovery packet requires explicit operator approval | Recovery packet lists rollback retry stop restore explain-failure and manual-review options as blocked previews | Denied real trial recovery paths remain blocked | Real trial recovery checklist | Go to Real Trial Recovery Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialRecoveryPacketStableKey };

export function buildRealTrialRecoveryPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-recovery-packet");
}

export function summarizeRealTrialRecoveryPacket(model = buildRealTrialRecoveryPacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
