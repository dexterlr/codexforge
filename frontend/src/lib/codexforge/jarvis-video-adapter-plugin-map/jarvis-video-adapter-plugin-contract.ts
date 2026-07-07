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

export type JarvisVideoAdapterPluginLinkRecord = Readonly<{
  label: string;
  href: string;
  marker: string;
  posture: string;
  summary: string;
}>;

export type JarvisVideoAdapterPluginMilestoneReference = Readonly<{
  phaseRange: string;
  title: string;
  href: string;
  marker: string;
  summary: string;
}>;

function requireJarvisVideoAdapterPluginRecord<T>(
  record: T | undefined,
  label: string
) {
  if (!record) {
    throw new Error(`Missing Jarvis video adapter plug-in record: ${label}`);
  }
  return record;
}

const sharedBackendAdapterContractRecord = requireJarvisVideoAdapterPluginRecord(
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "shared backend adapter contract / video.generate"
);

const permissionPolicyRecord = requireJarvisVideoAdapterPluginRecord(
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "permission approval engine / video.generate"
);

const plannerRouteRecord = requireJarvisVideoAdapterPluginRecord(
  JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "task planner tool router / video.generate"
);

const auditStatusRecord = requireJarvisVideoAdapterPluginRecord(
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES.find(
    (record) => record.capabilityId === "video.generate"
  ),
  "audit result status / video.generate"
);

const jarvisVideoWorkspaceRecord = requireJarvisVideoAdapterPluginRecord(
  JARVIS_UNIFIED_WORKSPACE_SHELL_WORKSPACES.find(
    (record) => record.id === "jarvis-video"
  ),
  "jarvis video workspace"
);

export const JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS = {
  capabilityRegistrationLink: {
    label: "Capability registration",
    href: "/jarvis",
    marker: "video.generate plugs into Jarvis",
    posture: "capability registration review only",
    summary:
      "Jarvis command center can see video.generate as a specialist capability without enabling execution.",
  },
  workspaceLink: {
    label: "Workspace link",
    href: jarvisVideoWorkspaceRecord.routeHref,
    marker: "video workspace plugs into Jarvis control plane",
    posture: "/jarvis-video workspace remains review-only",
    summary:
      "The shared Jarvis shell keeps /jarvis-video visible as a connected specialist workspace while staying review-only and execution-blocked.",
  },
  sharedBackendAdapterContractLink: {
    label: "Shared backend adapter contract link",
    href: "/jarvis-shared-adapter-contract-video-manifest-wiring",
    marker: "video adapter plugs into shared backend adapter contract",
    posture: "shared backend adapter contract link review only",
    summary:
      "Video stays bound to the shared backend contract through " +
      sharedBackendAdapterContractRecord.adapterId +
      ", " +
      sharedBackendAdapterContractRecord.inputEnvelopeName +
      ", " +
      sharedBackendAdapterContractRecord.outputEnvelopeName +
      ", and " +
      sharedBackendAdapterContractRecord.errorEnvelopeName +
      ".",
  },
  permissionPolicyLink: {
    label: "Permission policy link",
    href: "/jarvis-permission-approval-capability-permission-wiring",
    marker: "video permission policy plugs into Jarvis permission engine",
    posture: permissionPolicyRecord.permissionPosture,
    summary:
      "The permission engine keeps video.generate approval-required, dry-run required before execution, backend-only required, and human approval gate required.",
  },
  taskPlannerRouteLink: {
    label: "Task planner route link",
    href: plannerRouteRecord.plannedRouteTarget,
    marker: "video planner route plugs into Jarvis task planner",
    posture: "review-only route candidate",
    summary:
      "The planner can route a video goal to the video adapter candidate while keeping backend-only route required and dry-run route required.",
  },
  auditStatusLink: {
    label: "Audit and status link",
    href: "/jarvis-audit",
    marker: "video audit status plugs into Jarvis status dashboard",
    posture: "status dashboard review only",
    summary:
      "The audit/result/status layer already exposes blocked action summary only, adapter status, approval posture, dry-run posture, and result placeholder state for video.generate.",
  },
} satisfies Readonly<Record<string, JarvisVideoAdapterPluginLinkRecord>>;

export const JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES = [
  {
    phaseRange: "3434-3465",
    title: "Backend-Owned Video Provider Execution Runtime Readiness",
    href: "/video-provider-runtime-readiness-completion",
    marker: "backend-owned video runtime readiness reference only",
    summary:
      "Runtime readiness stays an inert review reference only and does not import or execute any backend adapter runtime.",
  },
  {
    phaseRange: "3466-3497",
    title: "First Backend-Owned Video Provider Execution Dry Run",
    href: "/video-provider-dry-run-completion",
    marker: "video dry-run reference only",
    summary:
      "The prior backend-owned video dry-run stack is linked as a static milestone only, with no live adapter execution or provider call.",
  },
  {
    phaseRange: "3498-3529",
    title: "First Backend-Owned Video Provider Execution Approval Packet",
    href: "/video-provider-approval-packet-completion",
    marker: "video approval packet reference only",
    summary:
      "Approval packet readiness is surfaced as review evidence only and remains approval-gated, backend-only, and execution-blocked.",
  },
  {
    phaseRange: "3530-3561",
    title: "First Backend-Owned Video Provider Execution Adapter Readiness",
    href: "/video-provider-adapter-readiness-completion",
    marker: "video adapter readiness reference only",
    summary:
      "Adapter readiness remains a backend-owned reference only and does not create provider functions, services, or runtime deploy paths.",
  },
] satisfies readonly JarvisVideoAdapterPluginMilestoneReference[];

export const JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS = {
  capabilityId: sharedBackendAdapterContractRecord.capabilityId,
  workspaceLabel: jarvisVideoWorkspaceRecord.label,
  workspaceHref: jarvisVideoWorkspaceRecord.routeHref,
  adapterId: sharedBackendAdapterContractRecord.adapterId,
  requestEnvelopeName: plannerRouteRecord.requestEnvelopeName,
  contractInputEnvelopeName: sharedBackendAdapterContractRecord.inputEnvelopeName,
  contractOutputEnvelopeName: sharedBackendAdapterContractRecord.outputEnvelopeName,
  contractErrorEnvelopeName: sharedBackendAdapterContractRecord.errorEnvelopeName,
  blockedActions: permissionPolicyRecord.blockedActionCategories,
  plannedRouteTarget: plannerRouteRecord.plannedRouteTarget,
  permissionPosture: permissionPolicyRecord.permissionPosture,
  approvalMode: permissionPolicyRecord.approvalMode,
  dryRunRequirement: permissionPolicyRecord.dryRunRequirement,
  backendOnlyRequirement: permissionPolicyRecord.backendOnlyRequirement,
  approvalPacketReadiness: permissionPolicyRecord.approvalPacketReadiness,
  adapterStatus: auditStatusRecord.adapterStatus,
  blockedActionSummary: auditStatusRecord.blockedActionSummary,
  dryRunStatus: auditStatusRecord.dryRunStatus,
  approvalStatus: auditStatusRecord.approvalStatus,
  resultLedgerStatus: auditStatusRecord.resultLedgerStatus,
  artifactPlaceholderStatus: auditStatusRecord.artifactPlaceholderStatus,
  killSwitchStatus: auditStatusRecord.killSwitchStatus,
  lockIdempotencyStatus: auditStatusRecord.lockIdempotencyStatus,
  replayBlockStatus: auditStatusRecord.replayBlockStatus,
  operatorReviewStatus: auditStatusRecord.operatorReviewStatus,
  executionPosture: auditStatusRecord.executionPosture,
} as const;
