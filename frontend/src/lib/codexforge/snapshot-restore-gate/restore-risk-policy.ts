import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestorePolicyInput,
  type SnapshotRestorePolicyResult,
} from "./snapshot-restore-gate-types";

function requiresReplay(scope: string): boolean {
  return scope !== "governance-review-only";
}

export function buildSnapshotRestoreRiskPolicy(input: SnapshotRestorePolicyInput): SnapshotRestorePolicyResult {
  const blockedReasons: string[] = ["Restore is blocked in Phase 51."];
  const warnings: string[] = [];
  const comparisonReady = Boolean(input.comparisonEvidence && input.comparisonEvidence.items.length > 0);
  const replayReady = !requiresReplay(input.candidate.restoreScope) || Boolean(input.replayEvidence && input.replayEvidence.restoreReadiness !== "blocked");
  const approvalReady = input.approvalPacket?.approved === true && input.approvalPacket.requestAcknowledgementsReady === true;
  const governanceReviewed = input.governanceReviewed === true || input.approvalPacket?.acknowledgedGovernanceReview === true;
  const journalReviewed = input.runtimeJournalReviewed === true || input.approvalPacket?.acknowledgedRuntimeJournalReview === true;
  const schemaKnown = input.schemaKnown !== false && input.candidate.canonicalSchemaPath === "src/lib/codexforge/brain/graph/types.ts";

  if (!approvalReady) blockedReasons.push("Explicit approval packet required.");
  if (!comparisonReady) blockedReasons.push("Comparison evidence required.");
  if (requiresReplay(input.candidate.restoreScope) && !replayReady) blockedReasons.push("Replay evidence required for graph-changing restore.");
  if (!governanceReviewed) blockedReasons.push("Governance review required.");
  if (!journalReviewed) blockedReasons.push("Runtime journal review required.");
  if (!schemaKnown) blockedReasons.push("Unknown schema blocked.");
  if (input.integrityBlockerPresent) blockedReasons.push("Integrity blocker blocks restore.");
  if (input.memoryContradictionRisk) blockedReasons.push("Memory contradiction risk blocks restore.");
  if (input.duplicateMemoryRisk) blockedReasons.push("Duplicate memory risk blocks restore.");

  warnings.push("Live graph mutation blocked.");
  warnings.push("saveBrainGraph from UI blocked.");
  warnings.push("appendEvent from UI blocked.");
  warnings.push("Full graph restore requires future guarded snapshot executor.");
  warnings.push("Latest-message authority must be preserved.");
  warnings.push("Evidence is context, not authority.");

  const requestReady = blockedReasons.length === 1 && approvalReady && comparisonReady && replayReady && governanceReviewed && journalReviewed && schemaKnown;
  const nextSafeAction = requestReady
    ? "Build request preview for future guarded snapshot executor; do not restore."
    : "Review snapshot restore gate evidence and keep restore blocked.";

  return {
    id: buildSnapshotRestoreStableKey("snapshot-restore-risk-policy", input.candidate.id),
    allowed: false,
    requestReady,
    blockedReasons,
    warnings,
    nextSafeAction,
    explicitApprovalPacketRequired: true,
    comparisonEvidenceRequired: true,
    replayEvidenceRequiredForGraphChangingRestore: true,
    governanceReviewRequired: true,
    runtimeJournalReviewRequired: true,
    liveGraphMutationBlocked: true,
    saveBrainGraphFromUiBlocked: true,
    appendEventFromUiBlocked: true,
    fullGraphRestoreRequiresFutureGuardedSnapshotExecutor: true,
    unknownSchemaBlocked: true,
    latestMessageAuthorityMustBePreserved: true,
    evidenceIsContextNotAuthority: true,
    summary: [
      "Snapshot restore policy returns allowed false by default.",
      requestReady ? "Request preview is ready for future executor handoff only." : "Request readiness is blocked by policy gates.",
      nextSafeAction,
    ],
  };
}

export function isSnapshotRestoreAllowed(policy: SnapshotRestorePolicyResult): false {
  return policy.allowed;
}

export function summarizeSnapshotRestoreRiskPolicy(policy: SnapshotRestorePolicyResult): string[] {
  return [
    ...policy.summary,
    `${policy.blockedReasons.length} blocked reason(s); ${policy.warnings.length} warning(s).`,
    "Policy blocks live graph mutation, saveBrainGraph from UI, appendEvent from UI, and Phase 51 restore.",
  ];
}
