import {
  BRAIN_EDGE_KINDS,
  BRAIN_IMPORTANCE_VALUES,
  BRAIN_NODE_KINDS,
  BRAIN_STATUS_VALUES,
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import {
  BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH,
  type BrainSnapshotBuildInput,
  type BrainSnapshotCountMap,
  type BrainSnapshotModel,
} from "./brain-snapshot-types";

// Canonical graph schema path: src/lib/codexforge/brain/graph/types.ts

export function buildBrainSnapshotStableKey(
  ...parts: Array<string | number | readonly string[] | null | undefined>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._:-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}

function increment<T extends string>(map: BrainSnapshotCountMap<T>, key: T): void {
  map[key] = (map[key] ?? 0) + 1;
}

function isKnown<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function sortedUnique(values: readonly string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function compactNodeSignature(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  const label = typeof data.label === "string" ? data.label : "";
  const summary = typeof data.summary === "string" ? data.summary : "";
  return [
    node.id,
    node.kind,
    label,
    summary,
    node.meta.status ?? "",
    node.meta.importance ?? "",
    String(node.meta.updatedAt ?? ""),
  ].join("|");
}

function compactEdgeSignature(edge: CodexForgeBrainEdge): string {
  return [
    edge.id,
    edge.kind,
    edge.from,
    edge.to,
    edge.label ?? "",
    String(edge.weight ?? ""),
    edge.meta.status ?? "",
    edge.meta.importance ?? "",
    String(edge.meta.updatedAt ?? ""),
  ].join("|");
}

export function normalizeBrainSnapshot(input: BrainSnapshotBuildInput = {}): BrainSnapshotModel {
  return buildBrainSnapshot(input);
}

export function buildBrainSnapshot(input: BrainSnapshotBuildInput = {}): BrainSnapshotModel {
  const graph = input.graph;
  const integrityNotes: string[] = [];

  if (!graph) {
    integrityNotes.push("No graph supplied; empty snapshot warning emitted.");
  }

  const nodes = graph?.nodes ?? [];
  const edges = graph?.edges ?? [];
  const nodeIds = sortedUnique(nodes.map((node) => node.id));
  const edgeIds = sortedUnique(edges.map((edge) => edge.id));
  const connectedIds = new Set<string>();
  const nodeIdSet = new Set(nodeIds);

  const nodeKindCounts: BrainSnapshotModel["nodeKindCounts"] = {};
  const edgeKindCounts: BrainSnapshotModel["edgeKindCounts"] = {};
  const importanceCounts: BrainSnapshotModel["importanceCounts"] = {};
  const statusCounts: BrainSnapshotModel["statusCounts"] = {};

  for (const node of nodes) {
    increment(nodeKindCounts, isKnown(BRAIN_NODE_KINDS, node.kind) ? node.kind : "unknown");
    increment(
      importanceCounts,
      isKnown(BRAIN_IMPORTANCE_VALUES, node.meta.importance) ? node.meta.importance : "unknown"
    );
    increment(statusCounts, isKnown(BRAIN_STATUS_VALUES, node.meta.status) ? node.meta.status : "unknown");
  }

  for (const edge of edges) {
    increment(edgeKindCounts, isKnown(BRAIN_EDGE_KINDS, edge.kind) ? edge.kind : "unknown");
    if (nodeIdSet.has(edge.from)) connectedIds.add(edge.from);
    if (nodeIdSet.has(edge.to)) connectedIds.add(edge.to);
  }

  const staleBefore = input.staleBefore;
  const staleNodeIds =
    typeof staleBefore === "number"
      ? nodes
          .filter((node) => typeof node.meta.updatedAt === "number" && node.meta.updatedAt < staleBefore)
          .map((node) => node.id)
      : [];

  const conceptNodeIds = nodes
    .filter((node) => {
      const data = node.data as Record<string, unknown>;
      return (
        node.id.startsWith("concept:") ||
        (Array.isArray(data.tags) && data.tags.includes("concept")) ||
        data.domain === "concept"
      );
    })
    .map((node) => node.id);

  const executionNodeKinds = new Set(["run", "diff", "generation", "tool"]);
  const snapshotId =
    input.id ??
    buildBrainSnapshotStableKey(
      "brain-snapshot",
      input.source ?? "empty",
      graph?.version ?? CODEXFORGE_BRAIN_GRAPH_VERSION,
      nodeIds,
      edgeIds
    );

  return {
    id: snapshotId,
    label: input.label?.trim() || "Brain snapshot",
    source: input.source ?? (graph ? "live-readonly" : "empty"),
    graphVersion: String(graph?.version ?? CODEXFORGE_BRAIN_GRAPH_VERSION),
    canonicalSchemaPath: BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodeKindCounts,
    edgeKindCounts,
    importanceCounts,
    statusCounts,
    focusNodeIds: sortedUnique(input.focusNodeIds ?? []),
    memoryNodeCount: nodes.filter((node) => node.kind === "memory").length,
    taskNodeCount: nodes.filter((node) => node.kind === "task" || node.kind === "plan" || node.kind === "step").length,
    conceptNodeCount: conceptNodeIds.length,
    executionNodeCount: nodes.filter((node) => executionNodeKinds.has(node.kind)).length,
    createdAtLabel: input.createdAtLabel,
    updatedAtLabel: input.updatedAtLabel,
    integrityNotes,
    noMutationGuarantee:
      "Brain Snapshot Manager is read-only: no graph mutation, no snapshot restore in Phase 50, no appendEvent, no saveBrainGraph from UI, preserve latest-message authority.",
    nodeIds,
    edgeIds,
    isolatedNodeIds: nodeIds.filter((id) => !connectedIds.has(id)),
    staleNodeIds: sortedUnique(staleNodeIds),
    highImportanceNodeIds: sortedUnique(
      nodes
        .filter((node) => node.meta.importance === "high" || node.meta.importance === "critical")
        .map((node) => node.id)
    ),
    blockedOrErrorNodeIds: sortedUnique(
      nodes
        .filter((node) => node.meta.status === "blocked" || node.meta.status === "error")
        .map((node) => node.id)
    ),
  };
}

export function summarizeBrainSnapshot(snapshot: BrainSnapshotModel): string[] {
  return [
    `${snapshot.label} has ${snapshot.nodeCount} nodes and ${snapshot.edgeCount} edges.`,
    `Canonical graph schema: ${snapshot.canonicalSchemaPath}.`,
    `${snapshot.memoryNodeCount} memory nodes, ${snapshot.taskNodeCount} task nodes, ${snapshot.conceptNodeCount} concept nodes, ${snapshot.executionNodeCount} execution nodes.`,
    snapshot.noMutationGuarantee,
  ];
}

export function buildBrainSnapshotEntitySignature(entity: CodexForgeBrainNode | CodexForgeBrainEdge): string {
  return "from" in entity ? compactEdgeSignature(entity) : compactNodeSignature(entity);
}
