import {
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST,
} from "../jarvis-shared-backend-adapter-contract-map/jarvis-shared-backend-adapter-contract-manifest";
import type {
  JarvisAuditResultStatusApprovalRecordReview,
  JarvisAuditResultStatusApprovalStatus,
  JarvisAuditResultStatusArtifactPlaceholderReview,
  JarvisAuditResultStatusArtifactPlaceholderStatus,
  JarvisAuditResultStatusBaseReviewFields,
  JarvisAuditResultStatusBlockedRecordReview,
  JarvisAuditResultStatusCapabilityId,
  JarvisAuditResultStatusDryRunRecordReview,
  JarvisAuditResultStatusDryRunStatus,
  JarvisAuditResultStatusEventType,
  JarvisAuditResultStatusExecutionPosture,
  JarvisAuditResultStatusKillSwitchStatus,
  JarvisAuditResultStatusLockIdempotencyStatus,
  JarvisAuditResultStatusMemoryBoundaryStatus,
  JarvisAuditResultStatusOperatorReviewStatus,
  JarvisAuditResultStatusReplayBlockStatus,
  JarvisAuditResultStatusResultLedgerRecordReview,
  JarvisAuditResultStatusResultLedgerStatus,
  JarvisAuditResultStatusReviewSnapshot,
  JarvisAuditResultStatusRouterStatus,
  JarvisAuditResultStatusPlannerStatus,
  JarvisAuditResultStatusAdapterStatus,
} from "./jarvis-audit-result-status-model";
import type {
  JarvisPermissionApprovalEngineDecisionStatus,
} from "../jarvis-permission-approval-engine-map/jarvis-permission-approval-engine-model";

type SnapshotSeed = Readonly<{
  capabilityId: JarvisAuditResultStatusCapabilityId;
  auditEventId: `audit-${string}`;
  auditEventType: JarvisAuditResultStatusEventType;
  plannerStatus: JarvisAuditResultStatusPlannerStatus;
  routerStatus: JarvisAuditResultStatusRouterStatus;
  permissionStatus: JarvisPermissionApprovalEngineDecisionStatus;
  approvalStatus: JarvisAuditResultStatusApprovalStatus;
  dryRunStatus: JarvisAuditResultStatusDryRunStatus;
  resultLedgerStatus: JarvisAuditResultStatusResultLedgerStatus;
  blockedActionSummary: string;
  artifactPlaceholderStatus: JarvisAuditResultStatusArtifactPlaceholderStatus;
  adapterStatus: JarvisAuditResultStatusAdapterStatus;
  memoryBoundaryStatus: JarvisAuditResultStatusMemoryBoundaryStatus;
  killSwitchStatus: JarvisAuditResultStatusKillSwitchStatus;
  lockIdempotencyStatus: JarvisAuditResultStatusLockIdempotencyStatus;
  replayBlockStatus: JarvisAuditResultStatusReplayBlockStatus;
  operatorReviewStatus: JarvisAuditResultStatusOperatorReviewStatus;
  executionPosture: JarvisAuditResultStatusExecutionPosture;
}>;

