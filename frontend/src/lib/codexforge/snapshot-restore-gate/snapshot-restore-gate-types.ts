import type { BrainSnapshotModel, BrainSnapshotRiskLevel } from "@/lib/codexforge/brain-snapshot-manager";
import type { RuntimeEventReplaySummary } from "@/lib/codexforge/runtime-event-replay";

export const SNAPSHOT_RESTORE_GATE_CANONICAL_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts" as const;

export const SNAPSHOT_RESTORE_SCOPES = [
  "full-graph-preview",
  "memory-only-preview",
  "task-state-preview",
  "concept-state-preview",
  "governance-review-only",
] as const;

export type SnapshotRestoreScope = (typeof SNAPSHOT_RESTORE_SCOPES)[number];
export type SnapshotRestoreSeverity = BrainSnapshotRiskLevel | "info";
export type SnapshotRestoreReadiness = "blocked" | "review-required" | "request-ready";

export type SnapshotRestoreSnapshotSummary = {
  snapshotId: string;
  label: string;
  graphVersion: string;
  nodeCount: number;
  edgeCount: number;
  memoryNodeCount: number;
  taskNodeCount: number;
  conceptNodeCount: number;
  executionNodeCount: number;
  integrityNoteCount: number;
  riskLevel: BrainSnapshotRiskLevel;
  summary: string[];
};

export type SnapshotRestoreCandidateInput = {
  sourceSnapshot: BrainSnapshotModel | SnapshotRestoreSnapshotSummary;
  targetSnapshot: BrainSnapshotModel | SnapshotRestoreSnapshotSummary;
  restoreScope?: SnapshotRestoreScope | string | null;
  operatorReason?: string | null;
  relatedReplayId?: string | null;
  relatedGovernanceId?: string | null;
  relatedJournalIds?: readonly string[] | null;
};

export type SnapshotRestoreCandidate = {
  id: string;
  sourceSnapshotId: string;
  targetSnapshotId: string;
  sourceSnapshotSummary: SnapshotRestoreSnapshotSummary;
  targetSnapshotSummary: SnapshotRestoreSnapshotSummary;
  selectedGraphVersion: string;
  canonicalSchemaPath: typeof SNAPSHOT_RESTORE_GATE_CANONICAL_SCHEMA_PATH;
  restoreScope: SnapshotRestoreScope;
  operatorReason: string;
  relatedReplayId?: string;
  relatedGovernanceId?: string;
  relatedJournalIds: string[];
  noRestoreGuarantee: true;
  summary: string[];
};

export type SnapshotRestoreCandidateValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type SnapshotRestoreComparisonCategory =
  | "node-count-delta"
  | "edge-count-delta"
  | "memory-delta"
  | "task-delta"
  | "concept-delta"
  | "execution-delta"
  | "importance-delta"
  | "status-delta"
  | "integrity-delta"
  | "risk-change"
  | "unknown-change";

export type SnapshotRestoreComparisonItem = {
  id: string;
  category: SnapshotRestoreComparisonCategory;
  title: string;
  detail: string;
  severity: SnapshotRestoreSeverity;
  beforeSummary: string;
  afterSummary: string;
  reviewRequired: boolean;
  restoreConcern: string;
};

export type SnapshotRestoreComparisonEvidence = {
  id: string;
  candidateId: string;
  sourceSnapshotId: string;
  targetSnapshotId: string;
  items: SnapshotRestoreComparisonItem[];
  reviewRequiredCount: number;
  topSeverity: SnapshotRestoreSeverity;
  summary: string[];
};

export type SnapshotRestoreReplayEvidenceItem = {
  id: string;
  label: string;
  value: string | number;
  severity: SnapshotRestoreSeverity;
  detail: string;
  reviewRequired: boolean;
};

export type SnapshotRestoreReplayEvidence = {
  id: string;
  candidateId: string;
  replayId: string;
  replayMode: string;
  replayStatus: string;
  simulatedEventCount: number;
  blockedEventCount: number;
  warningCount: number;
  riskCount: number;
  nodeDelta: number;
  edgeDelta: number;
  memoryPromotionCount: number;
  topRisk: string;
  replayRecommendation: string;
  restoreReadiness: SnapshotRestoreReadiness;
  items: SnapshotRestoreReplayEvidenceItem[];
  summary: string[];
};

export type SnapshotRestoreReplayEvidenceInput = {
  candidate: SnapshotRestoreCandidate;
  replaySummary?: RuntimeEventReplaySummary | null;
  replayId?: string | null;
  replayMode?: string | null;
};

export type SnapshotRestorePolicyInput = {
  candidate: SnapshotRestoreCandidate;
  comparisonEvidence?: SnapshotRestoreComparisonEvidence | null;
  replayEvidence?: SnapshotRestoreReplayEvidence | null;
  approvalPacket?: SnapshotRestoreApprovalPacket | null;
  governanceReviewed?: boolean | null;
  runtimeJournalReviewed?: boolean | null;
  schemaKnown?: boolean | null;
  integrityBlockerPresent?: boolean | null;
  memoryContradictionRisk?: boolean | null;
  duplicateMemoryRisk?: boolean | null;
};

