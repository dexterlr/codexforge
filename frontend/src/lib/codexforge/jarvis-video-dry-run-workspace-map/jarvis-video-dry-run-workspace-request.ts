import {
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES,
} from "../jarvis-audit-result-status-map/jarvis-audit-result-status-ledger";
import {
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES,
} from "../jarvis-permission-approval-engine-map/jarvis-permission-approval-engine-policies";
import {
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST,
} from "../jarvis-shared-backend-adapter-contract-map/jarvis-shared-backend-adapter-contract-manifest";
import {
  JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS,
} from "../jarvis-task-planner-tool-router-map/jarvis-task-planner-tool-router-plans";
import {
  JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES,
} from "../jarvis-unified-workspace-shells-map/jarvis-unified-workspace-shells-workspaces";
import {
  JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES,
  JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS,
  JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS,
} from "../jarvis-video-adapter-plugin-map/jarvis-video-adapter-plugin-contract";

export type JarvisVideoDryRunWorkspaceLinkRecord = Readonly<{
  label: string;
  href: string;
  marker: string;
  posture: string;
  summary: string;
}>;

export type JarvisVideoDryRunWorkspaceMilestoneReference = Readonly<{
  phaseRange: string;
  title: string;
  href: string;
  marker: string;
  summary: string;
}>;

export const JARVIS_VIDEO_DRY_RUN_WORKSPACE_REVIEW_GROUPS = [
  "Integration",
  "Milestones",
  "Request",
  "Guards",
  "Outputs",
  "Operations",
] as const;

export type JarvisVideoDryRunWorkspaceReviewGroup =
  (typeof JARVIS_VIDEO_DRY_RUN_WORKSPACE_REVIEW_GROUPS)[number];

export type JarvisVideoDryRunWorkspaceReviewCard = Readonly<{
  id: string;
  group: JarvisVideoDryRunWorkspaceReviewGroup;
  label: string;
  marker: string;
  posture: string;
  summary: string;
  detail: string;
  href?: string;
}>;

export type JarvisVideoDryRunWorkspaceSharedRecord = Readonly<{
  dryRunWorkspaceId: "jarvis-video-dry-run-workspace-v1";
  workspaceId: "jarvis-video";
  workspaceLabel: string;
  workspaceHref: "/jarvis-video";
  userGoalExample: string;
  capabilityId: "video.generate";
  selectedAdapterCandidate: "jarvis.video.generate";
  backendOnlyAdapterRoute: string;
  backendOnlyRoutePosture: "backend-only execution path required";
  permissionDecision: string;
  approvalRequirement: string;
  approvalMode: string;
  dryRunRequirement: string;
  dryRunRequestEnvelopeName: string;
  contractInputEnvelopeName: string;
  contractOutputEnvelopeName: string;
  contractErrorEnvelopeName: string;
  dryRunEnvelopePreviewFields: readonly string[];
  redactedPromptPreviewLines: readonly string[];
  providerReferenceSummary: string;
  credentialReferenceSummary: string;
  tokenReferenceSummary: string;
  costGuardPosture: string;
  rateGuardPosture: string;
  timeoutGuardPosture: string;
  durationGuardPosture: "duration guard review only";
  resolutionGuardPosture: "resolution guard review only";
  sizeGuardPosture: "size guard review only";
  privacyGuardPosture: string;
  safetyGuardPosture: string;
  durationGuardPreview: string;
  resolutionGuardPreview: string;
  sizeGuardPreview: string;
  resultPlaceholderStatus: string;
  artifactHandoffStatus: string;
  auditPreviewPosture: string;
  resultLedgerPreviewPosture: string;
  statusPreviewPosture: "status preview only";
  statusPreviewSummary: string;
  memoryBoundaryPreviewPosture: string;
  killSwitchCheckPosture: string;
  lockManagerCheckPosture: string;
  idempotencyCheckPosture: string;
  replayBlockCheckPosture: string;
  blockedActionSummary: string;
  blockedActions: readonly string[];
  operatorReviewPosture: "operator review required before video execution";
  operatorRoles: readonly string[];
  executionPosture: string;
  dryRunStatus: string;
  approvalStatus: string;
  resultLedgerStatus: string;
  memoryBoundaryStatus: string;
  killSwitchStatus: string;
  lockIdempotencyStatus: string;
  replayBlockStatus: string;
  operatorReviewStatus: string;
}>;

