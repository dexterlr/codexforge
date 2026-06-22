import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_PLAN_PACKET_LANGUAGE =
  "Local change plan packet | Local change plan packet does not execute plans | Local change plan requires explicit operator approval before future execution | Plan packet shows file diff command preview evidence result and recovery steps | Denied local change plan paths remain blocked | Local change plan checklist | Go to Local Change Plan Packet";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangePlanPacketStableKey };

export function buildLocalChangePlanPacketModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-plan-packet");
}

export function summarizeLocalChangePlanPacket(model = buildLocalChangePlanPacketModel()): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
