import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
} from "@/lib/codexforge/brain/graph/types";
import { getRuntimeEventNodeIds } from "./event-store";
import { rankMemory } from "./memory-ranker";
import type {
  CodexForgeBrainAssembleContextInput,
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeContextEvent,
  CodexForgeBrainRuntimeContextNode,
  CodexForgeBrainRuntimeEvent,
} from "./runtime-types";

const DEFAULT_MAX_NODES = 20;
const DEFAULT_MAX_EDGES = 48;
const DEFAULT_MAX_EVENTS = 16;
const DEFAULT_MAX_MEMORY = 8;
const DEFAULT_DEPTH = 1;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function getNodeLabel(node: CodexForgeBrainNode): string {
  return asString((node.data as Record<string, unknown>).label) ?? `${node.kind} ${node.id}`;
}

function getNodeSummary(node: CodexForgeBrainNode): string | undefined {
  if (!isRecord(node.data)) return undefined;
  const data = node.data as Record<string, unknown>;

  for (const key of [
    "summary",
    "whyItMatters",
    "goal",
    "content",
    "text",
    "description",
    "nextAction",
    "resultSummary",
  ]) {
    const value = asString(data[key]);
    if (value) return clampText(value, 220);
  }

  return undefined;
}

function getImportanceScore(node: CodexForgeBrainNode): number {
  switch (node.meta.importance) {
    case "critical":
      return 100;
    case "high":
      return 70;
    case "medium":
      return 40;
    case "low":
      return 15;
    default:
      return 0;
  }
}

function getStatusScore(node: CodexForgeBrainNode): number {
  switch (node.meta.status) {
    case "error":
      return 90;
    case "blocked":
      return 80;
    case "active":
      return 60;
    case "done":
      return 25;
    case "idle":
      return 10;
    case "archived":
      return -50;
    default:
      return 0;
  }
}

function scoreNode(node: CodexForgeBrainNode, focusNodeIds: Set<string>): number {
  let score = getImportanceScore(node) + getStatusScore(node);
  if (node.meta.pinned) score += 100;
  if (focusNodeIds.has(node.id)) score += 200;
  score += Math.floor((node.meta.updatedAt ?? 0) / 10_000_000);
  return score;
}

function edgeOtherId(edge: CodexForgeBrainEdge, nodeId: string): string {
  return edge.from === nodeId ? edge.to : edge.from;
}

function selectNodeIds(
  graph: CodexForgeBrainGraph,
  focusNodeIds: string[],
  depth: number,
  maxNodes: number
): Set<string> {
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  const edgeBuckets = new Map<string, CodexForgeBrainEdge[]>();

  for (const edge of graph.edges) {
    edgeBuckets.set(edge.from, [...(edgeBuckets.get(edge.from) ?? []), edge]);
    edgeBuckets.set(edge.to, [...(edgeBuckets.get(edge.to) ?? []), edge]);
  }

  const selected = new Set<string>();
  const queue = focusNodeIds
    .filter((id) => nodeIds.has(id))
    .map((id) => ({ id, depth: 0 }));

  while (queue.length > 0 && selected.size < maxNodes) {
    const current = queue.shift();
    if (!current || selected.has(current.id)) continue;

    selected.add(current.id);
    if (current.depth >= depth) continue;

    for (const edge of edgeBuckets.get(current.id) ?? []) {
      const otherId = edgeOtherId(edge, current.id);
      if (!selected.has(otherId) && nodeIds.has(otherId)) {
        queue.push({ id: otherId, depth: current.depth + 1 });
      }
    }
  }

  if (selected.size < maxNodes) {
    const focusSet = new Set(focusNodeIds);
    const extras = [...graph.nodes]
      .filter((node) => !selected.has(node.id))
      .sort((a, b) => scoreNode(b, focusSet) - scoreNode(a, focusSet))
      .slice(0, maxNodes - selected.size);

    for (const node of extras) {
      selected.add(node.id);
    }
  }

  return selected;
}

function toContextNode(
  node: CodexForgeBrainNode,
  focusNodeIds: Set<string>
): CodexForgeBrainRuntimeContextNode {
  return {
    id: node.id,
    kind: node.kind,
    label: getNodeLabel(node),
    summary: getNodeSummary(node),
    status: node.meta.status,
    importance: node.meta.importance,
    pinned: node.meta.pinned,
    score: scoreNode(node, focusNodeIds),
  };
}

