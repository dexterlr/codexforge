import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_RESULT_CAPTURE_PACKET_LANGUAGE =
  "Real trial result capture packet | Real trial result capture packet does not persist results | Real trial result capture packet requires explicit operator approval | Result capture packet lists success denied blocked failed timeout needs-review and manual-review states | Denied real trial result paths remain blocked | Real trial result capture checklist | Go to Real Trial Result Capture Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialResultCapturePacketStableKey };

export function buildRealTrialResultCapturePacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-result-capture-packet");
}

export function summarizeRealTrialResultCapturePacket(
  model = buildRealTrialResultCapturePacketModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
