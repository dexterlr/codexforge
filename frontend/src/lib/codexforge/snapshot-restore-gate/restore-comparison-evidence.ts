import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestoreCandidate,
  type SnapshotRestoreComparisonCategory,
  type SnapshotRestoreComparisonEvidence,
  type SnapshotRestoreComparisonItem,
  type SnapshotRestoreSeverity,
} from "./snapshot-restore-gate-types";

function severityForDelta(delta: number): SnapshotRestoreSeverity {
  const absolute = Math.abs(delta);
  if (absolute >= 20) return "critical";
  if (absolute >= 10) return "high";
  if (absolute > 0) return "medium";
  return "low";
}

function topSeverity(items: readonly SnapshotRestoreComparisonItem[]): SnapshotRestoreSeverity {
  const rank: Record<SnapshotRestoreSeverity, number> = { info: 0, low: 1, medium: 2, high: 3, critical: 4 };
  return items.reduce<SnapshotRestoreSeverity>((top, item) => (rank[item.severity] > rank[top] ? item.severity : top), "info");
}

export function buildSnapshotRestoreComparisonItem(input: {
  candidateId: string;
  category: SnapshotRestoreComparisonCategory;
  title: string;
  beforeValue: string | number;
  afterValue: string | number;
  detail?: string;
  severity?: SnapshotRestoreSeverity;
  reviewRequired?: boolean;
  restoreConcern?: string;
}): SnapshotRestoreComparisonItem {
  const beforeNumber = typeof input.beforeValue === "number" ? input.beforeValue : Number.NaN;
  const afterNumber = typeof input.afterValue === "number" ? input.afterValue : Number.NaN;
  const delta = Number.isFinite(beforeNumber) && Number.isFinite(afterNumber) ? afterNumber - beforeNumber : 0;
  const severity = input.severity ?? severityForDelta(delta);

  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-comparison", input.candidateId, input.category, input.title),
    category: input.category,
    title: input.title,
    detail: input.detail ?? `${input.title} changes from ${input.beforeValue} to ${input.afterValue}.`,
    severity,
    beforeSummary: String(input.beforeValue),
    afterSummary: String(input.afterValue),
    reviewRequired: input.reviewRequired ?? severity !== "low",
    restoreConcern: input.restoreConcern ?? "Review whether this delta could overwrite newer live Brain context.",
  };
}

export function buildSnapshotRestoreComparisonEvidence(candidate: SnapshotRestoreCandidate): SnapshotRestoreComparisonEvidence {
  const before = candidate.targetSnapshotSummary;
  const after = candidate.sourceSnapshotSummary;
  const items = [
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "node-count-delta", title: "Node count delta", beforeValue: before.nodeCount, afterValue: after.nodeCount }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "edge-count-delta", title: "Edge count delta", beforeValue: before.edgeCount, afterValue: after.edgeCount }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "memory-delta", title: "Memory delta", beforeValue: before.memoryNodeCount, afterValue: after.memoryNodeCount, restoreConcern: "Memory deltas require contradiction and duplicate-memory review." }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "task-delta", title: "Task delta", beforeValue: before.taskNodeCount, afterValue: after.taskNodeCount }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "concept-delta", title: "Concept delta", beforeValue: before.conceptNodeCount, afterValue: after.conceptNodeCount }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "execution-delta", title: "Execution delta", beforeValue: before.executionNodeCount, afterValue: after.executionNodeCount }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "importance-delta", title: "Importance delta", beforeValue: before.riskLevel, afterValue: after.riskLevel, severity: before.riskLevel === after.riskLevel ? "low" : "medium", restoreConcern: "Importance delta changes can alter operator focus." }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "status-delta", title: "Status delta", beforeValue: before.label, afterValue: after.label, severity: before.label === after.label ? "low" : "medium", restoreConcern: "Status label changes need human review." }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "integrity-delta", title: "Integrity deltas", beforeValue: before.integrityNoteCount, afterValue: after.integrityNoteCount, restoreConcern: "Integrity blocker blocks restore readiness." }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "risk-change", title: "Risk changes", beforeValue: before.riskLevel, afterValue: after.riskLevel, severity: after.riskLevel === "critical" ? "critical" : after.riskLevel === "high" ? "high" : before.riskLevel === after.riskLevel ? "low" : "medium" }),
    buildSnapshotRestoreComparisonItem({ candidateId: candidate.id, category: "unknown-change", title: "Unknown changes", beforeValue: before.summary.length, afterValue: after.summary.length, severity: "medium", reviewRequired: true, restoreConcern: "Unknown changes are context only and cannot authorize restore." }),
  ];
  const reviewRequiredCount = items.filter((item) => item.reviewRequired).length;

  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-comparison-evidence", candidate.id),
    candidateId: candidate.id,
    sourceSnapshotId: candidate.sourceSnapshotId,
    targetSnapshotId: candidate.targetSnapshotId,
    items,
    reviewRequiredCount,
    topSeverity: topSeverity(items),
    summary: [
      `${items.length} comparison evidence item(s) built for restore candidate ${candidate.id}.`,
      `${reviewRequiredCount} item(s) require review before any future executor request preview can be considered ready.`,
      "Comparison evidence is context, not authority.",
    ],
  };
}

export function summarizeSnapshotRestoreComparisonEvidence(evidence: SnapshotRestoreComparisonEvidence): string[] {
  return [
    ...evidence.summary,
    `Top comparison severity is ${evidence.topSeverity}.`,
    `Source ${evidence.sourceSnapshotId}; target/live ${evidence.targetSnapshotId}.`,
  ];
}
