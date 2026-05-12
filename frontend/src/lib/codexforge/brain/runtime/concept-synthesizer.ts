import type { CodexForgeBrainGraph, CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainConceptCandidate,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainSynthesizeConceptsInput,
} from "./runtime-types";

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "before",
  "being",
  "codexforge",
  "could",
  "from",
  "have",
  "into",
  "more",
  "need",
  "needs",
  "only",
  "should",
  "that",
  "their",
  "there",
  "these",
  "this",
  "with",
  "work",
  "would",
]);

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length >= 4 &&
        token.length <= 32 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    );
}

function titleCase(value: string): string {
  return value
    .split(/[-\s]+/)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function addSignal(
  signals: Map<string, { nodeIds: Set<string>; eventIds: Set<string>; count: number }>,
  key: string,
  source: { nodeId?: string; eventId?: string }
): void {
  const normalized = key.trim().toLowerCase();
  if (!normalized || STOP_WORDS.has(normalized)) return;

  const entry =
    signals.get(normalized) ??
    {
      nodeIds: new Set<string>(),
      eventIds: new Set<string>(),
      count: 0,
    };

  entry.count += 1;
  if (source.nodeId) entry.nodeIds.add(source.nodeId);
  if (source.eventId) entry.eventIds.add(source.eventId);
  signals.set(normalized, entry);
}

function collectNodeSignals(
  graph: CodexForgeBrainGraph,
  signals: Map<string, { nodeIds: Set<string>; eventIds: Set<string>; count: number }>
): void {
  for (const node of graph.nodes) {
    const data = node.data as Record<string, unknown>;

    for (const tag of asStringArray(data.tags)) {
      addSignal(signals, tag, { nodeId: node.id });
    }

    for (const field of ["domain", "memoryType", "sourceLabel"]) {
      const value = asString(data[field]);
      if (value) addSignal(signals, value, { nodeId: node.id });
    }

    for (const field of ["label", "goal", "content", "summary", "text", "description"]) {
      const value = asString(data[field]);
      if (!value) continue;

      for (const token of tokenize(value)) {
        addSignal(signals, token, { nodeId: node.id });
      }
    }
  }
}

function collectEventSignals(
  events: CodexForgeBrainRuntimeEvent[],
  signals: Map<string, { nodeIds: Set<string>; eventIds: Set<string>; count: number }>
): void {
  for (const event of events) {
    switch (event.type) {
      case "task.created":
        for (const tag of event.payload.tags ?? []) {
          addSignal(signals, tag, { eventId: event.id });
        }
        if (event.payload.domain) addSignal(signals, event.payload.domain, { eventId: event.id });
        for (const token of tokenize(event.payload.goal)) addSignal(signals, token, { eventId: event.id });
        break;
      case "memory.promoted":
        addSignal(signals, event.payload.memoryType, { eventId: event.id });
        for (const token of tokenize(event.payload.content)) addSignal(signals, token, { eventId: event.id });
        break;
      case "failure.detected":
      case "recovery.detected":
        for (const token of tokenize(event.payload.message)) addSignal(signals, token, { eventId: event.id });
        break;
      case "diff.generated": {
        const parts = event.payload.filePath.split(/[\\/.-]+/).filter(Boolean);
        for (const part of parts) {
          for (const token of tokenize(part)) addSignal(signals, token, { eventId: event.id });
        }
        break;
      }
      case "concept.synthesized":
        addSignal(signals, event.payload.label, { eventId: event.id });
        break;
      default:
        break;
    }
  }
}

function scoreSignal(entry: { nodeIds: Set<string>; eventIds: Set<string>; count: number }): number {
  const sourceCount = entry.nodeIds.size + entry.eventIds.size;
  return Math.min(0.95, 0.25 + entry.count * 0.08 + sourceCount * 0.05);
}

export function synthesizeConcepts(
  input: CodexForgeBrainSynthesizeConceptsInput
): CodexForgeBrainConceptCandidate[] {
  const signals = new Map<string, { nodeIds: Set<string>; eventIds: Set<string>; count: number }>();
  const minSignals = input.minSignals ?? 3;

  collectNodeSignals(input.graph, signals);
  collectEventSignals(input.events ?? [], signals);

  return [...signals.entries()]
    .filter(([, entry]) => entry.count >= minSignals)
    .map(([key, entry]) => ({
      id: `concept:${stableHash(key)}`,
      label: titleCase(key),
      summary: `Repeated signal across ${entry.count} graph or runtime observations.`,
      confidence: scoreSignal(entry),
      signals: [key],
      sourceNodeIds: [...entry.nodeIds],
      sourceEventIds: [...entry.eventIds],
    }))
    .sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return b.sourceNodeIds.length + b.sourceEventIds.length - (a.sourceNodeIds.length + a.sourceEventIds.length);
    })
    .slice(0, input.limit ?? 10);
}

export function candidateConceptsFromNodes(
  graph: CodexForgeBrainGraph,
  nodes: CodexForgeBrainNode[]
): CodexForgeBrainConceptCandidate[] {
  const selectedIds = new Set(nodes.map((node) => node.id));
  return synthesizeConcepts({
    graph: {
      ...graph,
      nodes: graph.nodes.filter((node) => selectedIds.has(node.id)),
      edges: graph.edges.filter(
        (edge) => selectedIds.has(edge.from) && selectedIds.has(edge.to)
      ),
    },
  });
}
