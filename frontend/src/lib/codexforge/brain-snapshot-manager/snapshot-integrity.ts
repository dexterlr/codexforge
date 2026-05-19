import {
  BRAIN_EDGE_KINDS,
  BRAIN_IMPORTANCE_VALUES,
  BRAIN_NODE_KINDS,
  BRAIN_STATUS_VALUES,
  type CodexForgeBrainGraph,
} from "@/lib/codexforge/brain/graph/types";
import { BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH, type BrainSnapshotIntegrityCheck, type BrainSnapshotIntegrityReport, type BrainSnapshotIntegrityStatus, type BrainSnapshotModel, type BrainSnapshotWarningThresholds } from "./brain-snapshot-types";

function statusRank(status: BrainSnapshotIntegrityStatus): number {
  return { pass: 1, warning: 2, unknown: 3, risk: 4, blocker: 5 }[status];
}

function aggregate(checks: readonly BrainSnapshotIntegrityCheck[]): BrainSnapshotIntegrityStatus {
  return checks.reduce<BrainSnapshotIntegrityStatus>((worst, check) => statusRank(check.status) > statusRank(worst) ? check.status : worst, "pass");
}

function hasDuplicates(values: readonly string[]): boolean {
  return new Set(values).size !== values.length;
}

function known(values: readonly string[], value: unknown): boolean {
  return typeof value === "string" && values.includes(value);
}

export function buildBrainSnapshotIntegrityCheck(input: BrainSnapshotIntegrityCheck): BrainSnapshotIntegrityCheck {
  return input;
}

