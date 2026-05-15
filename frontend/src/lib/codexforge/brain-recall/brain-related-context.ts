import type { CodexForgeBrainGraph, CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type { BrainMemoryIndexItem, BrainRelatedArtifactContext, BrainRelatedContext, BrainRelatedFileContext, BrainRelatedRunContext } from "./brain-recall-types";

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function getNode(graph: CodexForgeBrainGraph, nodeId: string): CodexForgeBrainNode | null {
  return graph.nodes.find((node) => node.id === nodeId) ?? null;
}

export function buildRelatedFileContext(item: BrainMemoryIndexItem): BrainRelatedFileContext[] {
  return item.relatedFilePaths.map((path) => ({
    path,
    reason: "Path was referenced by the recalled node or its graph neighbors.",
  }));
}

export function buildRelatedArtifactContext(graph: CodexForgeBrainGraph, item: BrainMemoryIndexItem): BrainRelatedArtifactContext[] {
  return item.relatedArtifactIds.map((artifactId) => {
    const node = getNode(graph, artifactId);
    return {
      artifactId,
      label: node?.data.label ?? artifactId,
      reason: "Artifact-like neighbor was connected in the approved Brain graph.",
    };
  });
}

export function buildRelatedRunContext(graph: CodexForgeBrainGraph, item: BrainMemoryIndexItem): BrainRelatedRunContext[] {
  return item.relatedRunIds.map((runId) => {
    const node = getNode(graph, runId);
    return {
      runId,
      label: node?.data.label ?? runId,
      reason: "Run neighbor was connected in the approved Brain graph.",
    };
  });
}

export function buildBrainRelatedContext(
  graph: CodexForgeBrainGraph,
  item: BrainMemoryIndexItem
): BrainRelatedContext {
  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
  const neighbors = graph.edges
    .filter((edge) => edge.from === item.nodeId || edge.to === item.nodeId)
    .map((edge) => {
      const nodeId = edge.from === item.nodeId ? edge.to : edge.from;
      const node = nodeById.get(nodeId);
      if (!node) return null;
      return {
        nodeId,
        kind: node.kind,
        label: node.data.label,
        relation: edge.label ? `${edge.kind}: ${edge.label}` : edge.kind,
      };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((a, b) => a.nodeId.localeCompare(b.nodeId));

  const productionPackReferences = unique(
    [...item.sourceRefs.map((ref) => `${ref.type}:${ref.id}`), ...item.relatedFilePaths].filter((value) =>
      /production|pack|export/i.test(value)
    )
  );
  const memoryReviewReferences = unique(
    item.sourceRefs
      .filter((ref) => ref.type === "memory-item" || /memory-review|review/i.test(ref.id))
      .map((ref) => `${ref.type}:${ref.id}`)
  );

  const context: BrainRelatedContext = {
    nodeId: item.nodeId,
    neighbors,
    sourceRefs: [...item.sourceRefs],
    files: buildRelatedFileContext(item),
    artifacts: buildRelatedArtifactContext(graph, item),
    runs: buildRelatedRunContext(graph, item),
    productionPackReferences,
    memoryReviewReferences,
    summary: [],
  };

  return { ...context, summary: summarizeBrainRelatedContext(context) };
}

export function summarizeBrainRelatedContext(context: BrainRelatedContext): string[] {
  return [
    `${context.neighbors.length} neighboring graph nodes found.`,
    `${context.files.length} files, ${context.artifacts.length} artifacts, and ${context.runs.length} runs linked.`,
    `${context.sourceRefs.length} source refs available for inspection before editing.`,
  ];
}
