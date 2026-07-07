import type {
  JarvisPermissionApprovalEngineApprovalPacketReadiness,
  JarvisPermissionApprovalEngineDecisionStatus,
} from "../jarvis-permission-approval-engine-map/jarvis-permission-approval-engine-model";
import type {
  JarvisSharedBackendAdapterContractCapabilityId,
  JarvisSharedBackendAdapterContractFeatureDomain,
  JarvisSharedBackendAdapterContractRiskTier,
} from "../jarvis-shared-backend-adapter-contract-map/jarvis-shared-backend-adapter-contract-manifest";

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_SPECS = [
  [3658, "jarvis-task-planner-router-boundary-wiring", "/jarvis-task-planner-router-boundary-wiring", "Jarvis Task Planner Router Boundary Wiring", "task planner foundation"],
  [3659, "jarvis-task-planner-router-intent-wiring", "/jarvis-task-planner-router-intent-wiring", "Jarvis Task Planner Router Intent Wiring", "tool router foundation"],
  [3660, "jarvis-task-planner-goal-model-wiring", "/jarvis-task-planner-goal-model-wiring", "Jarvis Task Planner Goal Model Wiring", "user goal review only"],
  [3661, "jarvis-task-planner-user-request-envelope-wiring", "/jarvis-task-planner-user-request-envelope-wiring", "Jarvis Task Planner User Request Envelope Wiring", "request envelope review only"],
  [3662, "jarvis-task-planner-capability-selection-wiring", "/jarvis-task-planner-capability-selection-wiring", "Jarvis Task Planner Capability Selection Wiring", "capability selection review only"],
  [3663, "jarvis-task-planner-step-graph-wiring", "/jarvis-task-planner-step-graph-wiring", "Jarvis Task Planner Step Graph Wiring", "plan graph review only"],
  [3664, "jarvis-task-planner-risk-check-wiring", "/jarvis-task-planner-risk-check-wiring", "Jarvis Task Planner Risk Check Wiring", "risk check required"],
  [3665, "jarvis-task-planner-permission-check-wiring", "/jarvis-task-planner-permission-check-wiring", "Jarvis Task Planner Permission Check Wiring", "permission check required"],
  [3666, "jarvis-task-planner-approval-check-wiring", "/jarvis-task-planner-approval-check-wiring", "Jarvis Task Planner Approval Check Wiring", "approval check required"],
  [3667, "jarvis-task-planner-dry-run-routing-wiring", "/jarvis-task-planner-dry-run-routing-wiring", "Jarvis Task Planner Dry Run Routing Wiring", "dry-run routing required"],
  [3668, "jarvis-task-planner-tool-router-contract-wiring", "/jarvis-task-planner-tool-router-contract-wiring", "Jarvis Task Planner Tool Router Contract Wiring", "tool router contract review only"],
  [3669, "jarvis-task-planner-backend-adapter-routing-wiring", "/jarvis-task-planner-backend-adapter-routing-wiring", "Jarvis Task Planner Backend Adapter Routing Wiring", "backend adapter routing review only"],
  [3670, "jarvis-task-planner-video-route-wiring", "/jarvis-task-planner-video-route-wiring", "Jarvis Task Planner Video Route Wiring", "video route review only"],
  [3671, "jarvis-task-planner-website-route-wiring", "/jarvis-task-planner-website-route-wiring", "Jarvis Task Planner Website Route Wiring", "website route review only"],
  [3672, "jarvis-task-planner-avatar-route-wiring", "/jarvis-task-planner-avatar-route-wiring", "Jarvis Task Planner Avatar Route Wiring", "avatar route review only"],
  [3673, "jarvis-task-planner-chatbot-brain-route-wiring", "/jarvis-task-planner-chatbot-brain-route-wiring", "Jarvis Task Planner Chatbot Brain Route Wiring", "chatbot brain route review only"],
  [3674, "jarvis-task-planner-trading-route-wiring", "/jarvis-task-planner-trading-route-wiring", "Jarvis Task Planner Trading Route Wiring", "trading route review only"],
  [3675, "jarvis-task-planner-workflow-route-wiring", "/jarvis-task-planner-workflow-route-wiring", "Jarvis Task Planner Workflow Route Wiring", "workflow route review only"],
  [3676, "jarvis-task-planner-render-publish-route-wiring", "/jarvis-task-planner-render-publish-route-wiring", "Jarvis Task Planner Render Publish Route Wiring", "render publish route review only"],
  [3677, "jarvis-task-planner-operator-decision-wiring", "/jarvis-task-planner-operator-decision-wiring", "Jarvis Task Planner Operator Decision Wiring", "operator decision preview only"],
  [3678, "jarvis-task-planner-blocked-action-summary-wiring", "/jarvis-task-planner-blocked-action-summary-wiring", "Jarvis Task Planner Blocked Action Summary Wiring", "blocked action summary only"],
  [3679, "jarvis-task-planner-approval-packet-request-wiring", "/jarvis-task-planner-approval-packet-request-wiring", "Jarvis Task Planner Approval Packet Request Wiring", "approval packet request readiness only"],
  [3680, "jarvis-task-planner-audit-preview-wiring", "/jarvis-task-planner-audit-preview-wiring", "Jarvis Task Planner Audit Preview Wiring", "audit preview only"],
  [3681, "jarvis-task-planner-result-ledger-preview-wiring", "/jarvis-task-planner-result-ledger-preview-wiring", "Jarvis Task Planner Result Ledger Preview Wiring", "result ledger preview only"],
  [3682, "jarvis-task-planner-memory-boundary-preview-wiring", "/jarvis-task-planner-memory-boundary-preview-wiring", "Jarvis Task Planner Memory Boundary Preview Wiring", "memory boundary preview only"],
  [3683, "jarvis-task-planner-kill-switch-check-wiring", "/jarvis-task-planner-kill-switch-check-wiring", "Jarvis Task Planner Kill Switch Check Wiring", "kill switch check required"],
  [3684, "jarvis-task-planner-lock-idempotency-check-wiring", "/jarvis-task-planner-lock-idempotency-check-wiring", "Jarvis Task Planner Lock Idempotency Check Wiring", "lock manager check required"],
  [3685, "jarvis-task-planner-replay-block-check-wiring", "/jarvis-task-planner-replay-block-check-wiring", "Jarvis Task Planner Replay Block Check Wiring", "replay block check required"],
  [3686, "jarvis-task-planner-router-status-dashboard-wiring", "/jarvis-task-planner-router-status-dashboard-wiring", "Jarvis Task Planner Router Status Dashboard Wiring", "one Jarvis brain with shared tool routing"],
  [3687, "jarvis-task-planner-human-review-wiring", "/jarvis-task-planner-human-review-wiring", "Jarvis Task Planner Human Review Wiring", "human review required before any execution"],
  [3688, "jarvis-task-planner-no-execution-guard-wiring", "/jarvis-task-planner-no-execution-guard-wiring", "Jarvis Task Planner No Execution Guard Wiring", "no direct frontend execution"],
  [3689, "jarvis-task-planner-tool-router-completion", "/jarvis-task-planner-tool-router-completion", "Jarvis Task Planner Tool Router Completion", "task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation"],
] as const;

