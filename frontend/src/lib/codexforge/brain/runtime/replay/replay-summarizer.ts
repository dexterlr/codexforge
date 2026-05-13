import type {
  CodexForgeBrainLineageGraph,
  CodexForgeBrainReplayFrame,
  CodexForgeBrainReplayLane,
  CodexForgeBrainReplaySummary,
} from "./replay-types";

function severityRank(value: string): number {
  if (value === "critical") return 4;
  if (value === "high") return 3;
  if (value === "medium") return 2;
  return 1;
}

export function summarizeBrainRuntimeReplay(input: {
  lanes: readonly CodexForgeBrainReplayLane[];
  frames: readonly CodexForgeBrainReplayFrame[];
}): CodexForgeBrainReplaySummary {
  const items = input.lanes.flatMap((lane) => lane.items);
  const timestamps = items.map((item) => item.timestamp).sort((a, b) => a - b);
  const status = items.length > 0 ? "ready" : "empty";
  return {
    eventCount: items.length,
    frameCount: input.frames.length,
    laneCount: input.lanes.filter((lane) => lane.items.length > 0).length,
    firstTimestamp: timestamps[0],
    latestTimestamp: timestamps[timestamps.length - 1],
    status,
    text:
      status === "ready"
        ? `${items.length} replay items across ${input.frames.length} deterministic frames.`
        : "No live replay events yet; fixture fallback can show the runtime contract.",
  };
}

export function summarizeBrainRuntimeLineage(graph: CodexForgeBrainLineageGraph): string {
  if (graph.nodes.length === 0) return "No lineage nodes available.";
  const critical = graph.nodes.filter((node) => node.severity === "critical").length;
  const high = graph.nodes.filter((node) => node.severity === "high").length;
  return `${graph.label}: ${graph.nodes.length} nodes, ${graph.edges.length} edges, ${critical} critical and ${high} high-risk signals.`;
}

export function selectReplayHighlights(input: {
  lanes: readonly CodexForgeBrainReplayLane[];
  lineage?: CodexForgeBrainLineageGraph;
  limit?: number;
}): string[] {
  const itemHighlights = input.lanes
    .flatMap((lane) => lane.items)
    .filter((item) =>
      item.laneId === "failures" ||
      item.laneId === "recoveries" ||
      item.laneId === "memory" ||
      item.laneId === "concepts" ||
      item.status === "blocked" ||
      item.severity === "critical" ||
      item.severity === "high" ||
      String(item.payload?.permission ?? "").includes("approval")
    )
    .sort((a, b) => severityRank(b.severity) - severityRank(a.severity) || a.timestamp - b.timestamp || a.id.localeCompare(b.id))
    .map((item) => `${item.label}: ${item.summary}`);

  const lineageHighlights = (input.lineage?.nodes ?? [])
    .filter((node) => node.kind === "risk" || node.status === "blocked" || node.severity === "critical" || node.severity === "high")
    .sort((a, b) => severityRank(b.severity) - severityRank(a.severity) || (a.timestamp ?? 0) - (b.timestamp ?? 0) || a.id.localeCompare(b.id))
    .map((node) => `${node.kind}: ${node.label} ${node.summary}`);

  return [...itemHighlights, ...lineageHighlights].slice(0, input.limit ?? 8);
}
