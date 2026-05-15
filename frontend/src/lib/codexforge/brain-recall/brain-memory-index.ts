import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type { BrainMemoryIndex, BrainMemoryIndexItem } from "./brain-recall-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function stringifyValue(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (typeof value === "number" || typeof value === "boolean") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(stringifyValue);
  return [];
}

function readStringFields(node: CodexForgeBrainNode): string[] {
  if (!isRecord(node.data)) return [];
  return Object.values(node.data).flatMap(stringifyValue);
}

function collectPaths(node: CodexForgeBrainNode, neighbors: CodexForgeBrainNode[]): string[] {
  const candidates = [node, ...neighbors].flatMap((candidate) => {
    if (!isRecord(candidate.data)) return [];
    const data = candidate.data as Record<string, unknown>;
    return [
      data.filePath,
      data.path,
      data.repoPath,
      data.outputPath,
      ...(Array.isArray(data.files) ? data.files : []),
      ...(Array.isArray(data.sampledPaths) ? data.sampledPaths : []),
    ].flatMap(stringifyValue);
  });

  return unique(candidates.filter((value) => value.includes("/") || value.includes("\\")));
}

function getNeighborNodes(
  node: CodexForgeBrainNode,
  nodesById: Map<string, CodexForgeBrainNode>,
  edges: CodexForgeBrainEdge[]
): CodexForgeBrainNode[] {
  return edges
    .filter((edge) => edge.from === node.id || edge.to === node.id)
    .map((edge) => nodesById.get(edge.from === node.id ? edge.to : edge.from))
    .filter((candidate): candidate is CodexForgeBrainNode => Boolean(candidate));
}

export function buildBrainMemoryIndexItem(
  graph: CodexForgeBrainGraph,
  node: CodexForgeBrainNode
): BrainMemoryIndexItem {
  const nodesById = new Map(graph.nodes.map((candidate) => [candidate.id, candidate]));
  const relatedEdges = graph.edges.filter((edge) => edge.from === node.id || edge.to === node.id);
  const neighbors = getNeighborNodes(node, nodesById, relatedEdges);
  const tags = unique([
    ...(isRecord(node.data) && Array.isArray(node.data.tags) ? node.data.tags.flatMap(stringifyValue) : []),
    ...neighbors.filter((neighbor) => neighbor.kind === "tag").flatMap(readStringFields),
  ]);
  const relatedArtifactIds = unique(
    neighbors
      .filter((neighbor) => neighbor.kind === "artifact" || neighbor.kind === "generation")
      .map((neighbor) => neighbor.id)
  );
  const relatedRunIds = unique(neighbors.filter((neighbor) => neighbor.kind === "run").map((neighbor) => neighbor.id));
  const textParts = unique([
    node.id,
    node.kind,
    node.data.label,
    node.meta.status ?? "",
    node.meta.importance ?? "",
    ...readStringFields(node),
    ...tags,
    ...neighbors.flatMap((neighbor) => [neighbor.id, neighbor.kind, neighbor.data.label, ...readStringFields(neighbor)]),
    ...relatedEdges.flatMap((edge) => [edge.kind, edge.label ?? ""]),
  ]);

  const criticalHints = unique(
    textParts.filter((part) => /critical|risk|blocked|contradiction|safety|approval/i.test(part))
  );

  return {
    id: `brain-recall:index:${node.id}`,
    nodeId: node.id,
    kind: node.kind,
    label: node.data.label,
    searchableText: textParts.join(" ").toLowerCase(),
    tags,
    status: node.meta.status ?? "unknown",
    importance: node.meta.importance ?? "unknown",
    updatedAt: node.meta.updatedAt,
    sourceRefs: node.meta.sourceRefs ? [...node.meta.sourceRefs] : [],
    relatedNodeIds: unique(neighbors.map((neighbor) => neighbor.id)),
    relatedFilePaths: collectPaths(node, neighbors),
    relatedArtifactIds,
    relatedRunIds,
    pinned: node.meta.pinned === true,
    criticalHints,
  };
}

export function buildBrainMemoryIndex(graph: CodexForgeBrainGraph): BrainMemoryIndex {
  const items = graph.nodes
    .filter((node) => !node.meta.archived)
    .map((node) => buildBrainMemoryIndexItem(graph, node))
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    id: "brain-memory-index",
    itemCount: items.length,
    graphUpdatedAt: graph.meta.updatedAt,
    items,
    summary: summarizeBrainMemoryIndex({ id: "brain-memory-index", itemCount: items.length, graphUpdatedAt: graph.meta.updatedAt, items, summary: [] }),
  };
}

export function summarizeBrainMemoryIndex(index: BrainMemoryIndex): string[] {
  const memoryCount = index.items.filter((item) => item.kind === "memory").length;
  const fileLinkedCount = index.items.filter((item) => item.relatedFilePaths.length > 0).length;

  return [
    `${index.itemCount} approved Brain graph nodes indexed for deterministic local recall.`,
    `${memoryCount} memory nodes and ${fileLinkedCount} file-linked nodes are searchable.`,
    "Indexing is pure data: no persistence writes and no graph mutation.",
  ];
}
