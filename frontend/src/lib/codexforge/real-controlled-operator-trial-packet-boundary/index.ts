import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_CONTROLLED_OPERATOR_TRIAL_PACKET_BOUNDARY_LANGUAGE =
  "Real controlled operator trial packet boundary | Real controlled operator trial packet boundary does not execute the real trial | Real controlled operator trial packet requires explicit operator approval | Trial packet prepares goal context file write command approval hold evidence result recovery and audit | Denied real controlled operator trial paths remain blocked | Real controlled operator trial packet checklist | Go to Real Controlled Operator Trial Packet Boundary";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealControlledOperatorTrialPacketBoundaryStableKey };

export function buildRealControlledOperatorTrialPacketBoundaryModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-controlled-operator-trial-packet-boundary");
}

export function summarizeRealControlledOperatorTrialPacketBoundary(
  model = buildRealControlledOperatorTrialPacketBoundaryModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