type JarvisTaskPlannerToolRouterRouteSpec =
  (typeof JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_SPECS)[number];

export type JarvisTaskPlannerToolRouterRouteSlug =
  JarvisTaskPlannerToolRouterRouteSpec[1];

export type JarvisTaskPlannerToolRouterRouteHref =
  JarvisTaskPlannerToolRouterRouteSpec[2];

export type JarvisTaskPlannerToolRouterRouteTitle =
  JarvisTaskPlannerToolRouterRouteSpec[3];

export type JarvisTaskPlannerToolRouterRouteFocus =
  JarvisTaskPlannerToolRouterRouteSpec[4];

export type JarvisTaskPlannerToolRouterCapabilityId =
  JarvisSharedBackendAdapterContractCapabilityId;

export type JarvisTaskPlannerToolRouterFeatureDomain =
  JarvisSharedBackendAdapterContractFeatureDomain;

export type JarvisTaskPlannerToolRouterRiskTier =
  JarvisSharedBackendAdapterContractRiskTier;

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_PLANNED_ROUTE_TARGETS = [
  "/jarvis-task-planner-video-route-wiring",
  "/jarvis-task-planner-website-route-wiring",
  "/jarvis-task-planner-avatar-route-wiring",
  "/jarvis-task-planner-chatbot-brain-route-wiring",
  "/jarvis-task-planner-trading-route-wiring",
  "/jarvis-task-planner-workflow-route-wiring",
  "/jarvis-task-planner-render-publish-route-wiring",
] as const;

