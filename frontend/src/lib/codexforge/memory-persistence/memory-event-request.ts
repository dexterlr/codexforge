import type { MemoryReviewItem } from "@/lib/codexforge/memory-review";
import { buildMemoryEventStableKey, type MemoryEventPersistenceRequest } from "./memory-persistence-types";

type MemoryEventRequestInput = Partial<MemoryEventPersistenceRequest> & {
  item?: MemoryReviewItem | null;
};

export function buildMemoryEventPersistenceRequest(
  input: MemoryEventRequestInput
): MemoryEventPersistenceRequest {
  const item = input.item ?? null;
  const candidateId = input.candidateId ?? item?.candidateId ?? "unknown-candidate";
  const reviewId = input.reviewId ?? item?.id ?? "unknown-review";
  const eventId =
    input.eventId ??
    buildMemoryEventStableKey("memory-event", "memory.promoted", candidateId, reviewId);

  return {
    id: input.id ?? buildMemoryEventStableKey("memory-event-request", eventId),
    eventId,
    candidateId,
    reviewId,
    approved: input.approved ?? item?.reviewState === "approved-for-promotion",
    approvalNote: input.approvalNote ?? "",
    safetyNote:
      input.safetyNote ??
      "Approved memory runtime event persistence only; no auto-promotion and no direct graph mutation.",
    type: "memory.promoted",
    content: input.content ?? item?.content ?? "",
    sourceRefs: input.sourceRefs ?? item?.sourceRefs ?? [],
    confidence: input.confidence ?? item?.confidence ?? 0,
    importance: input.importance ?? item?.importance ?? "medium",
    contradictionRisk: input.contradictionRisk ?? item?.contradictionRisk ?? 0,
    contradictionAcknowledged: input.contradictionAcknowledged ?? false,
    reviewState: input.reviewState ?? item?.reviewState ?? "candidate",
    targetRelativePath:
      input.targetRelativePath ??
      `${buildMemoryEventStableKey("memory-promoted", candidateId, reviewId)}.event.json`,
    overwrite: input.overwrite ?? false,
  };
}

export function validateMemoryEventPersistenceRequest(
  request: MemoryEventPersistenceRequest
): string[] {
  return [
    request.approved === true ? "" : "Explicit approved true is required.",
    request.reviewState === "approved-for-promotion"
      ? ""
      : "Request must come from an approved-for-promotion review item.",
    request.approvalNote.trim() ? "" : "Approval note is required.",
    request.safetyNote.trim() ? "" : "Safety note is required.",
    request.content.trim() ? "" : "Memory content is required.",
    request.sourceRefs.length > 0 ? "" : "At least one source ref is required.",
    request.type === "memory.promoted" ? "" : "Only memory.promoted events are supported.",
    request.contradictionRisk < 0.75 || request.contradictionAcknowledged
      ? ""
      : "High contradiction risk requires explicit acknowledgement.",
  ].filter(Boolean);
}

export function summarizeMemoryEventPersistenceRequest(
  request: MemoryEventPersistenceRequest
): string[] {
  return [
    `${request.type} request for candidate ${request.candidateId}.`,
    request.approved ? "Explicit approval is present." : "Explicit approval is missing.",
    `${request.sourceRefs.length} source ref(s) will be persisted with the event.`,
    `Target event path: .codexforge/memory-events/${request.targetRelativePath}.`,
  ];
}
