import type {
  CodexForgeBrainEventStore,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventFilter,
  CodexForgeBrainRuntimeEventInput,
  CodexForgeBrainRuntimeEventType,
  CodexForgeBrainAppendEventResult,
} from "./runtime-types";

function now(): number {
  return Date.now();
}

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function normalizeArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function createEventId(
  input: CodexForgeBrainRuntimeEventInput,
  timestamp: number,
  sequence: number
): string {
  const hash = stableHash(`${input.type}:${timestamp}:${sequence}:${safeJson(input.payload)}`);
  return `event:${input.type}:${hash}`;
}

function isEventStore(value: unknown): value is CodexForgeBrainEventStore {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    Array.isArray((value as CodexForgeBrainEventStore).events)
  );
}

function cloneEvent(event: CodexForgeBrainRuntimeEvent): CodexForgeBrainRuntimeEvent {
  return {
    ...event,
    payload: { ...event.payload },
    ...(event.source ? { source: { ...event.source } } : {}),
    ...(event.metadata ? { metadata: { ...event.metadata } } : {}),
  } as CodexForgeBrainRuntimeEvent;
}

function getTaskId(event: CodexForgeBrainRuntimeEvent): string | undefined {
  switch (event.type) {
    case "task.created":
    case "task.updated":
      return event.payload.taskId;
    case "execution.started":
    case "execution.completed":
    case "memory.promoted":
    case "failure.detected":
    case "recovery.detected":
      return event.payload.taskId;
    default:
      return undefined;
  }
}

function getExecutionId(event: CodexForgeBrainRuntimeEvent): string | undefined {
  switch (event.type) {
    case "execution.started":
    case "execution.completed":
      return event.payload.executionId;
    case "diff.generated":
    case "failure.detected":
    case "recovery.detected":
      return event.payload.executionId;
    default:
      return undefined;
  }
}

export function getRuntimeEventNodeIds(
  event: CodexForgeBrainRuntimeEvent
): string[] {
  const nodeIds = new Set<string>();

  switch (event.type) {
    case "message.created":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      if (event.payload.conversationId) nodeIds.add(`conversation:${event.payload.conversationId}`);
      nodeIds.add(`message:${event.payload.messageId}`);
      break;
    case "task.created":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`task:${event.payload.taskId}`);
      break;
    case "task.updated":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`task:${event.payload.taskId}`);
      break;
    case "execution.started":
    case "execution.completed":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`run:${event.payload.runId ?? event.payload.executionId}`);
      if (event.payload.taskId) nodeIds.add(`task:${event.payload.taskId}`);
      break;
    case "diff.generated":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`diff:${event.payload.diffId}`);
      if (event.payload.runId || event.payload.executionId) {
        nodeIds.add(`run:${event.payload.runId ?? event.payload.executionId}`);
      }
      break;
    case "memory.promoted":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`memory:${event.payload.memoryId}`);
      if (event.payload.taskId) nodeIds.add(`task:${event.payload.taskId}`);
      for (const sourceNodeId of event.payload.sourceNodeIds ?? []) {
        nodeIds.add(sourceNodeId);
      }
      break;
    case "concept.synthesized":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`concept:${event.payload.conceptId}`);
      for (const sourceNodeId of event.payload.sourceNodeIds ?? []) {
        nodeIds.add(sourceNodeId);
      }
      break;
    case "failure.detected":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`failure:${event.payload.failureId}`);
      if (event.payload.taskId) nodeIds.add(`task:${event.payload.taskId}`);
      if (event.payload.executionId) nodeIds.add(`run:${event.payload.executionId}`);
      break;
    case "recovery.detected":
      if (event.payload.nodeId) nodeIds.add(event.payload.nodeId);
      nodeIds.add(`recovery:${event.payload.recoveryId}`);
      if (event.payload.failureId) nodeIds.add(`failure:${event.payload.failureId}`);
      if (event.payload.taskId) nodeIds.add(`task:${event.payload.taskId}`);
      if (event.payload.executionId) nodeIds.add(`run:${event.payload.executionId}`);
      break;
  }

  return [...nodeIds];
}

function matchesFilter(
  event: CodexForgeBrainRuntimeEvent,
  filter: CodexForgeBrainRuntimeEventFilter
): boolean {
  const types = normalizeArray<CodexForgeBrainRuntimeEventType>(filter.type);
  if (types.length > 0 && !types.includes(event.type)) return false;

  const actors = normalizeArray(filter.actor);
  if (actors.length > 0 && (!event.actor || !actors.includes(event.actor))) {
    return false;
  }

  if (typeof filter.since === "number" && event.ts < filter.since) {
    return false;
  }

  if (typeof filter.until === "number" && event.ts > filter.until) {
    return false;
  }

  if (filter.taskId && getTaskId(event) !== filter.taskId) {
    return false;
  }

  if (filter.executionId && getExecutionId(event) !== filter.executionId) {
    return false;
  }

  if (
    filter.relatedNodeId &&
    !getRuntimeEventNodeIds(event).includes(filter.relatedNodeId)
  ) {
    return false;
  }

  return true;
}

export function createBrainRuntimeEventStore(
  events: CodexForgeBrainRuntimeEvent[] = []
): CodexForgeBrainEventStore {
  return {
    events: events
      .map(cloneEvent)
      .sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id)),
  };
}

export function appendEvent(
  input: CodexForgeBrainRuntimeEventInput
): CodexForgeBrainAppendEventResult;
export function appendEvent(
  store: CodexForgeBrainEventStore,
  input: CodexForgeBrainRuntimeEventInput
): CodexForgeBrainAppendEventResult;
export function appendEvent(
  storeOrInput: CodexForgeBrainEventStore | CodexForgeBrainRuntimeEventInput,
  maybeInput?: CodexForgeBrainRuntimeEventInput
): CodexForgeBrainAppendEventResult {
  const store = isEventStore(storeOrInput)
    ? storeOrInput
    : createBrainRuntimeEventStore();
  const input = isEventStore(storeOrInput) ? maybeInput : storeOrInput;

  if (!input) {
    throw new Error("appendEvent requires a runtime event input.");
  }

  const timestamp = input.ts ?? now();
  const event = {
    ...input,
    id: input.id ?? createEventId(input, timestamp, store.events.length),
    ts: timestamp,
  } as CodexForgeBrainRuntimeEvent;

  return {
    store: createBrainRuntimeEventStore([...store.events, event]),
    event,
  };
}

export function filterEvents(
  events: CodexForgeBrainRuntimeEvent[],
  filter: CodexForgeBrainRuntimeEventFilter = {}
): CodexForgeBrainRuntimeEvent[] {
  const filtered = events.filter((event) => matchesFilter(event, filter));
  const limited =
    typeof filter.limit === "number" && filter.limit >= 0
      ? filtered.slice(-filter.limit)
      : filtered;

  return limited.map(cloneEvent);
}

export function listEvents(
  store: CodexForgeBrainEventStore,
  filter: CodexForgeBrainRuntimeEventFilter = {}
): CodexForgeBrainRuntimeEvent[] {
  return filterEvents(store.events, filter);
}
