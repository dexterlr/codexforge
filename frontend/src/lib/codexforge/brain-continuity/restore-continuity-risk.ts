import type {
  BrainContinuityInput,
  BrainContinuityPosture,
  BrainContinuitySeverity,
  SnapshotRestoreContinuityRisk,
  SnapshotRestoreContinuityRiskItem,
  SnapshotRestoreRiskId,
} from "./brain-continuity-types";

const SEVERITY_RANK: Record<BrainContinuitySeverity, number> = {
  healthy: 0,
  info: 1,
  unknown: 2,
  warning: 3,
  risk: 4,
  blocker: 5,
};

export function buildSnapshotRestoreContinuityRiskItem(args: {
  id: SnapshotRestoreRiskId;
  title: string;
  severity?: BrainContinuitySeverity | null;
  detail: string;
  blocked?: boolean | null;
  reviewRequired?: boolean | null;
  mitigation: string;
}): SnapshotRestoreContinuityRiskItem {
  const severity = args.severity ?? "warning";
  return {
    id: args.id,
    title: args.title,
    severity,
    detail: args.detail,
    reviewRequired: args.reviewRequired ?? severity !== "healthy",
    blocked: args.blocked ?? severity === "blocker",
    mitigation: args.mitigation,
  };
}

export function buildSnapshotRestoreContinuityRisk(input: BrainContinuityInput = {}): SnapshotRestoreContinuityRisk {
  const items = [
    buildSnapshotRestoreContinuityRiskItem({ id: "restore-executor-missing", title: "Restore executor missing", severity: "info", detail: "No restore executor is exposed from continuity; restore remains blocked by default.", mitigation: "Use Snapshot Restore Gate for request preview only." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "restore-blocked-by-policy", title: "Restore blocked by policy", severity: "warning", detail: "Restore remains blocked by default and requires future guarded executor policy.", mitigation: "Review policy and approval packet before any future executor work." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "missing-comparison-evidence", title: "Missing comparison evidence", severity: input.comparisonEvidenceAvailable === false ? "risk" : "info", detail: "Comparison evidence is required before restore planning.", mitigation: "Review Brain Snapshot Manager comparison evidence." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "missing-replay-evidence", title: "Missing replay evidence", severity: input.replayEvidenceAvailable === false ? "risk" : "info", detail: "Replay evidence is required before restore planning.", mitigation: "Review Runtime Event Replay output." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "missing-governance-review", title: "Missing governance review", severity: input.governanceReviewed === false ? "risk" : "info", detail: "Governance review is required before restore planning.", mitigation: "Review Brain Mutation Governance." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "missing-journal-review", title: "Missing journal review", severity: input.runtimeJournalReviewed === false ? "risk" : "info", detail: "Runtime journal review is required before restore planning.", mitigation: "Review Runtime Event Journal." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "schema-risk", title: "Schema risk", severity: input.schemaKnown === false ? "blocker" : "info", detail: "Unknown schema blocks restore planning.", mitigation: "Confirm canonical graph schema visibility." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "duplicate-memory-risk", title: "Duplicate memory risk", severity: (input.duplicateRiskCount ?? 0) > 0 ? "warning" : "info", detail: "Duplicate memory risk can make restore posture unsafe.", mitigation: "Resolve duplicate risk before restore planning." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "contradiction-risk", title: "Contradiction risk", severity: (input.contradictionRiskCount ?? 0) > 0 ? "risk" : "info", detail: "Contradiction risk can make restored memory misleading.", mitigation: "Resolve contradiction risk before restore planning." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "data-loss-risk", title: "Data-loss risk", severity: "warning", detail: "data-loss-risk is always review-required for restore posture.", mitigation: "Acknowledge possible loss before future guarded executor review." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "direct-saveBrainGraph-risk", title: "Direct saveBrainGraph risk", severity: input.directUiGraphMutationBlocked === false ? "blocker" : "info", detail: "direct-saveBrainGraph-risk is blocked from continuity UI.", mitigation: "Keep saveBrainGraph from UI blocked." }),
    buildSnapshotRestoreContinuityRiskItem({ id: "latest-message-authority-risk", title: "Latest-message authority risk", severity: input.latestMessageAuthorityPreserved === false ? "blocker" : "info", detail: "Restore planning must preserve latest-message authority.", mitigation: "Stop and stabilize when operator authority is unclear." }),
  ].sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity] || a.id.localeCompare(b.id));

  const blockerCount = items.filter((item) => item.severity === "blocker").length;
  const riskCount = items.filter((item) => item.severity === "risk").length;
  const warningCount = items.filter((item) => item.severity === "warning").length;
  const posture: BrainContinuityPosture = blockerCount > 0 ? "blocked" : riskCount > 0 ? "risk" : warningCount > 0 ? "warning" : "needs-review";
  return {
    id: "snapshot-restore-continuity-risk",
    items,
    posture,
    blockerCount,
    riskCount,
    warningCount,
    topRisk: items[0] ?? null,
    summary: summarizeSnapshotRestoreContinuityRisk({ items, posture } as SnapshotRestoreContinuityRisk),
  };
}

export function summarizeSnapshotRestoreContinuityRisk(risk: Pick<SnapshotRestoreContinuityRisk, "items" | "posture">): string[] {
  return [`Restore risk posture is ${risk.posture}.`, `${risk.items.length} restore risks are visible for review only.`, "Restore remains blocked by default; no restore execution occurs."];
}
