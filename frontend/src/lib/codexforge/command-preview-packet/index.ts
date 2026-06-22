import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const COMMAND_PREVIEW_PACKET_LANGUAGE =
  "Command preview packet | Command preview packet does not run commands | Command preview packet requires explicit operator approval | Command preview packet lists build smoke validation lint test and hygiene command candidates as review-only commands | Denied command preview paths remain blocked | Command preview checklist | Go to Command Preview Packet";

export function buildCommandPreviewPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("command-preview-packet");
}

export function summarizeCommandPreviewPacket(model = buildCommandPreviewPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
