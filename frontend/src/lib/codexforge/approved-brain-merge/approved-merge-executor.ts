import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  ApprovedBrainGraphMergeApplyArgs,
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeResult,
} from "./approved-brain-merge-types";
import { buildApprovedBrainMergeStableKey } from "./approved-brain-merge-types";
import {
  summarizeApprovedBrainGraph,
  summarizeApprovedBrainGraphMerge,
} from "./approved-merge-summary";
import { validateApprovedBrainMerge } from "./approved-merge-validation";

const MERGE_META_TS = 1;

// Executor does not persist directly; preserve existing graph nodes and dedupes nodes/edges.
function cloneNode(node: CodexForgeBrainNode): CodexForgeBrainNode {
  return {
    ...node,
    data: { ...node.data },
    meta: {
      ...node.meta,
      sourceRefs: node.meta.sourceRefs ? [...node.meta.sourceRefs] : undefined,
    },
    graph: node.graph
      ? {
          ...node.graph,
          coordinates: node.graph.coordinates
            ? { ...node.graph.coordinates }
            : undefined,
        }
      : undefined,
  };
}

function cloneEdge(edge: CodexForgeBrainEdge): CodexForgeBrainEdge {
  return {
    ...edge,
    meta: {
      ...edge.meta,
      sourceRefs: edge.meta.sourceRefs ? [...edge.meta.sourceRefs] : undefined,
    },
  };
}

function cloneGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    ...graph,
    nodes: graph.nodes.map(cloneNode),
    edges: graph.edges.map(cloneEdge),
    meta: { ...graph.meta },
  };
}

export function mergeBrainGraphNodes(
  graph: CodexForgeBrainGraph,
  request: ApprovedBrainMergeRequest
): {
  nodes: CodexForgeBrainNode[];
  addedNodeIds: string[];
  updatedNodeIds: string[];
  dedupedNodeIds: string[];
} {
  const nodeMap = new Map(graph.nodes.map((node) => [node.id, cloneNode(node)]));
  const addedNodeIds: string[] = [];
  const updatedNodeIds: string[] = [];
  const dedupedNodeIds: string[] = [];

  for (const diff of request.nodeDiffs) {
    if (nodeMap.has(diff.node.id)) {
      dedupedNodeIds.push(diff.node.id);
      continue;
    }
    nodeMap.set(diff.node.id, cloneNode(diff.node));
    addedNodeIds.push(diff.node.id);
  }

  for (const diff of request.nodeUpdateDiffs) {
    if (!nodeMap.has(diff.node.id)) {
      nodeMap.set(diff.node.id, cloneNode(diff.node));
      addedNodeIds.push(diff.node.id);
      continue;
    }
    nodeMap.set(diff.node.id, cloneNode(diff.node));
    updatedNodeIds.push(diff.node.id);
  }

  return {
    nodes: [...nodeMap.values()],
    addedNodeIds,
    updatedNodeIds,
    dedupedNodeIds,
  };
}

export function mergeBrainGraphEdges(
  graph: CodexForgeBrainGraph,
  nodes: CodexForgeBrainNode[],
  request: ApprovedBrainMergeRequest
): {
  edges: CodexForgeBrainEdge[];
  addedEdgeIds: string[];
  dedupedEdgeIds: string[];
} {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const edgeMap = new Map(graph.edges.map((edge) => [edge.id, cloneEdge(edge)]));
  const addedEdgeIds: string[] = [];
  const dedupedEdgeIds: string[] = [];

  for (const diff of request.edgeDiffs) {
    if (!nodeIds.has(diff.edge.from) || !nodeIds.has(diff.edge.to)) {
      dedupedEdgeIds.push(diff.edge.id);
      continue;
    }
    if (edgeMap.has(diff.edge.id)) {
      dedupedEdgeIds.push(diff.edge.id);
      continue;
    }
    edgeMap.set(diff.edge.id, cloneEdge(diff.edge));
    addedEdgeIds.push(diff.edge.id);
  }

  return {
    edges: [...edgeMap.values()],
    addedEdgeIds,
    dedupedEdgeIds,
  };
}

export function applyApprovedBrainGraphMerge(
  args: ApprovedBrainGraphMergeApplyArgs
): {
  graph: CodexForgeBrainGraph;
  result: ApprovedBrainMergeResult;
} {
  const before = cloneGraph(args.graph);
  const beforeSummary = summarizeApprovedBrainGraph(before);
  const validation = validateApprovedBrainMerge(args.request);

  if (validation.state === "blocked") {
    const result: ApprovedBrainMergeResult = {
      id: buildApprovedBrainMergeStableKey("approved-brain-merge-result", args.request.id, "blocked"),
      state: "blocked",
      addedNodeIds: [],
      updatedNodeIds: [],
      dedupedNodeIds: [],
      addedEdgeIds: [],
      dedupedEdgeIds: [],
      beforeSummary,
      afterSummary: beforeSummary,
      summary: ["Approved Brain graph merge blocked by validation; executor does not persist directly."],
    };

    return { graph: before, result };
  }

  const nodeMerge = mergeBrainGraphNodes(before, args.request);
  const edgeMerge = mergeBrainGraphEdges(before, nodeMerge.nodes, args.request);
  const nextGraph: CodexForgeBrainGraph = {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: nodeMerge.nodes,
    edges: edgeMerge.edges,
    meta: {
      ...before.meta,
      updatedAt: Math.max(before.meta.updatedAt ?? MERGE_META_TS, MERGE_META_TS),
    },
  };
  const afterSummary = summarizeApprovedBrainGraph(nextGraph);
  const result: ApprovedBrainMergeResult = {
    id: buildApprovedBrainMergeStableKey("approved-brain-merge-result", args.request.id, "applied"),
    state: "applied",
    addedNodeIds: nodeMerge.addedNodeIds,
    updatedNodeIds: nodeMerge.updatedNodeIds,
    dedupedNodeIds: nodeMerge.dedupedNodeIds,
    addedEdgeIds: edgeMerge.addedEdgeIds,
    dedupedEdgeIds: edgeMerge.dedupedEdgeIds,
    beforeSummary,
    afterSummary,
    summary: [],
  };

  return {
    graph: nextGraph,
    result: { ...result, summary: summarizeApprovedBrainGraphMerge(result) },
  };
}

export { summarizeApprovedBrainGraphMerge };
