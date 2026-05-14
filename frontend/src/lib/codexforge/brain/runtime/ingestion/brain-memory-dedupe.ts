import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainMemoryDedupeResult } from "./brain-memory-ingestion-types";

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

function edgeIdentity(edge: CodexForgeBrainEdge): string {
  return `${edge.id}::${edge.from}::${edge.to}::${edge.kind}::${edge.label ?? ""}`;
}

export function dedupeBrainMemoryGraph(
  graph: CodexForgeBrainGraph
): CodexForgeBrainMemoryDedupeResult {
  const nodeIds = new Set<string>();
  const edgeKeys = new Set<string>();
  const nodes: CodexForgeBrainNode[] = [];
  const edges: CodexForgeBrainEdge[] = [];
  let duplicateNodesRemoved = 0;
  let duplicateEdgesRemoved = 0;

  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) {
      duplicateNodesRemoved += 1;
      continue;
    }

    nodeIds.add(node.id);
    nodes.push(cloneNode(node));
  }

  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      duplicateEdgesRemoved += 1;
      continue;
    }

    const key = edgeIdentity(edge);
    if (edgeKeys.has(key)) {
      duplicateEdgesRemoved += 1;
      continue;
    }

    edgeKeys.add(key);
    edges.push(cloneEdge(edge));
  }

  return {
    graph: {
      ...graph,
      meta: { ...graph.meta },
      nodes,
      edges,
    },
    duplicateNodesRemoved,
    duplicateEdgesRemoved,
  };
}
