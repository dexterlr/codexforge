import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestoreGovernanceLedger,
  type SnapshotRestoreGovernanceLedgerItem,
  type SnapshotRestoreLedgerState,
  type SnapshotRestoreRequestPreview,
  type SnapshotRestoreSeverity,
} from "./snapshot-restore-gate-types";

export function buildSnapshotRestoreGovernanceLedgerItem(input: {
  candidateId: string;
  state: SnapshotRestoreLedgerState;
  label: string;
  detail: string;
  severity?: SnapshotRestoreSeverity;
  reviewRequired?: boolean;
}): SnapshotRestoreGovernanceLedgerItem {
  const severity = input.severity ?? (input.state === "restore-blocked" ? "critical" : "medium");
  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-ledger", input.candidateId, input.state),
    state: input.state,
    label: input.label,
    detail: input.detail,
    severity,
    reviewRequired: input.reviewRequired ?? input.state !== "candidate-created",
  };
}

export function buildSnapshotRestoreGovernanceLedger(preview: SnapshotRestoreRequestPreview): SnapshotRestoreGovernanceLedger {
  const candidateId = preview.candidateId;
  const items = [
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "candidate-created", label: "Candidate created", detail: "Restore candidate created with no-restore guarantee.", severity: "low", reviewRequired: false }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "comparison-reviewed", label: "Comparison reviewed", detail: "Comparison evidence required before future handoff." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "replay-reviewed", label: "Replay reviewed", detail: "Replay evidence required for graph-changing restore." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "governance-reviewed", label: "Governance reviewed", detail: "Brain Mutation Governance remains review-only." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "journal-reviewed", label: "Journal reviewed", detail: "Runtime Event Journal context reviewed without appendEvent." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "approval-reviewed", label: "Approval reviewed", detail: "Approval packet reviewed; approval does not restore." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "policy-checked", label: "Policy checked", detail: "Policy checked with allowed false by default." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "request-preview-built", label: "Request preview built", detail: "Request preview built without persistence." }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "restore-blocked", label: "Restore blocked", detail: "No snapshot restore in Phase 51.", severity: "critical" }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "future-executor-required", label: "Future executor required", detail: "Future guarded snapshot executor required.", severity: "high" }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "verification-required", label: "Verification required", detail: "Verification checklist must be completed after any future executor boundary.", severity: "medium" }),
    buildSnapshotRestoreGovernanceLedgerItem({ candidateId, state: "rejected", label: "Rejected path visible", detail: "Reject candidate if evidence conflicts with latest-message authority.", severity: "medium" }),
  ];

  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-governance-ledger", candidateId),
    candidateId,
    items,
    blockedCount: items.filter((item) => item.state === "restore-blocked" || item.state === "rejected").length,
    reviewRequiredCount: items.filter((item) => item.reviewRequired).length,
    summary: [
      "Governance ledger includes restore-blocked and future-executor-required.",
      `${items.length} deterministic ledger item(s) are visible.`,
      "Ledger is local review context and does not persist restore requests automatically.",
    ],
  };
}

export function summarizeSnapshotRestoreGovernanceLedger(ledger: SnapshotRestoreGovernanceLedger): string[] {
  return [
    ...ledger.summary,
    `${ledger.blockedCount} blocked ledger item(s); ${ledger.reviewRequiredCount} review-required item(s).`,
  ];
}
