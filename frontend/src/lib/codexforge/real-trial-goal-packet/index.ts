import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_GOAL_PACKET_LANGUAGE =
  "Real trial goal packet | Real trial goal packet does not call models or send prompts | Real trial goal packet requires explicit operator approval before future model routing | Goal packet describes the real operator request before execution can be considered | Denied real trial goal paths remain blocked | Real trial goal checklist | Go to Real Trial Goal Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialGoalPacketStableKey };

export function buildRealTrialGoalPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-goal-packet");
}

export function summarizeRealTrialGoalPacket(model = buildRealTrialGoalPacketModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
