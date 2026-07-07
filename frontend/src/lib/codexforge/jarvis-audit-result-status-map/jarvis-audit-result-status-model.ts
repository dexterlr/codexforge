import type { ReactNode } from "react";
import type {
  JarvisPermissionApprovalEngineDecisionStatus,
} from "../jarvis-permission-approval-engine-map/jarvis-permission-approval-engine-model";
import type {
  JarvisSharedBackendAdapterContractCapabilityId,
  JarvisSharedBackendAdapterContractFeatureDomain,
  JarvisSharedBackendAdapterContractRiskTier,
} from "../jarvis-shared-backend-adapter-contract-map/jarvis-shared-backend-adapter-contract-manifest";

export const JARVIS_AUDIT_RESULT_STATUS_ROUTE_SPECS = [
  [3690, "jarvis-audit-result-status-boundary-wiring", "/jarvis-audit-result-status-boundary-wiring", "Jarvis Audit Result Status Boundary Wiring", "audit ledger foundation"],
  [3691, "jarvis-audit-result-status-intent-wiring", "/jarvis-audit-result-status-intent-wiring", "Jarvis Audit Result Status Intent Wiring", "status dashboard foundation"],
  [3692, "jarvis-audit-event-model-wiring", "/jarvis-audit-event-model-wiring", "Jarvis Audit Event Model Wiring", "audit event review only"],
  [3693, "jarvis-audit-approval-event-wiring", "/jarvis-audit-approval-event-wiring", "Jarvis Audit Approval Event Wiring", "approval event review only"],
  [3694, "jarvis-audit-permission-event-wiring", "/jarvis-audit-permission-event-wiring", "Jarvis Audit Permission Event Wiring", "permission event review only"],
  [3695, "jarvis-audit-planner-event-wiring", "/jarvis-audit-planner-event-wiring", "Jarvis Audit Planner Event Wiring", "planner event review only"],
  [3696, "jarvis-audit-router-event-wiring", "/jarvis-audit-router-event-wiring", "Jarvis Audit Router Event Wiring", "router event review only"],
  [3697, "jarvis-audit-blocked-action-event-wiring", "/jarvis-audit-blocked-action-event-wiring", "Jarvis Audit Blocked Action Event Wiring", "blocked action event review only"],
  [3698, "jarvis-result-ledger-model-wiring", "/jarvis-result-ledger-model-wiring", "Jarvis Result Ledger Model Wiring", "result ledger foundation"],
  [3699, "jarvis-result-ledger-dry-run-record-wiring", "/jarvis-result-ledger-dry-run-record-wiring", "Jarvis Result Ledger Dry Run Record Wiring", "dry-run record review only"],
  [3700, "jarvis-result-ledger-approval-record-wiring", "/jarvis-result-ledger-approval-record-wiring", "Jarvis Result Ledger Approval Record Wiring", "approval record review only"],
  [3701, "jarvis-result-ledger-blocked-record-wiring", "/jarvis-result-ledger-blocked-record-wiring", "Jarvis Result Ledger Blocked Record Wiring", "blocked record review only"],
  [3702, "jarvis-result-ledger-artifact-placeholder-wiring", "/jarvis-result-ledger-artifact-placeholder-wiring", "Jarvis Result Ledger Artifact Placeholder Wiring", "artifact placeholder review only"],
  [3703, "jarvis-status-dashboard-overview-wiring", "/jarvis-status-dashboard-overview-wiring", "Jarvis Status Dashboard Overview Wiring", "one Jarvis cockpit with shared evidence"],
  [3704, "jarvis-status-dashboard-capability-status-wiring", "/jarvis-status-dashboard-capability-status-wiring", "Jarvis Status Dashboard Capability Status Wiring", "capability status review only"],
  [3705, "jarvis-status-dashboard-workspace-status-wiring", "/jarvis-status-dashboard-workspace-status-wiring", "Jarvis Status Dashboard Workspace Status Wiring", "workspace status review only"],
  [3706, "jarvis-status-dashboard-adapter-status-wiring", "/jarvis-status-dashboard-adapter-status-wiring", "Jarvis Status Dashboard Adapter Status Wiring", "adapter status review only"],
  [3707, "jarvis-status-dashboard-permission-status-wiring", "/jarvis-status-dashboard-permission-status-wiring", "Jarvis Status Dashboard Permission Status Wiring", "permission status review only"],
  [3708, "jarvis-status-dashboard-approval-status-wiring", "/jarvis-status-dashboard-approval-status-wiring", "Jarvis Status Dashboard Approval Status Wiring", "approval status review only"],
  [3709, "jarvis-status-dashboard-dry-run-status-wiring", "/jarvis-status-dashboard-dry-run-status-wiring", "Jarvis Status Dashboard Dry Run Status Wiring", "dry-run status review only"],
  [3710, "jarvis-status-dashboard-risk-status-wiring", "/jarvis-status-dashboard-risk-status-wiring", "Jarvis Status Dashboard Risk Status Wiring", "risk status review only"],
  [3711, "jarvis-status-dashboard-trading-status-wiring", "/jarvis-status-dashboard-trading-status-wiring", "Jarvis Status Dashboard Trading Status Wiring", "trading status review only"],
  [3712, "jarvis-status-dashboard-provider-status-wiring", "/jarvis-status-dashboard-provider-status-wiring", "Jarvis Status Dashboard Provider Status Wiring", "provider status review only"],
  [3713, "jarvis-status-dashboard-website-avatar-status-wiring", "/jarvis-status-dashboard-website-avatar-status-wiring", "Jarvis Status Dashboard Website Avatar Status Wiring", "website avatar status review only"],
  [3714, "jarvis-status-dashboard-workflow-status-wiring", "/jarvis-status-dashboard-workflow-status-wiring", "Jarvis Status Dashboard Workflow Status Wiring", "workflow status review only"],
  [3715, "jarvis-status-dashboard-memory-boundary-status-wiring", "/jarvis-status-dashboard-memory-boundary-status-wiring", "Jarvis Status Dashboard Memory Boundary Status Wiring", "memory boundary status review only"],
  [3716, "jarvis-status-dashboard-kill-switch-status-wiring", "/jarvis-status-dashboard-kill-switch-status-wiring", "Jarvis Status Dashboard Kill Switch Status Wiring", "kill switch status review only"],
  [3717, "jarvis-status-dashboard-lock-idempotency-status-wiring", "/jarvis-status-dashboard-lock-idempotency-status-wiring", "Jarvis Status Dashboard Lock Idempotency Status Wiring", "lock manager status review only"],
  [3718, "jarvis-status-dashboard-replay-block-status-wiring", "/jarvis-status-dashboard-replay-block-status-wiring", "Jarvis Status Dashboard Replay Block Status Wiring", "replay block status review only"],
  [3719, "jarvis-status-dashboard-operator-review-wiring", "/jarvis-status-dashboard-operator-review-wiring", "Jarvis Status Dashboard Operator Review Wiring", "operator review status required"],
  [3720, "jarvis-status-dashboard-no-execution-guard-wiring", "/jarvis-status-dashboard-no-execution-guard-wiring", "Jarvis Status Dashboard No Execution Guard Wiring", "no direct frontend execution"],
  [3721, "jarvis-audit-result-status-completion", "/jarvis-audit-result-status-completion", "Jarvis Audit Result Status Completion", "audit result status completion does not enable provider/render/export/publish/workers/trading/automation"],
] as const;

