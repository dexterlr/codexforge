import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime/runtime-types";
import type {
  RuntimeEventReplayScope,
  RuntimeReplayEventLike,
  RuntimeReplayEventSequence,
  RuntimeReplayEventSequenceInput,
  RuntimeReplayEventSequenceItem,
  RuntimeReplayEventSequenceItemInput,
  RuntimeReplayValidationState,
} from "./runtime-event-replay-types";
import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import {
  buildRuntimeEventReplayStableKey,
  isRuntimeEventReplayKnownEventType,
  isRuntimeEventReplayScope,
  stableRuntimeEventReplayDigest,
  stableRuntimeEventReplayStringify,
  uniqueRuntimeEventReplayStrings,
} from "./runtime-event-replay-types";

const EVENT_TYPE_PRIORITY = new Map<string, number>(
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES.map((eventType, index) => [eventType, index + 1])
);

const REDUCER_AREA_BY_EVENT_TYPE: Record<string, string> = {
  "message.created": "conversation/message graph area",
  "task.created": "task graph area",
  "task.updated": "task graph area",
  "execution.started": "execution/run graph area",
  "execution.completed": "execution/run graph area",
  "diff.generated": "diff graph area",
  "memory.promoted": "memory graph area",
  "concept.synthesized": "concept/memory graph area",
  "failure.detected": "failure graph area",
  "recovery.detected": "recovery graph area",
};

function asEventLike(event: RuntimeReplayEventLike | CodexForgeBrainRuntimeEvent): RuntimeReplayEventLike {
  return {
    id: event.id,
    type: event.type,
    ts: "ts" in event ? event.ts : undefined,
    actor: "actor" in event ? event.actor : undefined,
    source: "source" in event ? event.source : undefined,
    correlationId: "correlationId" in event ? event.correlationId : undefined,
    causationId: "causationId" in event ? event.causationId : undefined,
    payload: (event.payload ?? {}) as Record<string, unknown>,
    metadata: "metadata" in event ? event.metadata : undefined,
  };
}

