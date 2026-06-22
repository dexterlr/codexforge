import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_APPROVAL_PACKET_LANGUAGE =
  "Real trial approval packet | Real trial approval packet does not approve actions or persist approvals | Real trial approval packet requires explicit human approval | Approval packet explains exactly what would be approved and what remains blocked | Denied real trial approval paths remain blocked | Real trial approval checklist | Go to Real Trial Approval Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialApprovalPacketStableKey };

export function buildRealTrialApprovalPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-approval-packet");
}

export function summarizeRealTrialApprovalPacket(model = buildRealTrialApprovalPacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
