import type { CodexForgeBrainEdge, CodexForgeBrainNodeId } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import type {
  CodexForgeBrainReplayBuildInput,
  CodexForgeBrainReplayFrame,
  CodexForgeBrainReplayItem,
  CodexForgeBrainReplayLane,
  CodexForgeBrainReplayLaneId,
} from "./replay-types";

const LANE_LABELS: Record<CodexForgeBrainReplayLaneId, string> = {
  messages: "Messages",
  tasks: "Tasks",
  executions: "Executions",
  diffs: "Diffs",
  memory: "Memory",
  concepts: "Concepts",
  failures: "Failures",
  recoveries: "Recoveries",
  agents: "Agents",
};

const LANE_ORDER = Object.keys(LANE_LABELS) as CodexForgeBrainReplayLaneId[];

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function sourceLabel(event: CodexForgeBrainRuntimeEvent): string {
  if (event.source?.label) return event.source.label;
  if (event.source?.type && event.source.id) return `${event.source.type}:${event.source.id}`;
  return event.actor ?? "runtime";
}

function laneForEvent(event: CodexForgeBrainRuntimeEvent): CodexForgeBrainReplayLaneId {
  if (event.source?.type === "agent-runtime" || event.metadata?.agentRole) return "agents";
  switch (event.type) {
    case "message.created":
      return "messages";
    case "task.created":
    case "task.updated":
      return "tasks";
    case "execution.started":
    case "execution.completed":
      return "executions";
    case "diff.generated":
      return "diffs";
    case "memory.promoted":
      return "memory";
    case "concept.synthesized":
      return "concepts";
    case "failure.detected":
      return "failures";
    case "recovery.detected":
      return "recoveries";
  }
}

function severityForEvent(event: CodexForgeBrainRuntimeEvent): CodexForgeBrainReplayItem["severity"] {
  if (event.type === "failure.detected") return event.payload.severity ?? "high";
  if (event.metadata?.risk === "critical") return "critical";
  if (event.metadata?.risk === "high") return "high";
  if (event.type === "recovery.detected" || event.type === "concept.synthesized") return "medium";
  return "low";
}

function statusForEvent(event: CodexForgeBrainRuntimeEvent): CodexForgeBrainReplayItem["status"] {
  if (event.type === "failure.detected") return "error";
  if (event.type === "recovery.detected") return "active";
  if (event.type === "task.updated") return event.payload.status === "archived" ? "idle" : event.payload.status ?? "active";
  if (event.type === "execution.started") return "active";
  if (event.type === "execution.completed") {
    if (event.payload.status === "failed") return "error";
    if (event.payload.status === "cancelled") return "blocked";
    return "done";
  }
  if (event.type === "diff.generated") return event.payload.status === "archived" ? "idle" : event.payload.status ?? "done";
  return "done";
}

function labelForEvent(event: CodexForgeBrainRuntimeEvent): string {
  switch (event.type) {
    case "message.created":
      return `${event.payload.role} message`;
    case "task.created":
      return "Task created";
    case "task.updated":
      return `Task ${event.payload.status ?? "updated"}`;
    case "execution.started":
      return event.payload.label ?? "Execution started";
    case "execution.completed":
      return `Execution ${event.payload.status ?? "completed"}`;
    case "diff.generated":
      return `Diff ${event.payload.filePath}`;
    case "memory.promoted":
      return `Memory promoted ${event.payload.memoryType}`;
    case "concept.synthesized":
      return `Concept ${event.payload.label}`;
    case "failure.detected":
      return `Failure ${event.payload.severity ?? "detected"}`;
    case "recovery.detected":
      return `Recovery ${event.payload.strategy ?? "detected"}`;
  }
}

