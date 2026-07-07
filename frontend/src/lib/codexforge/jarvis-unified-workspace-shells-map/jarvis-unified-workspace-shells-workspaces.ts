export const JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACE_IDS = [
  "jarvis",
  "jarvis-video",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-chatbot",
  "jarvis-trading",
  "jarvis-workflows",
  "jarvis-render-publish",
  "jarvis-audit",
  "jarvis-safety",
] as const;

export type JarvisUnifiedWorkspaceShellWorkspaceId =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACE_IDS)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_HREFS = [
  "/jarvis",
  "/jarvis-video",
  "/jarvis-websites",
  "/jarvis-avatar",
  "/jarvis-chatbot",
  "/jarvis-trading",
  "/jarvis-workflows",
  "/jarvis-render-publish",
  "/jarvis-audit",
  "/jarvis-safety",
] as const;

export type JarvisUnifiedWorkspaceShellRouteHref =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_HREFS)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_FEATURE_DOMAINS = [
  "jarvis-command-center",
  "video",
  "website",
  "avatar",
  "chatbot-brain",
  "trading",
  "workflow",
  "render-publish",
  "audit-status",
  "safety-settings",
] as const;

export type JarvisUnifiedWorkspaceShellFeatureDomain =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_FEATURE_DOMAINS)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_CAPABILITY_IDS = [
  "jarvis.commandCenter",
  "video.generate",
  "website.create",
  "avatar.prepare",
  "chatbot.plan",
  "trading.paperReview",
  "workflow.prepare",
  "render.publishReview",
  "audit.statusReview",
  "safety.settingsReview",
] as const;

export type JarvisUnifiedWorkspaceShellCapabilityId =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_CAPABILITY_IDS)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_RISK_TIERS = [
  "operator-moderate",
  "operator-high",
  "operator-critical",
] as const;

export type JarvisUnifiedWorkspaceShellRiskTier =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_RISK_TIERS)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_PERMISSION_POSTURES = [
  "approval-required",
  "approval-and-audit-required",
] as const;

export type JarvisUnifiedWorkspaceShellPermissionPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_PERMISSION_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_APPROVAL_POSTURES = [
  "operator-review-required",
  "operator-and-policy-review-required",
] as const;

export type JarvisUnifiedWorkspaceShellApprovalPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_APPROVAL_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_PLANNER_POSTURES = [
  "shared planner panel only",
] as const;

export type JarvisUnifiedWorkspaceShellPlannerPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_PLANNER_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTER_POSTURES = [
  "backend-only route required",
] as const;

export type JarvisUnifiedWorkspaceShellRouterPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTER_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_AUDIT_POSTURES = [
  "shared audit panel only",
] as const;

export type JarvisUnifiedWorkspaceShellAuditPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_AUDIT_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_RESULT_LEDGER_POSTURES = [
  "shared result ledger panel only",
] as const;

export type JarvisUnifiedWorkspaceShellResultLedgerPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_RESULT_LEDGER_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_STATUS_POSTURES = [
  "shared status overview only",
] as const;

export type JarvisUnifiedWorkspaceShellStatusPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_STATUS_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_MEMORY_BOUNDARY_POSTURES = [
  "shared memory boundary panel only",
] as const;

export type JarvisUnifiedWorkspaceShellMemoryBoundaryPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_MEMORY_BOUNDARY_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_KILL_SWITCH_POSTURES = [
  "shared kill switch panel only",
] as const;

export type JarvisUnifiedWorkspaceShellKillSwitchPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_KILL_SWITCH_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_LOCK_IDEMPOTENCY_POSTURES = [
  "lock and idempotency review only",
] as const;

export type JarvisUnifiedWorkspaceShellLockIdempotencyPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_LOCK_IDEMPOTENCY_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_REPLAY_BLOCK_POSTURES = [
  "replay block required",
] as const;

export type JarvisUnifiedWorkspaceShellReplayBlockPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_REPLAY_BLOCK_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_OPERATOR_REVIEW_POSTURES = [
  "operator review required before any execution",
] as const;