export function buildBrainSnapshotIntegrityReport(args: {
  snapshot: BrainSnapshotModel;
  graph?: CodexForgeBrainGraph | null;
  updatedAtRequired?: boolean;
  warningThresholds?: BrainSnapshotWarningThresholds;
}): BrainSnapshotIntegrityReport {
  const graph = args.graph;
  const nodeIds = graph?.nodes.map((node) => node.id) ?? args.snapshot.nodeIds;
  const edgeIds = graph?.edges.map((edge) => edge.id) ?? args.snapshot.edgeIds;
  const nodeIdSet = new Set(nodeIds);
  const duplicateMemoryIds = graph?.nodes
    .filter((node) => node.kind === "memory")
    .map((node) => {
      const data = node.data as Record<string, unknown>;
      return typeof data.sourceId === "string" ? data.sourceId : node.id;
    }) ?? [];
  const missingEndpointCount = graph?.edges.filter((edge) => !nodeIdSet.has(edge.from) || !nodeIdSet.has(edge.to)).length ?? 0;
  const orphanedImportantEdges = graph?.edges.filter((edge) => (edge.meta.importance === "high" || edge.meta.importance === "critical") && (!nodeIdSet.has(edge.from) || !nodeIdSet.has(edge.to))).length ?? 0;
  const unknownNodeKinds = graph?.nodes.filter((node) => !known(BRAIN_NODE_KINDS, node.kind)).length ?? (args.snapshot.nodeKindCounts.unknown ?? 0);
  const unknownEdgeKinds = graph?.edges.filter((edge) => !known(BRAIN_EDGE_KINDS, edge.kind)).length ?? (args.snapshot.edgeKindCounts.unknown ?? 0);
  const unknownStatuses = graph?.nodes.filter((node) => node.meta.status && !known(BRAIN_STATUS_VALUES, node.meta.status)).length ?? (args.snapshot.statusCounts.unknown ?? 0);
  const unknownImportance = graph?.nodes.filter((node) => node.meta.importance && !known(BRAIN_IMPORTANCE_VALUES, node.meta.importance)).length ?? (args.snapshot.importanceCounts.unknown ?? 0);
  const updatedAtMissing = args.updatedAtRequired && graph ? graph.nodes.filter((node) => typeof node.meta.updatedAt !== "number").length : 0;
  const thresholds = args.warningThresholds ?? {};

  const checks: BrainSnapshotIntegrityCheck[] = [
    buildBrainSnapshotIntegrityCheck({ id: "canonical-schema-path-visible", label: "Canonical schema path visible", status: args.snapshot.canonicalSchemaPath === BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH ? "pass" : "blocker", detail: `canonical graph schema: ${args.snapshot.canonicalSchemaPath}` }),
    buildBrainSnapshotIntegrityCheck({ id: "graph-version-present", label: "Graph version present", status: args.snapshot.graphVersion ? "pass" : "blocker", detail: `Graph version: ${args.snapshot.graphVersion || "missing"}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "node-ids-unique", label: "Node ids unique", status: hasDuplicates(nodeIds) ? "blocker" : "pass", detail: "Integrity checks node ids unique." }),
    buildBrainSnapshotIntegrityCheck({ id: "edge-ids-unique", label: "Edge ids unique", status: hasDuplicates(edgeIds) ? "blocker" : "pass", detail: "Integrity checks edge ids unique." }),
    buildBrainSnapshotIntegrityCheck({ id: "edge-endpoints-exist", label: "Edge endpoints exist", status: missingEndpointCount > 0 ? "blocker" : "pass", detail: `Integrity checks edge endpoints exist; missing endpoints: ${missingEndpointCount}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "no-legacy-schema-marker", label: "No legacy schema marker", status: args.snapshot.graphVersion === "1" ? "risk" : "pass", detail: "No legacy schema marker should be present in Phase 50 snapshots." }),
    buildBrainSnapshotIntegrityCheck({ id: "no-duplicate-memory-ids", label: "No duplicate memory ids if detectable", status: hasDuplicates(duplicateMemoryIds) ? "risk" : "pass", detail: "Duplicate memory ids are checked when memory source ids are detectable." }),
    buildBrainSnapshotIntegrityCheck({ id: "no-orphaned-important-edges", label: "No orphaned important edges", status: orphanedImportantEdges > 0 ? "risk" : "pass", detail: `Orphaned important edges: ${orphanedImportantEdges}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "node-kind-known", label: "Node kind known", status: unknownNodeKinds > 0 ? "warning" : "pass", detail: `Unknown node kinds: ${unknownNodeKinds}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "edge-kind-known", label: "Edge kind known", status: unknownEdgeKinds > 0 ? "warning" : "pass", detail: `Unknown edge kinds: ${unknownEdgeKinds}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "status-value-known", label: "Status value known", status: unknownStatuses > 0 ? "warning" : "pass", detail: `Unknown status values: ${unknownStatuses}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "importance-value-known", label: "Importance value known", status: unknownImportance > 0 ? "warning" : "pass", detail: `Unknown importance values: ${unknownImportance}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "updatedAt-present-if-supplied", label: "updatedAt present if supplied", status: updatedAtMissing > 0 ? "warning" : "pass", detail: `updatedAt missing count when required: ${updatedAtMissing}.` }),
    buildBrainSnapshotIntegrityCheck({ id: "graph-warning-thresholds", label: "Graph does not exceed warning thresholds if supplied", status: (thresholds.maxNodes && args.snapshot.nodeCount > thresholds.maxNodes) || (thresholds.maxEdges && args.snapshot.edgeCount > thresholds.maxEdges) ? "warning" : "pass", detail: `Thresholds checked: maxNodes=${thresholds.maxNodes ?? "none"}, maxEdges=${thresholds.maxEdges ?? "none"}.` }),
  ];
  const report: BrainSnapshotIntegrityReport = {
    snapshotId: args.snapshot.id,
    status: aggregate(checks),
    checks,
    summary: [],
  };
  report.summary = summarizeBrainSnapshotIntegrityReport(report);
  return report;
}

export function summarizeBrainSnapshotIntegrityReport(report: BrainSnapshotIntegrityReport): string[] {
  const blockers = report.checks.filter((check) => check.status === "blocker").length;
  const risks = report.checks.filter((check) => check.status === "risk").length;
  return [
    `${report.checks.length} integrity checks completed with ${report.status} status.`,
    `${blockers} blockers and ${risks} risks require review.`,
    "Integrity review is local-first, deterministic, and read-only.",
  ];
}
