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
import {
  JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD,
} from "../jarvis-video-dry-run-workspace-map/jarvis-video-dry-run-workspace-request";

export type JarvisVideoApprovalPacketWorkspaceLinkRecord = Readonly<{
  label: string;
  href: string;
  marker: string;
  posture: string;
  summary: string;
}>;

export type JarvisVideoApprovalPacketWorkspaceMilestoneReference = Readonly<{
  phaseRange: string;
  title: string;
  href: string;
  marker: string;
  summary: string;
}>;

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_REVIEW_GROUPS = [
  "Integration",
  "Milestones",
  "Approval",
  "Envelopes",
  "Guards",
  "Outputs",
  "Operations",
] as const;

export type JarvisVideoApprovalPacketWorkspaceReviewGroup =
  (typeof JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_REVIEW_GROUPS)[number];

export type JarvisVideoApprovalPacketWorkspaceReviewCard = Readonly<{
  id: string;
  group: JarvisVideoApprovalPacketWorkspaceReviewGroup;
  label: string;
  marker: string;
  posture: string;
  summary: string;
  detail: string;
  href?: string;
}>;

export type JarvisVideoApprovalPacketWorkspaceSharedRecord = Readonly<{
  approvalPacketWorkspaceId: "jarvis-video-approval-packet-workspace-v1";
  workspaceId: "jarvis-video";
  workspaceLabel: string;
  workspaceHref: "/jarvis-video";
  userGoalReview: string;
  capabilityId: "video.generate";
  selectedAdapterCandidate: "jarvis.video.generate";
  dryRunReferenceLabel: string;
  dryRunReferenceHref: "/jarvis-video-dry-run-workspace-completion";
  dryRunReferencePosture: "video dry-run reference required";
  dryRunRequirement: string;
  approvalPacketId: string;
  approvalPacketReferencePosture: "video approval packet id required";
  approvalPacketReadiness: string;
  permissionDecision: string;
  approvalDecision: string;
  humanApprovalGate: "human approval required before video execution";
  backendOnlyVideoRoute: string;
  backendOnlyRoutePosture: "backend-only video route required";
  providerReferencePosture: "provider reference review only";
  providerReferenceSummary: string;
  credentialReferencePosture: "credential reference review only";
  credentialReferenceSummary: string;
  tokenReferencePosture: "token reference review only";
  tokenReferenceSummary: string;
  redactedPromptPreviewLines: readonly string[];
  approvalPacketEnvelopeName: "JarvisVideoApprovalPacketReviewEnvelope";
  requestEnvelopePosture: "request envelope review only";
  requestEnvelopeName: string;
  responseEnvelopePosture: "response envelope review only";
  responseEnvelopeName: string;
  errorEnvelopePosture: "error envelope review only";
  errorEnvelopeName: string;
  guardSnapshotPosture: "guard snapshot review only";
  guardSnapshotId: string;
  guardSnapshotSummary: string;
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
  artifactHandoffPlaceholderStatus: string;
  auditPreviewPosture: string;
  resultLedgerPreviewPosture: string;
  statusPreviewPosture: "status preview only";
  statusPreviewSummary: string;
  killSwitchPosture: "kill switch remains enforced";
  killSwitchStatus: string;
  lockManagerPosture: "lock manager required";
  lockManagerStatus: string;
  idempotencyPosture: "idempotency required";
  idempotencyStatus: string;
  replayBlockPosture: "replay block required";
  replayBlockStatus: string;
  blockedActionSummary: string;
  blockedActions: readonly string[];
  operatorReviewPosture: "operator review required before video execution";
  operatorRoles: readonly string[];
  operatorReviewStatus: string;
  executionPosture: string;
}>;

function requireJarvisVideoApprovalPacketWorkspaceRecord<T>(
  record: T | undefined,
  label: string
) {
  if (!record) {
    throw new Error(
      `Missing Jarvis video approval packet workspace record: ${label}`
    );
  }
  return record;
}

const sharedBackendAdapterContractRecord =
  requireJarvisVideoApprovalPacketWorkspaceRecord(
    JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.find(
      (record) => record.capabilityId === "video.generate"
    ),
    "shared backend adapter contract / video.generate"
  );

const permissionPolicyRecord =
  requireJarvisVideoApprovalPacketWorkspaceRecord(
    JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES.find(
      (record) => record.capabilityId === "video.generate"
    ),
    "permission approval engine / video.generate"
  );

const plannerRouteRecord = requireJarvisVideoApprovalPacketWorkspaceRecord(
  JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "task planner tool router / video.generate"
);