const SNAPSHOT_SEEDS: readonly SnapshotSeed[] = [
  {
    capabilityId: "video.generate",
    auditEventId: "audit-video-generate-review",
    auditEventType: "audit-event-review",
    plannerStatus: "planned-for-review",
    routerStatus: "route-selected-for-review",
    permissionStatus: "approval-required",
    approvalStatus: "approval-request-drafted",
    dryRunStatus: "dry-run-required",
    resultLedgerStatus: "result-ledger-open",
    blockedActionSummary: "no video provider execution and no render execution",
    artifactPlaceholderStatus: "artifact-placeholder-empty",
    adapterStatus: "backend-only-adapter-reference",
    memoryBoundaryStatus: "memory-boundary-held",
    killSwitchStatus: "hard-kill-switch-on",
    lockIdempotencyStatus: "lock-manager-review-required",
    replayBlockStatus: "replay-block-enabled",
    operatorReviewStatus: "operator-review-required",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "website.create",
    auditEventId: "audit-website-create-review",
    auditEventType: "approval-event-review",
    plannerStatus: "selected-for-review",
    routerStatus: "route-held-backend-only",
    permissionStatus: "approval-required",
    approvalStatus: "approval-required",
    dryRunStatus: "dry-run-required",
    resultLedgerStatus: "result-ledger-held",
    blockedActionSummary: "no website creation execution and no network execution",
    artifactPlaceholderStatus: "artifact-placeholder-held",
    adapterStatus: "adapter-blocked-from-frontend",
    memoryBoundaryStatus: "memory-boundary-held",
    killSwitchStatus: "hard-kill-switch-on",
    lockIdempotencyStatus: "lock-manager-review-required",
    replayBlockStatus: "replay-block-enabled",
    operatorReviewStatus: "operator-review-queued",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "avatar.prepare",
    auditEventId: "audit-avatar-prepare-review",
    auditEventType: "permission-event-review",
    plannerStatus: "selected-for-review",
    routerStatus: "route-selected-for-review",
    permissionStatus: "approval-required",
    approvalStatus: "approval-held",
    dryRunStatus: "dry-run-required",
    resultLedgerStatus: "result-ledger-open",
    blockedActionSummary: "no avatar generation execution and no provider execution",
    artifactPlaceholderStatus: "artifact-placeholder-empty",
    adapterStatus: "backend-only-adapter-reference",
    memoryBoundaryStatus: "memory-boundary-reviewed",
    killSwitchStatus: "hard-kill-switch-on",
    lockIdempotencyStatus: "lock-manager-ready-and-idempotent",
    replayBlockStatus: "replay-block-enabled",
    operatorReviewStatus: "operator-review-required",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "chatbot.plan",
    auditEventId: "audit-chatbot-plan-review",
    auditEventType: "planner-event-review",
    plannerStatus: "planned-for-review",
    routerStatus: "route-selected-for-review",
    permissionStatus: "needs-human-operator-review",
    approvalStatus: "approval-required",
    dryRunStatus: "dry-run-recorded",
    resultLedgerStatus: "result-ledger-reviewed",
    blockedActionSummary: "no chatbot autonomous execution and no tool execution",
    artifactPlaceholderStatus: "artifact-placeholder-linked",
    adapterStatus: "adapter-review-ready",
    memoryBoundaryStatus: "memory-boundary-reviewed",
    killSwitchStatus: "hard-kill-switch-reviewed",
    lockIdempotencyStatus: "lock-manager-ready-and-idempotent",
    replayBlockStatus: "replay-block-review-required",
    operatorReviewStatus: "operator-review-complete",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "trading.paperReview",
    auditEventId: "audit-trading-paper-review",
    auditEventType: "blocked-action-event-review",
    plannerStatus: "blocked-by-policy-review",
    routerStatus: "route-blocked-for-review",
    permissionStatus: "blocked",
    approvalStatus: "approval-held",
    dryRunStatus: "dry-run-blocked",
    resultLedgerStatus: "result-ledger-held",
    blockedActionSummary:
      "no trading execution, no paper trading execution, and no real-money trading execution",
    artifactPlaceholderStatus: "artifact-placeholder-held",
    adapterStatus: "adapter-blocked-from-frontend",
    memoryBoundaryStatus: "memory-boundary-held",
    killSwitchStatus: "hard-kill-switch-on",
    lockIdempotencyStatus: "lock-manager-review-required",
    replayBlockStatus: "replay-block-enabled",
    operatorReviewStatus: "operator-review-required",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "workflow.prepare",
    auditEventId: "audit-workflow-prepare-review",
    auditEventType: "router-event-review",
    plannerStatus: "selected-for-review",
    routerStatus: "route-held-backend-only",
    permissionStatus: "approval-required",
    approvalStatus: "approval-request-drafted",
    dryRunStatus: "dry-run-recorded",
    resultLedgerStatus: "result-ledger-open",
    blockedActionSummary: "no worker dispatch and no schedule execution",
    artifactPlaceholderStatus: "artifact-placeholder-linked",
    adapterStatus: "backend-only-adapter-reference",
    memoryBoundaryStatus: "memory-boundary-reviewed",
    killSwitchStatus: "hard-kill-switch-reviewed",
    lockIdempotencyStatus: "lock-manager-ready-and-idempotent",
    replayBlockStatus: "replay-block-review-required",
    operatorReviewStatus: "operator-review-queued",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
  {
    capabilityId: "render.publishReview",
    auditEventId: "audit-render-publish-review",
    auditEventType: "audit-event-review",
    plannerStatus: "selected-for-review",
    routerStatus: "route-held-backend-only",
    permissionStatus: "approval-required",
    approvalStatus: "approval-required",
    dryRunStatus: "dry-run-required",
    resultLedgerStatus: "result-ledger-open",
    blockedActionSummary:
      "no render execution, no export execution, and no publish execution",
    artifactPlaceholderStatus: "artifact-placeholder-empty",
    adapterStatus: "backend-only-adapter-reference",
    memoryBoundaryStatus: "memory-boundary-held",
    killSwitchStatus: "hard-kill-switch-on",
    lockIdempotencyStatus: "lock-manager-review-required",
    replayBlockStatus: "replay-block-enabled",
    operatorReviewStatus: "operator-review-required",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
  },
] as const;

function buildSnapshot(seed: SnapshotSeed): JarvisAuditResultStatusReviewSnapshot {
  const manifestRecord = JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.find(
    (record) => record.capabilityId === seed.capabilityId
  );
  if (!manifestRecord) {
    throw new Error(`Missing Jarvis adapter manifest record for ${seed.capabilityId}`);
  }

  return {
    capabilityId: manifestRecord.capabilityId,
    featureDomain: manifestRecord.featureDomain,
    workspaceLabel: manifestRecord.workspaceLabel,
    auditEventId: seed.auditEventId,
    auditEventType: seed.auditEventType,
    plannerStatus: seed.plannerStatus,
    routerStatus: seed.routerStatus,
    permissionStatus: seed.permissionStatus,
    approvalStatus: seed.approvalStatus,
    dryRunStatus: seed.dryRunStatus,
    resultLedgerStatus: seed.resultLedgerStatus,
    blockedActionSummary: seed.blockedActionSummary,
    artifactPlaceholderStatus: seed.artifactPlaceholderStatus,
    riskTier: manifestRecord.riskTier,
    adapterStatus: seed.adapterStatus,
    memoryBoundaryStatus: seed.memoryBoundaryStatus,
    killSwitchStatus: seed.killSwitchStatus,
    lockIdempotencyStatus: seed.lockIdempotencyStatus,
    replayBlockStatus: seed.replayBlockStatus,
    operatorReviewStatus: seed.operatorReviewStatus,
    executionPosture: seed.executionPosture,
  };
}

function buildLedgerRecordId<
  TPrefix extends
    | "ledger"
    | "dry-run"
    | "approval-record"
    | "blocked-record"
    | "artifact",
>(
  prefix: TPrefix,
  snapshot: JarvisAuditResultStatusBaseReviewFields
): `${TPrefix}-${string}` {
  const capabilityKey = snapshot.capabilityId.replace(/\./g, "-");
  return `${prefix}-${capabilityKey}` as `${TPrefix}-${string}`;
}

export const JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES =
  SNAPSHOT_SEEDS.map(buildSnapshot);

export function findJarvisAuditResultStatusSnapshot(
  capabilityId: JarvisAuditResultStatusCapabilityId
): JarvisAuditResultStatusReviewSnapshot {
  const snapshot = JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.find(
    (record) => record.capabilityId === capabilityId
  );
  if (!snapshot) {
    throw new Error(`Unknown Jarvis audit result status capability: ${capabilityId}`);
  }
  return snapshot;
}

function buildResultLedgerRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusResultLedgerRecordReview {
  return {
    ...snapshot,
    reviewPosture: "result ledger foundation",
    ledgerRecordId: buildLedgerRecordId("ledger", snapshot),
  };
}

function buildDryRunRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusDryRunRecordReview {
  return {
    ...snapshot,
    reviewPosture: "dry-run record review only",
    dryRunRecordId: buildLedgerRecordId("dry-run", snapshot),
  };
}

function buildApprovalRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusApprovalRecordReview {
  return {
    ...snapshot,
    reviewPosture: "approval record review only",
    approvalRecordId: buildLedgerRecordId("approval-record", snapshot),
  };
}

function buildBlockedRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusBlockedRecordReview {
  return {
    ...snapshot,
    reviewPosture: "blocked record review only",
    blockedRecordId: buildLedgerRecordId("blocked-record", snapshot),
  };
}

function buildArtifactPlaceholderRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusArtifactPlaceholderReview {
  return {
    ...snapshot,
    reviewPosture: "artifact placeholder review only",
    artifactPlaceholderId: buildLedgerRecordId("artifact", snapshot),
  };
}

export const JARVIS_AUDIT_RESULT_STATUS_RESULT_LEDGER_RECORD_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildResultLedgerRecord);

export const JARVIS_AUDIT_RESULT_STATUS_DRY_RUN_RECORD_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildDryRunRecord);

export const JARVIS_AUDIT_RESULT_STATUS_APPROVAL_RECORD_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildApprovalRecord);

export const JARVIS_AUDIT_RESULT_STATUS_BLOCKED_RECORD_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildBlockedRecord);

export const JARVIS_AUDIT_RESULT_STATUS_ARTIFACT_PLACEHOLDER_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildArtifactPlaceholderRecord
  );
