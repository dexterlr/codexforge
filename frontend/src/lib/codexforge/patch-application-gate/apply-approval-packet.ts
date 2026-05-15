import {
  buildPatchApplicationGateStableKey,
  uniquePatchApplicationGateStrings,
  type ApplyApprovalPacket,
  type ApplyApprovalPacketSource,
} from "./patch-application-gate-types";

function missingAcknowledgements(packet: Omit<ApplyApprovalPacket, "missingAcknowledgements">): string[] {
  const missing: string[] = [];
  if (!packet.approved) missing.push("Explicit approval required.");
  if (!packet.approvalNote.trim()) missing.push("Approval note required.");
  if (!packet.rollbackAcknowledged) missing.push("Rollback acknowledgement required.");
  if (!packet.currentFileVerificationAcknowledged) missing.push("Current file verification acknowledgement required.");
  if (!packet.noSilentMutationAcknowledged) missing.push("No silent mutation acknowledgement required.");
  if (!packet.toolPolicyConfirmed) missing.push("Tool-policy confirmation required.");
  if ((packet.riskLevel === "high" || packet.riskLevel === "critical") && !packet.highRiskAcknowledged) {
    missing.push("High or critical risk acknowledgement required.");
  }
  return missing;
}

export function buildApplyApprovalPacket(source: ApplyApprovalPacketSource): ApplyApprovalPacket {
  const input = source.input;
  const operatorDecision = source.operatorDecision ?? "pending";
  const approved = source.approved === true && operatorDecision === "approve-request-preview";
  const base = {
    id: `apply-approval-packet:${buildPatchApplicationGateStableKey(input.id, input.primaryFile)}`,
    applyGateInputId: input.id,
    operatorDecision,
    approved,
    approvalNote: String(source.approvalNote ?? "").trim(),
    targetFiles: [...input.targetFiles],
    riskLevel: input.riskLevel,
    requiredChecks: uniquePatchApplicationGateStrings(input.verificationChecks),
    rollbackAcknowledged: source.rollbackAcknowledged === true,
    currentFileVerificationAcknowledged: source.currentFileVerificationAcknowledged === true,
    noSilentMutationAcknowledged: source.noSilentMutationAcknowledged === true,
    toolPolicyConfirmed: source.toolPolicyConfirmed === true,
    highRiskAcknowledged: source.highRiskAcknowledged === true,
    applyDiffApprovalLabel: `apply-diff approval for ${input.id}`,
    createdFromPreviewDiffPackageOnly: true as const,
  };

  return {
    ...base,
    missingAcknowledgements: missingAcknowledgements(base),
  };
}

export function validateApplyApprovalPacket(packet: ApplyApprovalPacket): {
  valid: boolean;
  blockedReasons: string[];
  summary: string[];
} {
  const blockedReasons = [...packet.missingAcknowledgements];
  if (packet.operatorDecision !== "approve-request-preview") blockedReasons.push("Operator decision must explicitly approve request preview.");
  if (!packet.createdFromPreviewDiffPackageOnly) blockedReasons.push("Packet must be created from preview diff package only.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    summary: [
      packet.approved ? "Approval packet contains explicit approval." : "Approval packet defaults to not approved.",
      `${packet.requiredChecks.length} required checks are attached.`,
      "Missing acknowledgement blocks apply readiness.",
    ],
  };
}

export function summarizeApplyApprovalPacket(packet: ApplyApprovalPacket): string[] {
  return [
    `Approval packet ${packet.id}: ${packet.operatorDecision}; approved=${packet.approved}.`,
    `apply-diff approval label: ${packet.applyDiffApprovalLabel}.`,
    `${packet.missingAcknowledgements.length} missing acknowledgement(s).`,
    "Created from preview diff package only; no mutation is performed.",
  ];
}