function requireJarvisVideoDryRunWorkspaceRecord<T>(
  record: T | undefined,
  label: string
) {
  if (!record) {
    throw new Error(`Missing Jarvis video dry-run workspace record: ${label}`);
  }
  return record;
}

const sharedBackendAdapterContractRecord =
  requireJarvisVideoDryRunWorkspaceRecord(
    JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.find(
      (record) => record.capabilityId === "video.generate"
    ),
    "shared backend adapter contract / video.generate"
  );

const permissionPolicyRecord = requireJarvisVideoDryRunWorkspaceRecord(
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "permission approval engine / video.generate"
);

const plannerRouteRecord = requireJarvisVideoDryRunWorkspaceRecord(
  JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "task planner tool router / video.generate"
);

const auditStatusRecord = requireJarvisVideoDryRunWorkspaceRecord(
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "audit result status / video.generate"
);

const jarvisVideoWorkspaceRecord = requireJarvisVideoDryRunWorkspaceRecord(
  JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES.find(
    (record) => record.id === "jarvis-video"
  ),
  "jarvis video workspace"
);

export const JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS = {
  workspaceLink: {
    label: "Jarvis video workspace",
    href: jarvisVideoWorkspaceRecord.routeHref,
    marker: "/jarvis-video dry-run workspace remains review-only",
    posture: "Jarvis-controlled video dry-run workspace only",
    summary:
      "The primary /jarvis-video workspace stays on the unified Jarvis shell while this batch adds a review-only dry-run workspace surface.",
  },
  capabilitySelectionLink: {
    label: "Selected capability",
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.href,
    marker: "video capability selection review only",
    posture: "review only",
    summary:
      "Jarvis keeps video.generate selected as the dry-run capability without enabling provider execution, render execution, or network execution.",
  },
  adapterRouteLink: {
    label: "Backend-only adapter route",
    href: "/jarvis-video-adapter-plugin-completion",
    marker: "video adapter route review only",
    posture: "backend-only execution path required",
    summary:
      "The dry-run workspace points at " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.adapterId +
      " through a backend-only adapter route with no direct frontend execution.",
  },
  permissionDecisionLink: {
    label: "Permission decision",
    href: "/jarvis-permission-approval-capability-permission-wiring",
    marker: "video permission decision review only",
    posture: permissionPolicyRecord.permissionPosture,
    summary:
      "The permission engine keeps video.generate approval-required and review-only until a future backend-owned execution path is explicitly approved.",
  },
  approvalRequirementLink: {
    label: "Approval requirement",
    href: "/jarvis-permission-approval-human-gate-wiring",
    marker: "video approval requirement review only",
    posture: permissionPolicyRecord.humanApprovalRequirement,
    summary:
      "Human approval gate required and operator review required before video execution remain visible without enabling live execution.",
  },
  unifiedShellLink: {
    label: "Unified Jarvis shell",
    href: "/jarvis-unified-workspace-video-shell-wiring",
    marker: "Jarvis-controlled video dry-run workspace only",
    posture: "review-only shell link",
    summary:
      "Jarvis is the operating system / top-level control plane, and the video dry-run workspace remains a specialist review surface inside that shell.",
  },
} satisfies Readonly<Record<string, JarvisVideoDryRunWorkspaceLinkRecord>>;

