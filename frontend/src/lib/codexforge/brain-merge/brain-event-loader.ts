import {
  BRAIN_MERGE_SUPPORTED_EVENT_TYPE,
  buildBrainMergeStableKey,
  type BrainEventQueue,
  type BrainMergePersistedEventInput,
  type NormalizedBrainMergeEvent,
} from "./brain-merge-types";
import type { CodexForgeBrainSourceRef, CodexForgeBrainSourceRefType } from "@/lib/codexforge/brain/graph/types";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeImportance(value: unknown): NormalizedBrainMergeEvent["importance"] {
  if (value === "low" || value === "medium" || value === "high" || value === "critical") return value;
  if (!isFiniteNumber(value)) return "medium";
  if (value >= 0.95) return "critical";
  if (value >= 0.75) return "high";
  if (value >= 0.45) return "medium";
  return "low";
}

function normalizeSourceRefType(value: string): CodexForgeBrainSourceRefType {
  switch (value) {
    case "chat-message":
    case "active-task":
    case "memory-item":
    case "execution-state":
    case "history-entry":
    case "system":
    case "manual":
    case "derived":
    case "operator-run":
    case "operator-diff":
    case "operator-snapshot":
    case "import":
      return value;
    default:
      return "derived";
  }
}

export function normalizePersistedMemoryEvent(
  input: BrainMergePersistedEventInput
): NormalizedBrainMergeEvent {
  const payload = input.payload ?? {};
  const metadata = input.metadata ?? {};
  const eventId = readString(input.eventId ?? input.id ?? payload.eventId, "unknown-event");
  const candidateId = readString(input.candidateId ?? payload.memoryId, eventId);
  const reviewId = readString(input.reviewId ?? input.targetRelativePath, candidateId);
  const type = input.type === BRAIN_MERGE_SUPPORTED_EVENT_TYPE ? BRAIN_MERGE_SUPPORTED_EVENT_TYPE : "unknown";
  const content = readString(input.content ?? payload.content, "");
  const approved = input.approved === true || input.reviewState === "approved-for-promotion";
  const sourceRefs: CodexForgeBrainSourceRef[] = (Array.isArray(input.sourceRefs) ? input.sourceRefs : [])
    .map((ref) => ({
      type: normalizeSourceRefType(readString(ref.type, "")),
      id: readString(ref.id, ""),
    }))
    .filter((ref) => ref.type && ref.id);
  const contradictionRisk = isFiniteNumber(input.contradictionRisk)
    ? input.contradictionRisk
    : isFiniteNumber(metadata.contradictionRisk)
      ? metadata.contradictionRisk
      : 0;
  const confidence = isFiniteNumber(input.confidence)
    ? input.confidence
    : isFiniteNumber(metadata.confidence)
      ? metadata.confidence
      : 0;

  const blockedReasons = [
    type === BRAIN_MERGE_SUPPORTED_EVENT_TYPE ? "" : "unknown event type",
    approved ? "" : "approved persisted memory events required",
    content ? "" : "empty memory content",
    sourceRefs.length > 0 ? "" : "missing source refs",
  ].filter(Boolean);
  const state = blockedReasons.length > 0 ? "blocked" : "eligible";

  return {
    id: buildBrainMergeStableKey("brain-event", eventId),
    eventId,
    candidateId,
    reviewId,
    type,
    state,
    approved,
    content,
    sourceRefs,
    confidence,
    importance: normalizeImportance(input.importance ?? payload.importance),
    contradictionRisk,
    targetRelativePath: readString(input.targetRelativePath, ""),
    blockedReasons,
    summary: [
      `${type} event ${eventId}.`,
      state === "eligible" ? "Eligible for graph diff preview." : `Blocked: ${blockedReasons.join(", ")}.`,
    ],
  };
}

export function buildBrainEventQueue(
  events: BrainMergePersistedEventInput[] = []
): BrainEventQueue {
  const normalized = events.map(normalizePersistedMemoryEvent);
  const queue: BrainEventQueue = {
    id: "brain-event-queue",
    events: normalized,
    eventCount: normalized.length,
    validEventCount: normalized.filter((event) => event.state === "eligible").length,
    blockedEventCount: normalized.filter((event) => event.state === "blocked").length,
    unknownEventCount: normalized.filter((event) => event.type === "unknown").length,
    summary: [],
  };

  return { ...queue, summary: summarizeBrainEventQueue(queue) };
}

export function summarizeBrainEventQueue(queue: BrainEventQueue): string[] {
  return [
    `${queue.eventCount} persisted memory event(s) inspected.`,
    `${queue.validEventCount} approved memory.promoted event(s) eligible.`,
    `${queue.blockedEventCount} event(s) blocked from merge preview.`,
    "Invalid or unknown events are blocked; no filesystem reads occur in domain logic.",
  ];
}
