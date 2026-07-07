const JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTE_SPECS = [
  [3626, "jarvis-permission-approval-boundary-wiring", "/jarvis-permission-approval-boundary-wiring", "Jarvis Permission Approval Boundary Wiring", "permission engine foundation"],
  [3627, "jarvis-permission-approval-intent-wiring", "/jarvis-permission-approval-intent-wiring", "Jarvis Permission Approval Intent Wiring", "one Jarvis brain with shared permissions"],
  [3628, "jarvis-permission-approval-policy-model-wiring", "/jarvis-permission-approval-policy-model-wiring", "Jarvis Permission Approval Policy Model Wiring", "centralized permission decision model"],
  [3629, "jarvis-permission-approval-risk-tier-wiring", "/jarvis-permission-approval-risk-tier-wiring", "Jarvis Permission Approval Risk Tier Wiring", "risk tier review only"],
  [3630, "jarvis-permission-approval-capability-permission-wiring", "/jarvis-permission-approval-capability-permission-wiring", "Jarvis Permission Approval Capability Permission Wiring", "capability permission policy required"],
  [3631, "jarvis-permission-approval-adapter-permission-wiring", "/jarvis-permission-approval-adapter-permission-wiring", "Jarvis Permission Approval Adapter Permission Wiring", "adapter permission policy required"],
  [3632, "jarvis-permission-approval-workspace-permission-wiring", "/jarvis-permission-approval-workspace-permission-wiring", "Jarvis Permission Approval Workspace Permission Wiring", "workspace permission policy required"],
  [3633, "jarvis-permission-approval-operator-role-wiring", "/jarvis-permission-approval-operator-role-wiring", "Jarvis Permission Approval Operator Role Wiring", "operator role review only"],
  [3634, "jarvis-permission-approval-human-gate-wiring", "/jarvis-permission-approval-human-gate-wiring", "Jarvis Permission Approval Human Gate Wiring", "human approval gate required"],
  [3635, "jarvis-permission-approval-dry-run-required-wiring", "/jarvis-permission-approval-dry-run-required-wiring", "Jarvis Permission Approval Dry Run Required Wiring", "dry-run required before execution"],
  [3636, "jarvis-permission-approval-approval-mode-wiring", "/jarvis-permission-approval-approval-mode-wiring", "Jarvis Permission Approval Approval Mode Wiring", "approval mode required"],
  [3637, "jarvis-permission-approval-deny-reason-wiring", "/jarvis-permission-approval-deny-reason-wiring", "Jarvis Permission Approval Deny Reason Wiring", "deny reason required"],
  [3638, "jarvis-permission-approval-blocked-action-wiring", "/jarvis-permission-approval-blocked-action-wiring", "Jarvis Permission Approval Blocked Action Wiring", "blocked action category required"],
  [3639, "jarvis-permission-approval-review-packet-wiring", "/jarvis-permission-approval-review-packet-wiring", "Jarvis Permission Approval Review Packet Wiring", "approval packet readiness only"],
  [3640, "jarvis-permission-approval-cost-limit-wiring", "/jarvis-permission-approval-cost-limit-wiring", "Jarvis Permission Approval Cost Limit Wiring", "cost limit posture required"],
  [3641, "jarvis-permission-approval-rate-limit-wiring", "/jarvis-permission-approval-rate-limit-wiring", "Jarvis Permission Approval Rate Limit Wiring", "rate limit posture required"],
  [3642, "jarvis-permission-approval-timeout-limit-wiring", "/jarvis-permission-approval-timeout-limit-wiring", "Jarvis Permission Approval Timeout Limit Wiring", "timeout posture required"],
  [3643, "jarvis-permission-approval-data-sensitivity-wiring", "/jarvis-permission-approval-data-sensitivity-wiring", "Jarvis Permission Approval Data Sensitivity Wiring", "data sensitivity posture required"],
  [3644, "jarvis-permission-approval-secret-boundary-wiring", "/jarvis-permission-approval-secret-boundary-wiring", "Jarvis Permission Approval Secret Boundary Wiring", "secret boundary posture required"],
  [3645, "jarvis-permission-approval-trading-risk-wiring", "/jarvis-permission-approval-trading-risk-wiring", "Jarvis Permission Approval Trading Risk Wiring", "trading risk remains critical"],
  [3646, "jarvis-permission-approval-provider-risk-wiring", "/jarvis-permission-approval-provider-risk-wiring", "Jarvis Permission Approval Provider Risk Wiring", "provider risk remains approval-gated"],
  [3647, "jarvis-permission-approval-website-risk-wiring", "/jarvis-permission-approval-website-risk-wiring", "Jarvis Permission Approval Website Risk Wiring", "website creation risk remains approval-gated"],
  [3648, "jarvis-permission-approval-avatar-risk-wiring", "/jarvis-permission-approval-avatar-risk-wiring", "Jarvis Permission Approval Avatar Risk Wiring", "avatar risk remains approval-gated"],
  [3649, "jarvis-permission-approval-workflow-risk-wiring", "/jarvis-permission-approval-workflow-risk-wiring", "Jarvis Permission Approval Workflow Risk Wiring", "workflow risk remains approval-gated"],
  [3650, "jarvis-permission-approval-audit-hook-wiring", "/jarvis-permission-approval-audit-hook-wiring", "Jarvis Permission Approval Audit Hook Wiring", "audit hook readiness only"],
  [3651, "jarvis-permission-approval-result-ledger-hook-wiring", "/jarvis-permission-approval-result-ledger-hook-wiring", "Jarvis Permission Approval Result Ledger Hook Wiring", "result ledger hook readiness only"],
  [3652, "jarvis-permission-approval-memory-boundary-hook-wiring", "/jarvis-permission-approval-memory-boundary-hook-wiring", "Jarvis Permission Approval Memory Boundary Hook Wiring", "memory boundary hook readiness only"],
  [3653, "jarvis-permission-approval-kill-switch-hook-wiring", "/jarvis-permission-approval-kill-switch-hook-wiring", "Jarvis Permission Approval Kill Switch Hook Wiring", "kill switch hook required"],
  [3654, "jarvis-permission-approval-replay-block-hook-wiring", "/jarvis-permission-approval-replay-block-hook-wiring", "Jarvis Permission Approval Replay Block Hook Wiring", "replay block hook required"],
  [3655, "jarvis-permission-approval-status-dashboard-wiring", "/jarvis-permission-approval-status-dashboard-wiring", "Jarvis Permission Approval Status Dashboard Wiring", "allowed for review only"],
  [3656, "jarvis-permission-approval-operator-review-wiring", "/jarvis-permission-approval-operator-review-wiring", "Jarvis Permission Approval Operator Review Wiring", "operator review required before any execution"],
  [3657, "jarvis-permission-approval-engine-completion", "/jarvis-permission-approval-engine-completion", "Jarvis Permission Approval Engine Completion", "permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation"],
] as const;

