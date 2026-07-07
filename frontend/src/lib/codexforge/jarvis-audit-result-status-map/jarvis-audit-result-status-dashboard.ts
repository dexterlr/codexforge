import type {
  JarvisAuditResultStatusAdapterStatusReviewRecord,
  JarvisAuditResultStatusApprovalStatusReviewRecord,
  JarvisAuditResultStatusCapabilityId,
  JarvisAuditResultStatusCapabilityStatusReviewRecord,
  JarvisAuditResultStatusDryRunStatusReviewRecord,
  JarvisAuditResultStatusIdempotencyStatusReviewRecord,
  JarvisAuditResultStatusKillSwitchStatusReviewRecord,
  JarvisAuditResultStatusLockManagerStatusReviewRecord,
  JarvisAuditResultStatusMemoryBoundaryStatusReviewRecord,
  JarvisAuditResultStatusOperatorReviewStatusRecord,
  JarvisAuditResultStatusPermissionStatusReviewRecord,
  JarvisAuditResultStatusProviderStatusReviewRecord,
  JarvisAuditResultStatusReplayBlockStatusReviewRecord,
  JarvisAuditResultStatusReviewSnapshot,
  JarvisAuditResultStatusRiskStatusReviewRecord,
  JarvisAuditResultStatusRouteModel,
  JarvisAuditResultStatusRouteRecord,
  JarvisAuditResultStatusRouteSlug,
  JarvisAuditResultStatusStatusReviewRecord,
  JarvisAuditResultStatusTradingStatusReviewRecord,
  JarvisAuditResultStatusWebsiteAvatarStatusReviewRecord,
  JarvisAuditResultStatusWorkflowStatusReviewRecord,
  JarvisAuditResultStatusWorkspaceStatusReviewRecord,
} from "./jarvis-audit-result-status-model";
import {
  JARVIS_AUDIT_RESULT_STATUS_ROUTE_SPECS,
} from "./jarvis-audit-result-status-model";
import {
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES,
} from "./jarvis-audit-result-status-ledger";

function buildCapabilityStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusCapabilityStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "capability status review only",
    statusSummary: `${snapshot.capabilityId} remains review-only and execution-blocked.`,
  };
}

function buildWorkspaceStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusWorkspaceStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "workspace status review only",
    statusSummary: `${snapshot.workspaceLabel} stays backend-only and operator-gated.`,
  };
}

function buildAdapterStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusAdapterStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "adapter status review only",
    statusSummary: `${snapshot.adapterStatus} keeps frontend execution blocked.`,
  };
}

function buildPermissionStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusPermissionStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "permission status review only",
    statusSummary: `${snapshot.permissionStatus} remains visible for operator review only.`,
  };
}

function buildApprovalStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusApprovalStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "approval status review only",
    statusSummary: `${snapshot.approvalStatus} keeps operator review status required.`,
  };
}

function buildDryRunStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusDryRunStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "dry-run status review only",
    statusSummary: `${snapshot.dryRunStatus} remains a review-only ledger state.`,
  };
}

function buildRiskStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusRiskStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "risk status review only",
    statusSummary: `${snapshot.riskTier} remains visible in one Jarvis cockpit with shared evidence.`,
  };
}

function buildTradingStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusTradingStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "trading status review only",
    statusSummary: "Trading surfaces remain blocked until explicit operator review and backend ownership exist.",
  };
}

function buildProviderStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusProviderStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "provider status review only",
    statusSummary: "Provider-facing capabilities remain review-only and blocked from live frontend calls.",
  };
}

function buildWebsiteAvatarStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusWebsiteAvatarStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "website avatar status review only",
    statusSummary: "Website and avatar surfaces stay synthetic, approval-required, and execution-blocked.",
  };
}

function buildWorkflowStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusWorkflowStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "workflow status review only",
    statusSummary: "Workflow readiness remains ledger-backed and blocked from worker dispatch.",
  };
}

function buildMemoryBoundaryStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusMemoryBoundaryStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "memory boundary status review only",
    statusSummary: `${snapshot.memoryBoundaryStatus} keeps the evidence layer review-only.`,
  };
}

function buildKillSwitchStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusKillSwitchStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "kill switch status review only",
    statusSummary: `${snapshot.killSwitchStatus} keeps every live path hard-blocked.`,
  };
}

function buildLockManagerStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusLockManagerStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "lock manager status review only",
    statusSummary: `${snapshot.lockIdempotencyStatus} keeps lock manager state review-only.`,
  };
}

function buildIdempotencyStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusIdempotencyStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "idempotency status review only",
    statusSummary: `${snapshot.lockIdempotencyStatus} preserves replay-safe operator review.`,
  };
}

