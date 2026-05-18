import { isMemoryInboxPromotionAllowed, buildMemoryInboxReviewPolicy } from "./memory-inbox-review-policy";
import type { MemoryInboxPromotionPreview, MemoryInboxRuntimeEventPreview, OperatorMemoryInboxCard } from "./operator-memory-inbox-types";
import { buildMemoryInboxStableKey } from "./operator-memory-inbox-types";

export function buildMemoryInboxPromotionPreview(card: OperatorMemoryInboxCard): MemoryInboxPromotionPreview {
  const policy = buildMemoryInboxReviewPolicy(card);
  const allowed = isMemoryInboxPromotionAllowed(card, policy);
  const preview: MemoryInboxPromotionPreview = {
    id: buildMemoryInboxStableKey("memory-inbox-promotion-preview", card.id),
    cardId: card.id,
    proposedRuntimeEventType: "memory.promoted",
    proposedMemoryItem: {
      text: card.proposedMemoryText,
      kind: card.memoryKind,
      tags: card.suggestedTags,
      confidence: card.confidence,
      importance: card.importance,
      risk: card.risk,
    },
    evidenceRefs: card.sourceIds.length > 0 ? card.sourceIds : card.evidenceSnippets,
    reviewRequirements: policy.rules.filter((rule) => rule.state !== "allow").map((rule) => rule.label),
    blockedReasons: policy.blockedReasons,
    futureMergeBoundary: "future merge boundary: reviewed preview may later become memory.promoted event input, but this phase does not append events or mutate Brain graph.",
    allowed,
    summary: [],
  };
  return { ...preview, summary: summarizeMemoryInboxPromotionPreview(preview) };
}

export function buildMemoryInboxRuntimeEventPreview(card: OperatorMemoryInboxCard): MemoryInboxRuntimeEventPreview {
  const preview = buildMemoryInboxPromotionPreview(card);
  return {
    id: buildMemoryInboxStableKey("memory-inbox-runtime-event-preview", card.id),
    type: "memory.promoted",
    actor: "operator-memory-inbox",
    payload: {
      ...preview.proposedMemoryItem,
      sourceIds: card.sourceIds,
      evidenceRefs: preview.evidenceRefs,
      safetyNote: "Preview only; no appendEvent call, no graph mutation, no persistence, and future merge boundary preserved.",
    },
  };
}

export function summarizeMemoryInboxPromotionPreview(preview: MemoryInboxPromotionPreview): string[] {
  return [
    `${preview.proposedRuntimeEventType} preview for ${preview.cardId}.`,
    preview.allowed ? "Promotion preview is ready after review." : "Promotion preview is blocked by review policy.",
    "future merge boundary preserved; no Brain graph mutation or auto-promotion.",
  ];
}