export type JarvisTaskPlannerToolRouterPlannedRouteTarget =
  (typeof JARVIS_TASK_PLANNER_TOOL_ROUTER_PLANNED_ROUTE_TARGETS)[number];

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_APPROVAL_DECISION_STATUSES = [
  "review-only",
  "dry-run-only",
  "approval-required",
  "approval-and-audit-required",
  "human-review-required",
  "blocked-until-backend-owned-adapter",
] as const;

export type JarvisTaskPlannerToolRouterApprovalDecisionStatus =
  (typeof JARVIS_TASK_PLANNER_TOOL_ROUTER_APPROVAL_DECISION_STATUSES)[number];

export type JarvisTaskPlannerToolRouterUserGoalReviewRecord = Readonly<{
  goalId: `goal-${string}`;
  reviewPosture: "user goal review only";
  userGoalExample: string;
  goalSummary: string;
}>;

export type JarvisTaskPlannerToolRouterRequestEnvelopeReviewRecord = Readonly<{
  reviewPosture: "request envelope review only";
  requestEnvelopeName: `${string}Envelope`;
  reviewFields: readonly string[];
}>;

export type JarvisTaskPlannerToolRouterPlanStepReviewRecord = Readonly<{
  stepId: `step-${number}`;
  reviewPosture: "plan step review only";
  title: string;
  checkpoint: string;
  blockedActions: readonly string[];
}>;

export type JarvisTaskPlannerToolRouterPlanGraphReviewRecord = Readonly<{
  graphId: `graph-${JarvisTaskPlannerToolRouterCapabilityId}`;
  reviewPosture: "plan graph review only";
  notes: readonly string[];
  steps: readonly JarvisTaskPlannerToolRouterPlanStepReviewRecord[];
}>;

export type JarvisTaskPlannerToolRouterCapabilitySelectionReviewRecord = Readonly<{
  reviewPosture: "capability selection review only";
  capabilityId: JarvisTaskPlannerToolRouterCapabilityId;
  featureDomain: JarvisTaskPlannerToolRouterFeatureDomain;
  workspaceLabel: string;
  selectionReason: string;
}>;

export type JarvisTaskPlannerToolRouterRouteCandidateReviewRecord = Readonly<{
  toolRouterContractPosture: "tool router contract review only";
  backendAdapterRoutingPosture: "backend adapter routing review only";
  selectedAdapterId: `jarvis.${JarvisTaskPlannerToolRouterCapabilityId}`;
  plannedRouteTarget: JarvisTaskPlannerToolRouterPlannedRouteTarget;
  dryRunRouteRequired: true;
  backendOnlyRouteRequired: true;
}>;

export type JarvisTaskPlannerToolRouterPermissionCheckReviewRecord = Readonly<{
  reviewPosture: "permission check required";
  permissionDecisionStatus: JarvisPermissionApprovalEngineDecisionStatus;
  reasons: readonly string[];
}>;

export type JarvisTaskPlannerToolRouterApprovalCheckReviewRecord = Readonly<{
  reviewPosture: "approval check required";
  approvalDecisionStatus: JarvisTaskPlannerToolRouterApprovalDecisionStatus;
  approvalPacketReadiness: JarvisPermissionApprovalEngineApprovalPacketReadiness;
  summary: string;
}>;