type JarvisAuditResultStatusRouteSpec =
  (typeof JARVIS_AUDIT_RESULT_STATUS_ROUTE_SPECS)[number];

export type JarvisAuditResultStatusRouteSlug =
  JarvisAuditResultStatusRouteSpec[1];

export type JarvisAuditResultStatusRouteHref =
  JarvisAuditResultStatusRouteSpec[2];

export type JarvisAuditResultStatusRouteTitle =
  JarvisAuditResultStatusRouteSpec[3];

export type JarvisAuditResultStatusRouteFocus =
  JarvisAuditResultStatusRouteSpec[4];

export type JarvisAuditResultStatusCapabilityId =
  JarvisSharedBackendAdapterContractCapabilityId;

export type JarvisAuditResultStatusFeatureDomain =
  JarvisSharedBackendAdapterContractFeatureDomain;

export type JarvisAuditResultStatusRiskTier =
  JarvisSharedBackendAdapterContractRiskTier;

export const JARVIS_AUDIT_RESULT_STATUS_EVENT_TYPES = [
  "audit-event-review",
  "approval-event-review",
  "permission-event-review",
  "planner-event-review",
  "router-event-review",
  "blocked-action-event-review",
] as const;

export type JarvisAuditResultStatusEventType =
  (typeof JARVIS_AUDIT_RESULT_STATUS_EVENT_TYPES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_PLANNER_STATUSES = [
  "planned-for-review",
  "selected-for-review",
  "blocked-by-policy-review",
] as const;

export type JarvisAuditResultStatusPlannerStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_PLANNER_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_ROUTER_STATUSES = [
  "route-selected-for-review",
  "route-held-backend-only",
  "route-blocked-for-review",
] as const;

export type JarvisAuditResultStatusRouterStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_ROUTER_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_APPROVAL_STATUSES = [
  "approval-request-drafted",
  "approval-required",
  "approval-held",
] as const;

export type JarvisAuditResultStatusApprovalStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_APPROVAL_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_DRY_RUN_STATUSES = [
  "dry-run-required",
  "dry-run-recorded",
  "dry-run-blocked",
] as const;

export type JarvisAuditResultStatusDryRunStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_DRY_RUN_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_RESULT_LEDGER_STATUSES = [
  "result-ledger-open",
  "result-ledger-held",
  "result-ledger-reviewed",
] as const;

export type JarvisAuditResultStatusResultLedgerStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_RESULT_LEDGER_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_ARTIFACT_PLACEHOLDER_STATUSES = [
  "artifact-placeholder-empty",
  "artifact-placeholder-linked",
  "artifact-placeholder-held",
] as const;

export type JarvisAuditResultStatusArtifactPlaceholderStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_ARTIFACT_PLACEHOLDER_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_ADAPTER_STATUSES = [
  "backend-only-adapter-reference",
  "adapter-blocked-from-frontend",
  "adapter-review-ready",
] as const;

export type JarvisAuditResultStatusAdapterStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_ADAPTER_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_MEMORY_BOUNDARY_STATUSES = [
  "memory-boundary-held",
  "memory-boundary-reviewed",
] as const;

export type JarvisAuditResultStatusMemoryBoundaryStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_MEMORY_BOUNDARY_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_KILL_SWITCH_STATUSES = [
  "hard-kill-switch-on",
  "hard-kill-switch-reviewed",
] as const;

export type JarvisAuditResultStatusKillSwitchStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_KILL_SWITCH_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_LOCK_IDEMPOTENCY_STATUSES = [
  "lock-manager-review-required",
  "lock-manager-ready-and-idempotent",
] as const;

export type JarvisAuditResultStatusLockIdempotencyStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_LOCK_IDEMPOTENCY_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_REPLAY_BLOCK_STATUSES = [
  "replay-block-enabled",
  "replay-block-review-required",
] as const;

export type JarvisAuditResultStatusReplayBlockStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_REPLAY_BLOCK_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_OPERATOR_REVIEW_STATUSES = [
  "operator-review-required",
  "operator-review-queued",
  "operator-review-complete",
] as const;

export type JarvisAuditResultStatusOperatorReviewStatus =
  (typeof JARVIS_AUDIT_RESULT_STATUS_OPERATOR_REVIEW_STATUSES)[number];

export const JARVIS_AUDIT_RESULT_STATUS_EXECUTION_POSTURES = [
  "disabled by default, approval-required, backend-only, and execution-blocked",
  "audit result status completion does not enable provider/render/export/publish/workers/trading/automation",
] as const;

export type JarvisAuditResultStatusExecutionPosture =
  (typeof JARVIS_AUDIT_RESULT_STATUS_EXECUTION_POSTURES)[number];

export type JarvisAuditResultStatusBaseReviewFields = Readonly<{
  capabilityId: JarvisAuditResultStatusCapabilityId;
  featureDomain: JarvisAuditResultStatusFeatureDomain;
  workspaceLabel: string;
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
  riskTier: JarvisAuditResultStatusRiskTier;
  adapterStatus: JarvisAuditResultStatusAdapterStatus;
  memoryBoundaryStatus: JarvisAuditResultStatusMemoryBoundaryStatus;
  killSwitchStatus: JarvisAuditResultStatusKillSwitchStatus;
  lockIdempotencyStatus: JarvisAuditResultStatusLockIdempotencyStatus;
  replayBlockStatus: JarvisAuditResultStatusReplayBlockStatus;
  operatorReviewStatus: JarvisAuditResultStatusOperatorReviewStatus;
  executionPosture: JarvisAuditResultStatusExecutionPosture;
}>;

export type JarvisAuditResultStatusReviewSnapshot =
  JarvisAuditResultStatusBaseReviewFields;

export type JarvisAuditResultStatusAuditEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "audit event review only";
    evidenceSummary: string;
  }
