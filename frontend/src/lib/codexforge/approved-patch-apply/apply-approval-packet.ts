import {
  buildApprovedPatchApplyStableId,
  isApprovedPatchApplyHighRisk,
  type ApprovedPatchApplyApprovalPacket,
  type ApprovedPatchApplyApprovalPacketSource,
  type ApprovedPatchApplyValidation,
} from "./approved-patch-apply-types";

function missingAcknowledgements(packet: Omit<ApprovedPatchApplyApprovalPacket, "missingAcknowledgements" | "readyForPolicy" | "summary">): string[] {
  const missing: string[] = [];
  if (!packet.approved) missing.push("explicit approval required");
  if (!packet.acknowledgedPreviewDiff) missing.push("preview diff acknowledgement required");
  if (!packet.acknowledgedTouchedFiles) missing.push("touched files acknowledgement required");
  if (!packet.acknowledgedRiskLevel) missing.push("risk level acknowledgement required");
  if (!packet.acknowledgedRollbackPlan) missing.push("rollback plan acknowledgement required");
  if (!packet.acknowledgedValidationPlan) missing.push("validation plan acknowledgement required");
  if (!packet.acknowledgedNoCommandExecutionFromUi) missing.push("no command execution from UI acknowledgement required");
  if (!packet.acknowledgedFileWriteBoundary) missing.push("file write boundary acknowledgement required");
  if (!packet.acknowledgedLatestMessageAuthority) missing.push("latest-message authority acknowledgement required");
  if (packet.highRiskExtraAcknowledgementRequired && !packet.highRiskExtraAcknowledged) {
    missing.push("high/critical risk extra acknowledgement required");
  }
  return missing;
}

export function buildApprovedPatchApplyApprovalPacket(
  source: ApprovedPatchApplyApprovalPacketSource
): ApprovedPatchApplyApprovalPacket {
  const request = source.request;
  const highRiskExtraAcknowledgementRequired = isApprovedPatchApplyHighRisk(request.riskLevel);
  const base = {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-approval-packet", request.requestId),
    approvalPacketId: buildApprovedPatchApplyStableId("approved-patch-apply-approval-packet", request.requestId),
    applyRequestId: request.requestId,
    approved: source.approved === true,
    approvalNote: String(source.approvalNote ?? "").trim(),
    acknowledgedPreviewDiff: source.acknowledgedPreviewDiff === true,
    acknowledgedTouchedFiles: source.acknowledgedTouchedFiles === true,
    acknowledgedRiskLevel: source.acknowledgedRiskLevel === true,
    acknowledgedRollbackPlan: source.acknowledgedRollbackPlan === true,
    acknowledgedValidationPlan: source.acknowledgedValidationPlan === true,
    acknowledgedNoCommandExecutionFromUi: source.acknowledgedNoCommandExecutionFromUi === true,
    acknowledgedFileWriteBoundary: source.acknowledgedFileWriteBoundary === true,
    acknowledgedLatestMessageAuthority: source.acknowledgedLatestMessageAuthority === true,
    highRiskExtraAcknowledgementRequired,
    highRiskExtraAcknowledged: source.highRiskExtraAcknowledged === true,
  };
  const missing = missingAcknowledgements(base);
  const packet: ApprovedPatchApplyApprovalPacket = {
    ...base,
    missingAcknowledgements: missing,
    readyForPolicy: missing.length === 0,
    summary: [],
  };

  return {
    ...packet,
    summary: summarizeApprovedPatchApplyApprovalPacket(packet),
  };
}

export function validateApprovedPatchApplyApprovalPacket(
  packet: ApprovedPatchApplyApprovalPacket
): ApprovedPatchApplyValidation {
  const blockedReasons = [...packet.missingAcknowledgements];
  const warnings: string[] = [];

  if (!packet.approvalNote.trim()) {
    warnings.push("Approval note is recommended for handoff and rollback context.");
  }

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      packet.approved ? "Approval packet has explicit approved=true." : "Approval packet defaults approved false.",
      blockedReasons.length === 0
        ? "All apply acknowledgements are present."
        : `${blockedReasons.length} acknowledgement blocker(s).`,
      "Approval packet review does not execute automatically.",
    ],
  };
}

export function summarizeApprovedPatchApplyApprovalPacket(
  packet: ApprovedPatchApplyApprovalPacket
): string[] {
  return [
    `Approval packet ${packet.approvalPacketId} for request ${packet.applyRequestId}.`,
    `Approved=${packet.approved}; missing acknowledgements=${packet.missingAcknowledgements.length}.`,
    packet.highRiskExtraAcknowledgementRequired
      ? "High/critical risk requires explicit extra acknowledgement."
      : "High-risk extra acknowledgement is not required for this risk level.",
    "Approval does not execute automatically.",
  ];
}