type JarvisPermissionApprovalEngineRouteSpec =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTE_SPECS)[number];

export type JarvisPermissionApprovalEngineRouteSlug =
  JarvisPermissionApprovalEngineRouteSpec[1];

type JarvisPermissionApprovalEngineRouteHref =
  JarvisPermissionApprovalEngineRouteSpec[2];

type JarvisPermissionApprovalEngineRouteTitle =
  JarvisPermissionApprovalEngineRouteSpec[3];

type JarvisPermissionApprovalEngineRouteFocus =
  JarvisPermissionApprovalEngineRouteSpec[4];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_CAPABILITY_IDS = [
  "video.generate",
  "website.create",
  "avatar.prepare",
  "chatbot.plan",
  "trading.paperReview",
  "workflow.prepare",
  "render.publishReview",
] as const;

export type JarvisPermissionApprovalEngineCapabilityId =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_CAPABILITY_IDS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_FEATURE_DOMAINS = [
  "video",
  "website",
  "avatar",
  "chatbot-brain",
  "trading",
  "workflow",
  "render-publish",
] as const;

export type JarvisPermissionApprovalEngineFeatureDomain =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_FEATURE_DOMAINS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_STATUSES = [
  "allowed-for-review",
  "dry-run-only",
  "approval-required",
  "blocked",
  "kill-switch-blocked",
  "unsupported",
  "needs-human-operator-review",
] as const;

export type JarvisPermissionApprovalEngineDecisionStatus =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_STATUSES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_TIERS = [
  "operator-moderate",
  "operator-high",
  "operator-critical",
] as const;

export type JarvisPermissionApprovalEngineRiskTier =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_TIERS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_APPROVAL_MODES = [
  "review-only",
  "dry-run-only",
  "manual-approval-required",
  "manual-approval-and-audit-required",
  "manual-human-review-required",
  "blocked-until-backend-owned-adapter",
  "unsupported",
] as const;