const auditStatusRecord = requireJarvisVideoApprovalPacketWorkspaceRecord(
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "audit result status / video.generate"
);

const jarvisVideoWorkspaceRecord =
  requireJarvisVideoApprovalPacketWorkspaceRecord(
    JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES.find(
      (record) => record.id === "jarvis-video"
    ),
    "jarvis video workspace"
  );

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS = {
  workspaceLink: {
    label: "Jarvis video workspace",
    href: jarvisVideoWorkspaceRecord.routeHref,
    marker: "/jarvis-video approval packet workspace remains review-only",
    posture: "Jarvis-controlled video approval packet workspace only",
    summary:
      "The primary /jarvis-video workspace stays on the unified Jarvis shell while this batch adds a review-only approval packet surface.",
  },
  dryRunWorkspaceLink: {
    label: "Dry-run workspace reference",
    href: "/jarvis-video-dry-run-workspace-completion",
    marker: "video dry-run reference required",
    posture: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.dryRunRequirement,
    summary:
      "The approval packet workspace depends on the prior Jarvis-controlled video dry-run workspace and keeps that dry-run reference visible before any future backend execution can be considered.",
  },
  capabilitySelectionLink: {
    label: "Selected capability",
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.href,
    marker: "video capability approval review only",
    posture: "review only",
    summary:
      "Jarvis keeps video.generate selected for approval review without enabling provider execution, render execution, or network execution.",
  },
  adapterCandidateLink: {
    label: "Selected adapter candidate",
    href: "/jarvis-video-adapter-plugin-completion",
    marker: "video adapter candidate approval review only",
    posture: "backend-only video route required",
    summary:
      "The approval packet keeps " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.adapterId +
      " visible as the selected backend-owned adapter candidate without executing it from the frontend.",
  },
  permissionDecisionLink: {
    label: "Permission and approval posture",
    href: "/jarvis-permission-approval-capability-permission-wiring",
    marker: "video permission decision review only",
    posture: permissionPolicyRecord.permissionPosture,
    summary:
      "The permission engine keeps video.generate approval-required, dry-run-required, backend-only, and human-approval-required while the approval packet remains review-only.",
  },
  unifiedShellLink: {
    label: "Unified Jarvis shell",
    href: "/jarvis-unified-workspace-video-shell-wiring",
    marker: "Jarvis-controlled video approval packet workspace only",
    posture: "review-only shell link",
    summary:
      "Jarvis is the operating system / top-level control plane, and the approval packet workspace remains a specialist review surface inside that shell.",
  },
  auditStatusLink: {
    label: "Audit, result, and status preview",
    href: "/jarvis-audit",
    marker: "audit preview only",
    posture: "review only",
    summary:
      "Approval packet previews stay connected to the shared Jarvis audit/result/status dashboard without recording a live execution.",
  },
} satisfies Readonly<
  Record<string, JarvisVideoApprovalPacketWorkspaceLinkRecord>
