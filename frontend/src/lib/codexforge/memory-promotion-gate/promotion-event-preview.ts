import {
  buildMemoryPromotionGateStableKey,
  buildMemoryPromotionTextDigest,
  type MemoryPromotedEventPreview,
  type MemoryPromotionGateInput,
  type MemoryPromotionPolicy,
  type MemoryPromotionRuntimePayloadPreview,
} from "./memory-promotion-gate-types";

function toRuntimeMemoryType(kind: string): MemoryPromotionRuntimePayloadPreview["memoryType"] {
  if (kind.includes("decision")) return "decision";
  if (kind.includes("task") || kind === "follow-up") return "task";
  if (kind.includes("fact") || kind.includes("architecture") || kind.includes("implementation")) return "fact";
  return "note";
}

export function buildMemoryPromotionRuntimePayloadPreview(input: MemoryPromotionGateInput): MemoryPromotionRuntimePayloadPreview {
  const memoryId = buildMemoryPromotionGateStableKey("memory", input.memoryKind, buildMemoryPromotionTextDigest(input.proposedMemoryText));
  return {
    memoryId,
    content: input.proposedMemoryText,
    memoryType: toRuntimeMemoryType(input.memoryKind),
    importance: input.importance,
    tags: input.suggestedTags,
    confidence: input.confidence,
    risk: input.risk,
    sourceInboxCardId: input.inboxCardId,
    sourceReviewId: input.sourceMemoryReviewId,
    evidenceRefs: input.sourceIds.length > 0 ? input.sourceIds : input.evidenceSnippets,
    safetyNote: "Preview only; do not call appendEvent, mutate graph, persist, auto-promote, or auto-merge.",
  };
}

export function buildMemoryPromotedEventPreview(
  input: MemoryPromotionGateInput,
  policy: MemoryPromotionPolicy
): MemoryPromotedEventPreview {
  const payloadPreview = buildMemoryPromotionRuntimePayloadPreview(input);
  const eventId = buildMemoryPromotionGateStableKey("event", "memory.promoted", payloadPreview.memoryId);
  const preview: MemoryPromotedEventPreview = {
    id: buildMemoryPromotionGateStableKey("memory-promoted-event-preview", input.id),
    type: "memory.promoted",
    eventId,
    memoryId: payloadPreview.memoryId,
    proposedMemoryText: input.proposedMemoryText,
    memoryKind: input.memoryKind,
    tags: input.suggestedTags,
    evidenceRefs: payloadPreview.evidenceRefs,
    confidence: input.confidence,
    importance: input.importance,
    risk: input.risk,
    sourceInboxCardId: input.inboxCardId,
    sourceReviewId: input.sourceMemoryReviewId,
    reviewRequirements: policy.rules.filter((item) => item.state !== "allow").map((item) => item.label),
    blockedReasons: policy.blockedReasons,
    futureReducerBoundary: "future reducer boundary: memory.promoted can be reduced only by a future guarded runtime executor, not by this UI.",
    payloadPreview,
    summary: [],
  };
  return { ...preview, summary: summarizeMemoryPromotedEventPreview(preview) };
}

export function summarizeMemoryPromotedEventPreview(preview: MemoryPromotedEventPreview): string[] {
  return [
    `${preview.type} event preview ${preview.eventId} targets memory ${preview.memoryId}.`,
    preview.blockedReasons.length === 0 ? "Event preview has no policy blockers." : `Event preview remains blocked: ${preview.blockedReasons.join(", ")}.`,
    "Preview only: no appendEvent call, no graph mutation, no persistence, future reducer boundary preserved.",
  ];
}
