import type {
  CodexForgeBrainRuntimeActor,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventType,
} from "./runtime-types";

export type CodexForgeBrainRuntimeTimelineItem = {
  id: string;
  type: CodexForgeBrainRuntimeEventType;
  label: string;
  timestamp: number;
  importance: "low" | "medium" | "high" | "critical";
  source: string;
  summary: string;
};

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function sourceLabel(
  actor: CodexForgeBrainRuntimeActor | undefined,
  source: CodexForgeBrainRuntimeEvent["source"]
): string {
  if (source?.label) return source.label;
  if (source?.type && source.id) return `${source.type}:${source.id}`;
  if (actor) return actor;
  return "runtime";
}

function summarizeEvent(event: CodexForgeBrainRuntimeEvent): string {
  switch (event.type) {
    case "message.created":
      return `${event.payload.role} message: ${clampText(event.payload.text, 140)}`;
    case "task.created":
      return `Task created: ${clampText(event.payload.goal, 140)}`;
    case "task.updated":
      return `Task updated: ${
        event.payload.summary ?? event.payload.status ?? event.payload.taskId
      }`;
    case "execution.started":
      return `Execution started: ${
        event.payload.label ?? event.payload.executionId
      }`;
    case "execution.completed":
      return `Execution completed: ${
        event.payload.resultSummary ??
        event.payload.status ??
        event.payload.executionId
      }`;
    case "diff.generated":
      return `Diff generated: ${event.payload.filePath}`;
    case "memory.promoted":
      return `Memory promoted: ${clampText(event.payload.content, 140)}`;
    case "concept.synthesized":
      return `Concept synthesized: ${event.payload.label}`;
    case "failure.detected":
      return `Failure detected: ${clampText(event.payload.message, 140)}`;
    case "recovery.detected":
      return `Recovery detected: ${clampText(event.payload.message, 140)}`;
  }
}

function eventImportance(
  event: CodexForgeBrainRuntimeEvent
): CodexForgeBrainRuntimeTimelineItem["importance"] {
  switch (event.type) {
    case "failure.detected":
      return event.payload.severity === "critical" ? "critical" : "high";
    case "execution.started":
    case "execution.completed":
    case "task.created":
    case "task.updated":
      return "high";
    case "memory.promoted":
      if (event.payload.importance === "critical") return "critical";
      if (event.payload.importance === "high") return "high";
      if (typeof event.payload.importance === "number") {
        if (event.payload.importance >= 0.95) return "critical";
        if (event.payload.importance >= 0.75) return "high";
      }
      return "medium";
    case "concept.synthesized":
    case "diff.generated":
    case "recovery.detected":
      return "medium";
    case "message.created":
      return event.payload.role === "user" ? "medium" : "low";
  }
}

function eventLabel(event: CodexForgeBrainRuntimeEvent): string {
  switch (event.type) {
    case "message.created":
      return `${event.payload.role} message`;
    case "task.created":
      return "Task created";
    case "task.updated":
      return "Task updated";
    case "execution.started":
      return "Execution started";
    case "execution.completed":
      return "Execution completed";
    case "diff.generated":
      return "Diff generated";
    case "memory.promoted":
      return "Memory promoted";
    case "concept.synthesized":
      return "Concept synthesized";
    case "failure.detected":
      return "Failure detected";
    case "recovery.detected":
      return "Recovery detected";
  }
}

function toTimelineItem(
  event: CodexForgeBrainRuntimeEvent
): CodexForgeBrainRuntimeTimelineItem {
  return {
    id: event.id,
    type: event.type,
    label: eventLabel(event),
    timestamp: event.ts,
    importance: eventImportance(event),
    source: sourceLabel(event.actor, event.source),
    summary: summarizeEvent(event),
  };
}

export function buildRuntimeTimeline(
  events: readonly CodexForgeBrainRuntimeEvent[] = []
): CodexForgeBrainRuntimeTimelineItem[] {
  return events
    .map(toTimelineItem)
    .sort((a, b) => b.timestamp - a.timestamp || a.id.localeCompare(b.id));
}

export function summarizeRuntimeTimeline(
  items: readonly CodexForgeBrainRuntimeTimelineItem[] = []
): string {
  if (items.length === 0) return "No runtime events.";

  const first = items[0];
  return `${items.length} runtime events. Latest: ${first.label} at ${first.timestamp}.`;
}