function summarizeEvent(event: CodexForgeBrainRuntimeEvent): string {
  switch (event.type) {
    case "message.created":
      return `${event.payload.role}: ${clampText(event.payload.text, 120)}`;
    case "task.created":
      return `Task created: ${clampText(event.payload.goal, 120)}`;
    case "task.updated":
      return `Task updated: ${event.payload.summary ?? event.payload.status ?? event.payload.taskId}`;
    case "execution.started":
      return `Execution started: ${event.payload.label ?? event.payload.executionId}`;
    case "execution.completed":
      return `Execution completed: ${event.payload.resultSummary ?? event.payload.status ?? event.payload.executionId}`;
    case "diff.generated":
      return `Diff generated: ${event.payload.filePath}`;
    case "memory.promoted":
      return `Memory promoted: ${clampText(event.payload.content, 120)}`;
    case "concept.synthesized":
      return `Concept synthesized: ${event.payload.label}`;
    case "failure.detected":
      return `Failure detected: ${clampText(event.payload.message, 120)}`;
    case "recovery.detected":
      return `Recovery detected: ${clampText(event.payload.message, 120)}`;
  }
}

function toContextEvent(
  event: CodexForgeBrainRuntimeEvent
): CodexForgeBrainRuntimeContextEvent {
  return {
    id: event.id,
    type: event.type,
    ts: event.ts,
    summary: summarizeEvent(event),
    nodeIds: getRuntimeEventNodeIds(event),
  };
}

function collectGoals(nodes: CodexForgeBrainNode[], events: CodexForgeBrainRuntimeEvent[]): string[] {
  const goals = new Set<string>();

  for (const node of nodes) {
    const goal = asString((node.data as Record<string, unknown>).goal);
    if (goal) goals.add(clampText(goal, 160));
  }

  for (const event of events) {
    if (event.type === "task.created") goals.add(clampText(event.payload.goal, 160));
  }

  return [...goals].slice(0, 6);
}

function collectFailures(events: CodexForgeBrainRuntimeEvent[]): string[] {
  return events
    .filter((event) => event.type === "failure.detected")
    .map((event) => clampText(event.payload.message, 160))
    .slice(-6);
}

function collectOutputs(events: CodexForgeBrainRuntimeEvent[]): string[] {
  return events
    .filter(
      (event) =>
        event.type === "execution.completed" ||
        event.type === "diff.generated" ||
        event.type === "memory.promoted" ||
        event.type === "concept.synthesized"
    )
    .map((event) => summarizeEvent(event))
    .slice(-8);
}

export function assembleContext(
  input: CodexForgeBrainAssembleContextInput
): CodexForgeBrainRuntimeContext {
  const focusNodeIds = input.focusNodeIds ?? [];
  const focusSet = new Set(focusNodeIds);
  const selectedNodeIds = selectNodeIds(
    input.graph,
    focusNodeIds,
    input.includeConnectedDepth ?? DEFAULT_DEPTH,
    input.maxNodes ?? DEFAULT_MAX_NODES
  );

  const selectedNodes = input.graph.nodes
    .filter((node) => selectedNodeIds.has(node.id))
    .sort((a, b) => scoreNode(b, focusSet) - scoreNode(a, focusSet));

  const selectedEdges = input.graph.edges
    .filter((edge) => selectedNodeIds.has(edge.from) && selectedNodeIds.has(edge.to))
    .slice(0, input.maxEdges ?? DEFAULT_MAX_EDGES);

  const events = [...(input.events ?? [])]
    .sort((a, b) => b.ts - a.ts)
    .filter((event) => {
      if (focusSet.size === 0) return true;
      return getRuntimeEventNodeIds(event).some((nodeId) => focusSet.has(nodeId));
    })
    .slice(0, input.maxEvents ?? DEFAULT_MAX_EVENTS)
    .reverse();

  return {
    generatedAt: input.now ?? Date.now(),
    focusNodeIds,
    summary: {
      nodeCount: input.graph.nodes.length,
      edgeCount: input.graph.edges.length,
      eventCount: input.events?.length ?? 0,
      selectedNodeCount: selectedNodes.length,
      selectedEventCount: events.length,
    },
    nodes: selectedNodes.map((node) => toContextNode(node, focusSet)),
    edges: selectedEdges.map((edge) => ({
      id: edge.id,
      kind: edge.kind,
      from: edge.from,
      to: edge.to,
      label: edge.label,
      weight: edge.weight,
    })),
    events: events.map(toContextEvent),
    memory: rankMemory({
      graph: input.graph,
      events: input.events,
      focusNodeIds,
      limit: input.maxMemory ?? DEFAULT_MAX_MEMORY,
      now: input.now,
    }),
    goals: collectGoals(selectedNodes, input.events ?? []),
    failures: collectFailures(input.events ?? []),
    outputs: collectOutputs(input.events ?? []),
  };
}
