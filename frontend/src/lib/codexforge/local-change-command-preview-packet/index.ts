import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_COMMAND_PREVIEW_PACKET_LANGUAGE =
  "Local change command preview packet | Local change command preview packet does not run commands | Local change command preview requires explicit operator approval before future execution | Command preview packet shows allowlist arguments working directory environment evidence and result readiness | Denied local change command preview paths remain blocked | Local change command preview checklist | Go to Local Change Command Preview Packet";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeCommandPreviewPacketStableKey };

export function buildLocalChangeCommandPreviewPacketModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-command-preview-packet");
}

export function summarizeLocalChangeCommandPreviewPacket(
  model = buildLocalChangeCommandPreviewPacketModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
