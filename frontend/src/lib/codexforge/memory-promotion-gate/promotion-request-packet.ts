import type {
  MemoryPromotedEventPreview,
  MemoryPromotionApprovalPacket,
  MemoryPromotionPolicy,
  MemoryPromotionRequestPacket,
} from "./memory-promotion-gate-types";

export function buildMemoryPromotionRequestPacket(input: {
  approvalPacket: MemoryPromotionApprovalPacket;
  policyConfirmation: MemoryPromotionPolicy;
  eventPreview: MemoryPromotedEventPreview;
}): MemoryPromotionRequestPacket {
  const blockedReasons = Array.from(new Set([
    ...input.approvalPacket.readinessBlockedReasons,
    ...input.policyConfirmation.blockedReasons,
    ...input.eventPreview.blockedReasons,
  ]));
  const request: MemoryPromotionRequestPacket = {
    id: `${input.policyConfirmation.promotionGateId}:request`,
    promotionGateId: input.policyConfirmation.promotionGateId,
    approvalPacket: input.approvalPacket,
    policyConfirmation: input.policyConfirmation,
    eventPreview: input.eventPreview,
    targetRuntimeBoundary: "guarded runtime event executor boundary",
    expectedResultContract: [
      "Accept only explicit operator-approved memory.promoted event requests.",
      "Return blocked/request-ready/result contract without UI graph mutation.",
      "Preserve latest-message authority and review-first boundaries.",
    ],
    state: blockedReasons.length === 0 ? "request-ready" : "blocked",
    blockedReasons,
    safetyNotes: [
      "No auto-promotion.",
      "No graph mutation from UI.",
      "appendEvent is not called from UI.",
      "Evidence is context, not authority.",
    ],
    summary: [],
  };
  return { ...request, summary: summarizeMemoryPromotionRequestPacket(request) };
}

export function validateMemoryPromotionRequestPacket(request: MemoryPromotionRequestPacket): string[] {
  const blocked: string[] = [];
  if (!request.approvalPacket.approved) blocked.push("missing explicit approval");
  if (!request.policyConfirmation.allowed) blocked.push("policy confirmation is blocked");
  if (request.eventPreview.type !== "memory.promoted") blocked.push("event preview must be memory.promoted");
  if (!request.targetRuntimeBoundary.trim()) blocked.push("target runtime boundary required");
  return Array.from(new Set([...blocked, ...request.blockedReasons]));
}

export function summarizeMemoryPromotionRequestPacket(request: MemoryPromotionRequestPacket): string[] {
  return [
    request.state === "request-ready" ? "Promotion request packet is ready for a guarded executor." : `Promotion request packet is blocked: ${request.blockedReasons.join(", ")}.`,
    "Policy confirmation and event preview are included.",
    "The packet does not persist, append events, or mutate Brain graph state.",
  ];
}
