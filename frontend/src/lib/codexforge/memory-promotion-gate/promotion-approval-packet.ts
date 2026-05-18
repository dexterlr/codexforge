import {
  buildMemoryPromotionGateStableKey,
  type MemoryPromotionApprovalPacket,
  type MemoryPromotionApprovalPacketInput,
  type MemoryPromotionGateInput,
} from "./memory-promotion-gate-types";

export function buildMemoryPromotionApprovalPacket(
  gateInput: MemoryPromotionGateInput,
  input: MemoryPromotionApprovalPacketInput = {}
): MemoryPromotionApprovalPacket {
  const operatorDecision = input.operatorDecision ?? "undecided";
  const approved = input.approved === true && operatorDecision === "approve";
  const packet: MemoryPromotionApprovalPacket = {
    id: buildMemoryPromotionGateStableKey("memory-promotion-approval", gateInput.id, operatorDecision),
    promotionGateId: gateInput.id,
    operatorDecision,
    approved,
    approvalNote: input.approvalNote?.trim() ?? "",
    acknowledgedEvidenceContext: input.acknowledgedEvidenceContext === true,
    acknowledgedDuplicateRisk: input.acknowledgedDuplicateRisk === true,
    acknowledgedContradictionRisk: input.acknowledgedContradictionRisk === true,
    acknowledgedConfidenceImportance: input.acknowledgedConfidenceImportance === true,
    acknowledgedNoSilentGraphMutation: input.acknowledgedNoSilentGraphMutation === true,
    acknowledgedFutureRuntimeEvent: input.acknowledgedFutureRuntimeEvent === true,
    acknowledgedReviewBoundary: input.acknowledgedReviewBoundary === true,
    acknowledgedLowConfidence: input.acknowledgedLowConfidence === true,
    dedupeReviewed: input.dedupeReviewed === true,
    contradictionDecisionSupplied: input.contradictionDecisionSupplied === true || operatorDecision === "needs-contradiction-review" || operatorDecision === "approve" || operatorDecision === "reject",
    readinessBlockedReasons: [],
    summary: [],
  };
  const readinessBlockedReasons = validateMemoryPromotionApprovalPacket(packet, gateInput);
  return {
    ...packet,
    readinessBlockedReasons,
    summary: summarizeMemoryPromotionApprovalPacket({ ...packet, readinessBlockedReasons }),
  };
}

export function validateMemoryPromotionApprovalPacket(
  packet: MemoryPromotionApprovalPacket,
  gateInput?: MemoryPromotionGateInput
): string[] {
  const blocked: string[] = [];
  if (!packet.approved) blocked.push("explicit approval required");
  if (packet.operatorDecision === "undecided") blocked.push("operator decision required");
  if (!packet.acknowledgedEvidenceContext) blocked.push("evidence context acknowledgement required");
  if (!packet.acknowledgedConfidenceImportance) blocked.push("confidence and importance acknowledgement required");
  if (!packet.acknowledgedNoSilentGraphMutation) blocked.push("no silent graph mutation acknowledgement required");
  if (!packet.acknowledgedFutureRuntimeEvent) blocked.push("future runtime event acknowledgement required");
  if (!packet.acknowledgedReviewBoundary) blocked.push("review boundary acknowledgement required");
  if ((gateInput?.confidence ?? 1) < 0.55 && !packet.acknowledgedLowConfidence) blocked.push("low confidence requires extra acknowledgement");
  if ((gateInput?.duplicateRisk ?? 0) >= 0.5 && (!packet.acknowledgedDuplicateRisk || !packet.dedupeReviewed)) blocked.push("duplicate risk requires dedupe review acknowledgement");
  if ((gateInput?.contradictionRisk ?? 0) >= 0.5 && (!packet.acknowledgedContradictionRisk || !packet.contradictionDecisionSupplied)) blocked.push("contradiction risk requires explicit operator decision");
  return blocked;
}

export function summarizeMemoryPromotionApprovalPacket(packet: MemoryPromotionApprovalPacket): string[] {
  return [
    packet.approved ? "Approval packet is explicitly approved." : "Approval packet defaults to not approved.",
    packet.readinessBlockedReasons.length === 0 ? "All approval acknowledgements are present." : `Approval blocked: ${packet.readinessBlockedReasons.join(", ")}.`,
    "Approval is visible operator intent only; it does not promote memory or mutate the Brain graph.",
  ];
}
