import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_FILE_DIFF_PACKET_LANGUAGE =
  "Local change file diff packet | Local change file diff packet does not write files | Local change file diff requires explicit operator approval before future apply | File diff packet shows path guard before after diff and rollback preview | Denied local change file diff paths remain blocked | Local change file diff checklist | Go to Local Change File Diff Packet";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeFileDiffPacketStableKey };

export function buildLocalChangeFileDiffPacketModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-file-diff-packet");
}

export function summarizeLocalChangeFileDiffPacket(
  model = buildLocalChangeFileDiffPacketModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