export type SnapshotRestorePolicyResult = {
  id: string;
  allowed: false;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  explicitApprovalPacketRequired: true;
  comparisonEvidenceRequired: true;
  replayEvidenceRequiredForGraphChangingRestore: true;
  governanceReviewRequired: true;
  runtimeJournalReviewRequired: true;
  liveGraphMutationBlocked: true;
  saveBrainGraphFromUiBlocked: true;
  appendEventFromUiBlocked: true;
  fullGraphRestoreRequiresFutureGuardedSnapshotExecutor: true;
  unknownSchemaBlocked: true;
  latestMessageAuthorityMustBePreserved: true;
  evidenceIsContextNotAuthority: true;
  summary: string[];
};

export type SnapshotRestoreApprovalPacketInput = {
  candidate: SnapshotRestoreCandidate;
  approved?: boolean | null;
  approvalNote?: string | null;
  acknowledgedSourceSnapshot?: boolean | null;
  acknowledgedTargetSnapshot?: boolean | null;
  acknowledgedComparisonEvidence?: boolean | null;
  acknowledgedReplayEvidence?: boolean | null;
  acknowledgedGovernanceReview?: boolean | null;
  acknowledgedRuntimeJournalReview?: boolean | null;
  acknowledgedDataLossRisk?: boolean | null;
  acknowledgedNoAutomaticRestore?: boolean | null;
  acknowledgedFutureExecutorBoundary?: boolean | null;
  acknowledgedLatestMessageAuthority?: boolean | null;
};

export type SnapshotRestoreApprovalPacket = {
  id: string;
  restoreCandidateId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedSourceSnapshot: boolean;
  acknowledgedTargetSnapshot: boolean;
  acknowledgedComparisonEvidence: boolean;
  acknowledgedReplayEvidence: boolean;
  acknowledgedGovernanceReview: boolean;
  acknowledgedRuntimeJournalReview: boolean;
  acknowledgedDataLossRisk: boolean;
  acknowledgedNoAutomaticRestore: boolean;
  acknowledgedFutureExecutorBoundary: boolean;
  acknowledgedLatestMessageAuthority: boolean;
  requestAcknowledgementsReady: boolean;
  summary: string[];
};

export type SnapshotRestoreApprovalValidation = {
  valid: boolean;
  missingAcknowledgements: string[];
  blockedReasons: string[];
  summary: string[];
};

export type SnapshotRestoreRequestPreview = {
  id: string;
  candidateId: string;
  approvalPacket: SnapshotRestoreApprovalPacket;
  policyResult: SnapshotRestorePolicyResult;
  sourceSnapshotId: string;
  targetSnapshotId: string;
  restoreScope: SnapshotRestoreScope;
  expectedAffectedGraphAreas: string[];
  state: "blocked" | "ready-for-future-executor";
  futureExecutorBoundary: string;
  rollbackFallbackGuidance: string[];
  verificationChecklist: string[];
  safetyNotes: string[];
  requestPreviewOnly: true;
  summary: string[];
};

export type SnapshotRestoreRequestPreviewValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type SnapshotRestoreLedgerState =
  | "candidate-created"
  | "comparison-reviewed"
  | "replay-reviewed"
  | "governance-reviewed"
  | "journal-reviewed"
  | "approval-reviewed"
  | "policy-checked"
  | "request-preview-built"
  | "restore-blocked"
  | "future-executor-required"
  | "verification-required"
  | "rejected";

export type SnapshotRestoreGovernanceLedgerItem = {
  id: string;
  state: SnapshotRestoreLedgerState;
  label: string;
  detail: string;
  severity: SnapshotRestoreSeverity;
  reviewRequired: boolean;
};

export type SnapshotRestoreGovernanceLedger = {
  id: string;
  candidateId: string;
  items: SnapshotRestoreGovernanceLedgerItem[];
  blockedCount: number;
  reviewRequiredCount: number;
  summary: string[];
};

export type SnapshotRestoreGateSummary = {
  id: string;
  candidateReady: boolean;
  comparisonEvidenceCount: number;
  replayEvidenceCount: number;
  approvalReady: boolean;
  policyReady: boolean;
  requestPreviewReady: boolean;
  blockedReasonCount: number;
  warningCount: number;
  nextSafeAction: string;
  summary: string[];
};

export type SnapshotRestoreGateSession = {
  candidate: SnapshotRestoreCandidate;
  candidateValidation: SnapshotRestoreCandidateValidation;
  comparisonEvidence: SnapshotRestoreComparisonEvidence;
  replayEvidence: SnapshotRestoreReplayEvidence;
  approvalPacket: SnapshotRestoreApprovalPacket;
  approvalValidation: SnapshotRestoreApprovalValidation;
  policy: SnapshotRestorePolicyResult;
  requestPreview: SnapshotRestoreRequestPreview;
  requestValidation: SnapshotRestoreRequestPreviewValidation;
  governanceLedger: SnapshotRestoreGovernanceLedger;
  summary: SnapshotRestoreGateSummary;
};

export function buildSnapshotRestoreStableKey(
  ...parts: Array<string | number | boolean | null | undefined | readonly string[]>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueSnapshotRestoreStrings(values?: readonly (string | null | undefined)[] | null): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function isSnapshotRestoreScope(value?: string | null): value is SnapshotRestoreScope {
  return SNAPSHOT_RESTORE_SCOPES.includes(value as SnapshotRestoreScope);
}
