import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_EVIDENCE_CAPTURE_PACKET_LANGUAGE =
  "Real trial evidence capture packet | Real trial evidence capture packet does not persist evidence | Real trial evidence capture packet requires explicit operator approval | Evidence capture packet lists diff command stdout stderr exit code approval timestamp operator and audit placeholders | Denied real trial evidence paths remain blocked | Real trial evidence capture checklist | Go to Real Trial Evidence Capture Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialEvidenceCapturePacketStableKey };

export function buildRealTrialEvidenceCapturePacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-evidence-capture-packet");
}

export function summarizeRealTrialEvidenceCapturePacket(
  model = buildRealTrialEvidenceCapturePacketModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
