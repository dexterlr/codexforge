import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  RuntimeReplaySnapshot,
  RuntimeReplaySnapshotInput,
  RuntimeReplaySnapshotSource,
} from "./runtime-event-replay-types";
import {
  RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH,
  RUNTIME_EVENT_REPLAY_EMPTY_GRAPH,
  buildRuntimeEventReplayStableKey,
  summarizeRuntimeReplayGraph,
  uniqueRuntimeEventReplayStrings,
} from "./runtime-event-replay-types";

function cloneNode(node: CodexForgeBrainNode): CodexForgeBrainNode {
  return {
    ...node,
    data: { ...node.data },
    meta: {
      ...node.meta,
      ...(node.meta.sourceRefs ? { sourceRefs: [...node.meta.sourceRefs] } : {}),
    },
    ...(node.graph
      ? {
          graph: {
            ...node.graph,
            ...(node.graph.coordinates ? { coordinates: { ...node.graph.coordinates } } : {}),
          },
        }
      : {}),
  };
}

function cloneEdge(edge: CodexForgeBrainEdge): CodexForgeBrainEdge {
  return {
    ...edge,
    meta: {
      ...edge.meta,
      ...(edge.meta.sourceRefs ? { sourceRefs: [...edge.meta.sourceRefs] } : {}),
    },
  };
}

export function cloneRuntimeReplayGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    ...graph,
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: graph.nodes.map(cloneNode),
    edges: graph.edges.map(cloneEdge),
    meta: { ...graph.meta },
  };
}

function normalizeSource(value?: string | null): RuntimeReplaySnapshotSource {
  if (
    value === "selected-graph-snapshot" ||
    value === "supplied-graph" ||
    value === "empty-preview" ||
    value === "unknown"
  ) {
    return value;
  }
  return "unknown";
}

export function buildRuntimeReplaySnapshot(input: RuntimeReplaySnapshotInput = {}): RuntimeReplaySnapshot {
  const graph = input.graph ? cloneRuntimeReplayGraph(input.graph) : cloneRuntimeReplayGraph(RUNTIME_EVENT_REPLAY_EMPTY_GRAPH);
  const source = input.graph ? normalizeSource(input.source ?? "supplied-graph") : "empty-preview";
  const integrityNotes = uniqueRuntimeEventReplayStrings([
    ...(input.integrityNotes ?? []),
    input.graph ? null : "No graph supplied; empty preview snapshot created with warning.",
    graph.version === CODEXFORGE_BRAIN_GRAPH_VERSION ? "Canonical graph schema version is visible." : "Graph schema version mismatch.",
    "Snapshot is cloned for replay preview and must not be mutated.",
    `Canonical graph schema path: ${RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH}.`,
  ]);

  return normalizeRuntimeReplaySnapshot({
    id: input.snapshotId?.trim() || buildRuntimeEventReplayStableKey("runtime-replay-snapshot", source, graph.nodes.length, graph.edges.length),
    graphVersion: graph.version,
    canonicalSchemaPath: RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH,
    updatedAtLabel: input.updatedAtLabel?.trim() || undefined,
    source,
    integrityNotes,
    graph,
    ...summarizeRuntimeReplayGraph(graph),
    summary: [],
  });
}

export function normalizeRuntimeReplaySnapshot(snapshot: RuntimeReplaySnapshot): RuntimeReplaySnapshot {
  const graph = cloneRuntimeReplayGraph(snapshot.graph);
  const graphSummary = summarizeRuntimeReplayGraph(graph);
  const integrityNotes = uniqueRuntimeEventReplayStrings([
    ...snapshot.integrityNotes,
    snapshot.graphVersion === CODEXFORGE_BRAIN_GRAPH_VERSION ? null : "Snapshot graph version differs from canonical schema version.",
  ]);

  const normalized: RuntimeReplaySnapshot = {
    id: snapshot.id.trim() || "snapshot:empty-preview",
    graphVersion: graph.version,
    canonicalSchemaPath: RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH,
    ...graphSummary,
    updatedAtLabel: snapshot.updatedAtLabel?.trim() || undefined,
    source: normalizeSource(snapshot.source),
    integrityNotes,
    graph,
    summary: [],
  };

  return { ...normalized, summary: summarizeRuntimeReplaySnapshot(normalized) };
}

export function summarizeRuntimeReplaySnapshot(snapshot: RuntimeReplaySnapshot): string[] {
  const topNodeKinds = Object.entries(snapshot.nodeKindCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([kind, count]) => `${kind}: ${count}`)
    .join(", ");
  const topEdgeKinds = Object.entries(snapshot.edgeKindCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([kind, count]) => `${kind}: ${count}`)
    .join(", ");

  return [
    `Snapshot ${snapshot.id} uses canonical graph schema ${snapshot.canonicalSchemaPath}.`,
    `${snapshot.nodeCount} node(s), ${snapshot.edgeCount} edge(s), version ${snapshot.graphVersion}.`,
    `Top node kinds: ${topNodeKinds || "none"}.`,
    `Top edge kinds: ${topEdgeKinds || "none"}.`,
    snapshot.updatedAtLabel ? `Updated label: ${snapshot.updatedAtLabel}.` : "No updated label supplied.",
    ...snapshot.integrityNotes,
  ];
}
