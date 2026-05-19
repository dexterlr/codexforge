import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestoreReplayEvidence,
  type SnapshotRestoreReplayEvidenceInput,
  type SnapshotRestoreReplayEvidenceItem,
  type SnapshotRestoreSeverity,
} from "./snapshot-restore-gate-types";

function severity(count: number): SnapshotRestoreSeverity {
  if (count >= 10) return "critical";
  if (count >= 3) return "high";
  if (count > 0) return "medium";
  return "low";
}

export function buildSnapshotRestoreReplayEvidenceItem(input: {
  candidateId: string;
  label: string;
  value: string | number;
  severity?: SnapshotRestoreSeverity;
  detail: string;
  reviewRequired?: boolean;
}): SnapshotRestoreReplayEvidenceItem {
  const resolvedSeverity = input.severity ?? (typeof input.value === "number" ? severity(input.value) : "info");
  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-replay-evidence-item", input.candidateId, input.label),
    label: input.label,
    value: input.value,
    severity: resolvedSeverity,
    detail: input.detail,
    reviewRequired: input.reviewRequired ?? resolvedSeverity !== "low",
  };
}

export function buildSnapshotRestoreReplayEvidence(input: SnapshotRestoreReplayEvidenceInput): SnapshotRestoreReplayEvidence {
  const summary = input.replaySummary;
  const replayId = input.replayId?.trim() || input.candidate.relatedReplayId || summary?.id || "replay:not-supplied";
  const replayMode = input.replayMode?.trim() || "supplied-summary-only";
  const replayStatus = summary?.replayStatus ?? "no-replay-evidence";
  const simulatedEventCount = summary?.simulatedEventCount ?? 0;
  const blockedEventCount = summary?.blockedEventCount ?? 0;
  const warningCount = summary?.warningCount ?? 0;
  const riskCount = summary?.riskCount ?? 0;
  const nodeDelta = summary?.nodeDelta ?? 0;
  const edgeDelta = summary?.edgeDelta ?? 0;
  const memoryPromotionCount = summary?.memoryPromotionCount ?? 0;
  const topRisk = summary?.topRisk ?? "Replay evidence not supplied.";
  const restoreReadiness = summary && blockedEventCount === 0 && riskCount === 0 ? "review-required" : "blocked";
  const replayRecommendation = summary
    ? "Review replay evidence with governance and journal context before future executor handoff."
    : "Supply replay summary before graph-changing restore request readiness.";
  const items = [
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Replay status", value: replayStatus, severity: summary ? "info" : "high", detail: "Replay evidence accepts supplied summary data and does not run replay internally." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Simulated events", value: simulatedEventCount, severity: "low", detail: "Simulated event count from supplied replay summary.", reviewRequired: false }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Blocked events", value: blockedEventCount, detail: "Blocked replay events block restore request readiness." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Warnings", value: warningCount, detail: "Replay warnings require review." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Risks", value: riskCount, detail: "Replay risks remain context only and do not authorize restore." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Node delta", value: nodeDelta, detail: "Node delta estimates affected graph size." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Edge delta", value: edgeDelta, detail: "Edge delta estimates relationship change." }),
    buildSnapshotRestoreReplayEvidenceItem({ candidateId: input.candidate.id, label: "Memory promotions", value: memoryPromotionCount, detail: "Memory promotion signals must not auto-promote memory." }),
  ];

  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-replay-evidence", input.candidate.id, replayId),
    candidateId: input.candidate.id,
    replayId,
    replayMode,
    replayStatus,
    simulatedEventCount,
    blockedEventCount,
    warningCount,
    riskCount,
    nodeDelta,
    edgeDelta,
    memoryPromotionCount,
    topRisk,
    replayRecommendation,
    restoreReadiness,
    items,
    summary: [
      `Replay evidence ${replayId} is ${restoreReadiness}.`,
      "Replay evidence does not run replay internally, execute events, appendEvent, or mutate graph.",
      replayRecommendation,
    ],
  };
}

export function summarizeSnapshotRestoreReplayEvidence(evidence: SnapshotRestoreReplayEvidence): string[] {
  return [
    ...evidence.summary,
    `${evidence.simulatedEventCount} simulated, ${evidence.blockedEventCount} blocked, ${evidence.warningCount} warning, ${evidence.riskCount} risk.`,
    `Top risk: ${evidence.topRisk}.`,
  ];
}
