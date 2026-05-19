import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestoreApprovalPacket,
  type SnapshotRestoreCandidate,
  type SnapshotRestorePolicyResult,
  type SnapshotRestoreRequestPreview,
  type SnapshotRestoreRequestPreviewValidation,
} from "./snapshot-restore-gate-types";

function affectedAreas(scope: string): string[] {
  if (scope === "memory-only-preview") return ["memory nodes", "memory edges", "authority review"];
  if (scope === "task-state-preview") return ["task nodes", "plan nodes", "execution links"];
  if (scope === "concept-state-preview") return ["concept nodes", "semantic edges", "risk review"];
  if (scope === "governance-review-only") return ["governance packet", "policy evidence", "journal review"];
  return ["nodes", "edges", "memory", "tasks", "concepts", "execution lineage", "integrity checks"];
}

export function buildSnapshotRestoreRequestPreview(input: {
  candidate: SnapshotRestoreCandidate;
  approvalPacket: SnapshotRestoreApprovalPacket;
  policyResult: SnapshotRestorePolicyResult;
}): SnapshotRestoreRequestPreview {
  const state = input.policyResult.requestReady ? "ready-for-future-executor" : "blocked";
  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-request-preview", input.candidate.id, state),
    candidateId: input.candidate.id,
    approvalPacket: input.approvalPacket,
    policyResult: input.policyResult,
    sourceSnapshotId: input.candidate.sourceSnapshotId,
    targetSnapshotId: input.candidate.targetSnapshotId,
    restoreScope: input.candidate.restoreScope,
    expectedAffectedGraphAreas: affectedAreas(input.candidate.restoreScope),
    state,
    futureExecutorBoundary: "Future guarded snapshot executor required; Phase 51 builds request preview only.",
    rollbackFallbackGuidance: [
      "Keep the current live Brain graph unchanged.",
      "Use Runtime Event Replay and Runtime Event Journal as context before any future executor request.",
      "Reject or rebuild the restore candidate if latest-message authority conflicts with evidence.",
    ],
    verificationChecklist: [
      "Confirm source and target/live snapshot ids.",
      "Review comparison evidence.",
      "Review replay evidence for graph-changing scope.",
      "Review governance and runtime journal context.",
      "Confirm no automatic restore and future executor boundary.",
    ],
    safetyNotes: [
      "Request preview only.",
      "Do not restore.",
      "Do not call saveBrainGraph.",
      "Do not call appendEvent.",
      "Do not mutate graph.",
      "Preserve latest-message authority.",
      "Evidence is context, not authority.",
    ],
    requestPreviewOnly: true,
    summary: [
      state === "blocked" ? "Restore request preview is blocked." : "Restore request preview is ready for future executor handoff only.",
      "Request preview only; no restore, no graph mutation, no appendEvent, and no saveBrainGraph from UI.",
      "Future guarded snapshot executor required.",
    ],
  };
}

export function validateSnapshotRestoreRequestPreview(preview: SnapshotRestoreRequestPreview): SnapshotRestoreRequestPreviewValidation {
  const blockedReasons = [
    preview.requestPreviewOnly ? null : "Request preview only flag is required.",
    preview.policyResult.allowed === false ? null : "Policy must not allow restore in Phase 51.",
    preview.state === "blocked" ? "Request preview remains blocked." : null,
  ].filter((item): item is string => Boolean(item));
  const warnings = preview.policyResult.warnings;

  return {
    valid: preview.requestPreviewOnly && preview.policyResult.allowed === false,
    blockedReasons,
    warnings,
    summary: [
      "Request preview validation confirms no restore execution.",
      `${blockedReasons.length} blocked reason(s); ${warnings.length} warning(s).`,
      "Request preview says request preview only.",
    ],
  };
}

export function summarizeSnapshotRestoreRequestPreview(preview: SnapshotRestoreRequestPreview): string[] {
  return [
    ...preview.summary,
    `State: ${preview.state}.`,
    `Expected affected graph areas: ${preview.expectedAffectedGraphAreas.join(", ")}.`,
  ];
}