>;

export type JarvisAuditResultStatusApprovalEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "approval event review only";
    approvalSummary: string;
  }
>;

export type JarvisAuditResultStatusPermissionEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "permission event review only";
    permissionSummary: string;
  }
>;

export type JarvisAuditResultStatusPlannerEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "planner event review only";
    plannerSummary: string;
  }
>;

export type JarvisAuditResultStatusRouterEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "router event review only";
    routingSummary: string;
  }
>;

export type JarvisAuditResultStatusBlockedActionEventReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "blocked action event review only";
    blockedReason: string;
  }
>;

export type JarvisAuditResultStatusEventReviewRecord =
  | JarvisAuditResultStatusAuditEventReviewRecord
  | JarvisAuditResultStatusApprovalEventReviewRecord
  | JarvisAuditResultStatusPermissionEventReviewRecord
  | JarvisAuditResultStatusPlannerEventReviewRecord
  | JarvisAuditResultStatusRouterEventReviewRecord
  | JarvisAuditResultStatusBlockedActionEventReviewRecord;

export type JarvisAuditResultStatusResultLedgerRecordReview = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "result ledger foundation";
    ledgerRecordId: `ledger-${string}`;
  }
>;

export type JarvisAuditResultStatusDryRunRecordReview = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "dry-run record review only";
    dryRunRecordId: `dry-run-${string}`;
  }