function summaryForEvent(event: CodexForgeBrainRuntimeEvent): string {
  switch (event.type) {
    case "message.created":
      return clampText(event.payload.text, 170);
    case "task.created":
      return clampText(event.payload.goal, 170);
    case "task.updated":
      return clampText(event.payload.summary ?? event.payload.nextAction ?? event.payload.taskId, 170);
    case "execution.started":
      return clampText(event.payload.command ?? event.payload.phase ?? event.payload.executionId, 170);
    case "execution.completed":
      return clampText(event.payload.resultSummary ?? event.payload.executionId, 170);
    case "diff.generated":
      return clampText(event.payload.patchPreview ?? event.payload.filePath, 170);
    case "memory.promoted":
      return clampText(event.payload.content, 170);
    case "concept.synthesized":
      return clampText(event.payload.summary ?? event.payload.label, 170);
    case "failure.detected":
      return clampText(event.payload.message, 170);
    case "recovery.detected":
      return clampText(event.payload.message, 170);
  }
}

function nodeIdsForEvent(event: CodexForgeBrainRuntimeEvent): CodexForgeBrainNodeId[] {
  const ids = new Set<string>();
  const payload = event.payload as Record<string, unknown>;
  if (typeof payload.nodeId === "string") ids.add(payload.nodeId);
  if (Array.isArray(payload.sourceNodeIds)) {
    for (const id of payload.sourceNodeIds) if (typeof id === "string") ids.add(id);
  }
  return [...ids].sort();
}

function edgeIdsForNodes(edges: readonly CodexForgeBrainEdge[], nodeIds: readonly string[]): string[] {
  if (nodeIds.length === 0) return [];
  const nodes = new Set(nodeIds);
  return edges
    .filter((edge) => nodes.has(edge.from) || nodes.has(edge.to))
    .map((edge) => edge.id)
    .sort();
}

function toReplayItem(
  event: CodexForgeBrainRuntimeEvent,
  edges: readonly CodexForgeBrainEdge[]
): CodexForgeBrainReplayItem {
  const nodeIds = nodeIdsForEvent(event);
  return {
    id: `replay:item:${event.id}`,
    laneId: laneForEvent(event),
    eventId: event.id,
    timestamp: event.ts,
    label: labelForEvent(event),
    summary: summaryForEvent(event),
    status: statusForEvent(event),
    severity: severityForEvent(event),
    source: sourceLabel(event),
    nodeIds,
    edgeIds: edgeIdsForNodes(edges, nodeIds),
    payload: event.payload as Record<string, unknown>,
  };
}

export function groupReplayEventsByLane(
  events: readonly CodexForgeBrainRuntimeEvent[] = [],
  edges: readonly CodexForgeBrainEdge[] = []
): CodexForgeBrainReplayLane[] {
  const items = [...events]
    .sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id))
    .map((event) => toReplayItem(event, edges));

  return LANE_ORDER.map((laneId) => ({
    id: laneId,
    label: LANE_LABELS[laneId],
    items: items.filter((item) => item.laneId === laneId),
  }));
}

export function buildBrainReplayFrame(
  item: CodexForgeBrainReplayItem,
  index: number
): CodexForgeBrainReplayFrame {
  return {
    id: `replay:frame:${index}:${item.id}`,
    index,
    timestamp: item.timestamp,
    label: item.label,
    summary: item.summary,
    activeLaneId: item.laneId,
    itemIds: [item.id],
    highlightedNodeIds: [...item.nodeIds].sort(),
    highlightedEdgeIds: [...item.edgeIds].sort(),
  };
}

export function buildBrainRuntimeReplay(input: CodexForgeBrainReplayBuildInput): {
  lanes: CodexForgeBrainReplayLane[];
  frames: CodexForgeBrainReplayFrame[];
} {
  const lanes = groupReplayEventsByLane(input.events ?? [], input.graph.edges);
  const allItems = lanes
    .flatMap((lane) => lane.items)
    .sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id));

  return {
    lanes,
    frames: allItems.map((item, index) => buildBrainReplayFrame(item, index)),
  };
}
