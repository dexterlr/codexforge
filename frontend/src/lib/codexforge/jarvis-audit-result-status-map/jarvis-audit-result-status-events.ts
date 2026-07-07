import type {
  JarvisAuditResultStatusApprovalEventReviewRecord,
  JarvisAuditResultStatusAuditEventReviewRecord,
  JarvisAuditResultStatusBlockedActionEventReviewRecord,
  JarvisAuditResultStatusEventReviewRecord,
  JarvisAuditResultStatusPermissionEventReviewRecord,
  JarvisAuditResultStatusPlannerEventReviewRecord,
  JarvisAuditResultStatusReviewSnapshot,
  JarvisAuditResultStatusRouterEventReviewRecord,
} from "./jarvis-audit-result-status-model";
import {
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES,
} from "./jarvis-audit-result-status-ledger";

function buildAuditEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusAuditEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "audit event review only",
    evidenceSummary:
      "Static review-only evidence confirms what Jarvis planned, what it selected, and what remained blocked.",
  };
}

function buildApprovalEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusApprovalEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "approval event review only",
    approvalSummary:
      "Approval posture stays review-only, operator-gated, and backend-only.",
  };
}

function buildPermissionEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusPermissionEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "permission event review only",
    permissionSummary:
      "Permission posture stays manifest-driven, dry-run aware, and execution-blocked.",
  };
}

function buildPlannerEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusPlannerEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "planner event review only",
    plannerSummary:
      "Planner output remains static, reviewed, and ready for operator traceability only.",
  };
}

function buildRouterEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusRouterEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "router event review only",
    routingSummary:
      "Router output stays backend-only and points to future adapter posture without executing it.",
  };
}

function buildBlockedActionEventReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusBlockedActionEventReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "blocked action event review only",
    blockedReason: snapshot.blockedActionSummary,
  };
}

export const JARVIS_AUDIT_RESULT_STATUS_AUDIT_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildAuditEventReview);

export const JARVIS_AUDIT_RESULT_STATUS_APPROVAL_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildApprovalEventReview);

export const JARVIS_AUDIT_RESULT_STATUS_PERMISSION_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildPermissionEventReview);

export const JARVIS_AUDIT_RESULT_STATUS_PLANNER_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildPlannerEventReview);

export const JARVIS_AUDIT_RESULT_STATUS_ROUTER_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildRouterEventReview);

export const JARVIS_AUDIT_RESULT_STATUS_BLOCKED_ACTION_EVENT_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildBlockedActionEventReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_EVENT_REVIEW_CATALOG: readonly JarvisAuditResultStatusEventReviewRecord[] =
  [
    ...JARVIS_AUDIT_RESULT_STATUS_AUDIT_EVENT_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_APPROVAL_EVENT_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_PERMISSION_EVENT_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_PLANNER_EVENT_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_ROUTER_EVENT_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_BLOCKED_ACTION_EVENT_REVIEWS,
  ];
