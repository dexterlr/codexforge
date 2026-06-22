import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const DIFF_PREVIEW_PACKET_LANGUAGE =
  "Diff preview packet | Diff preview packet does not apply diffs | Diff preview packet requires explicit operator approval | Diff preview packet shows proposed changes path guard status rollback readiness evidence needs and denied paths | Denied diff preview paths remain blocked | Diff preview checklist | Go to Diff Preview Packet";

export function buildDiffPreviewPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("diff-preview-packet");
}

export function summarizeDiffPreviewPacket(model = buildDiffPreviewPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
