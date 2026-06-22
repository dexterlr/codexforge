import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const APPROVAL_PACKET_PREVIEW_LANGUAGE =
  "Approval packet preview | Approval packet preview does not persist approvals | Approval packet preview requires explicit human approval | Approval packet preview defines operator identity scope expiry files commands model tool needs risk level evidence requirements and denied paths | Denied approval packet paths remain blocked | Approval packet checklist | Go to Approval Packet Preview";

export function buildApprovalPacketPreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("approval-packet-preview");
}

export function summarizeApprovalPacketPreview(model = buildApprovalPacketPreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
