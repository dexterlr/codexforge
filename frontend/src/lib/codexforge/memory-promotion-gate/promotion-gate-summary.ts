import type {
  MemoryPromotionApprovalPacket,
  MemoryPromotionGateInput,
  MemoryPromotionGateSummary,
  MemoryPromotionPolicy,
  MemoryPromotionRequestPacket,
} from "./memory-promotion-gate-types";

export function buildMemoryPromotionGateSummary(input: {
  gateInput: MemoryPromotionGateInput;
  approvalPacket: MemoryPromotionApprovalPacket;
  policy: MemoryPromotionPolicy;
  requestPacket: MemoryPromotionRequestPacket;
}): MemoryPromotionGateSummary {
  const blockedReasons = Array.from(new Set([
    ...input.approvalPacket.readinessBlockedReasons,
    ...input.policy.blockedReasons,
    ...input.requestPacket.blockedReasons,
  ]));
  const summary: MemoryPromotionGateSummary = {
    id: `${input.gateInput.id}:summary`,
    promotionGateId: input.gateInput.id,
    approvalReady: input.approvalPacket.approved && input.approvalPacket.readinessBlockedReasons.length === 0,
    policyReady: input.policy.allowed,
    requestReady: input.requestPacket.state === "request-ready",
    blockedReasons,
    duplicateRiskCount: input.gateInput.duplicateRisk >= 0.5 ? 1 : 0,
    contradictionRiskCount: input.gateInput.contradictionRisk >= 0.5 ? 1 : 0,
    evidenceCount: input.gateInput.evidenceSnippets.length,
    nextSafeAction: blockedReasons.length === 0 ? "Hold request for future guarded runtime executor." : "Review memory promotion gate blockers before any promotion request.",
    summary: [],
  };
  return { ...summary, summary: summarizeMemoryPromotionGateSession(summary) };
}

export function summarizeMemoryPromotionGateSession(summary: MemoryPromotionGateSummary): string[] {
  return [
    `Approval ready: ${summary.approvalReady}; policy ready: ${summary.policyReady}; request ready: ${summary.requestReady}.`,
    `Evidence ${summary.evidenceCount}, duplicate risk count ${summary.duplicateRiskCount}, contradiction risk count ${summary.contradictionRiskCount}.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