export type JarvisUnifiedWorkspaceShellOperatorReviewPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_OPERATOR_REVIEW_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_EXECUTION_POSTURES = [
  "disabled by default, approval-required, backend-only, and execution-blocked",
  "paper-review only, disabled by default, approval-required, backend-only, and execution-blocked",
] as const;

export type JarvisUnifiedWorkspaceShellExecutionPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_EXECUTION_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_BLOCKED_ACTION_POSTURES = [
  "shared blocked action panel only",
] as const;

export type JarvisUnifiedWorkspaceShellBlockedActionPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_BLOCKED_ACTION_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_DRY_RUN_POSTURES = [
  "shared dry-run panel only",
] as const;

export type JarvisUnifiedWorkspaceShellDryRunPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_DRY_RUN_POSTURES)[number];

export const JARVIS_UNIFIED_WORKSPACE_SHELL_ADAPTER_STATUS_POSTURES = [
  "shared adapter status panel only",
] as const;

export type JarvisUnifiedWorkspaceShellAdapterStatusPosture =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_ADAPTER_STATUS_POSTURES)[number];

export type JarvisUnifiedWorkspaceShellWorkspaceRecord = Readonly<{
  id: JarvisUnifiedWorkspaceShellWorkspaceId;
  routeHref: JarvisUnifiedWorkspaceShellRouteHref;
  label: string;
  shortLabel: string;
  featureDomain: JarvisUnifiedWorkspaceShellFeatureDomain;
  primaryCapabilityIds: readonly JarvisUnifiedWorkspaceShellCapabilityId[];
  riskTier: JarvisUnifiedWorkspaceShellRiskTier;
  permissionPosture: JarvisUnifiedWorkspaceShellPermissionPosture;
  approvalPosture: JarvisUnifiedWorkspaceShellApprovalPosture;
  plannerPosture: JarvisUnifiedWorkspaceShellPlannerPosture;
  routerPosture: JarvisUnifiedWorkspaceShellRouterPosture;
  auditPosture: JarvisUnifiedWorkspaceShellAuditPosture;
  resultLedgerPosture: JarvisUnifiedWorkspaceShellResultLedgerPosture;
  statusPosture: JarvisUnifiedWorkspaceShellStatusPosture;
  memoryBoundaryPosture: JarvisUnifiedWorkspaceShellMemoryBoundaryPosture;
  killSwitchPosture: JarvisUnifiedWorkspaceShellKillSwitchPosture;
  lockIdempotencyPosture: JarvisUnifiedWorkspaceShellLockIdempotencyPosture;
  replayBlockPosture: JarvisUnifiedWorkspaceShellReplayBlockPosture;
  operatorReviewPosture: JarvisUnifiedWorkspaceShellOperatorReviewPosture;
  executionPosture: JarvisUnifiedWorkspaceShellExecutionPosture;
  blockedActionPosture: JarvisUnifiedWorkspaceShellBlockedActionPosture;
  dryRunPosture: JarvisUnifiedWorkspaceShellDryRunPosture;
  adapterStatusPosture: JarvisUnifiedWorkspaceShellAdapterStatusPosture;
  workspaceSummary: string;
  parentControlPlaneSummary: string;
  safetyNotes: readonly string[];
  navigationPriority: number;
}>;