export type JarvisPermissionApprovalEngineApprovalMode =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_APPROVAL_MODES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DRY_RUN_REQUIREMENTS = [
  "dry-run-review-only",
  "dry-run-required-before-execution",
] as const;

export type JarvisPermissionApprovalEngineDryRunRequirement =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_DRY_RUN_REQUIREMENTS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_BACKEND_ONLY_REQUIREMENTS = [
  "backend-only-required",
] as const;

export type JarvisPermissionApprovalEngineBackendOnlyRequirement =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_BACKEND_ONLY_REQUIREMENTS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_HUMAN_APPROVAL_REQUIREMENTS = [
  "human approval gate required",
  "human approval gate optional",
] as const;

export type JarvisPermissionApprovalEngineHumanApprovalRequirement =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_HUMAN_APPROVAL_REQUIREMENTS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_OPERATOR_ROLES = [
  "operator",
  "approver",
  "auditor",
  "human-reviewer",
] as const;

export type JarvisPermissionApprovalEngineOperatorRole =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_OPERATOR_ROLES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DENIAL_REASONS = [
  "no direct frontend execution",
  "backend-owned adapter required",
  "operator review required before any execution",
  "human operator review required",
  "no provider execution",
  "no video provider execution",
  "no website creation execution",
  "no avatar generation execution",
  "no chatbot autonomous execution",
  "no trading execution",
  "no paper trading execution",
  "no real-money trading execution",
  "no render execution",
  "no export execution",
  "no publish execution",
  "no worker dispatch",
  "no network execution",
  "kill switch hook required",
  "hard kill switch",
  "unsupported capability",
] as const;

export type JarvisPermissionApprovalEngineDenialReason =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_DENIAL_REASONS)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_BLOCKED_ACTION_CATEGORIES = [
  "provider execution",
  "website creation execution",
  "avatar generation execution",
  "chatbot autonomous execution",
  "trading execution",
  "render export publish execution",
  "worker dispatch",
  "network execution",
  "file export and file write",
  "oauth webhook schedule execution",
] as const;

export type JarvisPermissionApprovalEngineBlockedActionCategory =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_BLOCKED_ACTION_CATEGORIES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_APPROVAL_PACKET_READINESS_STATES = [
  "approval-packet-ready-for-review",
  "approval-packet-operator-review-required",
  "approval-packet-blocked",
] as const;

export type JarvisPermissionApprovalEngineApprovalPacketReadiness =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_APPROVAL_PACKET_READINESS_STATES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_COST_LIMIT_POSTURES = [
  "cost limit posture required",
] as const;

export type JarvisPermissionApprovalEngineCostLimitPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_COST_LIMIT_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_RATE_LIMIT_POSTURES = [
  "rate limit posture required",
] as const;

export type JarvisPermissionApprovalEngineRateLimitPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_RATE_LIMIT_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_TIMEOUT_POSTURES = [
  "timeout posture required",
] as const;

export type JarvisPermissionApprovalEngineTimeoutPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_TIMEOUT_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DATA_SENSITIVITY_POSTURES = [
  "data sensitivity posture required",
] as const;

export type JarvisPermissionApprovalEngineDataSensitivityPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_DATA_SENSITIVITY_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_SECRET_BOUNDARY_POSTURES = [
  "secret boundary posture required",
] as const;

export type JarvisPermissionApprovalEngineSecretBoundaryPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_SECRET_BOUNDARY_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_AUDIT_HOOK_POSTURES = [
  "audit hook readiness only",
] as const;

export type JarvisPermissionApprovalEngineAuditHookPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_AUDIT_HOOK_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_RESULT_LEDGER_HOOK_POSTURES = [
  "result ledger hook readiness only",
] as const;

export type JarvisPermissionApprovalEngineResultLedgerHookPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_RESULT_LEDGER_HOOK_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_MEMORY_BOUNDARY_POSTURES = [
  "memory boundary hook readiness only",
] as const;

export type JarvisPermissionApprovalEngineMemoryBoundaryPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_MEMORY_BOUNDARY_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_KILL_SWITCH_POSTURES = [
  "kill switch hook required",
  "kill-switch blocked decision",
] as const;

export type JarvisPermissionApprovalEngineKillSwitchPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_KILL_SWITCH_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_REPLAY_BLOCK_POSTURES = [
  "replay block hook required",
] as const;

