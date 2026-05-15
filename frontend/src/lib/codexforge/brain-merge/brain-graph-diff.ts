import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
  type CodexForgeBrainSourceRef,
} from "@/lib/codexforge/brain/graph/types";
import {
  buildBrainMergeStableKey,
  type BrainEventQueue,
  type BrainGraphDiffPreview,
  type BrainGraphEdgeDiff,
  type BrainGraphNodeDiff,
  type NormalizedBrainMergeEvent,
} from "./brain-merge-types";

const PREVIEW_TS = 1;

function memoryNodeId(event: NormalizedBrainMergeEvent): string {
  return `memory:${buildBrainMergeStableKey("memory", event.candidateId)}`;
}

function sourceNodeId(ref: CodexForgeBrainSourceRef): string {
  return buildBrainMergeStableKey(ref.type, ref.id);
}

function edgeId(from: string, kind: string, to: string): string {
  return buildBrainMergeStableKey("edge", from, kind, to);
}

export function buildBrainGraphNodeDiff(
  event: NormalizedBrainMergeEvent,
  graph: CodexForgeBrainGraph
): BrainGraphNodeDiff {
  const id = memoryNodeId(event);
  const existing = graph.nodes.find((node) => node.id === id);
  const duplicateLabel = graph.nodes.find(
    (node) =>
      node.id !== id &&
      node.kind === "memory" &&
      "content" in node.data &&
      String(node.data.content).trim().toLowerCase() === event.content.trim().toLowerCase()
  );
  const conflictWarnings = [
    duplicateLabel ? `duplicate graph node target risk: ${duplicateLabel.id}` : "",
    event.contradictionRisk >= 0.75 ? "high contradiction risk requires acknowledgement" : "",
  ].filter(Boolean);
  const node: CodexForgeBrainNode = {
    id,
    kind: "memory",
    data: {
      label: event.content.length > 88 ? `${event.content.slice(0, 85)}...` : event.content,
      memoryType: "note",
      content: event.content,
    },
    meta: {
      createdAt: existing?.meta.createdAt ?? PREVIEW_TS,
      updatedAt: PREVIEW_TS,
      status: "active",
      importance: event.importance,
      sourceRefs: [{ type: "memory-item", id: event.candidateId }, ...event.sourceRefs],
      version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    },
  };

  return {
    id: buildBrainMergeStableKey("node-diff", event.eventId, id),
    state: event.state === "blocked" ? "blocked" : existing ? "update" : "add",
    node,
    sourceRefs: event.sourceRefs,
    duplicateRisk: Boolean(duplicateLabel),
    staleEventRisk: event.confidence < 0.4,
    conflictWarnings,
  };
}

export function buildBrainGraphEdgeDiff(
  event: NormalizedBrainMergeEvent,
  ref: CodexForgeBrainSourceRef
): BrainGraphEdgeDiff {
  const from = memoryNodeId(event);
  const to = sourceNodeId(ref);
  const edge: CodexForgeBrainEdge = {
    id: edgeId(from, "derived_from", to),
    from,
    to,
    kind: "derived_from",
    label: "source ref",
    meta: {
      createdAt: PREVIEW_TS,
      updatedAt: PREVIEW_TS,
      status: "active",
      importance: event.importance,
      sourceRefs: [ref],
      version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    },
  };

  return {
    id: buildBrainMergeStableKey("edge-diff", event.eventId, ref.type, ref.id),
    state: event.state === "eligible" ? "add" : "blocked",
    edge,
    sourceRefs: [ref],
    conflictWarnings: [],
  };
}

export function buildBrainGraphDiffPreview(
  graph: CodexForgeBrainGraph,
  queue: BrainEventQueue
): BrainGraphDiffPreview {
  const nodeDiffs = queue.events.map((event) => buildBrainGraphNodeDiff(event, graph));
  const edgeDiffs = queue.events.flatMap((event) =>
    event.sourceRefs.map((ref) => buildBrainGraphEdgeDiff(event, ref))
  );
  const duplicateRisks = nodeDiffs
    .filter((diff) => diff.duplicateRisk)
    .map((diff) => diff.node.id);
  const staleEventRisks = nodeDiffs
    .filter((diff) => diff.staleEventRisk)
    .map((diff) => diff.node.id);
  const conflictWarnings = Array.from(
    new Set(nodeDiffs.flatMap((diff) => diff.conflictWarnings))
  );
  const sourceRefsLinked = Array.from(
    new Map(
      queue.events.flatMap((event) => event.sourceRefs).map((ref) => [`${ref.type}:${ref.id}`, ref])
    ).values()
  );
  const preview: BrainGraphDiffPreview = {
    id: "brain-graph-diff-preview",
    targetGraphVersion: graph.version ?? null,
    nodesToAdd: nodeDiffs.filter((diff) => diff.state === "add"),
    nodesToUpdate: nodeDiffs.filter((diff) => diff.state === "update"),
    edgesToAdd: edgeDiffs.filter((diff) => diff.state === "add"),
    blockedNodes: nodeDiffs.filter((diff) => diff.state === "blocked"),
    duplicateRisks,
    staleEventRisks,
    conflictWarnings,
    sourceRefsLinked,
    summary: [],
  };

  return { ...preview, summary: summarizeBrainGraphDiffPreview(preview) };
}

export function summarizeBrainGraphDiffPreview(preview: BrainGraphDiffPreview): string[] {
  return [
    `Graph diff preview: ${preview.nodesToAdd.length} node(s) to add, ${preview.nodesToUpdate.length} node(s) to update, ${preview.edgesToAdd.length} edge(s) to add.`,
    `${preview.sourceRefsLinked.length} source ref(s) linked for merge review traceability.`,
    `${preview.duplicateRisks.length} duplicate risk(s), ${preview.staleEventRisks.length} stale event risk(s), ${preview.conflictWarnings.length} conflict warning(s).`,
    "Preview only. No Brain graph mutation.",
  ];
}