function stringField(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function validatePayload(eventType: string, payload: Record<string, unknown>): { state: RuntimeReplayValidationState; warnings: string[] } {
  const required: Record<string, readonly string[]> = {
    "message.created": ["messageId", "role", "text"],
    "task.created": ["taskId", "goal"],
    "task.updated": ["taskId"],
    "execution.started": ["executionId"],
    "execution.completed": ["executionId"],
    "diff.generated": ["diffId", "filePath"],
    "memory.promoted": ["memoryId", "content", "memoryType"],
    "concept.synthesized": ["conceptId", "label"],
    "failure.detected": ["failureId", "message"],
    "recovery.detected": ["recoveryId", "message"],
  };
  if (!isRuntimeEventReplayKnownEventType(eventType)) {
    return { state: "blocked", warnings: ["Unknown event type is blocked before reducer preview."] };
  }

  const missing = (required[eventType] ?? []).filter((key) => !stringField(payload, key));
  if (missing.length > 0) {
    return {
      state: "invalid",
      warnings: [`Missing required payload field(s): ${missing.join(", ")}.`],
    };
  }

  const warnings: string[] = [];
  if (eventType === "memory.promoted" && stableRuntimeEventReplayStringify(payload).toLowerCase().includes("contradiction")) {
    warnings.push("memory.promoted payload includes contradiction hint.");
  }
  if (eventType === "memory.promoted" && stableRuntimeEventReplayStringify(payload).toLowerCase().includes("duplicate")) {
    warnings.push("memory.promoted payload includes duplicate hint.");
  }
  return { state: warnings.length > 0 ? "warning" : "valid", warnings };
}

function summarizePayload(eventType: string, payload: Record<string, unknown>): string[] {
  const digest = stableRuntimeEventReplayDigest(payload);
  const label =
    stringField(payload, "label") ??
    stringField(payload, "goal") ??
    stringField(payload, "content") ??
    stringField(payload, "message") ??
    stringField(payload, "text") ??
    stringField(payload, "filePath") ??
    "payload supplied";
  const sourceIds = [
    stringField(payload, "taskId"),
    stringField(payload, "executionId"),
    stringField(payload, "memoryId"),
    stringField(payload, "conceptId"),
    stringField(payload, "messageId"),
    stringField(payload, "diffId"),
  ].filter((value): value is string => Boolean(value));

  return [
    `${eventType} payload digest ${digest}.`,
    `Primary payload signal: ${label.slice(0, 120)}.`,
    sourceIds.length > 0 ? `Related payload id(s): ${sourceIds.join(", ")}.` : "No related payload ids detected.",
  ];
}

function priorityFor(item: RuntimeReplayEventSequenceItem, suppliedOrder: readonly string[]): number {
  const suppliedIndex = suppliedOrder.indexOf(item.eventId);
  if (suppliedIndex >= 0) return suppliedIndex + 1;
  return 1000 + (EVENT_TYPE_PRIORITY.get(item.eventType) ?? 900) * 100 + item.eventId.localeCompare("") + item.eventId.length;
}

function normalizeScope(value?: string | null): RuntimeEventReplayScope {
  return isRuntimeEventReplayScope(value) ? value : "selected-events";
}

export function buildRuntimeReplayEventSequenceItem(
  input: RuntimeReplayEventSequenceItemInput
): RuntimeReplayEventSequenceItem {
  const event = asEventLike(input.event);
  const payload = event.payload ?? {};
  const validation = validatePayload(event.type, payload);
  const allowedByPolicy = input.allowedByPolicy ?? validation.state !== "blocked";
  const warnings = [
    ...validation.warnings,
    allowedByPolicy ? null : "Event is not allowed by replay policy.",
  ].filter((warning): warning is string => Boolean(warning));

  return {
    sequenceId: buildRuntimeEventReplayStableKey("runtime-replay-sequence-item", event.id, event.type),
    eventId: event.id,
    eventType: event.type,
    sourceJournalEntryId: input.sourceJournalEntryId?.trim() || event.source?.id,
    sourceRequestId: input.sourceRequestId?.trim() || event.correlationId,
    payloadSummary: summarizePayload(event.type, payload),
    replayOrder: input.replayOrder ?? 0,
    allowedByPolicy,
    validationState: allowedByPolicy ? validation.state : "blocked",
    expectedReducerArea: REDUCER_AREA_BY_EVENT_TYPE[event.type] ?? "unknown reducer area",
    warnings,
    event,
  };
}

export function buildRuntimeReplayEventSequence(
  input: RuntimeReplayEventSequenceInput = {}
): RuntimeReplayEventSequence {
  const selectedIds = uniqueRuntimeEventReplayStrings(input.selectedEventIds);
  const suppliedOrder = [...(input.suppliedOrder ?? [])].map((id) => id.trim()).filter(Boolean);
  const sourceJournalIds = [...(input.sourceJournalIds ?? [])].map((id) => id.trim()).filter(Boolean);
  const sourceRequestIds = [...(input.sourceRequestIds ?? [])].map((id) => id.trim()).filter(Boolean);
  const scope = normalizeScope(input.scope);
  const suppliedEvents = (input.events ?? []).map(asEventLike);
  const selectedEventSet = new Set(selectedIds);
  const filteredEvents =
    selectedIds.length > 0
      ? suppliedEvents.filter((event) => selectedEventSet.has(event.id))
      : suppliedEvents;
  const missingSelectedIds = selectedIds.filter((id) => !filteredEvents.some((event) => event.id === id));
  const placeholderEvents: RuntimeReplayEventLike[] = missingSelectedIds.map((eventId) => ({
    id: eventId,
    type: "unknown",
    payload: {},
  }));

  const items = [...filteredEvents, ...placeholderEvents].map((event, index) => {
    const scopeAllowed = scope !== "memory-promotion-only" || event.type === "memory.promoted";
    return buildRuntimeReplayEventSequenceItem({
      event,
      replayOrder: suppliedOrder.includes(event.id) ? suppliedOrder.indexOf(event.id) + 1 : index + 1,
      sourceJournalEntryId: sourceJournalIds[index],
      sourceRequestId: sourceRequestIds[index],
      allowedByPolicy: scopeAllowed,
    });
  });

  const ordered = items
    .map((item) => ({ item, priority: priorityFor(item, suppliedOrder) }))
    .sort((left, right) => left.priority - right.priority || left.item.eventId.localeCompare(right.item.eventId))
    .map(({ item }, index) => ({ ...item, replayOrder: index + 1 }));
  const warningCount = ordered.reduce((count, item) => count + item.warnings.length, 0);

  const sequence: RuntimeReplayEventSequence = {
    id: buildRuntimeEventReplayStableKey("runtime-replay-event-sequence", ordered.map((item) => item.eventId)),
    items: ordered,
    eventCount: ordered.length,
    allowedCount: ordered.filter((item) => item.allowedByPolicy && item.validationState !== "blocked" && item.validationState !== "invalid").length,
    blockedCount: ordered.filter((item) => !item.allowedByPolicy || item.validationState === "blocked" || item.validationState === "invalid").length,
    warningCount,
    summary: [],
  };

  return { ...sequence, summary: summarizeRuntimeReplayEventSequence(sequence) };
}

export function summarizeRuntimeReplayEventSequence(sequence: RuntimeReplayEventSequence): string[] {
  return [
    `${sequence.eventCount} event(s) prepared for deterministic replay order.`,
    `${sequence.allowedCount} event(s) allowed by preview policy and ${sequence.blockedCount} blocked or invalid.`,
    `${sequence.warningCount} sequence warning(s) visible before reducer preview.`,
    "Supplied order is honored first; otherwise event type priority and event id determine ordering.",
  ];
}
