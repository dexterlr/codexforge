import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_COMMAND_PACKET_LANGUAGE =
  "Real trial command packet | Real trial command packet does not run commands | Real trial command packet requires explicit operator approval | Command packet shows allowlist arguments working directory environment names evidence result and recovery readiness | Denied real trial command paths remain blocked | Real trial command checklist | Go to Real Trial Command Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialCommandPacketStableKey };

export function buildRealTrialCommandPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-command-packet");
}

export function summarizeRealTrialCommandPacket(model = buildRealTrialCommandPacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