>;

export type JarvisAuditResultStatusApprovalRecordReview = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "approval record review only";
    approvalRecordId: `approval-record-${string}`;
  }
>;

export type JarvisAuditResultStatusBlockedRecordReview = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "blocked record review only";
    blockedRecordId: `blocked-record-${string}`;
  }
>;

export type JarvisAuditResultStatusArtifactPlaceholderReview = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "artifact placeholder review only";
    artifactPlaceholderId: `artifact-${string}`;
  }
>;

export type JarvisAuditResultStatusCapabilityStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "capability status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusWorkspaceStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "workspace status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusAdapterStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "adapter status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusPermissionStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "permission status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusApprovalStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "approval status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusDryRunStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "dry-run status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusRiskStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "risk status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusTradingStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "trading status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusProviderStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "provider status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusWebsiteAvatarStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "website avatar status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusWorkflowStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "workflow status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusMemoryBoundaryStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "memory boundary status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusKillSwitchStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "kill switch status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusLockManagerStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "lock manager status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusIdempotencyStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "idempotency status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusReplayBlockStatusReviewRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "replay block status review only";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusOperatorReviewStatusRecord = Readonly<
  JarvisAuditResultStatusBaseReviewFields & {
    reviewPosture: "operator review status required";
    statusSummary: string;
  }
>;

export type JarvisAuditResultStatusStatusReviewRecord =
  | JarvisAuditResultStatusCapabilityStatusReviewRecord
  | JarvisAuditResultStatusWorkspaceStatusReviewRecord
  | JarvisAuditResultStatusAdapterStatusReviewRecord
  | JarvisAuditResultStatusPermissionStatusReviewRecord
  | JarvisAuditResultStatusApprovalStatusReviewRecord
  | JarvisAuditResultStatusDryRunStatusReviewRecord
  | JarvisAuditResultStatusRiskStatusReviewRecord
  | JarvisAuditResultStatusTradingStatusReviewRecord
  | JarvisAuditResultStatusProviderStatusReviewRecord
  | JarvisAuditResultStatusWebsiteAvatarStatusReviewRecord
  | JarvisAuditResultStatusWorkflowStatusReviewRecord
  | JarvisAuditResultStatusMemoryBoundaryStatusReviewRecord
  | JarvisAuditResultStatusKillSwitchStatusReviewRecord
  | JarvisAuditResultStatusLockManagerStatusReviewRecord
  | JarvisAuditResultStatusIdempotencyStatusReviewRecord
  | JarvisAuditResultStatusReplayBlockStatusReviewRecord
  | JarvisAuditResultStatusOperatorReviewStatusRecord;

export type JarvisAuditResultStatusRouteRecord = Readonly<{
  phaseNumber: number;
  phase: `Phase ${number}`;
  slug: JarvisAuditResultStatusRouteSlug;
  href: JarvisAuditResultStatusRouteHref;
  title: JarvisAuditResultStatusRouteTitle;
  focus: JarvisAuditResultStatusRouteFocus;
  summary: string;
  markerPhrases: readonly string[];
}>;

export type JarvisAuditResultStatusRouteModel = Readonly<{
  route: JarvisAuditResultStatusRouteRecord;
  routes: readonly JarvisAuditResultStatusRouteRecord[];
  capabilityFocus: readonly JarvisAuditResultStatusCapabilityId[];
  examples: readonly JarvisAuditResultStatusReviewSnapshot[];
  reviewHighlights: readonly string[];
  statusHighlights: readonly string[];
  renderNote?: ReactNode;
}>;

export function buildJarvisAuditResultStatusStableKey(
  parts: readonly string[]
): string {
  return parts.join("::").replace(/\s+/g, "-").toLowerCase();
}