export type JarvisTaskPlannerToolRouterDryRunRoutingReviewRecord = Readonly<{
  reviewPosture: "dry-run routing required";
  dryRunRouteRequired: true;
  backendOnlyRouteRequired: true;
  routeSummary: string;
}>;

export type JarvisTaskPlannerToolRouterBlockedActionSummaryReviewRecord = Readonly<{
  reviewPosture: "blocked action summary only";
  blockedActions: readonly string[];
  summary: string;
}>;

export type JarvisTaskPlannerToolRouterApprovalPacketRequestReviewRecord = Readonly<{
  reviewPosture: "approval packet request readiness only";
  approvalPacketReadiness: JarvisPermissionApprovalEngineApprovalPacketReadiness;
  requiredApprovers: readonly string[];
}>;

export type JarvisTaskPlannerToolRouterHumanOperatorReviewRecord = Readonly<{
  reviewPosture: "human review required before any execution";
  operatorRoles: readonly string[];
  operatorDecisionPreviewPosture: "operator decision preview only";
}>;

export type JarvisTaskPlannerToolRouterPlanRecord = Readonly<{
  capabilityId: JarvisTaskPlannerToolRouterCapabilityId;
  featureDomain: JarvisTaskPlannerToolRouterFeatureDomain;
  workspaceLabel: string;
  userGoalExample: string;
  requestEnvelopeName: `${string}Envelope`;
  selectedAdapterId: `jarvis.${JarvisTaskPlannerToolRouterCapabilityId}`;
  plannedRouteTarget: JarvisTaskPlannerToolRouterPlannedRouteTarget;
  riskTier: JarvisTaskPlannerToolRouterRiskTier;
  permissionDecisionStatus: JarvisPermissionApprovalEngineDecisionStatus;
  approvalDecisionStatus: JarvisTaskPlannerToolRouterApprovalDecisionStatus;
  dryRunRouteRequired: true;
  backendOnlyRouteRequired: true;
  blockedActions: readonly string[];
  approvalPacketReadiness: JarvisPermissionApprovalEngineApprovalPacketReadiness;
  approvalPacketRequestPosture: "approval packet request readiness only";
  auditPreviewPosture: "audit preview only";
  resultLedgerPreviewPosture: "result ledger preview only";
  memoryBoundaryPreviewPosture: "memory boundary preview only";
  killSwitchCheckPosture: "kill switch check required";
  lockManagerCheckPosture: "lock manager check required";
  idempotencyCheckPosture: "idempotency check required";
  replayBlockPosture: "replay block check required";
  humanReviewPosture: "human review required before any execution";
  executionPosture: "task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation";
  userGoalReview: JarvisTaskPlannerToolRouterUserGoalReviewRecord;
  requestEnvelopeReview: JarvisTaskPlannerToolRouterRequestEnvelopeReviewRecord;
  planGraphReview: JarvisTaskPlannerToolRouterPlanGraphReviewRecord;
  capabilitySelectionReview: JarvisTaskPlannerToolRouterCapabilitySelectionReviewRecord;
  routeCandidateReview: JarvisTaskPlannerToolRouterRouteCandidateReviewRecord;
  permissionCheckReview: JarvisTaskPlannerToolRouterPermissionCheckReviewRecord;
  approvalCheckReview: JarvisTaskPlannerToolRouterApprovalCheckReviewRecord;
  dryRunRoutingReview: JarvisTaskPlannerToolRouterDryRunRoutingReviewRecord;
  blockedActionSummaryReview: JarvisTaskPlannerToolRouterBlockedActionSummaryReviewRecord;
  approvalPacketRequestReview: JarvisTaskPlannerToolRouterApprovalPacketRequestReviewRecord;
  humanOperatorReview: JarvisTaskPlannerToolRouterHumanOperatorReviewRecord;
}>;

export function buildJarvisTaskPlannerToolRouterStableKey(
  parts: readonly string[]
): string {
  return parts.join("::").replace(/\s+/g, "-").toLowerCase();
}
