import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainBaseMeta,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import {
  CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS,
} from "./brain-memory-ids";
import { dedupeBrainMemoryGraph } from "./brain-memory-dedupe";
import {
  buildBrainMemorySourceGraph,
  buildBrainMemorySourceNodes,
  buildBrainMemorySourceEdges,
} from "./brain-memory-sources";
import type {
  CodexForgeBrainMemoryGraphEntity,
  CodexForgeBrainMemoryIngestionInput,
  CodexForgeBrainMemoryIngestionPlan,
  CodexForgeBrainMemoryIngestionResult,
  CodexForgeBrainMemoryIngestionSummary,
} from "./brain-memory-ingestion-types";

function resolveTimestamp(input?: CodexForgeBrainMemoryIngestionInput): number {
  return typeof input?.now === "number" && Number.isFinite(input.now)
    ? input.now
    : CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS;
}

function createEmptySeedBase(now: number): CodexForgeBrainGraph {
  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [],
    edges: [],
    meta: {
      createdAt: now,
      updatedAt: now,
      workspaceId: "codexforge",
      projectId: "codexforge-foundation",
      repoPath: "repos/health-tracker/frontend",
    },
  };
}

function cloneNode(node: CodexForgeBrainNode): CodexForgeBrainNode {
  return {
    ...node,
    data: { ...(node.data as Record<string, unknown>) } as CodexForgeBrainNode["data"],
    meta: {
      ...node.meta,
      ...(node.meta.sourceRefs ? { sourceRefs: [...node.meta.sourceRefs] } : {}),
    },
    ...(node.graph
      ? {
          graph: {
            ...node.graph,
            ...(node.graph.coordinates
              ? { coordinates: { ...node.graph.coordinates } }
              : {}),
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

function cloneGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    ...graph,
    meta: { ...graph.meta },
    nodes: graph.nodes.map(cloneNode),
    edges: graph.edges.map(cloneEdge),
  };
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .filter((key) => record[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(",")}}`;
}

function nodeFingerprint(node: CodexForgeBrainNode): string {
  return stableStringify({
    kind: node.kind,
    data: node.data,
    status: node.meta.status,
    importance: node.meta.importance,
    pinned: node.meta.pinned,
    archived: node.meta.archived,
  });
}

function edgeFingerprint(edge: CodexForgeBrainEdge): string {
  return stableStringify({
    kind: edge.kind,
    from: edge.from,
    to: edge.to,
    label: edge.label,
    weight: edge.weight,
  });
}

function edgeRelationKey(edge: Pick<CodexForgeBrainEdge, "from" | "to" | "kind" | "label">): string {
  return `${edge.from}::${edge.to}::${edge.kind}::${edge.label ?? ""}`;
}

function hasIngestionSourceRef(entity: CodexForgeBrainMemoryGraphEntity): boolean {
  const refs = entity.meta.sourceRefs ?? [];
  if (
    refs.some(
      (ref) =>
        ref.id.startsWith("brain-memory-ingestion:") ||
        ref.type === "history-entry"
    )
  ) {
    return true;
  }

  if ("data" in entity) {
    const data = entity.data as Record<string, unknown>;
    return (
      data.source === "brain-memory-ingestion" ||
      data.source === "local-activity-history" ||
      data.sourceLabel === "Brain memory ingestion phase 1" ||
      data.sourceLabel === "Local activity history"
    );
  }

  return false;
}

function mergeSourceRefs(
  existing?: CodexForgeBrainBaseMeta["sourceRefs"],
  next?: CodexForgeBrainBaseMeta["sourceRefs"]
): CodexForgeBrainBaseMeta["sourceRefs"] {
  const refs = [...(existing ?? []), ...(next ?? [])];
  const map = new Map(refs.map((ref) => [`${ref.type}:${ref.id}`, ref]));
  return map.size > 0 ? [...map.values()] : undefined;
}

function mergeMeta(
  existing: CodexForgeBrainBaseMeta,
  incoming: CodexForgeBrainBaseMeta
): CodexForgeBrainBaseMeta {
  return {
    ...existing,
    status: incoming.status ?? existing.status,
    importance: incoming.importance ?? existing.importance,
    pinned: existing.pinned ?? incoming.pinned,
    archived: existing.archived,
    sourceRefs: mergeSourceRefs(existing.sourceRefs, incoming.sourceRefs),
    version: Math.max(existing.version ?? 1, incoming.version ?? 1),
  };
}

function summarizeAgainstExisting(
  seedGraph: CodexForgeBrainGraph,
  existingGraph: CodexForgeBrainGraph | null | undefined,
  duplicateNodesRemoved: number,
  duplicateEdgesRemoved: number
): CodexForgeBrainMemoryIngestionSummary {
  const existingNodes = existingGraph?.nodes ?? [];
  const existingEdges = existingGraph?.edges ?? [];
  const nodeIds = new Set(existingNodes.map((node) => node.id));
  const edgeIds = new Set(existingEdges.map((edge) => edge.id));
  const edgeRelations = new Set(existingEdges.map(edgeRelationKey));
  const projectedNodeAdditions = seedGraph.nodes.filter(
    (node) => !nodeIds.has(node.id)
  ).length;
  const projectedEdgeAdditions = seedGraph.edges.filter(
    (edge) => !edgeIds.has(edge.id) && !edgeRelations.has(edgeRelationKey(edge))
  ).length;

  return {
    sourceCount: seedGraph.nodes.length + seedGraph.edges.length,
    sourceNodeCount: seedGraph.nodes.length,
    sourceEdgeCount: seedGraph.edges.length,
    existingNodeCount: existingNodes.length,
    existingEdgeCount: existingEdges.length,
    projectedNodeAdditions,
    projectedEdgeAdditions,
    addedNodes: 0,
    addedEdges: 0,
    skippedNodes: seedGraph.nodes.length - projectedNodeAdditions,
    skippedEdges: seedGraph.edges.length - projectedEdgeAdditions,
    updatedNodes: 0,
    updatedEdges: 0,
    duplicateNodesRemoved,
    duplicateEdgesRemoved,
    idempotent: true,
    readOnly: true,
    sourceSafe: true,
  };
}

export function buildBrainMemorySeedGraph(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainGraph {
  const deduped = dedupeBrainMemoryGraph(buildBrainMemorySourceGraph(input));
  return deduped.graph;
}

export function buildBrainMemoryIngestionPlan(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainMemoryIngestionPlan {
  const sourceGraph = buildBrainMemorySourceGraph(input);
  const deduped = dedupeBrainMemoryGraph(sourceGraph);
  const graph = deduped.graph;

  return {
    id: "codexforge-brain-memory-ingestion-phase-1",
    graph,
    sourceNodes: graph.nodes,
    sourceEdges: graph.edges,
    summary: summarizeAgainstExisting(
      graph,
      input.existingGraph,
      deduped.duplicateNodesRemoved,
      deduped.duplicateEdgesRemoved
    ),
    readOnly: true,
    deterministic: true,
    repeatSafe: true,
  };
}

export function mergeBrainMemoryIngestion(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainMemoryIngestionResult {
  const now = resolveTimestamp(input);
  const existing = input.existingGraph
    ? cloneGraph(input.existingGraph)
    : createEmptySeedBase(now);
  const plan = buildBrainMemoryIngestionPlan(input);
  const next = cloneGraph(existing);
  const nodeIndex = new Map(next.nodes.map((node, index) => [node.id, index]));
  const edgeIndexById = new Map(next.edges.map((edge, index) => [edge.id, index]));
  const edgeIndexByRelation = new Map(
    next.edges.map((edge, index) => [edgeRelationKey(edge), index])
  );

  let addedNodes = 0;
  let addedEdges = 0;
  let skippedNodes = 0;
  let skippedEdges = 0;
  let updatedNodes = 0;
  let updatedEdges = 0;

  for (const sourceNode of plan.graph.nodes) {
    const index = nodeIndex.get(sourceNode.id);

    if (index === undefined) {
      nodeIndex.set(sourceNode.id, next.nodes.length);
      next.nodes.push(cloneNode(sourceNode));
      addedNodes += 1;
      continue;
    }

    const existingNode = next.nodes[index];
    if (
      hasIngestionSourceRef(existingNode) &&
      nodeFingerprint(existingNode) !== nodeFingerprint(sourceNode)
    ) {
      next.nodes[index] = {
        ...existingNode,
        kind: sourceNode.kind,
        data: { ...(sourceNode.data as Record<string, unknown>) } as CodexForgeBrainNode["data"],
        meta: mergeMeta(existingNode.meta, sourceNode.meta),
        ...(sourceNode.graph ? { graph: sourceNode.graph } : {}),
      } as CodexForgeBrainNode;
      updatedNodes += 1;
    } else {
      skippedNodes += 1;
    }
  }

  for (const sourceEdge of plan.graph.edges) {
    if (!nodeIndex.has(sourceEdge.from) || !nodeIndex.has(sourceEdge.to)) {
      skippedEdges += 1;
      continue;
    }

    const relation = edgeRelationKey(sourceEdge);
    const existingIndex =
      edgeIndexById.get(sourceEdge.id) ?? edgeIndexByRelation.get(relation);

    if (existingIndex === undefined) {
      edgeIndexById.set(sourceEdge.id, next.edges.length);
      edgeIndexByRelation.set(relation, next.edges.length);
      next.edges.push(cloneEdge(sourceEdge));
      addedEdges += 1;
      continue;
    }

    const existingEdge = next.edges[existingIndex];
    if (
      hasIngestionSourceRef(existingEdge) &&
      edgeFingerprint(existingEdge) !== edgeFingerprint(sourceEdge)
    ) {
      next.edges[existingIndex] = {
        ...existingEdge,
        kind: sourceEdge.kind,
        from: sourceEdge.from,
        to: sourceEdge.to,
        label: sourceEdge.label,
        weight: sourceEdge.weight,
        meta: mergeMeta(existingEdge.meta, sourceEdge.meta),
      };
      updatedEdges += 1;
    } else {
      skippedEdges += 1;
    }
  }

  const changed =
    addedNodes + addedEdges + updatedNodes + updatedEdges > 0;

  next.meta = {
    ...next.meta,
    workspaceId: next.meta.workspaceId ?? "codexforge",
    projectId: next.meta.projectId ?? "codexforge-foundation",
    repoPath: next.meta.repoPath ?? "repos/health-tracker/frontend",
    updatedAt: changed
      ? Math.max(next.meta.updatedAt, plan.graph.meta.updatedAt)
      : next.meta.updatedAt,
  };

  const summary: CodexForgeBrainMemoryIngestionSummary = {
    ...plan.summary,
    existingNodeCount: existing.nodes.length,
    existingEdgeCount: existing.edges.length,
    projectedNodeAdditions: addedNodes,
    projectedEdgeAdditions: addedEdges,
    addedNodes,
    addedEdges,
    skippedNodes,
    skippedEdges,
    updatedNodes,
    updatedEdges,
    idempotent: true,
  };

  return {
    graph: next,
    plan: {
      ...plan,
      summary,
    },
    summary,
  };
}

export function summarizeBrainMemoryIngestion(
  input:
    | CodexForgeBrainMemoryIngestionSummary
    | CodexForgeBrainMemoryIngestionPlan
    | CodexForgeBrainMemoryIngestionResult
): string {
  const summary = (
    "summary" in input ? input.summary : input
  ) as CodexForgeBrainMemoryIngestionSummary;

  return [
    `${summary.sourceNodeCount} source nodes`,
    `${summary.sourceEdgeCount} source links`,
    `${summary.addedNodes} added nodes`,
    `${summary.addedEdges} added links`,
    `${summary.skippedNodes + summary.skippedEdges} skipped existing memories`,
    `${summary.updatedNodes + summary.updatedEdges} updated records`,
  ].join(" / ");
}

export {
  buildBrainMemorySourceNodes,
  buildBrainMemorySourceEdges,
};
