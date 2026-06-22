import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_GOAL_PACKET_LANGUAGE =
  "Local change goal packet | Local change goal packet does not call models | Local change goal packet requires explicit operator approval before future model routing | Goal packet describes a tiny local project change without sending prompts | Denied local change goal paths remain blocked | Local change goal checklist | Go to Local Change Goal Packet";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeGoalPacketStableKey };

export function buildLocalChangeGoalPacketModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-goal-packet");
}

export function summarizeLocalChangeGoalPacket(model = buildLocalChangeGoalPacketModel()): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
