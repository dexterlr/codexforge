import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_AUDIT_PACKET_LANGUAGE =
  "Real trial audit packet | Real trial audit packet does not persist audit logs | Real trial audit packet requires explicit operator approval | Audit packet lists goal context file write command approval hold evidence result recovery operator and denied-path placeholders | Denied real trial audit paths remain blocked | Real trial audit checklist | Go to Real Trial Audit Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialAuditPacketStableKey };

export function buildRealTrialAuditPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-audit-packet");
}

export function summarizeRealTrialAuditPacket(model = buildRealTrialAuditPacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