>;

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_MILESTONE_REFERENCES = [
  ...JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES,
  {
    phaseRange: "3754-3785",
    title: "First Jarvis-Controlled Video Adapter Plug-in",
    href: "/jarvis-video-adapter-plugin-completion",
    marker: "First Jarvis-Controlled Video Adapter Plug-in",
    summary:
      "The Jarvis-controlled video adapter plug-in remains an inert review reference only and still does not execute a backend adapter from the frontend.",
  },
  {
    phaseRange: "3786-3817",
    title: "First Jarvis-Controlled Video Dry Run Workspace",
    href: "/jarvis-video-dry-run-workspace-completion",
    marker: "First Jarvis-Controlled Video Dry Run Workspace",
    summary:
      "The Jarvis-controlled video dry-run workspace remains the immediate prerequisite review surface before the approval packet can be considered complete.",
  },
] satisfies readonly JarvisVideoApprovalPacketWorkspaceMilestoneReference[];

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD = {
  approvalPacketWorkspaceId: "jarvis-video-approval-packet-workspace-v1",
  workspaceId: "jarvis-video",
  workspaceLabel: jarvisVideoWorkspaceRecord.label,
  workspaceHref: "/jarvis-video",
  userGoalReview: plannerRouteRecord.userGoalExample,
  capabilityId: "video.generate",
  selectedAdapterCandidate: "jarvis.video.generate",
  dryRunReferenceLabel:
    "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace",
  dryRunReferenceHref: "/jarvis-video-dry-run-workspace-completion",
  dryRunReferencePosture: "video dry-run reference required",
  dryRunRequirement: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.dryRunRequirement,
  approvalPacketId: "jarvis-video-approval-packet-review-001",
  approvalPacketReferencePosture: "video approval packet id required",
  approvalPacketReadiness: permissionPolicyRecord.approvalPacketReadiness,
  permissionDecision: plannerRouteRecord.permissionDecisionStatus,
  approvalDecision: plannerRouteRecord.approvalDecisionStatus,
  humanApprovalGate: "human approval required before video execution",
  backendOnlyVideoRoute: JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.backendOnlyAdapterRoute,
  backendOnlyRoutePosture: "backend-only video route required",
  providerReferencePosture: "provider reference review only",
  providerReferenceSummary:
    "Provider reference review only keeps backend-owned runtime readiness, backend-owned dry-run, backend-owned approval packet, backend-owned adapter readiness, the Jarvis adapter plug-in, and the Jarvis dry-run workspace linked as inert approval evidence.",
  credentialReferencePosture: "credential reference review only",
  credentialReferenceSummary:
    "Backend-owned credential reference only; no frontend provider key reads, no plaintext secrets, and no browser storage for secrets.",
  tokenReferencePosture: "token reference review only",
  tokenReferenceSummary:
    "Backend-owned token reference only; no localStorage, no sessionStorage, no IndexedDB, no cookies, and no token storage.",
  redactedPromptPreviewLines: [
    "Goal summary and capability choice only.",
    "Prompt body remains redacted inside the approval packet preview.",
    "Credential and token references remain backend-only.",
    "No provider payload is sent, fetched, or executed from the frontend.",
  ],
  approvalPacketEnvelopeName: "JarvisVideoApprovalPacketReviewEnvelope",
  requestEnvelopePosture: "request envelope review only",
  requestEnvelopeName: sharedBackendAdapterContractRecord.inputEnvelopeName,
  responseEnvelopePosture: "response envelope review only",
  responseEnvelopeName: sharedBackendAdapterContractRecord.outputEnvelopeName,
  errorEnvelopePosture: "error envelope review only",
  errorEnvelopeName: sharedBackendAdapterContractRecord.errorEnvelopeName,
  guardSnapshotPosture: "guard snapshot review only",
  guardSnapshotId: "guard-snapshot-video-generate-approval-packet-v1",
  guardSnapshotSummary:
    "The guard snapshot captures permission, approval, dry-run, route, kill switch, lock manager, idempotency, replay block, cost, rate, timeout, duration, resolution, size, privacy, and safety posture only.",
  costGuardPosture: permissionPolicyRecord.costLimitPosture,
  rateGuardPosture: permissionPolicyRecord.rateLimitPosture,
  timeoutGuardPosture: permissionPolicyRecord.timeoutPosture,
  durationGuardPosture: "duration guard review only",
  resolutionGuardPosture: "resolution guard review only",
  sizeGuardPosture: "size guard review only",
  privacyGuardPosture: permissionPolicyRecord.dataSensitivityPosture,
  safetyGuardPosture: permissionPolicyRecord.secretBoundaryPosture,
  durationGuardPreview: "12 second approval packet cap placeholder only.",
  resolutionGuardPreview: "1280x720 approval packet cap placeholder only.",
  sizeGuardPreview: "24 MB approval packet cap placeholder only.",
  resultPlaceholderStatus:
    JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.resultPlaceholderStatus,
  artifactHandoffPlaceholderStatus:
    JARVIS_VIDEO_DRY_RUN_WORKSPACE_SHARED_RECORD.artifactHandoffStatus,
  auditPreviewPosture: plannerRouteRecord.auditPreviewPosture,
  resultLedgerPreviewPosture: plannerRouteRecord.resultLedgerPreviewPosture,
  statusPreviewPosture: "status preview only",
  statusPreviewSummary:
    auditStatusRecord.approvalStatus + " / " + auditStatusRecord.dryRunStatus,
  killSwitchPosture: "kill switch remains enforced",
  killSwitchStatus: auditStatusRecord.killSwitchStatus,
  lockManagerPosture: "lock manager required",
  lockManagerStatus: auditStatusRecord.lockIdempotencyStatus,
  idempotencyPosture: "idempotency required",
  idempotencyStatus: auditStatusRecord.lockIdempotencyStatus,
  replayBlockPosture: "replay block required",
  replayBlockStatus: auditStatusRecord.replayBlockStatus,
  blockedActionSummary: auditStatusRecord.blockedActionSummary,
  blockedActions: permissionPolicyRecord.blockedActionCategories,
  operatorReviewPosture: "operator review required before video execution",
  operatorRoles: permissionPolicyRecord.operatorRoles,
  operatorReviewStatus: auditStatusRecord.operatorReviewStatus,
  executionPosture: auditStatusRecord.executionPosture,
} satisfies JarvisVideoApprovalPacketWorkspaceSharedRecord;

