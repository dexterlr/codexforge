import {
  type SnapshotRestoreGateSession,
  type SnapshotRestoreGateSummary,
  type SnapshotRestorePolicyResult,
  type SnapshotRestoreRequestPreview,
  buildSnapshotRestoreStableKey,
} from "./snapshot-restore-gate-types";

export function buildSnapshotRestoreGateSummary(input: {
  candidateReady: boolean;
  comparisonEvidenceCount: number;
  replayEvidenceCount: number;
  approvalReady: boolean;
  policy: SnapshotRestorePolicyResult;
  requestPreview: SnapshotRestoreRequestPreview;
}): SnapshotRestoreGateSummary {
  const blockedReasonCount = input.policy.blockedReasons.length;
  const warningCount = input.policy.warnings.length;
  const requestPreviewReady = input.requestPreview.state === "ready-for-future-executor";
  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-gate-summary", input.requestPreview.candidateId),
    candidateReady: input.candidateReady,
    comparisonEvidenceCount: input.comparisonEvidenceCount,
    replayEvidenceCount: input.replayEvidenceCount,
    approvalReady: input.approvalReady,
    policyReady: input.policy.requestReady,
    requestPreviewReady,
    blockedReasonCount,
    warningCount,
    nextSafeAction: input.policy.nextSafeAction,
    summary: [
      `Candidate ready: ${input.candidateReady}.`,
      `${input.comparisonEvidenceCount} comparison item(s), ${input.replayEvidenceCount} replay item(s).`,
      `${blockedReasonCount} blocked reason(s), ${warningCount} warning(s).`,
      input.policy.nextSafeAction,
    ],
  };
}

export function summarizeSnapshotRestoreGateSession(session: SnapshotRestoreGateSession): string[] {
  return [
    ...session.summary.summary,
    "Snapshot Restore Approval Gate is preview-only.",
    "Restore blocked by default; no graph mutation, no snapshot restore in Phase 51, no saveBrainGraph from UI, and no appendEvent.",
  ];
}