export type JarvisPermissionApprovalEngineReplayBlockPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_REPLAY_BLOCK_POSTURES)[number];

export const JARVIS_PERMISSION_APPROVAL_ENGINE_OPERATOR_REVIEW_POSTURES = [
  "operator review required before any execution",
] as const;

export type JarvisPermissionApprovalEngineOperatorReviewPosture =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_OPERATOR_REVIEW_POSTURES)[number];

export type JarvisPermissionApprovalEnginePolicyRecord = Readonly<{
  capabilityId: JarvisPermissionApprovalEngineCapabilityId;
  featureDomain: JarvisPermissionApprovalEngineFeatureDomain;
  riskTier: JarvisPermissionApprovalEngineRiskTier;
  permissionPosture: JarvisPermissionApprovalEngineDecisionStatus;
  approvalMode: JarvisPermissionApprovalEngineApprovalMode;
  dryRunRequirement: JarvisPermissionApprovalEngineDryRunRequirement;
  backendOnlyRequirement: JarvisPermissionApprovalEngineBackendOnlyRequirement;
  humanApprovalRequirement: JarvisPermissionApprovalEngineHumanApprovalRequirement;
  operatorRoles: readonly JarvisPermissionApprovalEngineOperatorRole[];
  blockedActionCategories: readonly JarvisPermissionApprovalEngineBlockedActionCategory[];
  denialReasons: readonly JarvisPermissionApprovalEngineDenialReason[];
  approvalPacketReadiness: JarvisPermissionApprovalEngineApprovalPacketReadiness;
  costLimitPosture: JarvisPermissionApprovalEngineCostLimitPosture;
  rateLimitPosture: JarvisPermissionApprovalEngineRateLimitPosture;
  timeoutPosture: JarvisPermissionApprovalEngineTimeoutPosture;
  dataSensitivityPosture: JarvisPermissionApprovalEngineDataSensitivityPosture;
  secretBoundaryPosture: JarvisPermissionApprovalEngineSecretBoundaryPosture;
  auditHookPosture: JarvisPermissionApprovalEngineAuditHookPosture;
  resultLedgerHookPosture: JarvisPermissionApprovalEngineResultLedgerHookPosture;
  memoryBoundaryPosture: JarvisPermissionApprovalEngineMemoryBoundaryPosture;
  killSwitchPosture: JarvisPermissionApprovalEngineKillSwitchPosture;
  replayBlockPosture: JarvisPermissionApprovalEngineReplayBlockPosture;
  operatorReviewPosture: JarvisPermissionApprovalEngineOperatorReviewPosture;
  notes: readonly string[];
}>;

export type JarvisPermissionApprovalEngineDecisionRecord = Readonly<{
  capabilityId: string;
  requestedAction: "review" | "dry-run" | "execute";
  status: JarvisPermissionApprovalEngineDecisionStatus;
  summary: string;
  approvalPacketReadiness: JarvisPermissionApprovalEngineApprovalPacketReadiness;
  blockedActionCategories: readonly JarvisPermissionApprovalEngineBlockedActionCategory[];
  denialReasons: readonly JarvisPermissionApprovalEngineDenialReason[];
  humanOperatorReviewRequired: boolean;
  backendOnlyRequired: boolean;
  killSwitchRequired: boolean;
  policy: JarvisPermissionApprovalEnginePolicyRecord | null;
}>;

function buildJarvisPermissionApprovalEngineRouteSummary(
  title: JarvisPermissionApprovalEngineRouteTitle,
  focus: JarvisPermissionApprovalEngineRouteFocus
) {
  return (
    title +
    " is a Jarvis Permission and Approval Engine surface. It keeps Jarvis Permission and Approval Engine, Jarvis permission and approval engine only, permission engine foundation, approval engine foundation, centralized permission decision model, one Jarvis brain with shared permissions, disabled by default, approval-required, backend-only, and execution-blocked. It defines allowed for review only, dry-run only decision, approval required decision, blocked decision, kill-switch blocked decision, unsupported decision, human operator review required, capability permission policy required, adapter permission policy required, workspace permission policy required, operator role review only, human approval gate required, dry-run required before execution, approval mode required, deny reason required, blocked action category required, approval packet readiness only, cost limit posture required, rate limit posture required, timeout posture required, data sensitivity posture required, secret boundary posture required, trading risk remains critical, provider risk remains approval-gated, website creation risk remains approval-gated, avatar risk remains approval-gated, workflow risk remains approval-gated, audit hook readiness only, result ledger hook readiness only, memory boundary hook readiness only, kill switch hook required, replay block hook required, and operator review required before any execution. Route focus: " +
    focus +
    ". Permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation. Next likely batch: 3658-3689 - Jarvis Task Planner and Tool Router."
  );
}