export const JARVIS_VIDEO_DRY_RUN_WORKSPACE_MILESTONE_REFERENCES = [
  ...JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES,
  {
    phaseRange: "3754-3785",
    title: "First Jarvis-Controlled Video Adapter Plug-in",
    href: "/jarvis-video-adapter-plugin-completion",
    marker: "First Jarvis-Controlled Video Adapter Plug-in",
    summary:
      "The prior Jarvis video adapter plug-in remains an inert review marker that the dry-run workspace links without enabling adapter execution.",
  },
] satisfies readonly JarvisVideoDryRunWorkspaceMilestoneReference[];

export const JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD = {
  dryRunWorkspaceId: "jarvis-video-dry-run-workspace-v1",
  workspaceId: "jarvis-video",
  workspaceLabel: jarvisVideoWorkspaceRecord.label,
  workspaceHref: "/jarvis-video",
  userGoalExample: plannerRouteRecord.userGoalExample,
  capabilityId: "video.generate",
  selectedAdapterCandidate: "jarvis.video.generate",
  backendOnlyAdapterRoute: plannerRouteRecord.plannedRouteTarget,
  backendOnlyRoutePosture: "backend-only execution path required",
  permissionDecision: plannerRouteRecord.permissionDecisionStatus,
  approvalRequirement: permissionPolicyRecord.humanApprovalRequirement,
  approvalMode: permissionPolicyRecord.approvalMode,
  dryRunRequirement: permissionPolicyRecord.dryRunRequirement,
  dryRunRequestEnvelopeName: plannerRouteRecord.requestEnvelopeName,
  contractInputEnvelopeName: sharedBackendAdapterContractRecord.inputEnvelopeName,
  contractOutputEnvelopeName: sharedBackendAdapterContractRecord.outputEnvelopeName,
  contractErrorEnvelopeName: sharedBackendAdapterContractRecord.errorEnvelopeName,
  dryRunEnvelopePreviewFields: [
    "userGoalExample",
    "capabilityId",
    "selectedAdapterCandidate",
    "backendOnlyAdapterRoute",
    "permissionDecision",
    "approvalRequirement",
    "guardSnapshotRef",
  ],
  redactedPromptPreviewLines: [
    "Goal summary only.",
    "Prompt body remains redacted before provider execution.",
    "Credential and token references remain backend-only.",
    "No provider payload is sent from the frontend.",
  ],
  providerReferenceSummary:
    "Provider reference review only keeps backend-owned runtime, dry-run, approval packet, and adapter readiness milestones linked as inert evidence.",
  credentialReferenceSummary:
    "Backend-owned credential reference only; no frontend provider key reads and no plaintext secrets.",
  tokenReferenceSummary:
    "Backend-owned token reference only; no browser storage for secrets and no token storage.",
  costGuardPosture: permissionPolicyRecord.costLimitPosture,
  rateGuardPosture: permissionPolicyRecord.rateLimitPosture,
  timeoutGuardPosture: permissionPolicyRecord.timeoutPosture,
  durationGuardPosture: "duration guard review only",
  resolutionGuardPosture: "resolution guard review only",
  sizeGuardPosture: "size guard review only",
  privacyGuardPosture: permissionPolicyRecord.dataSensitivityPosture,
  safetyGuardPosture: permissionPolicyRecord.secretBoundaryPosture,
  durationGuardPreview: "12 second review cap placeholder only.",
  resolutionGuardPreview: "1280x720 review cap placeholder only.",
  sizeGuardPreview: "24 MB review cap placeholder only.",
  resultPlaceholderStatus: auditStatusRecord.resultLedgerStatus,
  artifactHandoffStatus: auditStatusRecord.artifactPlaceholderStatus,
  auditPreviewPosture: plannerRouteRecord.auditPreviewPosture,
  resultLedgerPreviewPosture: plannerRouteRecord.resultLedgerPreviewPosture,
  statusPreviewPosture: "status preview only",
  statusPreviewSummary:
    auditStatusRecord.approvalStatus + " / " + auditStatusRecord.dryRunStatus,
  memoryBoundaryPreviewPosture: plannerRouteRecord.memoryBoundaryPreviewPosture,
  killSwitchCheckPosture: plannerRouteRecord.killSwitchCheckPosture,
  lockManagerCheckPosture: plannerRouteRecord.lockManagerCheckPosture,
  idempotencyCheckPosture: plannerRouteRecord.idempotencyCheckPosture,
  replayBlockCheckPosture: plannerRouteRecord.replayBlockPosture,
  blockedActionSummary: auditStatusRecord.blockedActionSummary,
  blockedActions: permissionPolicyRecord.blockedActionCategories,
  operatorReviewPosture: "operator review required before video execution",
  operatorRoles: permissionPolicyRecord.operatorRoles,
  executionPosture: auditStatusRecord.executionPosture,
  dryRunStatus: auditStatusRecord.dryRunStatus,
  approvalStatus: auditStatusRecord.approvalStatus,
  resultLedgerStatus: auditStatusRecord.resultLedgerStatus,
  memoryBoundaryStatus: auditStatusRecord.memoryBoundaryStatus,
  killSwitchStatus: auditStatusRecord.killSwitchStatus,
  lockIdempotencyStatus: auditStatusRecord.lockIdempotencyStatus,
  replayBlockStatus: auditStatusRecord.replayBlockStatus,
  operatorReviewStatus: auditStatusRecord.operatorReviewStatus,
} satisfies JarvisVideoDryRunWorkspaceSharedRecord;