function buildReplayBlockStatusReview(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusReplayBlockStatusReviewRecord {
  return {
    ...snapshot,
    reviewPosture: "replay block status review only",
    statusSummary: `${snapshot.replayBlockStatus} keeps replay block status visible without running anything.`,
  };
}

function buildOperatorReviewStatusRecord(
  snapshot: JarvisAuditResultStatusReviewSnapshot
): JarvisAuditResultStatusOperatorReviewStatusRecord {
  return {
    ...snapshot,
    reviewPosture: "operator review status required",
    statusSummary: `${snapshot.operatorReviewStatus} keeps the operator as final authority.`,
  };
}

export const JARVIS_AUDIT_RESULT_STATUS_CAPABILITY_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildCapabilityStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_WORKSPACE_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildWorkspaceStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_ADAPTER_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildAdapterStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_PERMISSION_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildPermissionStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_APPROVAL_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildApprovalStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_DRY_RUN_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildDryRunStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_RISK_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildRiskStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_TRADING_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildTradingStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_PROVIDER_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildProviderStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_WEBSITE_AVATAR_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildWebsiteAvatarStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_WORKFLOW_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(buildWorkflowStatusReview);

export const JARVIS_AUDIT_RESULT_STATUS_MEMORY_BOUNDARY_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildMemoryBoundaryStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_KILL_SWITCH_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildKillSwitchStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_LOCK_MANAGER_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildLockManagerStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_IDEMPOTENCY_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildIdempotencyStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_REPLAY_BLOCK_STATUS_REVIEWS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildReplayBlockStatusReview
  );

export const JARVIS_AUDIT_RESULT_STATUS_OPERATOR_REVIEW_STATUS_RECORDS =
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
    buildOperatorReviewStatusRecord
  );

export const JARVIS_AUDIT_RESULT_STATUS_STATUS_REVIEW_CATALOG: readonly JarvisAuditResultStatusStatusReviewRecord[] =
  [
    ...JARVIS_AUDIT_RESULT_STATUS_CAPABILITY_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_WORKSPACE_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_ADAPTER_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_PERMISSION_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_APPROVAL_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_DRY_RUN_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_RISK_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_TRADING_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_PROVIDER_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_WEBSITE_AVATAR_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_WORKFLOW_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_MEMORY_BOUNDARY_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_KILL_SWITCH_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_LOCK_MANAGER_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_IDEMPOTENCY_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_REPLAY_BLOCK_STATUS_REVIEWS,
    ...JARVIS_AUDIT_RESULT_STATUS_OPERATOR_REVIEW_STATUS_RECORDS,
  ];

function buildRouteRecord(
  [phaseNumber, slug, href, title, focus]:
    (typeof JARVIS_AUDIT_RESULT_STATUS_ROUTE_SPECS)[number]
): JarvisAuditResultStatusRouteRecord {
  return {
    phaseNumber,
    phase: `Phase ${phaseNumber}`,
    slug,
    href,
    title,
    focus,
    summary:
      `${title} keeps Jarvis audit result ledger and status dashboard only, ` +
      "audit ledger foundation, result ledger foundation, status dashboard foundation, " +
      "one Jarvis cockpit with shared evidence, operator review status required, " +
      "and disabled by default, approval-required, backend-only, and execution-blocked above the task planner, permission engine, and shared backend adapter contract.",
    markerPhrases: [title, href, focus],
  };
}

const ROUTE_CAPABILITY_FOCUS: Partial<
  Record<JarvisAuditResultStatusRouteSlug, readonly JarvisAuditResultStatusCapabilityId[]>
> = {
  "jarvis-status-dashboard-trading-status-wiring": ["trading.paperReview"],
  "jarvis-status-dashboard-workflow-status-wiring": ["workflow.prepare"],
  "jarvis-status-dashboard-provider-status-wiring": [
    "video.generate",
    "avatar.prepare",
    "render.publishReview",
  ],
  "jarvis-status-dashboard-website-avatar-status-wiring": [
    "website.create",
    "avatar.prepare",
  ],
};

export const JARVIS_AUDIT_RESULT_STATUS_ROUTES =
  JARVIS_AUDIT_RESULT_STATUS_ROUTE_SPECS.map(buildRouteRecord);

export function buildJarvisAuditResultStatusRouteModel(
  routeSlug: JarvisAuditResultStatusRouteSlug
): JarvisAuditResultStatusRouteModel {
  const route = JARVIS_AUDIT_RESULT_STATUS_ROUTES.find(
    (entry) => entry.slug === routeSlug
  );
  if (!route) {
    throw new Error(`Unknown Jarvis audit result status route slug: ${routeSlug}`);
  }

  const capabilityFocus = ROUTE_CAPABILITY_FOCUS[routeSlug] ??
    JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.map(
      (record) => record.capabilityId
    );
  const examples = JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.filter((record) =>
    capabilityFocus.includes(record.capabilityId)
  );

  return {
    route,
    routes: JARVIS_AUDIT_RESULT_STATUS_ROUTES,
    capabilityFocus,
    examples,
    reviewHighlights: [
      route.focus,
      "audit event review only",
      "result ledger foundation",
      "status dashboard foundation",
      "operator review status required",
    ],
    statusHighlights: [
      "capability status review only",
      "workspace status review only",
      "adapter status review only",
      "permission status review only",
      "approval status review only",
      "dry-run status review only",
      "risk status review only",
      "trading status review only",
      "provider status review only",
      "website avatar status review only",
      "workflow status review only",
      "memory boundary status review only",
      "kill switch status review only",
      "lock manager status review only",
      "idempotency status review only",
      "replay block status review only",
      "operator review status required",
    ],
  };
}
