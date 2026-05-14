import { isMemoryPromotionAllowed } from "./memory-review-policy";
import {
  type MemoryPromotionEvent,
  type MemoryPromotionEventPreview,
  type MemoryPromotionPolicy,
  type MemoryReviewItem,
  buildMemoryReviewStableKey,
} from "./memory-review-types";

export function buildMemoryPromotionEvent(item: MemoryReviewItem): MemoryPromotionEvent {
  const event: MemoryPromotionEvent = {
    id: buildMemoryReviewStableKey("memory-promoted-preview", item.id, item.candidateId),
    type: "memory.promoted",
    actor: "memory-review",
    payload: {
      memoryId: buildMemoryReviewStableKey("memory", item.candidateId),
      candidateId: item.candidateId,
      content: item.content,
      memoryType: "note",
      importance: item.importance,
      confidence: item.confidence,
      reviewState: item.reviewState,
      tags: item.tags,
      sourceRefs: item.sourceRefs,
      safetyNote: "Promotion event preview only; no auto-promotion and no direct graph mutation.",
    },
    summary: [],
  };

  return { ...event, summary: summarizeMemoryPromotionEvent(event) };
}

export function buildMemoryPromotionEventPreview(
  item: MemoryReviewItem,
  policy?: MemoryPromotionPolicy
): MemoryPromotionEventPreview {
  const allowed = isMemoryPromotionAllowed(item, policy);
  const event = allowed ? buildMemoryPromotionEvent(item) : null;

  return {
    id: buildMemoryReviewStableKey("memory-promotion-event-preview", item.id),
    itemId: item.id,
    event,
    allowed,
    safetyNote: allowed
      ? "memory.promoted preview is ready; future runtime persistence is still not executed."
      : "Review required before memory.promoted preview. No auto-promotion is performed.",
    summary: [
      allowed ? "Promotion event preview exists." : "Promotion event preview is blocked until approval policy passes.",
      "Preview is compatible with runtime memory.promoted event shape.",
      "No runtime append or graph mutation occurs.",
    ],
  };
}

export function summarizeMemoryPromotionEvent(event: MemoryPromotionEvent): string[] {
  return [
    `${event.type} preview for ${event.payload.candidateId}.`,
    `Confidence ${(event.payload.confidence * 100).toFixed(0)} and importance ${event.payload.importance}.`,
    event.payload.safetyNote,
  ];
}