const milestoneByMarker = Object.fromEntries(
  JARVIS_VIDEO_DRY_RUN_WORKSPACE_MILESTONE_REFERENCES.map((reference) => [
    reference.marker,
    reference,
  ])
) as Readonly<
  Record<
    (typeof JARVIS_VIDEO_DRY_RUN_WORKSPACE_MILESTONE_REFERENCES)[number]["marker"],
    (typeof JARVIS_VIDEO_DRY_RUN_WORKSPACE_MILESTONE_REFERENCES)[number]
  >
>;

export const JARVIS_VIDEO_DRY_RUN_WORKSPACE_REVIEW_CARDS = [
  {
    id: "workspace-link",
    group: "Integration",
    label: "Jarvis video workspace",
    marker: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.workspaceLink.marker,
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.workspaceLink.posture,
    summary: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.workspaceLink.summary,
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.workspaceLabel +
      " stays visible at " +
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.workspaceHref +
      ".",
    href: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.workspaceLink.href,
  },
  {
    id: "capability-selection",
    group: "Integration",
    label: "Selected capability",
    marker:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.marker,
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.posture,
    summary:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.summary,
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.capabilityId +
      " stays selected inside Jarvis.",
    href: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.href,
  },
  {
    id: "adapter-route",
    group: "Integration",
    label: "Backend-only adapter route",
    marker: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.adapterRouteLink.marker,
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.adapterRouteLink.posture,
    summary:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.adapterRouteLink.summary,
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.selectedAdapterCandidate +
      " via " +
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.backendOnlyAdapterRoute,
    href: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.adapterRouteLink.href,
  },
  {
    id: "permission-decision",
    group: "Integration",
    label: "Permission decision",
    marker:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.marker,
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.posture,
    summary:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.summary,
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.permissionDecision,
    href:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.href,
  },
  {
    id: "approval-requirement",
    group: "Integration",
    label: "Approval requirement",
    marker:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.approvalRequirementLink.marker,
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.approvalRequirementLink.posture,
    summary:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.approvalRequirementLink.summary,
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.approvalMode +
      " / " +
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.operatorReviewPosture,
    href:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SYSTEM_LINKS.approvalRequirementLink.href,
  },
  {
    id: "runtime-readiness-reference",
    group: "Milestones",
    label: "Runtime readiness reference",
    marker: milestoneByMarker["backend-owned video runtime readiness reference only"].marker,
    posture: "reference only",
    summary:
      milestoneByMarker["backend-owned video runtime readiness reference only"].summary,
    detail:
      milestoneByMarker["backend-owned video runtime readiness reference only"].phaseRange +
      " - " +
      milestoneByMarker["backend-owned video runtime readiness reference only"].title,
    href: milestoneByMarker["backend-owned video runtime readiness reference only"].href,
  },
  {
    id: "dry-run-reference",
    group: "Milestones",
    label: "Backend-owned dry-run reference",
    marker: milestoneByMarker["video dry-run reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video dry-run reference only"].summary,
    detail:
      milestoneByMarker["video dry-run reference only"].phaseRange +
      " - " +
      milestoneByMarker["video dry-run reference only"].title,
    href: milestoneByMarker["video dry-run reference only"].href,
  },
  {
    id: "approval-packet-reference",
    group: "Milestones",
    label: "Approval packet reference",
    marker: milestoneByMarker["video approval packet reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video approval packet reference only"].summary,
    detail:
      milestoneByMarker["video approval packet reference only"].phaseRange +
      " - " +
      milestoneByMarker["video approval packet reference only"].title,
    href: milestoneByMarker["video approval packet reference only"].href,
  },
  {
    id: "adapter-readiness-reference",
    group: "Milestones",
    label: "Adapter readiness reference",
    marker: milestoneByMarker["video adapter readiness reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video adapter readiness reference only"].summary,
    detail:
      milestoneByMarker["video adapter readiness reference only"].phaseRange +
      " - " +
      milestoneByMarker["video adapter readiness reference only"].title,
    href: milestoneByMarker["video adapter readiness reference only"].href,
  },
  {
    id: "jarvis-adapter-plugin-reference",
    group: "Milestones",
    label: "Jarvis video adapter plug-in reference",
    marker: milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].marker,
    posture: "reference only",
    summary: milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].summary,
    detail:
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].phaseRange +
      " - " +
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].title,
    href: milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].href,
  },
  {
    id: "user-goal",
    group: "Request",
    label: "User goal example",
    marker: "user goal review only",
    posture: "review only",
    summary:
      "Jarvis captures the user goal as a dry-run input without generating video, calling a provider, or executing a backend adapter.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.userGoalExample,
  },
  {
    id: "dry-run-request-envelope",
    group: "Request",
    label: "Dry-run request envelope",
    marker: "video.generate dry-run request envelope review only",
    posture: "review only",
    summary:
      "The dry-run request envelope stays frontend-safe and review-only while linking planner intent to the shared backend adapter input contract.",
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.dryRunRequestEnvelopeName +
      " -> " +
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.contractInputEnvelopeName,
  },
  {
    id: "prompt-redaction",
    group: "Request",
    label: "Redacted prompt preview",
    marker: "redacted prompt preview only",
    posture: "review only",
    summary:
      "Prompt posture stays redacted and preview-only. No prompt body is sent, stored, fetched, or executed from the frontend.",
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.redactedPromptPreviewLines.join(
        " "
      ),
  },
  {
    id: "provider-reference",
    group: "Request",
    label: "Provider reference",
    marker: "provider reference review only",
    posture: "review only",
    summary:
      "Provider references remain descriptive only, with no provider SDK imports in frontend and no live provider call.",
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.providerReferenceSummary,
  },
  {
    id: "credential-reference",
    group: "Request",
    label: "Credential reference",
    marker: "credential reference review only",
    posture: "review only",
    summary:
      "Credential references remain backend-only review markers with no frontend provider key reads and no plaintext secrets.",
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.credentialReferenceSummary,
  },
  {
    id: "token-reference",
    group: "Request",
    label: "Token reference",
    marker: "token reference review only",
    posture: "review only",
    summary:
      "Token references remain backend-only and review-only, with no browser storage for secrets and no token storage.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.tokenReferenceSummary,
  },
  {
    id: "result-placeholder",
    group: "Outputs",
    label: "Result placeholder",
    marker: "result placeholder only",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.resultPlaceholderStatus,
    summary:
      "Result state stays placeholder-only so the workspace can show readiness without generating media or executing providers.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.resultLedgerStatus,
  },
  {
    id: "artifact-handoff-placeholder",
    group: "Outputs",
    label: "Artifact handoff placeholder",
    marker: "artifact handoff placeholder only",
    posture: "placeholder only",
    summary:
      "Artifact handoff remains a placeholder only with no file export, download generation, archive creation, signed URL creation, or platform upload.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.artifactHandoffStatus,
  },
  {
    id: "audit-preview",
    group: "Outputs",
    label: "Audit preview",
    marker: "audit preview only",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.auditPreviewPosture,
    summary:
      "Audit preview stays review-only so operators can inspect the future video request path without execution.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.approvalStatus,
    href: "/jarvis-audit",
  },
  {
    id: "result-ledger-preview",
    group: "Outputs",
    label: "Result ledger preview",
    marker: "result ledger preview only",
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.resultLedgerPreviewPosture,
    summary:
      "Result ledger preview stays descriptive only while showing how a future backend result would be recorded.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.resultLedgerStatus,
    href: "/jarvis-audit",
  },
  {
    id: "status-preview",
    group: "Outputs",
    label: "Status preview",
    marker: "status preview only",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.statusPreviewPosture,
    summary:
      "Status preview shows approval and dry-run posture only, without changing runtime state or dispatching work.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.statusPreviewSummary,
    href: "/jarvis-audit",
  },
  {
    id: "memory-boundary-preview",
    group: "Outputs",
    label: "Memory boundary preview",
    marker: "memory boundary preview only",
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.memoryBoundaryPreviewPosture,
    summary:
      "Memory boundary preview remains review-only and does not write memory, localStorage, sessionStorage, IndexedDB, or cookies.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.memoryBoundaryStatus,
    href: "/jarvis-audit",
  },
  {
    id: "kill-switch-check",
    group: "Operations",
    label: "Kill switch check",
    marker: "kill switch check required",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.killSwitchCheckPosture,
    summary:
      "The hard kill switch remains in front of any future backend video execution, and the frontend only shows its review posture.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.killSwitchStatus,
  },
  {
    id: "lock-manager-check",
    group: "Operations",
    label: "Lock manager check",
    marker: "lock manager check required",
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.lockManagerCheckPosture,
    summary:
      "Lock manager posture stays required before any future backend adapter execution and remains review-only here.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.lockIdempotencyStatus,
  },
  {
    id: "idempotency-check",
    group: "Operations",
    label: "Idempotency check",
    marker: "idempotency check required",
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.idempotencyCheckPosture,
    summary:
      "Idempotency stays mandatory for any future backend call while the current workspace remains dry-run only and execution-blocked.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.lockIdempotencyStatus,
  },
  {
    id: "replay-block-check",
    group: "Operations",
    label: "Replay block check",
    marker: "replay block check required",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.replayBlockCheckPosture,
    summary:
      "Replay blocking remains required before any future backend execution. The frontend only previews that safeguard.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.replayBlockStatus,
  },
  {
    id: "blocked-action-summary",
    group: "Operations",
    label: "Blocked action summary",
    marker: "blocked action summary only",
    posture: "summary only",
    summary:
      "Blocked actions remain explicit and visible, but no provider, network, render, export, publish, worker, or trading execution is enabled.",
    detail: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.blockedActionSummary,
  },
  {
    id: "operator-review",
    group: "Operations",
    label: "Operator review",
    marker: "operator review required before video execution",
    posture:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.operatorReviewPosture,
    summary:
      "Operator review remains required before video execution, and the current workspace stops at review-only dry-run readiness.",
    detail:
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.operatorRoles.join(", ") +
      " / " +
      JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.operatorReviewStatus,
  },
  {
    id: "execution-posture",
    group: "Operations",
    label: "Execution posture",
    marker:
      "video dry-run workspace completion does not enable provider/render/export/publish/workers/trading/automation",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.executionPosture,
    summary:
      "This batch stays disabled by default, hard kill switch protected, dry-run only, backend-only, and execution-blocked.",
    detail:
      "disabled by default / hard kill switch / dry-run only / backend-only execution path required",
  },
] satisfies readonly JarvisVideoDryRunWorkspaceReviewCard[];
