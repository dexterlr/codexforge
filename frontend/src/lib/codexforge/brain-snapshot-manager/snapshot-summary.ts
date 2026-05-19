import type { BrainSnapshotMetric, BrainSnapshotModel, BrainSnapshotRiskLevel, BrainSnapshotSummary } from "./brain-snapshot-types";
import { buildBrainSnapshotStableKey } from "./snapshot-model";

function percent(part: number, total: number): string {
  if (total <= 0) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function riskForCount(count: number, mediumAt: number, highAt: number): BrainSnapshotRiskLevel {
  if (count >= highAt) return "high";
  if (count >= mediumAt) return "medium";
  return "low";
}

export function buildBrainSnapshotMetric(input: BrainSnapshotMetric): BrainSnapshotMetric {
  return {
    id: input.id || buildBrainSnapshotStableKey("brain-snapshot-metric", input.label),
    label: input.label,
    value: input.value,
    detail: input.detail,
    riskLevel: input.riskLevel,
  };
}

export function buildBrainSnapshotSummary(snapshot: BrainSnapshotModel): BrainSnapshotSummary {
  const governanceRiskCount =
    snapshot.blockedOrErrorNodeIds.length + snapshot.integrityNotes.length + (snapshot.nodeKindCounts.unknown ?? 0);

  const metrics = [
    buildBrainSnapshotMetric({
      id: "graph-size",
      label: "Graph size",
      value: `${snapshot.nodeCount} nodes / ${snapshot.edgeCount} edges`,
      detail: "Total graph size visible from the supplied read-only snapshot.",
      riskLevel: snapshot.nodeCount === 0 ? "medium" : "low",
    }),
    buildBrainSnapshotMetric({
      id: "memory-density",
      label: "Memory density",
      value: percent(snapshot.memoryNodeCount, snapshot.nodeCount),
      detail: `${snapshot.memoryNodeCount} memory nodes in snapshot.`,
      riskLevel: snapshot.memoryNodeCount === 0 ? "medium" : "low",
    }),
    buildBrainSnapshotMetric({
      id: "task-activity",
      label: "Task activity",
      value: snapshot.taskNodeCount,
      detail: "Task, plan, and step nodes captured for review.",
      riskLevel: "low",
    }),
    buildBrainSnapshotMetric({
      id: "concept-coverage",
      label: "Concept coverage",
      value: snapshot.conceptNodeCount,
      detail: "Concept-like nodes detected by stable id, tags, or domain markers.",
      riskLevel: snapshot.conceptNodeCount === 0 ? "medium" : "low",
    }),
    buildBrainSnapshotMetric({
      id: "execution-lineage-coverage",
      label: "Execution lineage coverage",
      value: snapshot.executionNodeCount,
      detail: "Run, diff, generation, and tool nodes available for replay context.",
      riskLevel: "low",
    }),
    buildBrainSnapshotMetric({
      id: "isolated-node-count",
      label: "Isolated node count",
      value: snapshot.isolatedNodeIds.length,
      detail: "Nodes without any visible edge endpoint connection.",
      riskLevel: riskForCount(snapshot.isolatedNodeIds.length, 3, 10),
    }),
    buildBrainSnapshotMetric({
      id: "stale-node-count",
      label: "Stale node count",
      value: snapshot.staleNodeIds.length,
      detail: "Stale nodes if updatedAt supplied to the model.",
      riskLevel: riskForCount(snapshot.staleNodeIds.length, 3, 10),
    }),
    buildBrainSnapshotMetric({
      id: "high-importance-count",
      label: "High importance count",
      value: snapshot.highImportanceNodeIds.length,
      detail: "High and critical importance nodes that deserve rollback/replay review.",
      riskLevel: riskForCount(snapshot.highImportanceNodeIds.length, 10, 25),
    }),
    buildBrainSnapshotMetric({
      id: "blocked-error-count",
      label: "Blocked/error count",
      value: snapshot.blockedOrErrorNodeIds.length,
      detail: "Blocked or error status nodes present in the snapshot.",
      riskLevel: riskForCount(snapshot.blockedOrErrorNodeIds.length, 1, 3),
    }),
    buildBrainSnapshotMetric({
      id: "governance-risk-count",
      label: "Governance risk count",
      value: governanceRiskCount,
      detail: "Integrity notes, unknown kinds, and blocked/error nodes combined.",
      riskLevel: riskForCount(governanceRiskCount, 1, 4),
    }),
  ];

  return {
    snapshotId: snapshot.id,
    metrics,
    summary: summarizeBrainSnapshotSummary({ snapshotId: snapshot.id, metrics, summary: [] }),
  };
}

export function summarizeBrainSnapshotSummary(summary: BrainSnapshotSummary): string[] {
  const risky = summary.metrics.filter((metric) => metric.riskLevel === "high" || metric.riskLevel === "critical");
  return [
    `${summary.metrics.length} deterministic snapshot metrics built.`,
    risky.length > 0 ? `${risky.length} metrics require governance review.` : "No high-risk summary metrics detected.",
    "Summary is read-only and does not persist snapshots automatically from UI.",
  ];
}