const milestoneByMarker = Object.fromEntries(
  JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_MILESTONE_REFERENCES.map(
    (reference) => [reference.marker, reference]
  )
) as Record<string, JarvisVideoApprovalPacketWorkspaceMilestoneReference>;

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_REVIEW_CARDS = [
  {
    id: "workspace-link",
    group: "Integration",
    label: "Jarvis video workspace",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.workspaceLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.workspaceLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.workspaceLink.summary,
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.workspaceLabel +
      " stays visible at " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.workspaceHref +
      ".",
    href: JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.workspaceLink.href,
  },
  {
    id: "dry-run-workspace-link",
    group: "Integration",
    label: "Dry-run workspace reference",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.dryRunWorkspaceLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.dryRunWorkspaceLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.dryRunWorkspaceLink.summary,
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.dryRunReferenceLabel +
      " / " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.dryRunRequirement,
    href:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.dryRunWorkspaceLink.href,
  },
  {
    id: "capability-selection",
    group: "Integration",
    label: "Selected capability",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.summary,
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.capabilityId +
      " stays selected inside Jarvis.",
    href:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.capabilitySelectionLink.href,
  },
  {
    id: "adapter-candidate-link",
    group: "Integration",
    label: "Selected adapter candidate",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.adapterCandidateLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.adapterCandidateLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.adapterCandidateLink.summary,
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.selectedAdapterCandidate +
      " via " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.backendOnlyVideoRoute,
    href:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.adapterCandidateLink.href,
  },
  {
    id: "permission-decision-link",
    group: "Integration",
    label: "Permission and approval posture",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.summary,
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.permissionDecision +
      " / " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalDecision,
    href:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.permissionDecisionLink.href,
  },
  {
    id: "unified-shell-link",
    group: "Integration",
    label: "Unified Jarvis shell",
    marker:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.unifiedShellLink.marker,
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.unifiedShellLink.posture,
    summary:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.unifiedShellLink.summary,
    detail:
      "Jarvis keeps approval, audit, result, and safety posture shared across specialist workspaces.",
    href:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SYSTEM_LINKS.unifiedShellLink.href,
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
    href:
      milestoneByMarker["backend-owned video runtime readiness reference only"].href,
  },
  {
    id: "backend-dry-run-reference",
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
    id: "backend-approval-packet-reference",
    group: "Milestones",
    label: "Backend-owned approval packet reference",
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
    label: "Backend-owned adapter readiness reference",
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
    label: "Jarvis adapter plug-in reference",
    marker: milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].marker,
    posture: "reference only",
    summary:
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].summary,
    detail:
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].phaseRange +
      " - " +
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].title,
    href:
      milestoneByMarker["First Jarvis-Controlled Video Adapter Plug-in"].href,
  },
  {
    id: "jarvis-dry-run-reference",
    group: "Milestones",
    label: "Jarvis dry-run workspace reference",
    marker: milestoneByMarker["First Jarvis-Controlled Video Dry Run Workspace"].marker,
    posture: "reference only",
    summary:
      milestoneByMarker["First Jarvis-Controlled Video Dry Run Workspace"].summary,
    detail:
      milestoneByMarker["First Jarvis-Controlled Video Dry Run Workspace"].phaseRange +
      " - " +
      milestoneByMarker["First Jarvis-Controlled Video Dry Run Workspace"].title,
    href:
      milestoneByMarker["First Jarvis-Controlled Video Dry Run Workspace"].href,
  },
  {
    id: "user-goal-review",
    group: "Approval",
    label: "User goal review",
    marker: "user goal review only",
    posture: "review only",
    summary:
      "Jarvis keeps the operator's user goal visible in the approval packet without generating video, calling a provider, or executing a backend adapter.",
    detail: JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.userGoalReview,
  },
  {
    id: "capability-review",
    group: "Approval",
    label: "Video capability review",
    marker: "video capability approval review only",
    posture: "review only",
    summary:
      "The approval packet confirms that video.generate is the selected capability and that the frontend stays review-only and execution-blocked.",
    detail: JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.capabilityId,
  },
  {
    id: "adapter-candidate-review",
    group: "Approval",
    label: "Adapter candidate review",
    marker: "video adapter candidate approval review only",
    posture: "review only",
    summary:
      "The approval packet names the selected adapter candidate without running a backend adapter or creating a provider execution path.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.selectedAdapterCandidate,
  },
  {
    id: "dry-run-reference-review",
    group: "Approval",
    label: "Dry-run reference",
    marker: "video dry-run reference required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.dryRunReferencePosture,
    summary:
      "Approval packet review is downstream of the Jarvis-controlled dry-run workspace and stays blocked until that dry-run reference exists.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.dryRunReferenceLabel,
    href: JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.dryRunReferenceHref,
  },
  {
    id: "approval-packet-id",
    group: "Approval",
    label: "Approval packet id",
    marker: "video approval packet id required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalPacketReferencePosture,
    summary:
      "The approval packet id and reference posture stay review-only and are visible without creating approval persistence, signed URLs, or backend execution.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalPacketId +
      " / " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalPacketReadiness,
  },
  {
    id: "permission-decision-review",
    group: "Approval",
    label: "Permission decision",
    marker: "video permission decision review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.permissionDecision,
    summary:
      "The permission decision remains visible for operator review only and still does not authorize provider execution, network execution, or tool execution.",
    detail: permissionPolicyRecord.denialReasons.join("; "),
  },
  {
    id: "approval-decision-review",
    group: "Approval",
    label: "Approval decision",
    marker: "video approval decision review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalDecision,
    summary:
      "Approval decision posture remains review-only so the frontend can show readiness without storing approvals or releasing backend execution.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalPacketReadiness,
  },
  {
    id: "human-approval-gate-review",
    group: "Approval",
    label: "Human approval gate",
    marker: "human approval required before video execution",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.humanApprovalGate,
    summary:
      "Human approval remains required before video execution, and the current workspace stops at approval packet review only.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.operatorRoles.join(
        ", "
      ),
  },
  {
    id: "backend-only-route-review",
    group: "Envelopes",
    label: "Backend-only video route",
    marker: "backend-only video route required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.backendOnlyRoutePosture,
    summary:
      "The packet keeps the route backend-only so the frontend never executes a backend adapter directly and never creates a runtime deploy path.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.backendOnlyVideoRoute,
  },
  {
    id: "provider-reference-review",
    group: "Envelopes",
    label: "Provider reference posture",
    marker: "provider reference review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.providerReferencePosture,
    summary:
      "Provider references remain descriptive approval evidence only with no provider SDK imports in frontend and no live provider call.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.providerReferenceSummary,
  },
  {
    id: "credential-reference-review",
    group: "Envelopes",
    label: "Credential reference posture",
    marker: "credential reference review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.credentialReferencePosture,
    summary:
      "Credential references remain backend-only review markers with no frontend provider key reads and no plaintext secrets.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.credentialReferenceSummary,
  },
  {
    id: "token-reference-review",
    group: "Envelopes",
    label: "Token reference posture",
    marker: "token reference review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.tokenReferencePosture,
    summary:
      "Token references remain backend-only and review-only, with no browser storage for secrets and no token storage.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.tokenReferenceSummary,
  },
  {
    id: "prompt-redaction-review",
    group: "Envelopes",
    label: "Prompt redaction preview",
    marker: "redacted prompt preview only",
    posture: "review only",
    summary:
      "Prompt posture stays redacted and preview-only. No prompt body is sent, stored, fetched, or executed from the frontend.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.redactedPromptPreviewLines.join(
        " "
      ),
  },
  {
    id: "request-envelope-review",
    group: "Envelopes",
    label: "Request envelope posture",
    marker: "request envelope review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.requestEnvelopePosture,
    summary:
      "The approval packet request envelope stays frontend-safe and review-only while linking packet review to the shared backend adapter input contract.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.approvalPacketEnvelopeName +
      " -> " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.requestEnvelopeName,
  },
  {
    id: "response-envelope-review",
    group: "Envelopes",
    label: "Response envelope posture",
    marker: "response envelope review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.responseEnvelopePosture,
    summary:
      "Response envelope posture remains visible for review without executing a provider or generating a real video result.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.responseEnvelopeName,
  },
  {
    id: "error-envelope-review",
    group: "Envelopes",
    label: "Error envelope posture",
    marker: "error envelope review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.errorEnvelopePosture,
    summary:
      "Error envelope posture remains visible for review without dispatching retries, recovery, or runtime execution.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.errorEnvelopeName,
  },
  {
    id: "guard-snapshot-review",
    group: "Envelopes",
    label: "Guard snapshot posture",
    marker: "guard snapshot review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.guardSnapshotPosture,
    summary:
      "Guard snapshot posture stays review-only and captures the future backend-owned execution requirements without enabling them from the frontend.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.guardSnapshotId +
      " / " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.guardSnapshotSummary,
  },
  {
    id: "result-placeholder",
    group: "Outputs",
    label: "Result placeholder",
    marker: "result placeholder only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.resultPlaceholderStatus,
    summary:
      "Result state stays placeholder-only so the approval packet can show readiness without generating media or executing providers.",
    detail: auditStatusRecord.resultLedgerStatus,
  },
  {
    id: "artifact-handoff-placeholder",
    group: "Outputs",
    label: "Artifact handoff placeholder",
    marker: "artifact handoff placeholder only",
    posture: "placeholder only",
    summary:
      "Artifact handoff remains a placeholder only with no file export, download generation, archive creation, signed URL creation, or platform upload.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.artifactHandoffPlaceholderStatus,
  },
  {
    id: "audit-preview",
    group: "Outputs",
    label: "Audit preview",
    marker: "audit preview only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.auditPreviewPosture,
    summary:
      "Audit preview stays review-only so operators can inspect approval packet posture without execution.",
    detail: auditStatusRecord.approvalStatus,
    href: "/jarvis-audit",
  },
  {
    id: "result-ledger-preview",
    group: "Outputs",
    label: "Result ledger preview",
    marker: "result ledger preview only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.resultLedgerPreviewPosture,
    summary:
      "Result ledger preview stays descriptive only while showing how a future backend result would be recorded after approval.",
    detail: auditStatusRecord.resultLedgerStatus,
    href: "/jarvis-audit",
  },
  {
    id: "status-preview",
    group: "Outputs",
    label: "Status preview",
    marker: "status preview only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.statusPreviewPosture,
    summary:
      "Status preview shows approval and dry-run posture only, without changing runtime state or dispatching work.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.statusPreviewSummary,
    href: "/jarvis-audit",
  },
  {
    id: "kill-switch-review",
    group: "Operations",
    label: "Kill switch posture",
    marker: "kill switch remains enforced",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.killSwitchPosture,
    summary:
      "The hard kill switch remains in front of any future backend video execution, and the frontend only shows its review posture.",
    detail: JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.killSwitchStatus,
  },
  {
    id: "lock-manager-review",
    group: "Operations",
    label: "Lock manager posture",
    marker: "lock manager required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.lockManagerPosture,
    summary:
      "Lock manager posture stays required before any future backend adapter execution and remains review-only here.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.lockManagerStatus,
  },
  {
    id: "idempotency-review",
    group: "Operations",
    label: "Idempotency posture",
    marker: "idempotency required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.idempotencyPosture,
    summary:
      "Idempotency stays mandatory for any future backend call while the current workspace remains review-only and execution-blocked.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.idempotencyStatus,
  },
  {
    id: "replay-block-review",
    group: "Operations",
    label: "Replay block posture",
    marker: "replay block required",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.replayBlockPosture,
    summary:
      "Replay blocking remains required before any future backend execution. The frontend only previews that safeguard.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.replayBlockStatus,
  },
  {
    id: "blocked-action-summary",
    group: "Operations",
    label: "Blocked action summary",
    marker: "blocked action summary only",
    posture: "summary only",
    summary:
      "Blocked actions remain explicit and visible, but no provider, network, render, export, publish, worker, tool, or trading execution is enabled.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.blockedActionSummary,
  },
  {
    id: "operator-review",
    group: "Operations",
    label: "Operator review posture",
    marker: "operator review required before video execution",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.operatorReviewPosture,
    summary:
      "Operator review remains required before video execution, and the current workspace stops at approval packet review readiness only.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.operatorRoles.join(
        ", "
      ) +
      " / " +
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.operatorReviewStatus,
  },
  {
    id: "execution-posture",
    group: "Operations",
    label: "Execution posture",
    marker:
      "video approval packet workspace completion does not enable provider/render/export/publish/workers/trading/automation",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.executionPosture,
    summary:
      "This batch stays disabled by default, hard kill switch protected, dry-run required before execution, backend-only, and execution-blocked.",
    detail:
      "disabled by default / hard kill switch / dry-run required before execution / backend-only execution path required",
  },
] satisfies readonly JarvisVideoApprovalPacketWorkspaceReviewCard[];
