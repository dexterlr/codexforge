import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_FILE_WRITE_PACKET_LANGUAGE =
  "Real trial file write packet | Real trial file write packet does not write files or apply diffs | Real trial file write packet requires explicit operator approval | File write packet shows target path guard before after diff rollback and denied mutation review | Denied real trial file write paths remain blocked | Real trial file write checklist | Go to Real Trial File Write Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialFileWritePacketStableKey };

export function buildRealTrialFileWritePacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-file-write-packet");
}

export function summarizeRealTrialFileWritePacket(model = buildRealTrialFileWritePacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