function buildJarvisPermissionApprovalEngineRouteMarkers(
  phase: JarvisPermissionApprovalEngineRouteSpec[0],
  title: JarvisPermissionApprovalEngineRouteTitle,
  slug: JarvisPermissionApprovalEngineRouteSlug,
  href: JarvisPermissionApprovalEngineRouteHref,
  focus: JarvisPermissionApprovalEngineRouteFocus
) {
  return [
    String(phase) + " " + title,
    slug,
    href,
    title,
    focus,
    title +
      " keeps Jarvis Permission and Approval Engine, Jarvis permission and approval engine only, permission engine foundation, approval engine foundation, centralized permission decision model, one Jarvis brain with shared permissions, disabled by default, approval-required, backend-only, and execution-blocked",
    title +
      " keeps allowed for review only, dry-run only decision, approval required decision, blocked decision, kill-switch blocked decision, unsupported decision, human operator review required, capability permission policy required, adapter permission policy required, workspace permission policy required, operator role review only, human approval gate required, dry-run required before execution, approval mode required, deny reason required, blocked action category required, approval packet readiness only, cost limit posture required, rate limit posture required, timeout posture required, data sensitivity posture required, and secret boundary posture required",
    title +
      " keeps trading risk remains critical, provider risk remains approval-gated, website creation risk remains approval-gated, avatar risk remains approval-gated, workflow risk remains approval-gated, audit hook readiness only, result ledger hook readiness only, memory boundary hook readiness only, kill switch hook required, replay block hook required, operator review required before any execution, permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation, disabled by default, and hard kill switch",
    title +
      " keeps no direct frontend execution, no live provider call, no provider execution, no video provider execution, no image provider execution, no audio provider execution, no website creation execution, no avatar generation execution, no chatbot autonomous execution, no trading execution, no paper trading execution, no real-money trading execution, no network execution, no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no media upload, no OAuth flow creation, no webhook creation, no schedule execution, no account authorization execution, no API route execution, no service creation, no runtime deploy, no file writes from the app, no shell/process/command execution from the app, no fetch/network calls, no provider SDK imports in frontend, no frontend provider key reads, no plaintext secrets, no localStorage, no sessionStorage, no IndexedDB, no cookies, and no browser storage for secrets",
  ] as const;
}

function buildJarvisPermissionApprovalEngineRoute(
  phaseNumber: JarvisPermissionApprovalEngineRouteSpec[0],
  slug: JarvisPermissionApprovalEngineRouteSlug,
  href: JarvisPermissionApprovalEngineRouteHref,
  title: JarvisPermissionApprovalEngineRouteTitle,
  focus: JarvisPermissionApprovalEngineRouteFocus
) {
  return {
    slug,
    href,
    phase: `Phase ${phaseNumber}`,
    phaseNumber,
    title,
    focus,
    commandLabel: `Go to ${title}`,
    summary: buildJarvisPermissionApprovalEngineRouteSummary(title, focus),
    markerPhrases: buildJarvisPermissionApprovalEngineRouteMarkers(
      phaseNumber,
      title,
      slug,
      href,
      focus
    ),
  } as const;
}

export const JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTES =
  JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTE_SPECS.map(
    ([phaseNumber, slug, href, title, focus]) =>
      buildJarvisPermissionApprovalEngineRoute(
        phaseNumber,
        slug,
        href,
        title,
        focus
      )
  );

export type JarvisPermissionApprovalEngineRoute =
  (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTES)[number];

export function buildJarvisPermissionApprovalEngineStableKey(
  parts: readonly string[]
) {
  return parts.join("::");
}

export function buildJarvisPermissionApprovalEngineRouteModel(
  routeSlug: JarvisPermissionApprovalEngineRouteSlug
) {
  const route =
    JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTES.find(
      (candidate) => candidate.slug === routeSlug
    ) ?? JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTES[0];

  return {
    route,
    routes: JARVIS_PERMISSION_APPROVAL_ENGINE_ROUTES,
  };
}
