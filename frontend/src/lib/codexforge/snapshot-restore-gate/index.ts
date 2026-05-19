export * from "./snapshot-restore-gate-types";
export {
  buildSnapshotRestoreCandidate,
  normalizeSnapshotRestoreSnapshotSummary,
  summarizeSnapshotRestoreCandidate,
  validateSnapshotRestoreCandidate,
} from "./restore-candidate";
export {
  buildSnapshotRestoreComparisonEvidence,
  buildSnapshotRestoreComparisonItem,
  summarizeSnapshotRestoreComparisonEvidence,
} from "./restore-comparison-evidence";
export {
  buildSnapshotRestoreReplayEvidence,
  buildSnapshotRestoreReplayEvidenceItem,
  summarizeSnapshotRestoreReplayEvidence,
} from "./restore-replay-evidence";
export {
  buildSnapshotRestoreRiskPolicy,
  isSnapshotRestoreAllowed,
  summarizeSnapshotRestoreRiskPolicy,
} from "./restore-risk-policy";
export {
  buildSnapshotRestoreApprovalPacket,
  summarizeSnapshotRestoreApprovalPacket,
  validateSnapshotRestoreApprovalPacket,
} from "./restore-approval-packet";
export {
  buildSnapshotRestoreRequestPreview,
  summarizeSnapshotRestoreRequestPreview,
  validateSnapshotRestoreRequestPreview,
} from "./restore-request-preview";
export {
  buildSnapshotRestoreGovernanceLedger,
  buildSnapshotRestoreGovernanceLedgerItem,
  summarizeSnapshotRestoreGovernanceLedger,
} from "./restore-governance-ledger";
export {
  buildSnapshotRestoreGateSummary,
  summarizeSnapshotRestoreGateSession,
} from "./restore-gate-summary";

import { buildBrainSnapshot } from "@/lib/codexforge/brain-snapshot-manager";
import {
  buildSnapshotRestoreApprovalPacket,
  validateSnapshotRestoreApprovalPacket,
} from "./restore-approval-packet";
import {
  buildSnapshotRestoreCandidate,
  validateSnapshotRestoreCandidate,
} from "./restore-candidate";
import { buildSnapshotRestoreComparisonEvidence } from "./restore-comparison-evidence";
import { buildSnapshotRestoreGateSummary } from "./restore-gate-summary";
import { buildSnapshotRestoreGovernanceLedger } from "./restore-governance-ledger";
import { buildSnapshotRestoreReplayEvidence } from "./restore-replay-evidence";
import {
  buildSnapshotRestoreRequestPreview,
  validateSnapshotRestoreRequestPreview,
} from "./restore-request-preview";
import { buildSnapshotRestoreRiskPolicy } from "./restore-risk-policy";
import type { SnapshotRestoreGateSession } from "./snapshot-restore-gate-types";

export function buildSnapshotRestoreGateSession(): SnapshotRestoreGateSession {
  const sourceSnapshot = buildBrainSnapshot({
    id: "snapshot:phase-51-source-candidate",
    label: "Phase 51 source snapshot candidate",
    source: "operator-selected",
    graph: null,
    focusNodeIds: ["memory:authority", "task:restore-review"],
    updatedAtLabel: "operator selected",
  });
  const targetSnapshot = buildBrainSnapshot({
    id: "snapshot:phase-51-live-target",
    label: "Current live Brain target summary",
    source: "live-readonly",
    graph: null,
    focusNodeIds: ["memory:live", "task:current-work"],
    updatedAtLabel: "live read-only",
  });
  const candidate = buildSnapshotRestoreCandidate({
    sourceSnapshot,
    targetSnapshot,
    restoreScope: "full-graph-preview",
    operatorReason: "Review selected Brain snapshot as a restore candidate without restoring.",
    relatedReplayId: "runtime-replay:phase-51-review",
    relatedGovernanceId: "brain-governance:phase-51-review",
    relatedJournalIds: ["runtime-journal:phase-51-review"],
  });
  const candidateValidation = validateSnapshotRestoreCandidate(candidate);
  const comparisonEvidence = buildSnapshotRestoreComparisonEvidence(candidate);
  const replayEvidence = buildSnapshotRestoreReplayEvidence({ candidate, replayId: candidate.relatedReplayId, replayMode: "reducer-preview" });
  const approvalPacket = buildSnapshotRestoreApprovalPacket({ candidate });
  const approvalValidation = validateSnapshotRestoreApprovalPacket(approvalPacket);
  const policy = buildSnapshotRestoreRiskPolicy({
    candidate,
    comparisonEvidence,
    replayEvidence,
    approvalPacket,
    governanceReviewed: false,
    runtimeJournalReviewed: false,
  });
  const requestPreview = buildSnapshotRestoreRequestPreview({ candidate, approvalPacket, policyResult: policy });
  const requestValidation = validateSnapshotRestoreRequestPreview(requestPreview);
  const governanceLedger = buildSnapshotRestoreGovernanceLedger(requestPreview);
  const summary = buildSnapshotRestoreGateSummary({
    candidateReady: candidateValidation.valid,
    comparisonEvidenceCount: comparisonEvidence.items.length,
    replayEvidenceCount: replayEvidence.items.length,
    approvalReady: approvalPacket.requestAcknowledgementsReady && approvalPacket.approved,
    policy,
    requestPreview,
  });

  return {
    candidate,
    candidateValidation,
    comparisonEvidence,
    replayEvidence,
    approvalPacket,
    approvalValidation,
    policy,
    requestPreview,
    requestValidation,
    governanceLedger,
    summary,
  };
}
