import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import { getRuntimeEventNodeIds } from "./event-store";
import type {
  CodexForgeBrainCreateEpisodeInput,
  CodexForgeBrainEpisode,
  CodexForgeBrainRuntimeEvent,
} from "./runtime-types";

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function summarizeEventAction(event: CodexForgeBrainRuntimeEvent): string | undefined {
  switch (event.type) {
    case "message.created":
      return `${event.payload.role} message: ${clampText(event.payload.text, 120)}`;
    case "task.created":
      return `Created task: ${clampText(event.payload.goal, 120)}`;
    case "task.updated":
      return `Updated task: ${event.payload.summary ?? event.payload.status ?? event.payload.taskId}`;
    case "execution.started":
      return `Started execution: ${event.payload.label ?? event.payload.executionId}`;
    case "execution.completed":
      return `Completed execution: ${event.payload.resultSummary ?? event.payload.status ?? event.payload.executionId}`;
    case "diff.generated":
      return `Generated diff: ${event.payload.filePath}`;
    case "memory.promoted":
      return `Promoted memory: ${clampText(event.payload.content, 120)}`;
    case "concept.synthesized":
      return `Synthesized concept: ${event.payload.label}`;
    default:
      return undefined;
  }
}

function collectContextFromNodes(nodes: CodexForgeBrainNode[]): string[] {
  return nodes
    .map((node) => {
      const data = node.data as Record<string, unknown>;
      const label = asString(data.label) ?? `${node.kind} ${node.id}`;
      const detail =
        asString(data.summary) ??
        asString(data.goal) ??
        asString(data.content) ??
        asString(data.text) ??
        asString(data.description);

      return detail ? `${label}: ${clampText(detail, 160)}` : label;
    })
    .slice(0, 12);
}

function collectEventNodeIds(events: CodexForgeBrainRuntimeEvent[]): string[] {
  return unique(events.flatMap((event) => getRuntimeEventNodeIds(event)));
}

export function createEpisode(
  input: CodexForgeBrainCreateEpisodeInput
): CodexForgeBrainEpisode {
  const events = input.events ?? [];
  const focusedNodes = input.graph
    ? input.graph.nodes.filter((node) => input.focusNodeIds?.includes(node.id))
    : [];
  const createdAt = input.createdAt ?? Date.now();
  const eventIds = events.map((event) => event.id);
  const nodeIds = unique([
    ...(input.focusNodeIds ?? []),
    ...collectEventNodeIds(events),
  ]);

  const actions = unique([
    ...(input.actions ?? []),
    ...events
      .map(summarizeEventAction)
      .filter((value): value is string => Boolean(value)),
  ]);

  const failures = unique([
    ...(input.failures ?? []),
    ...events
      .filter((event) => event.type === "failure.detected")
      .map((event) => clampText(event.payload.message, 180)),
  ]);

  const recovery = unique([
    ...(input.recovery ?? []),
    ...events
      .filter((event) => event.type === "recovery.detected")
      .map((event) => clampText(event.payload.message, 180)),
  ]);

  const outputs = unique([
    ...(input.outputs ?? []),
    ...events
      .filter(
        (event) =>
          event.type === "execution.completed" ||
          event.type === "diff.generated" ||
          event.type === "memory.promoted"
      )
      .map((event) => summarizeEventAction(event) ?? event.type),
  ]);

  const learnedConcepts = unique([
    ...(input.learnedConcepts ?? []),
    ...events
      .filter((event) => event.type === "concept.synthesized")
      .map((event) => event.payload.label),
  ]);

  const context = unique([
    ...(input.context ?? []),
    ...collectContextFromNodes(focusedNodes),
  ]);

  return {
    id:
      input.id ??
      `episode:${stableHash(`${input.goal}:${eventIds.join(",")}:${createdAt}`)}`,
    goal: input.goal,
    context,
    actions,
    failures,
    recovery,
    outputs,
    learnedConcepts,
    eventIds,
    nodeIds,
    startedAt: input.startedAt ?? events[0]?.ts,
    completedAt: input.completedAt ?? events[events.length - 1]?.ts,
    createdAt,
    ...(input.metadata ? { metadata: { ...input.metadata } } : {}),
  };
}