export const JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES = [
  {
    id: "jarvis",
    routeHref: "/jarvis",
    label: "Jarvis Command Center",
    shortLabel: "Jarvis Hub",
    featureDomain: "jarvis-command-center",
    primaryCapabilityIds: [
      "jarvis.commandCenter",
      "video.generate",
      "website.create",
      "avatar.prepare",
      "chatbot.plan",
      "trading.paperReview",
      "workflow.prepare",
      "render.publishReview",
      "audit.statusReview",
      "safety.settingsReview",
    ],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Jarvis command center route keeps one Jarvis command center and one shared workspace shell model above every specialist page.",
    parentControlPlaneSummary:
      "Jarvis operating system with feature workspaces makes specialist pages apps/workspaces inside Jarvis.",
    safetyNotes: [
      "one Jarvis command center",
      "one shared workspace shell model",
      "one Jarvis brain with specialist workspaces",
      "Jarvis operating system with feature workspaces",
      "Jarvis command center route",
    ],
    navigationPriority: 25.37211,
  },
  {
    id: "jarvis-video",
    routeHref: "/jarvis-video",
    label: "Jarvis Video Workspace",
    shortLabel: "Jarvis Video",
    featureDomain: "video",
    primaryCapabilityIds: ["video.generate"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Video review stays inside Jarvis while future backend-owned video adapters remain execution-blocked.",
    parentControlPlaneSummary:
      "Jarvis parent control plane owns approvals, audit, result, risk, memory boundary, and kill switch posture.",
    safetyNotes: [
      "video workspace shell only",
      "specialist pages remain review-only",
      "no video provider execution",
    ],
    navigationPriority: 25.37212,
  },
  {
    id: "jarvis-websites",
    routeHref: "/jarvis-websites",
    label: "Jarvis Website Creation Workspace",
    shortLabel: "Jarvis Web",
    featureDomain: "website",
    primaryCapabilityIds: ["website.create"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Website review stays inside Jarvis while future website creation adapters remain backend-only and blocked.",
    parentControlPlaneSummary:
      "Jarvis keeps website planning, approval, audit, result ledger, and kill switch posture shared across workspaces.",
    safetyNotes: [
      "website creation workspace shell only",
      "specialist pages remain review-only",
      "no website creation execution",
    ],
    navigationPriority: 25.37213,
  },
  {
    id: "jarvis-avatar",
    routeHref: "/jarvis-avatar",
    label: "Jarvis Avatar Workspace",
    shortLabel: "Jarvis Avatar",
    featureDomain: "avatar",
    primaryCapabilityIds: ["avatar.prepare"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Avatar review stays inside Jarvis while future avatar generation adapters remain execution-blocked.",
    parentControlPlaneSummary:
      "Jarvis keeps avatar approvals, audit, result review, memory boundary, replay block, and kill switch posture shared.",
    safetyNotes: [
      "avatar workspace shell only",
      "specialist pages remain review-only",
      "no avatar generation execution",
    ],
    navigationPriority: 25.37214,
  },
  {
    id: "jarvis-chatbot",
    routeHref: "/jarvis-chatbot",
    label: "Jarvis Chatbot Brain Workspace",
    shortLabel: "Jarvis Chat",
    featureDomain: "chatbot-brain",
    primaryCapabilityIds: ["chatbot.plan"],
    riskTier: "operator-moderate",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Chatbot brain planning stays review-only inside Jarvis while autonomous chatbot execution remains blocked.",
    parentControlPlaneSummary:
      "Jarvis parent control plane keeps chatbot planning attached to shared permission, audit, result, and kill switch posture.",
    safetyNotes: [
      "chatbot brain workspace shell only",
      "specialist pages remain review-only",
      "no chatbot autonomous execution",
    ],
    navigationPriority: 25.37215,
  },
  {
    id: "jarvis-trading",
    routeHref: "/jarvis-trading",
    label: "Jarvis Trading Workspace",
    shortLabel: "Jarvis Trade",
    featureDomain: "trading",
    primaryCapabilityIds: ["trading.paperReview"],
    riskTier: "operator-critical",
    permissionPosture: "approval-and-audit-required",
    approvalPosture: "operator-and-policy-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "paper-review only, disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Trading remains a dedicated higher-risk workspace inside Jarvis with paper-review only posture and no live execution path.",
    parentControlPlaneSummary:
      "Jarvis parent control plane owns trading approvals, audit, result, memory boundary, replay block, and hard kill switch posture.",
    safetyNotes: [
      "trading workspace shell only",
      "trading workspace has dedicated page",
      "specialist pages remain review-only",
      "no trading execution",
      "no paper trading execution",
      "no real-money trading execution",
    ],
    navigationPriority: 25.37216,
  },
  {
    id: "jarvis-workflows",
    routeHref: "/jarvis-workflows",
    label: "Jarvis Workflow Workspace",
    shortLabel: "Jarvis Flow",
    featureDomain: "workflow",
    primaryCapabilityIds: ["workflow.prepare"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Workflow planning stays inside Jarvis while worker dispatch, schedule execution, and live automation remain blocked.",
    parentControlPlaneSummary:
      "Jarvis keeps workflow permission, approval, audit, result, replay block, and kill switch posture shared.",
    safetyNotes: [
      "workflow workspace shell only",
      "specialist pages remain review-only",
      "no worker dispatch",
    ],
    navigationPriority: 25.37217,
  },
  {
    id: "jarvis-render-publish",
    routeHref: "/jarvis-render-publish",
    label: "Jarvis Render Publish Workspace",
    shortLabel: "Jarvis Render",
    featureDomain: "render-publish",
    primaryCapabilityIds: ["render.publishReview"],
    riskTier: "operator-high",
    permissionPosture: "approval-and-audit-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Render and publish review stays inside Jarvis while render, export, publish, upload, and runtime execution remain blocked.",
    parentControlPlaneSummary:
      "Jarvis keeps render and publish permission, audit, result, blocked action, memory boundary, and kill switch posture shared.",
    safetyNotes: [
      "render publish workspace shell only",
      "specialist pages remain review-only",
      "no render execution",
      "no export execution",
      "no publish execution",
    ],
    navigationPriority: 25.37218,
  },
  {
    id: "jarvis-audit",
    routeHref: "/jarvis-audit",
    label: "Jarvis Audit Status Workspace",
    shortLabel: "Jarvis Audit",
    featureDomain: "audit-status",
    primaryCapabilityIds: ["audit.statusReview"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Audit and status review stays inside Jarvis so shared evidence remains visible across every specialist workspace.",
    parentControlPlaneSummary:
      "Jarvis keeps audit, result ledger, status, memory boundary, replay block, and kill switch posture shared.",
    safetyNotes: [
      "audit status workspace shell only",
      "specialist pages remain review-only",
      "shared audit panel only",
    ],
    navigationPriority: 25.37219,
  },
  {
    id: "jarvis-safety",
    routeHref: "/jarvis-safety",
    label: "Jarvis Safety Settings Workspace",
    shortLabel: "Jarvis Safety",
    featureDomain: "safety-settings",
    primaryCapabilityIds: ["safety.settingsReview"],
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalPosture: "operator-review-required",
    plannerPosture: "shared planner panel only",
    routerPosture: "backend-only route required",
    auditPosture: "shared audit panel only",
    resultLedgerPosture: "shared result ledger panel only",
    statusPosture: "shared status overview only",
    memoryBoundaryPosture: "shared memory boundary panel only",
    killSwitchPosture: "shared kill switch panel only",
    lockIdempotencyPosture: "lock and idempotency review only",
    replayBlockPosture: "replay block required",
    operatorReviewPosture: "operator review required before any execution",
    executionPosture:
      "disabled by default, approval-required, backend-only, and execution-blocked",
    blockedActionPosture: "shared blocked action panel only",
    dryRunPosture: "shared dry-run panel only",
    adapterStatusPosture: "shared adapter status panel only",
    workspaceSummary:
      "Safety and settings review stays inside Jarvis while secrets, storage mutation, and live authorization remain blocked.",
    parentControlPlaneSummary:
      "Jarvis keeps safety, approval, audit, memory boundary, replay block, and kill switch posture shared across every workspace.",
    safetyNotes: [
      "safety settings workspace shell only",
      "specialist pages remain review-only",
      "hard kill switch",
    ],
    navigationPriority: 25.3722,
  },
] satisfies readonly JarvisUnifiedWorkspaceShellWorkspaceRecord[];

export function getJarvisUnifiedWorkspaceShellWorkspace(
  workspaceId: JarvisUnifiedWorkspaceShellWorkspaceId
) {
  return (
    JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES.find(
      (workspace) => workspace.id === workspaceId
    ) ?? JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES[0]
  );
}
