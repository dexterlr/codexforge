import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  ApprovedBrainGraphSummary,
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeResult,
} from "./approved-brain-merge-types";

export function summarizeApprovedBrainGraph(
  graph: CodexForgeBrainGraph
): ApprovedBrainGraphSummary {
  return {
    graphVersion: graph.version ?? null,
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    updatedAt: typeof graph.meta.updatedAt === "number" ? graph.meta.updatedAt : null,
    nodeIds: graph.nodes.map((node) => node.id).sort(),
    edgeIds: graph.edges.map((edge) => edge.id).sort(),
  };
}

export function summarizeExpectedApprovedBrainGraph(args: {
  before: ApprovedBrainGraphSummary;
  addedNodeIds: string[];
  addedEdgeIds: string[];
}): ApprovedBrainGraphSummary {
  return {
    ...args.before,
    nodeCount: args.before.nodeCount + args.addedNodeIds.length,
    edgeCount: args.before.edgeCount + args.addedEdgeIds.length,
    nodeIds: Array.from(new Set([...args.before.nodeIds, ...args.addedNodeIds])).sort(),
    edgeIds: Array.from(new Set([...args.before.edgeIds, ...args.addedEdgeIds])).sort(),
  };
}

export function summarizeApprovedBrainMergeRequest(
  request: ApprovedBrainMergeRequest
): string[] {
  return [
    `Approved merge request ${request.id}.`,
    `${request.eventIds.length} event id(s), ${request.nodeDiffs.length + request.nodeUpdateDiffs.length} node diff(s), ${request.edgeDiffs.length} edge diff(s).`,
    `Before/after summary: ${request.beforeSummary.nodeCount} -> ${request.expectedAfterSummary.nodeCount} nodes, ${request.beforeSummary.edgeCount} -> ${request.expectedAfterSummary.edgeCount} edges.`,
    request.approved
      ? "Explicit merge approval is present."
      : "Explicit merge approval required before applying.",
    request.rollbackNote,
  ];
}

export function summarizeApprovedBrainGraphMerge(
  result: ApprovedBrainMergeResult
): string[] {
  return [
    `Approved Brain graph merge ${result.state}.`,
    `Added ${result.addedNodeIds.length} node(s), updated ${result.updatedNodeIds.length} node(s), deduped ${result.dedupedNodeIds.length} node(s).`,
    `Added ${result.addedEdgeIds.length} edge(s), deduped ${result.dedupedEdgeIds.length} edge(s).`,
    `Before/after summary: ${result.beforeSummary.nodeCount} -> ${result.afterSummary.nodeCount} nodes, ${result.beforeSummary.edgeCount} -> ${result.afterSummary.edgeCount} edges.`,
  ];
}
