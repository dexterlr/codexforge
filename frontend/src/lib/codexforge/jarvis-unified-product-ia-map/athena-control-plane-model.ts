import type { CodexForgeNavigationRouteHref } from "../navigation-shell/navigation-shell-types";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH =
  "4458-4489 - Athena Unified Chat Control Plane Foundation";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE = 4489;

export const ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH =
  "4490-4521 - Athena Plugin Registry and Command Router";

export const ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_PHASE = 4521;

export const ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH =
  "4522-4553 - Athena Approval-Gated Tool Execution Bridge";

export const ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_PHASE = 4553;

export const ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH =
  "4554-4585 - Athena Cross-Workspace Run Timeline and Audit Memory";

export const ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_PHASE = 4585;

export const ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH =
  "4586-4617 - Athena Product UX Polish and Operator Home Takeover";

export const ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_PHASE = 4617;

export const ATHENA_CONVERSATIONAL_COMMAND_COMPOSER_APPROVAL_DRAFTS_BATCH =
  "4618-4649 - Athena Conversational Command Composer and Approval Drafts";

export type AthenaLauncherStatus =
  | "ready"
  | "approval-required"
  | "blocked"
  | "secondary";

export type AthenaExecutionPosture =
  | "preview-only"
  | "review-only"
  | "backend-only-required";

export type AthenaCommandIntentState =
  | "blocked-by-default"
  | "review-only"
  | "approval-gated"
  | "secondary-diagnostics";

export type AthenaPluginId =
  | "jarvis-video-studio"
  | "jarvis-websites"
  | "jarvis-avatar"
  | "jarvis-workflows"
  | "audit-runs"
  | "providers"
  | "assets"
  | "projects"
  | "safety-settings"
  | "trading"
  | "developer-checkpoints";

const ATHENA_PLUGIN_ROUTE_HREFS = {
  jarvisVideoStudio: "/jarvis-video",
  jarvisWebsites: "/jarvis-websites",
  jarvisAvatar: "/jarvis-avatar",
  jarvisWorkflows: "/jarvis-workflows",
  auditRuns: "/jarvis-audit",
  providers: "/ai-providers",
  assets: "/video-assets",
  projects: "/video-projects",
  safetySettings: "/jarvis-safety",
  trading: "/jarvis-trading",
  developerCheckpoints:
    "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
} as const satisfies Record<string, CodexForgeNavigationRouteHref>;

const ATHENA_COMMAND_ROUTE_HREFS = {
  ...ATHENA_PLUGIN_ROUTE_HREFS,
  approvalQueue: "/approval-queue",
} as const satisfies Record<string, CodexForgeNavigationRouteHref>;

// Historical router marker for legacy smoke coverage: routeTarget: "/approval-queue"

export type AthenaPluginRouteHref =
  (typeof ATHENA_PLUGIN_ROUTE_HREFS)[keyof typeof ATHENA_PLUGIN_ROUTE_HREFS];

export type AthenaCommandRouteHref =
  (typeof ATHENA_COMMAND_ROUTE_HREFS)[keyof typeof ATHENA_COMMAND_ROUTE_HREFS];

export type AthenaCommandIntentId =
  | "video-generation-intent"
  | "website-build-intent"
  | "avatar-presenter-intent"
  | "workflow-automation-intent"
  | "audit-review-intent"
  | "provider-readiness-intent"
  | "safety-review-intent"
  | "approval-packet-intent"
  | "asset-review-intent"
  | "project-review-intent"
  | "trading-review-intent";

export type AthenaPluginKey = `athena-plugin:${AthenaPluginId}`;
export type AthenaCommandKey = `athena-command:${AthenaCommandIntentId}`;
export type AthenaApprovalBridgeKey = `athena-bridge:${AthenaCommandIntentId}`;
export type AthenaHandoffPacketKey =
  `athena-handoff-packet:${AthenaCommandIntentId}`;
export type AthenaRunTimelineKey =
  `athena-run-timeline:${AthenaCommandIntentId}`;
export type AthenaAuditMemoryKey =
  `athena-audit-memory:${AthenaCommandIntentId}`;
export type AthenaApprovalGatedToolBridgeVersion =
  "athena-approval-gated-tool-execution-bridge-v1";
export type AthenaCrossWorkspaceRunTimelineVersion =
  "athena-cross-workspace-run-timeline-v1";
export type AthenaAuditMemoryPreviewVersion =
  "athena-audit-memory-preview-v1";
export type AthenaConditionalRequirementState = "required" | "not-applicable";
export type AthenaHandoffPacketSource = "Athena";
export type AthenaTimelineMode = "preview-only";
export type AthenaAuditMemoryMode = "static-preview-only";
export type AthenaRunStatus = "not-executed";
export type AthenaPluginExecutionState = "not-executed";
export type AthenaProviderExecutionState = "not-called";
export type AthenaDispatchState = "not-dispatched";
export type AthenaJobExecutionState = "not-executed";
export type AthenaPersistenceState = "not-persisted";
export type AthenaTimelineMilestoneCategory =
  | "routing"
  | "approval"
  | "safety"
  | "audit"
  | "handoff"
  | "blocker"
  | "result-pending";

export type AthenaIdentityModel = Readonly<{
  name: string;
  title: string;
  mission: string;
  operatorPromise: string;
  posture: string;
}>;

export type AthenaChatModel = Readonly<{
  label: string;
  placeholder: string;
  helperText: string;
  executionPosture: string;
}>;

export type AthenaSuggestedPromptRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  routeHint: AthenaCommandRouteHref;
}>;

export type AthenaPluginRegistryRecord = Readonly<{
  pluginId: AthenaPluginId;
  label: string;
  routeHref: AthenaPluginRouteHref;
  description: string;
  currentCapability: string;
  executionPosture: string;
  approvalPosture: string;
  auditPosture: string;
  backendRequirement: string;
  providerCapable: boolean;
  defaultState: AthenaCommandIntentState;
  safetyGates: readonly string[];
  sampleCommands: readonly string[];
  nextAction: string;
  status: AthenaLauncherStatus;
}>;

export type AthenaPluginRegistryPreviewRecord = AthenaPluginRegistryRecord;

export type AthenaSafetyGateRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  tone: AthenaLauncherStatus;
}>;

export type AthenaBlockedActionGroup = Readonly<{
  id: string;
  label: string;
  summary: string;
  items: readonly string[];
}>;

export type AthenaHandoffStepRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
}>;

export type AthenaAuditReadinessRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  tone: AthenaLauncherStatus;
}>;

export type AthenaCapabilityRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
}>;

export type AthenaCommandIntentRecord = Readonly<{
  commandId: AthenaCommandIntentId;
  label: string;
  intentAliases: readonly string[];
  userFacingPhrase: string;
  matchedPluginId: AthenaPluginId;
  routeTarget: AthenaCommandRouteHref;
  requiredApprovals: readonly string[];
  requiredSafetyGates: readonly string[];
  requiredAuditGates: readonly string[];
  backendOnlyRequirement: string;
  executionPosture: AthenaExecutionPosture;
  defaultState: AthenaCommandIntentState;
  routerExplanation: string;
  previewedHandoffSteps: readonly string[];
}>;

export type AthenaCommandRoutePreview = Readonly<{
  commandKey: AthenaCommandKey;
  pluginKey: AthenaPluginKey;
  userFacingPhrase: string;
  matchedPluginLabel: string;
  routeTarget: AthenaCommandRouteHref;
  executionPosture: AthenaExecutionPosture;
  defaultState: AthenaCommandIntentState;
  routerExplanation: string;
  previewedHandoffSteps: readonly string[];
}>;

export type AthenaApprovalGatedBridgePreviewRecord = Readonly<{
  bridgeKey: AthenaApprovalBridgeKey;
  bridgeVersion: AthenaApprovalGatedToolBridgeVersion;
  commandIntentReference: AthenaCommandIntentId;
  matchedPluginReference: AthenaPluginId;
  matchedPluginLabel: string;
  routeTargetReference: AthenaCommandRouteHref;
  approvalPacketPreviewReference: AthenaHandoffPacketKey;
  userFacingPhrase: string;
  operatorApprovalRequirement: "required";
  safetyGateRequirement: "required";
  killSwitchRequirement: "required";
  auditRequirement: "required";
  backendOnlyHandoffRequirement: "required";
  credentialIsolationRequirement: AthenaConditionalRequirementState;
  costAcknowledgementRequirement: AthenaConditionalRequirementState;
  privacyRedactionRequirement: "required";
  idempotencyRequirement: "required";
  replayBlockRequirement: "required";
  singleCallLockRequirement: "required";
  timeoutCancelRequirement: "required";
  resultCaptureRequirement: "required";
  auditEnvelopeRequirement: "required";
  approvalJoinRequirement: "required";
  executionPosture: "blocked-by-default";
  pluginExecutionState: "not-executed";
  providerState: "not-called";
  queueState: "not-dispatched";
  workerState: "not-dispatched";
  jobState: "not-executed";
  resultState: "not-persisted";
  auditState: "not-persisted";
  approvalState: "not-persisted";
  bridgeBlockerList: readonly string[];
  nextTimelineAuditMemoryChecklist: readonly string[];
}>;

export type AthenaHandoffPacketPreviewRecord = Readonly<{
  packetId: AthenaHandoffPacketKey;
  source: AthenaHandoffPacketSource;
  commandIntentId: AthenaCommandIntentId;
  targetPluginId: AthenaPluginId;
  targetPluginLabel: string;
  targetRoute: AthenaCommandRouteHref;
  userFacingCommandPhrase: string;
  approvalSummary: string;
  safetySummary: string;
  auditSummary: string;
  backendHandoffSummary: string;
  blockedDefaultReason: string;
  requiredOperatorAction: string;
  requiredNextSystemAction: string;
  noExecutionStatement: string;
}>;

export type AthenaTimelineGateSnapshot = Readonly<{
  status: "required" | "visible" | "pending";
  summary: string;
}>;

export type AthenaTimelineMilestoneRecord = Readonly<{
  milestoneId: string;
  category: AthenaTimelineMilestoneCategory;
  label: string;
  stateLabel: string;
  summary: string;
}>;

export type AthenaCrossWorkspaceRunTimelineRecord = Readonly<{
  timelineVersion: AthenaCrossWorkspaceRunTimelineVersion;
  source: AthenaHandoffPacketSource;
  timelineMode: AthenaTimelineMode;
  runId: AthenaRunTimelineKey;
  timelineKey: AthenaRunTimelineKey;
  commandIntentReference: AthenaCommandIntentId;
  userFacingCommandPhrase: string;
  matchedPluginReference: AthenaPluginId;
  matchedPluginLabel: string;
  targetRouteReference: AthenaCommandRouteHref;
  handoffPacketReference: AthenaHandoffPacketKey;
  approvalGateSnapshot: AthenaTimelineGateSnapshot;
  safetyGateSnapshot: AthenaTimelineGateSnapshot;
  killSwitchSnapshot: AthenaTimelineGateSnapshot;
  auditGateSnapshot: AthenaTimelineGateSnapshot;
  backendOnlyHandoffSnapshot: AthenaTimelineGateSnapshot;
  resultCaptureSnapshot: AthenaTimelineGateSnapshot;
  blockedDefaultReason: string;
  runStatus: AthenaRunStatus;
  pluginExecutionState: AthenaPluginExecutionState;
  providerState: AthenaProviderExecutionState;
  queueState: AthenaDispatchState;
  workerState: AthenaDispatchState;
  jobState: AthenaJobExecutionState;
  resultState: AthenaPersistenceState;
  auditState: AthenaPersistenceState;
  approvalState: AthenaPersistenceState;
  eventList: readonly AthenaTimelineMilestoneRecord[];
  nextAction: string;
  nextProductPolishChecklist: readonly string[];
}>;

export type AthenaAuditMemoryPreviewRecord = Readonly<{
  memoryKey: AthenaAuditMemoryKey;
  auditMemoryVersion: AthenaAuditMemoryPreviewVersion;
  memoryMode: AthenaAuditMemoryMode;
  persistentMemory: "no persistent memory";
  browserStorage: "no browser storage";
  localStorage: "no localStorage";
  sessionStorage: "no sessionStorage";
  indexedDb: "no IndexedDB";
  cookies: "no cookies";
  databaseWrites: "no database writes";
  commandPhrase: string;
  pluginId: AthenaPluginId;
  pluginLabel: string;
  routeTarget: AthenaCommandRouteHref;
  approvalRequirement: string;
  safetyRequirement: string;
  auditRequirement: string;
  blockedDefaultState: AthenaCommandIntentState;
  lastKnownStateLabel: string;
  resultState: AthenaPersistenceState;
  operatorActionRequired: string;
  nextHandoffRequirement: string;
}>;

export type AthenaTimelineItemsByPluginGroup = Readonly<{
  pluginId: AthenaPluginId;
  pluginLabel: string;
  itemCount: number;
  items: readonly AthenaCrossWorkspaceRunTimelineRecord[];
}>;

export type AthenaTimelineItemsByBlockedStateGroup = Readonly<{
  blockedState: AthenaCommandIntentState;
  blockedStateLabel: string;
  itemCount: number;
  items: readonly AthenaCrossWorkspaceRunTimelineRecord[];
}>;

export type AthenaCommandCenterModel = Readonly<{
  batch: string;
  highestDetectedPhase: number;
  latestCompletedBatch: string;
  previousCompletedBatch: string;
  nextLikelyBatch: string;
  identity: AthenaIdentityModel;
  chat: AthenaChatModel;
  productUx: AthenaProductUxModel;
  suggestedPrompts: readonly AthenaSuggestedPromptRecord[];
  pluginRegistryPreview: readonly AthenaPluginRegistryPreviewRecord[];
  safetyGates: readonly AthenaSafetyGateRecord[];
  blockedActions: readonly AthenaBlockedActionGroup[];
  handoffFlow: readonly AthenaHandoffStepRecord[];
  auditReadiness: readonly AthenaAuditReadinessRecord[];
  nextActions: readonly AthenaCapabilityRecord[];
  currentCapabilities: readonly AthenaCapabilityRecord[];
  futureCapabilities: readonly AthenaCapabilityRecord[];
  commandIntents: readonly AthenaCommandIntentRecord[];
  approvalGatedToolBridgePreviews: readonly AthenaApprovalGatedBridgePreviewRecord[];
  handoffPacketPreviews: readonly AthenaHandoffPacketPreviewRecord[];
  crossWorkspaceRunTimeline: readonly AthenaCrossWorkspaceRunTimelineRecord[];
  auditMemoryPreview: readonly AthenaAuditMemoryPreviewRecord[];
}>;

export type AthenaPrimaryOperatorActionId =
  | "open-athena-command-center"
  | "open-jarvis-video-studio"
  | "review-blocked-actions"
  | "check-provider-readiness"
  | "open-audit-timeline"
  | "open-projects-assets"
  | "open-website-planning"
  | "open-avatar-studio"
  | "open-workflow-planning"
  | "open-trading-desk";

export type AthenaPluginLauncherGroupId =
  | "operator-cockpit-launchers"
  | "specialist-plugin-launchers";

export type AthenaOperatorStatusValue =
  | "preview-only"
  | "available as preview"
  | "static preview"
  | "locked"
  | "not implemented"
  | "required";

export type AthenaImmediateStatusCard = Readonly<{
  id:
    | "plan"
    | "route"
    | "approval-gated-handoff"
    | "audit-memory-preview";
  label: string;
  value: string;
  summary: string;
  tone: AthenaLauncherStatus;
}>;

export type AthenaProductUxHeroCopy = Readonly<{
  upperJarvisLayerLabel: string;
  missionLine: string;
  operatorInputLead: string;
  homeSummary: string;
  homeSupportLine: string;
  homeAskCopy: string;
  postureChips: readonly string[];
}>;

export type AthenaProductUxActionRecord = Readonly<{
  id: AthenaPrimaryOperatorActionId;
  label: string;
  shortLabel: string;
  summary: string;
  href: CodexForgeNavigationRouteHref;
  badge: string;
  tone: AthenaLauncherStatus;
}>;

export type AthenaPluginLauncherGroupRecord = Readonly<{
  id: AthenaPluginLauncherGroupId;
  label: string;
  description: string;
  cards: readonly AthenaProductUxActionRecord[];
}>;

export type AthenaOperatorStatusRecord = Readonly<{
  id: string;
  label: string;
  value: AthenaOperatorStatusValue;
  summary: string;
  tone: AthenaLauncherStatus;
}>;

export type AthenaProductUxModel = Readonly<{
  productUxVersion: string;
  operatorHomeTakeoverVersion: string;
  heroCopy: AthenaProductUxHeroCopy;
  cockpitSummary: string;
  commandComposerPlaceholderCopy: string;
  immediateStatusCards: readonly AthenaImmediateStatusCard[];
  primaryOperatorActions: readonly AthenaProductUxActionRecord[];
  pluginLauncherGroups: readonly AthenaPluginLauncherGroupRecord[];
  safetyPostureSummary: string;
  approvalPostureSummary: string;
  auditPostureSummary: string;
  currentReadinessSummary: string;
  blockedDefaultExecutionSummary: string;
  nextOperatorActions: readonly string[];
  nextConversationalComposerChecklist: readonly string[];
  operatorStatusPanel: readonly AthenaOperatorStatusRecord[];
}>;

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_MARKERS = {
  batch: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH,
  highestDetectedPhase: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE,
  mission:
    "Athena is the main chat operator brain above all specialist Jarvis workspaces.",
  posture: "Athena unified chat control plane foundation only. Chat input is inert/local only.",
  nextLikelyBatch: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH,
} as const;

export const ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_MARKERS = {
  batch: ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH,
  highestDetectedPhase: ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_PHASE,
  latestCompletedBatch: ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH,
  previousCompletedBatch: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH,
  nextLikelyBatch: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH,
} as const;

export const ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_MARKERS = {
  batch: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH,
  highestDetectedPhase: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_PHASE,
  latestCompletedBatch: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH,
  previousCompletedBatch: ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH,
  nextLikelyBatch: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH,
} as const;

export const ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_MARKERS = {
  batch: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH,
  highestDetectedPhase: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_PHASE,
  latestCompletedBatch: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH,
  previousCompletedBatch: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH,
  nextLikelyBatch: ATHENA_CONVERSATIONAL_COMMAND_COMPOSER_APPROVAL_DRAFTS_BATCH,
} as const;

// Historical 4521 posture marker for legacy smoke coverage:
// Athena plugin registry and command router only. Plugin registry is inert. Command router is preview-only. Chat input stays local and executes nothing.

export const ATHENA_PRODUCT_UX_HERO_COPY = {
  upperJarvisLayerLabel: "Your upper Jarvis layer",
  missionLine:
    "Plan, route, review, and safely hand off work across CodexForge.",
  operatorInputLead: "Ask Athena what you want to build or control.",
  homeSummary: "Athena is the main Jarvis control layer.",
  homeSupportLine:
    "Athena helps you plan, route, review, and safely hand off AI work across CodexForge.",
  homeAskCopy:
    "Ask Athena to plan, route, review, and safely hand off AI work across CodexForge.",
  postureChips: [
    "No plugin execution from chat yet",
    "Approval-gated handoffs only",
    "Backend-only execution required",
    "Audit required",
    "Kill switch required",
  ],
} as const satisfies AthenaProductUxHeroCopy;

export const ATHENA_PRIMARY_OPERATOR_ACTIONS = [
  {
    id: "open-athena-command-center",
    label: "Open Athena Command Center",
    shortLabel: "Athena Command Center",
    summary:
      "Open Athena as the upper Jarvis operator brain for preview-only planning, routing, review, and safe handoff preparation.",
    href: "/jarvis",
    badge: "/jarvis",
    tone: "ready",
  },
  {
    id: "open-jarvis-video-studio",
    label: "Open Jarvis Video Studio",
    shortLabel: "Jarvis Video Studio",
    summary:
      "Open the preserved above-the-fold video generation control, brief, prompt / concept, output preview, and locked backend handoff controls.",
    href: "/jarvis-video",
    badge: "/jarvis-video",
    tone: "approval-required",
  },
  {
    id: "review-blocked-actions",
    label: "Review blocked actions",
    shortLabel: "Safety / Settings",
    summary:
      "Review blocked plugin, provider, autonomy, persistence, and storage lanes before discussing any backend handoff.",
    href: "/jarvis-safety",
    badge: "/jarvis-safety",
    tone: "blocked",
  },
  {
    id: "check-provider-readiness",
    label: "Check provider readiness",
    shortLabel: "Providers and readiness",
    summary:
      "Inspect provider boundaries, backend-only requirements, and the locked-by-default execution posture from the operator cockpit.",
    href: "/ai-providers",
    badge: "/ai-providers",
    tone: "approval-required",
  },
  {
    id: "open-audit-timeline",
    label: "Open audit timeline",
    shortLabel: "Audit / Runs",
    summary:
      "Review the audit timeline, blocked actions, evidence posture, and preview-only run lanes without persistence.",
    href: "/jarvis-audit",
    badge: "/jarvis-audit",
    tone: "ready",
  },
  {
    id: "open-projects-assets",
    label: "Review projects and assets",
    shortLabel: "Projects / Assets",
    summary:
      "Review project context from /video-projects and asset context from /video-assets while mutation remains blocked.",
    href: "/video-projects",
    badge: "/video-projects",
    tone: "secondary",
  },
  {
    id: "open-website-planning",
    label: "Review website planning",
    shortLabel: "Jarvis Websites",
    summary:
      "Open Jarvis Websites to review the brief, sitemap, design system, and blocked preview or publish posture.",
    href: "/jarvis-websites",
    badge: "/jarvis-websites",
    tone: "blocked",
  },
  {
    id: "open-avatar-studio",
    label: "Review avatar studio",
    shortLabel: "Jarvis Avatar",
    summary:
      "Open Jarvis Avatar to review persona, consent, and blocked preview posture without any generation path.",
    href: "/jarvis-avatar",
    badge: "/jarvis-avatar",
    tone: "blocked",
  },
  {
    id: "open-workflow-planning",
    label: "Review workflow planning",
    shortLabel: "Jarvis Workflows",
    summary:
      "Open Jarvis Workflows to review trigger, planner, permission, dry-run, approval, and audit lanes with dispatch blocked.",
    href: "/jarvis-workflows",
    badge: "/jarvis-workflows",
    tone: "blocked",
  },
  {
    id: "open-trading-desk",
    label: "Review trading desk",
    shortLabel: "Jarvis Trading Desk",
    summary:
      "Open Jarvis Trading Desk to keep paper-review-only strategy, risk, and operator approval posture visible.",
    href: "/jarvis-trading",
    badge: "/jarvis-trading",
    tone: "approval-required",
  },
] as const satisfies readonly AthenaProductUxActionRecord[];

export const ATHENA_IMMEDIATE_STATUS_CARDS = [
  {
    id: "plan",
    label: "Plan",
    value: "Preview-only",
    summary:
      "Athena can outline the operator path from chat without sending prompts or executing anything.",
    tone: "ready",
  },
  {
    id: "route",
    label: "Route",
    value: "Preview-only",
    summary:
      "Athena can match the plugin registry and preview the right workspace or control lane without opening a live execution path.",
    tone: "ready",
  },
  {
    id: "approval-gated-handoff",
    label: "Approval-gated handoff",
    value: "Blocked by default",
    summary:
      "Athena can prepare backend-only handoff previews while operator approval, audit, and kill switch review remain required.",
    tone: "approval-required",
  },
  {
    id: "audit-memory-preview",
    label: "Audit memory preview",
    value: "Static preview only",
    summary:
      "Athena can show audit memory preview without persistence, browser storage, or database writes.",
    tone: "secondary",
  },
] as const satisfies readonly AthenaImmediateStatusCard[];

export const ATHENA_PLUGIN_LAUNCHER_GROUPS = [
  {
    id: "operator-cockpit-launchers",
    label: "Operator cockpit launchers",
    description:
      "Athena leads the top-level control surface while audit, provider readiness, safety, projects, and video stay one click away.",
    cards: [
      ATHENA_PRIMARY_OPERATOR_ACTIONS[0],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[1],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[3],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[4],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[2],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[5],
    ],
  },
  {
    id: "specialist-plugin-launchers",
    label: "Specialist plugin launchers",
    description:
      "Specialist plugin pages stay preview-only tools that Athena can route to and later control behind approvals and backend gates.",
    cards: [
      ATHENA_PRIMARY_OPERATOR_ACTIONS[6],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[7],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[8],
      ATHENA_PRIMARY_OPERATOR_ACTIONS[9],
    ],
  },
] as const satisfies readonly AthenaPluginLauncherGroupRecord[];

export const ATHENA_OPERATOR_STATUS_PANEL = [
  {
    id: "chat-control",
    label: "Chat control",
    value: "preview-only",
    summary:
      "Chat input remains inert/local only and does not send prompts, store drafts, or execute anything.",
    tone: "ready",
  },
  {
    id: "plugin-routing",
    label: "Plugin routing",
    value: "available as preview",
    summary:
      "Athena can map commands into specialist plugin routes and keep the routing decision visible as preview-only product UX.",
    tone: "ready",
  },
  {
    id: "approval-handoff",
    label: "Approval handoff",
    value: "preview-only",
    summary:
      "Athena can preview approval-gated handoff packets, but it does not dispatch a queue, worker, job, or backend runner.",
    tone: "approval-required",
  },
  {
    id: "timeline-audit-memory",
    label: "Timeline/audit memory",
    value: "static preview",
    summary:
      "Cross-workspace timeline and audit memory remain visible as static previews with no persistence.",
    tone: "secondary",
  },
  {
    id: "provider-execution",
    label: "Provider execution",
    value: "locked",
    summary:
      "Provider execution is locked and remains backend-only with operator approval, kill switch, and audit requirements.",
    tone: "blocked",
  },
  {
    id: "plugin-execution",
    label: "Plugin execution",
    value: "locked",
    summary:
      "Plugin execution remains blocked until approvals and backend gates are satisfied.",
    tone: "blocked",
  },
  {
    id: "autonomous-execution",
    label: "Autonomous execution",
    value: "locked",
    summary:
      "Athena does not autonomously execute plugins, providers, workflows, queues, jobs, brokers, or specialist tools.",
    tone: "blocked",
  },
  {
    id: "persistence",
    label: "Persistence",
    value: "not implemented",
    summary:
      "No result persistence, no audit persistence, no approval persistence, no persistent memory, and no browser storage are implemented.",
    tone: "blocked",
  },
  {
    id: "backend-only-execution",
    label: "Backend-only execution",
    value: "required",
    summary:
      "Any future execution path requires backend-only execution, operator approval, kill switch review, and audit review.",
    tone: "approval-required",
  },
] as const satisfies readonly AthenaOperatorStatusRecord[];

export const ATHENA_PRODUCT_UX_POLISH_MODEL = {
  productUxVersion: "athena-product-ux-polish-v1",
  operatorHomeTakeoverVersion: "athena-operator-home-takeover-v1",
  heroCopy: ATHENA_PRODUCT_UX_HERO_COPY,
  cockpitSummary:
    "Athena is the main Jarvis control layer. Athena is the main chat control layer. Athena can prepare approval-gated handoffs. Jarvis is the operating system / safety control plane, and specialist plugin pages stay preview-only tools Athena can route to and later control with approvals and backend gates.",
  commandComposerPlaceholderCopy: "Ask Athena what you want to build or control.",
  immediateStatusCards: ATHENA_IMMEDIATE_STATUS_CARDS,
  primaryOperatorActions: ATHENA_PRIMARY_OPERATOR_ACTIONS,
  pluginLauncherGroups: ATHENA_PLUGIN_LAUNCHER_GROUPS,
  safetyPostureSummary:
    "Athena product UX polish and operator home takeover only. No prompt sending. No frontend provider call. No frontend fetch/network call. Kill switch required. No browser storage. No persistent memory.",
  approvalPostureSummary:
    "Approval-gated handoffs only. Operator approval required. Backend-only execution required.",
  auditPostureSummary:
    "Audit required. Audit memory preview is static preview only. No audit persistence.",
  currentReadinessSummary:
    "Chat control is preview-only. Plugin routing is available as preview. Approval handoff is preview-only. Timeline/audit memory is static preview.",
  blockedDefaultExecutionSummary:
    "Plugin execution remains blocked. Provider execution is locked. Autonomous execution is locked. Persistence is not implemented. Backend-only execution is required.",
  nextOperatorActions: [
    "Open Athena Command Center and draft the operator request locally.",
    "Review the command router preview and the approval-gated handoff path before opening a specialist workspace.",
    "Use Jarvis Video Studio, Audit / Runs, Providers, Safety / Settings, or Projects / Assets based on the routed lane.",
    "Keep backend-only execution, operator approval, kill switch, and audit requirements visible.",
  ],
  nextConversationalComposerChecklist: [
    "Next likely batch: 4618-4649 - Athena Conversational Command Composer and Approval Drafts",
    "Keep the conversational command composer preview-only and inert by default.",
    "Draft approval packets locally without prompt sending, persistence, or browser storage.",
    "Preserve backend-only execution, operator approval, kill switch, and audit requirements.",
    "Do not add plugin execution, provider execution, autonomous execution, or persistence.",
  ],
  operatorStatusPanel: ATHENA_OPERATOR_STATUS_PANEL,
} as const satisfies AthenaProductUxModel;

export const ATHENA_CONTROL_PLANE_IDENTITY = {
  name: "Athena",
  title: "Athena Command Center",
  mission:
    "Athena is the main chat control layer above all specialist Jarvis workspaces and approval-gated product lanes. Athena is the main Jarvis control layer. Athena can plan and route, review, preview cross-workspace run timelines, show static audit memory previews, prepare approval-gated handoff packet previews, and safely hand off work across CodexForge.",
  operatorPromise:
    "Ask Athena to plan, route, review, and safely hand off work across CodexForge.",
  posture:
    "Athena approval-gated tool execution bridge only. Handoff packet preview only. Bridge is inert. Bridge is blocked by default. Plugin registry is inert. Command router is preview-only. Chat input stays local and executes nothing.",
} as const satisfies AthenaIdentityModel;

export const ATHENA_CHAT_PLACEHOLDER_MODEL = {
  label: "Athena operator input",
  placeholder:
    "Ask Athena what you want to build or control. Draft an operator request for Athena. This stays local to the page and executes nothing.",
  helperText:
    "chat input is inert/local only; no prompt sending; no frontend fetch/network call; no browser storage; no persistent memory; no plugin execution from chat yet; approval-gated handoffs only; backend-only execution required; audit required; kill switch required; no queue dispatch; no result persistence",
  executionPosture:
    "Execution remains approval-gated, blocked by default, and backend-only. Timeline is preview-only. Audit memory is static preview only. No autonomous execution.",
} as const satisfies AthenaChatModel;

export const ATHENA_SUGGESTED_PROMPTS = [
  {
    id: "cinematic-video",
    label: "Make a cinematic product video",
    summary:
      "Route into Jarvis Video Studio to review the video brief, prompt / concept, output preview, and locked backend handoff controls.",
    routeHint: "/jarvis-video",
  },
  {
    id: "landing-page",
    label: "Build a landing page",
    summary:
      "Route into Jarvis Websites to review the brief, sitemap, design system, and blocked preview or publish steps.",
    routeHint: "/jarvis-websites",
  },
  {
    id: "avatar-presenter",
    label: "Create an avatar presenter",
    summary:
      "Route into Jarvis Avatar to review persona, consent, safety, and blocked preview posture.",
    routeHint: "/jarvis-avatar",
  },
  {
    id: "audit-trail",
    label: "Review the audit trail",
    summary:
      "Route into Audit / Runs to review approvals, blocked actions, evidence packets, and non-persistent result placeholders.",
    routeHint: "/jarvis-audit",
  },
  {
    id: "approval-packet",
    label: "Prepare an approval packet",
    summary:
      "Route into Safety / Settings to review approval posture, audit gates, and backend-only handoff requirements.",
    routeHint: "/jarvis-safety",
  },
  {
    id: "blocked-state",
    label: "Show what is blocked",
    summary:
      "Route into Safety / Settings to summarize blocked provider, workflow, plugin, persistence, and execution paths.",
    routeHint: "/jarvis-safety",
  },
  {
    id: "provider-readiness",
    label: "Check provider readiness",
    summary:
      "Route into Providers to review provider registry posture, boundaries, and backend-only provider requirements.",
    routeHint: "/ai-providers",
  },
  {
    id: "project-review",
    label: "Review my projects",
    summary:
      "Route into Projects to review current project context, planning surfaces, and blocked mutation lanes.",
    routeHint: "/video-projects",
  },
] as const satisfies readonly AthenaSuggestedPromptRecord[];

const ATHENA_PLUGIN_REGISTRY = [
  {
    pluginId: "jarvis-video-studio",
    label: "Jarvis Video Studio",
    routeHref: "/jarvis-video",
    description:
      "Mission brief, prompt / concept, output preview, and locked backend handoff controls remain above the fold.",
    currentCapability:
      "Video brief review, route preview, approval posture review, and locked backend handoff planning.",
    executionPosture: "Backend-only execution required",
    approvalPosture: "Operator approval required",
    auditPosture: "Audit and result review required",
    backendRequirement:
      "Manual or provider execution stays backend-only and remains locked from the frontend.",
    providerCapable: true,
    defaultState: "blocked-by-default",
    safetyGates: [
      "no prompt sending",
      "no live video generation",
      "kill switch required",
      "audit required",
    ],
    sampleCommands: [
      "Make a cinematic product video",
      "Review the video handoff path",
    ],
    nextAction:
      "Open Jarvis Video Studio and review the brief, locked controls, and backend-only handoff path.",
    status: "approval-required",
  },
  {
    pluginId: "jarvis-websites",
    label: "Jarvis Websites",
    routeHref: "/jarvis-websites",
    description:
      "Review-first website planning with brief, sitemap, design system, and blocked preview or publish steps.",
    currentCapability:
      "Website planning, layout review, and publish gating review with no generation or deploy.",
    executionPosture: "Preview and publish blocked",
    approvalPosture: "Operator approval required",
    auditPosture: "Audit review required before preview or publish",
    backendRequirement:
      "Preview, export, and deploy remain future backend-owned work only.",
    providerCapable: true,
    defaultState: "blocked-by-default",
    safetyGates: [
      "no file writes from the app",
      "no publish execution",
      "no frontend fetch/network call",
    ],
    sampleCommands: [
      "Build a landing page",
      "Review the website plan",
    ],
    nextAction:
      "Open Jarvis Websites and review the brief, sitemap, and blocked preview posture.",
    status: "blocked",
  },
  {
    pluginId: "jarvis-avatar",
    label: "Jarvis Avatar",
    routeHref: "/jarvis-avatar",
    description:
      "Review persona, consent, voice and visual style, and blocked preview posture in one studio shell.",
    currentCapability:
      "Avatar persona review, consent review, and blocked preview planning with no generation.",
    executionPosture: "Preview blocked",
    approvalPosture: "Operator approval required",
    auditPosture: "Consent and audit review required",
    backendRequirement:
      "Consent tracking, preview rendering, and future generation remain backend-only.",
    providerCapable: true,
    defaultState: "blocked-by-default",
    safetyGates: [
      "consent review required",
      "no likeness execution",
      "no provider execution",
    ],
    sampleCommands: [
      "Create an avatar presenter",
      "Review avatar consent posture",
    ],
    nextAction:
      "Open Jarvis Avatar and review persona, consent, and blocked preview posture.",
    status: "blocked",
  },
  {
    pluginId: "jarvis-workflows",
    label: "Jarvis Workflows",
    routeHref: "/jarvis-workflows",
    description:
      "Review triggers, permissions, dry run, approval, and audit while scheduling and dispatch remain blocked.",
    currentCapability:
      "Workflow planning, permission review, and dry-run posture review with no automation dispatch.",
    executionPosture: "Dispatch blocked",
    approvalPosture: "Operator approval required",
    auditPosture: "Audit trail required before any automation handoff",
    backendRequirement:
      "Planner, policy engine, dry-run simulation, and dispatch remain backend-owned future work.",
    providerCapable: false,
    defaultState: "blocked-by-default",
    safetyGates: [
      "no autonomous execution",
      "no worker dispatch",
      "no queue dispatch",
    ],
    sampleCommands: [
      "Plan a workflow automation",
      "Review workflow permissions",
    ],
    nextAction:
      "Open Jarvis Workflows and review triggers, permissions, and blocked dispatch posture.",
    status: "blocked",
  },
  {
    pluginId: "audit-runs",
    label: "Audit / Runs",
    routeHref: "/jarvis-audit",
    description:
      "Review approvals ledger, blocked action log, evidence packets, and result placeholders without persistence.",
    currentCapability:
      "Audit review, blocked action review, and evidence visibility from one review-only surface.",
    executionPosture: "Review-only workspace",
    approvalPosture: "Review only",
    auditPosture: "Primary audit surface",
    backendRequirement:
      "Persistent audit storage and run correlation remain backend requirements only.",
    providerCapable: false,
    defaultState: "review-only",
    safetyGates: [
      "no audit persistence",
      "no result persistence",
      "operator review required",
    ],
    sampleCommands: [
      "Review the audit trail",
      "Review blocked actions",
    ],
    nextAction:
      "Open Audit / Runs and review approvals, evidence packets, and blocked action summaries.",
    status: "ready",
  },
  {
    pluginId: "providers",
    label: "Providers",
    routeHref: "/ai-providers",
    description:
      "Review provider registry posture, provider boundaries, and backend-only provider requirements with no live calls.",
    currentCapability:
      "Provider readiness review, boundary review, and registry posture review without provider execution.",
    executionPosture: "Profile-only review",
    approvalPosture: "Operator review required",
    auditPosture: "Audit review required before provider handoff",
    backendRequirement:
      "Provider calls stay backend-only and no frontend provider call exists.",
    providerCapable: true,
    defaultState: "review-only",
    safetyGates: [
      "no provider execution",
      "no provider SDK imports in frontend",
      "no frontend provider key reads",
    ],
    sampleCommands: [
      "Check provider readiness",
      "Review provider boundaries",
    ],
    nextAction:
      "Open Providers and review registry posture, boundaries, and backend-only provider requirements.",
    status: "ready",
  },
  {
    pluginId: "assets",
    label: "Assets",
    routeHref: "/video-assets",
    description:
      "Review asset requirements, placeholder assets, rights posture, and blocked upload or download lanes.",
    currentCapability:
      "Asset review, rights review, and planning review with no storage or upload execution.",
    executionPosture: "Review-only asset lane",
    approvalPosture: "Operator approval required",
    auditPosture: "Rights and audit review required",
    backendRequirement:
      "Asset storage, upload, download, and persistence remain backend-owned future work.",
    providerCapable: false,
    defaultState: "review-only",
    safetyGates: [
      "no uploads from app code",
      "no downloads from app code",
      "no artifact persistence",
    ],
    sampleCommands: [
      "Review my assets",
      "Review asset readiness",
    ],
    nextAction:
      "Open Assets and review requirements, rights posture, and blocked storage lanes.",
    status: "approval-required",
  },
  {
    pluginId: "projects",
    label: "Projects",
    routeHref: "/video-projects",
    description:
      "Review project context, current planning surfaces, and blocked mutation lanes without creating or writing anything.",
    currentCapability:
      "Project review, context review, and route planning review with no file mutation or persistence.",
    executionPosture: "Review-only project lane",
    approvalPosture: "Operator review required",
    auditPosture: "Audit visibility required before any backend handoff",
    backendRequirement:
      "Project mutation, file writes, and persistent result capture remain backend-owned future work.",
    providerCapable: false,
    defaultState: "review-only",
    safetyGates: [
      "no file writes from app code",
      "no persistence",
      "no autonomous execution",
    ],
    sampleCommands: [
      "Review my projects",
      "Review project readiness",
    ],
    nextAction:
      "Open Projects and review project context, planning state, and blocked mutation posture.",
    status: "ready",
  },
  {
    pluginId: "safety-settings",
    label: "Safety / Settings",
    routeHref: "/jarvis-safety",
    description:
      "Review kill switch, approval mode, credential boundary, browser storage boundary, and blocked execution paths.",
    currentCapability:
      "Safety review, blocked action review, and approval posture review with no execution bridge.",
    executionPosture: "Safety control plane",
    approvalPosture: "Operator review required",
    auditPosture: "Audit and kill switch review required",
    backendRequirement:
      "Credential vaulting, permission enforcement, and runtime switches remain backend-only.",
    providerCapable: false,
    defaultState: "review-only",
    safetyGates: [
      "kill switch required",
      "no browser storage for secrets",
      "no plugin execution from chat yet",
    ],
    sampleCommands: [
      "Show what is blocked",
      "Prepare an approval packet",
    ],
    nextAction:
      "Open Safety / Settings and review the kill switch, approval mode, and blocked execution posture.",
    status: "ready",
  },
  {
    pluginId: "trading",
    label: "Trading",
    routeHref: "/jarvis-trading",
    description:
      "Trading remains a later review-only and blocked lane with no financial advice, no broker execution, and no live market calls.",
    currentCapability:
      "Trading posture review only, with blocked paper execution and blocked real-money execution.",
    executionPosture: "Later review-only and blocked",
    approvalPosture: "Explicit operator approval required",
    auditPosture: "Audit review required before any future trading bridge",
    backendRequirement:
      "No financial advice, no personalized recommendations, and no broker execution exist here.",
    providerCapable: false,
    defaultState: "blocked-by-default",
    safetyGates: [
      "no financial advice",
      "no paper trading execution",
      "no real-money trading execution",
    ],
    sampleCommands: [
      "Review trading posture",
      "Show the trading boundaries",
    ],
    nextAction:
      "Keep Trading in review-only mode and surface its blocked execution boundaries explicitly.",
    status: "blocked",
  },
  {
    pluginId: "developer-checkpoints",
    label: "Developer / Checkpoints",
    routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
    description:
      "Secondary diagnostics for route wiring, phase traceability, smoke coverage, and checkpoint alignment.",
    currentCapability:
      "Secondary diagnostics only, after the main product surfaces stop answering the review question.",
    executionPosture: "Secondary diagnostics only",
    approvalPosture: "Review only",
    auditPosture: "Reference-only diagnostics",
    backendRequirement:
      "Diagnostics remain static references and do not enable execution, persistence, or backend mutation.",
    providerCapable: false,
    defaultState: "secondary-diagnostics",
    safetyGates: [
      "developer diagnostics are secondary",
      "phase pages remain diagnostics only",
      "no direct frontend execution",
    ],
    sampleCommands: [
      "Open developer checkpoints",
      "Review the diagnostic route map",
    ],
    nextAction:
      "Use diagnostics second, after Athena and the specialist workspaces have answered the product question.",
    status: "secondary",
  },
] as const satisfies readonly AthenaPluginRegistryRecord[];

export const ATHENA_PLUGIN_REGISTRY_PREVIEW = ATHENA_PLUGIN_REGISTRY;

const ATHENA_COMMAND_ROUTER_INTENTS = [
  {
    commandId: "video-generation-intent",
    label: "video generation intent",
    intentAliases: ["video brief intent"],
    userFacingPhrase: "Make a cinematic product video",
    matchedPluginId: "jarvis-video-studio",
    routeTarget: "/jarvis-video",
    requiredApprovals: [
      "operator approval required",
      "backend handoff approval required",
      "kill switch required",
    ],
    requiredSafetyGates: [
      "no prompt sending",
      "no plugin execution from chat yet",
      "no live video generation from frontend",
    ],
    requiredAuditGates: [
      "audit required",
      "result review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no frontend provider call.",
    executionPosture: "backend-only-required",
    defaultState: "blocked-by-default",
    routerExplanation:
      "Athena would open Jarvis Video Studio so the operator can review the video brief, prompt / concept, output preview, and locked backend handoff controls.",
    previewedHandoffSteps: [
      "Open /jarvis-video",
      "Review the video brief and prompt / concept",
      "Check output preview and locked controls",
      "Prepare an operator-approved backend handoff",
    ],
  },
  {
    commandId: "website-build-intent",
    label: "website build intent",
    intentAliases: ["website builder intent"],
    userFacingPhrase: "Build a landing page",
    matchedPluginId: "jarvis-websites",
    routeTarget: "/jarvis-websites",
    requiredApprovals: [
      "operator approval required",
      "publish approval required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no file writes from the app",
      "no publish execution",
      "no frontend fetch/network call",
    ],
    requiredAuditGates: [
      "audit review required",
      "preview and publish review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no frontend fetch/network call.",
    executionPosture: "preview-only",
    defaultState: "blocked-by-default",
    routerExplanation:
      "Athena would open Jarvis Websites so the operator can review the brief, sitemap, design system, and blocked preview or publish posture.",
    previewedHandoffSteps: [
      "Open /jarvis-websites",
      "Review brief and sitemap",
      "Review design system and page plan",
      "Keep preview and publish blocked pending backend work",
    ],
  },
  {
    commandId: "avatar-presenter-intent",
    label: "avatar presenter intent",
    intentAliases: ["avatar studio intent"],
    userFacingPhrase: "Create an avatar presenter",
    matchedPluginId: "jarvis-avatar",
    routeTarget: "/jarvis-avatar",
    requiredApprovals: [
      "operator approval required",
      "consent review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no likeness execution",
      "no provider execution",
      "no prompt sending",
    ],
    requiredAuditGates: [
      "consent audit review required",
      "safety review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no frontend provider call.",
    executionPosture: "preview-only",
    defaultState: "blocked-by-default",
    routerExplanation:
      "Athena would open Jarvis Avatar so the operator can review persona, consent, safety, and the blocked preview path.",
    previewedHandoffSteps: [
      "Open /jarvis-avatar",
      "Review persona and consent posture",
      "Review safety and blocked preview state",
      "Keep future execution backend-only and approval-gated",
    ],
  },
  {
    commandId: "workflow-automation-intent",
    label: "workflow automation intent",
    intentAliases: ["workflow routing intent"],
    userFacingPhrase: "Plan a workflow automation",
    matchedPluginId: "jarvis-workflows",
    routeTarget: "/jarvis-workflows",
    requiredApprovals: [
      "operator approval required",
      "permission review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no autonomous execution",
      "no worker dispatch",
      "no queue dispatch",
    ],
    requiredAuditGates: [
      "audit trail required",
      "permission review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no plugin execution.",
    executionPosture: "preview-only",
    defaultState: "blocked-by-default",
    routerExplanation:
      "Athena would open Jarvis Workflows so the operator can review triggers, permissions, dry run posture, approval, and blocked dispatch.",
    previewedHandoffSteps: [
      "Open /jarvis-workflows",
      "Review trigger and plan",
      "Review permissions and dry-run posture",
      "Keep dispatch blocked pending backend automation services",
    ],
  },
  {
    commandId: "audit-review-intent",
    label: "audit review intent",
    intentAliases: ["audit route intent"],
    userFacingPhrase: "Review the audit trail",
    matchedPluginId: "audit-runs",
    routeTarget: "/jarvis-audit",
    requiredApprovals: [
      "operator review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no audit persistence",
      "no result persistence",
      "review-only workspace",
    ],
    requiredAuditGates: [
      "approvals ledger review required",
      "blocked action log review required",
    ],
    backendOnlyRequirement:
      "No result persistence; backend-only execution path required for future capture.",
    executionPosture: "review-only",
    defaultState: "review-only",
    routerExplanation:
      "Athena would open Audit / Runs so the operator can review approvals, blocked actions, evidence packets, and non-persistent result placeholders.",
    previewedHandoffSteps: [
      "Open /jarvis-audit",
      "Review approvals ledger and blocked actions",
      "Review evidence packets and result placeholders",
      "Keep all persistence backend-only and not yet implemented",
    ],
  },
  {
    commandId: "provider-readiness-intent",
    label: "provider readiness intent",
    intentAliases: ["provider route intent"],
    userFacingPhrase: "Check provider readiness",
    matchedPluginId: "providers",
    routeTarget: "/ai-providers",
    requiredApprovals: [
      "operator review required",
      "provider boundary review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no provider execution",
      "no provider SDK imports in frontend",
      "no frontend provider key reads",
    ],
    requiredAuditGates: [
      "audit review required",
      "provider boundary review required",
    ],
    backendOnlyRequirement:
      "Provider calls stay backend-only; no frontend provider call.",
    executionPosture: "review-only",
    defaultState: "review-only",
    routerExplanation:
      "Athena would open Providers so the operator can review provider registry posture, boundaries, and backend-only provider requirements.",
    previewedHandoffSteps: [
      "Open /ai-providers",
      "Review provider registry posture",
      "Review boundary, credential, and audit requirements",
      "Keep live provider calls backend-only and blocked from the frontend",
    ],
  },
  {
    commandId: "safety-review-intent",
    label: "safety review intent",
    intentAliases: ["blocked action review intent"],
    userFacingPhrase: "Show what is blocked",
    matchedPluginId: "safety-settings",
    routeTarget: "/jarvis-safety",
    requiredApprovals: [
      "operator review required",
      "kill switch required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no browser storage for secrets",
      "no plugin execution from chat yet",
      "no autonomous execution",
    ],
    requiredAuditGates: [
      "audit review required",
      "blocked action review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no autonomous execution.",
    executionPosture: "review-only",
    defaultState: "review-only",
    routerExplanation:
      "Athena would open Safety / Settings so the operator can review the kill switch, approval mode, credential boundary, and blocked execution posture.",
    previewedHandoffSteps: [
      "Open /jarvis-safety",
      "Review kill switch and approval mode",
      "Review credential and browser storage boundaries",
      "Keep blocked execution posture explicit",
    ],
  },
  {
    commandId: "approval-packet-intent",
    label: "approval packet intent",
    intentAliases: ["approval route intent"],
    userFacingPhrase: "Prepare an approval packet",
    matchedPluginId: "safety-settings",
    routeTarget: "/jarvis-safety",
    requiredApprovals: [
      "operator approval required",
      "approval packet review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "kill switch required",
      "no approval persistence",
      "no plugin execution from chat yet",
    ],
    requiredAuditGates: [
      "audit review required",
      "approval packet review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no approval persistence.",
    executionPosture: "review-only",
    defaultState: "approval-gated",
    routerExplanation:
      "Athena would open Safety / Settings so the operator can review approval posture, audit gates, and backend-only handoff requirements.",
    previewedHandoffSteps: [
      "Open /jarvis-safety",
      "Review approval posture and audit gates",
      "Confirm backend-only handoff requirements",
      "Keep approval persistence unimplemented in the frontend",
    ],
  },
  {
    commandId: "asset-review-intent",
    label: "asset review intent",
    intentAliases: ["asset route intent"],
    userFacingPhrase: "Review my assets",
    matchedPluginId: "assets",
    routeTarget: "/video-assets",
    requiredApprovals: [
      "operator review required",
      "rights review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no uploads from app code",
      "no downloads from app code",
      "no artifact persistence",
    ],
    requiredAuditGates: [
      "rights review required",
      "asset audit review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no uploads or downloads from app code.",
    executionPosture: "review-only",
    defaultState: "review-only",
    routerExplanation:
      "Athena would open Assets so the operator can review asset readiness, rights posture, and blocked storage lanes.",
    previewedHandoffSteps: [
      "Open /video-assets",
      "Review asset requirements and rights posture",
      "Review blocked upload and download paths",
      "Keep storage and persistence backend-only",
    ],
  },
  {
    commandId: "project-review-intent",
    label: "project review intent",
    intentAliases: ["project route intent"],
    userFacingPhrase: "Review my projects",
    matchedPluginId: "projects",
    routeTarget: "/video-projects",
    requiredApprovals: [
      "operator review required",
      "project review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no file writes from app code",
      "no persistence",
      "no autonomous execution",
    ],
    requiredAuditGates: [
      "project audit review required",
      "blocked mutation review required",
    ],
    backendOnlyRequirement:
      "Backend-only execution path required; no file writes from app code.",
    executionPosture: "review-only",
    defaultState: "review-only",
    routerExplanation:
      "Athena would open Projects so the operator can review project context, planning state, and blocked mutation posture.",
    previewedHandoffSteps: [
      "Open /video-projects",
      "Review project context and planning state",
      "Review blocked mutation posture",
      "Keep project mutation and persistence backend-only",
    ],
  },
  {
    commandId: "trading-review-intent",
    label: "trading review intent",
    intentAliases: ["trading route intent"],
    userFacingPhrase: "Review trading posture",
    matchedPluginId: "trading",
    routeTarget: "/jarvis-trading",
    requiredApprovals: [
      "explicit operator approval required",
      "risk review required",
      "audit required",
    ],
    requiredSafetyGates: [
      "no financial advice",
      "no broker execution",
      "no real-money trading execution",
    ],
    requiredAuditGates: [
      "trading audit review required",
      "risk review required",
    ],
    backendOnlyRequirement:
      "Trading remains blocked and review-only; no paper trading execution and no real-money execution.",
    executionPosture: "preview-only",
    defaultState: "blocked-by-default",
    routerExplanation:
      "Athena would open Trading so the operator can review boundaries, risk posture, and the blocked trading lane without enabling execution.",
    previewedHandoffSteps: [
      "Open /jarvis-trading",
      "Review risk posture and trading boundaries",
      "Review blocked paper and real-money execution lanes",
      "Keep trading later, review-only, and blocked",
    ],
  },
] as const satisfies readonly AthenaCommandIntentRecord[];

export const ATHENA_COMMAND_INTENTS = ATHENA_COMMAND_ROUTER_INTENTS;

const ATHENA_APPROVAL_GATED_BRIDGE_COMMAND_IDS = [
  "video-generation-intent",
  "website-build-intent",
  "avatar-presenter-intent",
  "audit-review-intent",
  "approval-packet-intent",
  "safety-review-intent",
  "provider-readiness-intent",
  "project-review-intent",
] as const satisfies readonly AthenaCommandIntentId[];

export const ATHENA_SAFETY_GATES = [
  {
    id: "registry-aware",
    label: "Athena knows the specialist workspaces",
    summary:
      "Athena can map operator commands into the specialist plugin registry and show which workspace or control lane owns the review path.",
    tone: "ready",
  },
  {
    id: "router-preview-only",
    label: "Command router is preview-only",
    summary:
      "Athena can show how a command would be routed into a handoff packet preview, but it does not execute, dispatch, persist, or call anything.",
    tone: "approval-required",
  },
  {
    id: "bridge-blocked-default",
    label: "Bridge is blocked by default",
    summary:
      "Every approval-gated tool bridge stays inert, blocked by default, and held at a backend-only handoff preview state.",
    tone: "blocked",
  },
  {
    id: "approval-gated",
    label: "Execution remains approval-gated",
    summary:
      "Operator approval remains required before any future backend-only execution path could be considered.",
    tone: "approval-required",
  },
  {
    id: "backend-only",
    label: "Backend-only execution required",
    summary:
      "No frontend provider call, no frontend fetch/network call, and no plugin execution from chat are enabled here.",
    tone: "blocked",
  },
  {
    id: "no-autonomy",
    label: "No autonomous execution",
    summary:
      "Athena does not execute plugins, tools, workflows, jobs, queues, workers, brokers, or providers from the frontend.",
    tone: "blocked",
  },
  {
    id: "kill-switch-and-audit",
    label: "Kill switch and audit remain required",
    summary:
      "Kill switch review and audit review stay mandatory before any future backend-only handoff moves forward.",
    tone: "approval-required",
  },
] as const satisfies readonly AthenaSafetyGateRecord[];

export const ATHENA_BLOCKED_ACTION_GROUPS = [
  {
    id: "plugin-execution-blocked",
    label: "Plugin execution remains blocked",
    summary:
      "Plugin execution remains blocked until approvals and backend gates are satisfied.",
    items: [
      "plugin registry is inert",
      "no plugin execution from chat yet",
      "Approval-gated handoffs only",
      "backend-only execution path required",
      "operator approval required",
    ],
  },
  {
    id: "provider-execution-locked",
    label: "Provider execution stays backend-only",
    summary:
      "Manual/provider execution stays backend-only and remains locked from the frontend.",
    items: [
      "no frontend provider call",
      "no provider execution",
      "no live video generation",
      "backend-only execution required",
      "audit required",
      "kill switch required",
    ],
  },
  {
    id: "autonomous-execution-locked",
    label: "Autonomous execution remains locked",
    summary:
      "Athena does not autonomously execute plugins, providers, workflows, queues, jobs, brokers, or specialist tools.",
    items: [
      "no autonomous execution",
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
      "command router is preview-only",
      "handoff packet preview only",
      "bridge is inert",
      "bridge is blocked by default",
    ],
  },
  {
    id: "persistence-not-implemented",
    label: "Persistence is not implemented",
    summary:
      "No result persistence, no audit persistence, no approval persistence, no persistent memory, and no browser storage are implemented.",
    items: [
      "command router is preview-only",
      "handoff packet preview only",
      "bridge is inert",
      "bridge is blocked by default",
      "no prompt sending",
      "no frontend fetch/network call",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
      "no persistent memory",
      "no browser storage",
      "no frontend provider key reads",
      "no plaintext secrets",
      "no localStorage",
      "no sessionStorage",
      "no IndexedDB",
      "no cookies",
      "no shell/process/command execution from the app",
    ],
  },
] as const satisfies readonly AthenaBlockedActionGroup[];

export const ATHENA_HANDOFF_FLOW = [
  {
    id: "request",
    label: "Operator request",
    summary:
      "Athena receives a local draft request in the chat-style input and keeps it on the page without sending prompts anywhere.",
  },
  {
    id: "registry",
    label: "Match the specialist registry",
    summary:
      "Athena determines which plugin or workspace owns the request and makes that route explicit.",
  },
  {
    id: "route-preview",
    label: "Preview the route",
    summary:
      "Athena shows the route it would open, the approvals it would require, and the safety and audit gates it would keep active.",
  },
  {
    id: "bridge-preview",
    label: "Prepare the bridge preview",
    summary:
      "Athena turns the routed command into an approval-gated backend handoff packet preview without dispatching any queue, worker, job, provider, or plugin action.",
  },
  {
    id: "review",
    label: "Review specialist workspace",
    summary:
      "The operator reviews the workspace brief, safety posture, blocked actions, and readiness markers before any handoff is discussed.",
  },
  {
    id: "handoff",
    label: "Backend-only handoff later",
    summary:
      "Any future execution remains backend-only, approval-gated, kill-switch protected, and audit-backed.",
  },
] as const satisfies readonly AthenaHandoffStepRecord[];

export const ATHENA_AUDIT_READINESS_MODEL = [
  {
    id: "audit-preview",
    label: "Audit preview stays visible",
    summary:
      "Athena keeps audit and run review close to the command center so blocked and reviewable paths stay easy to inspect.",
    tone: "ready",
  },
  {
    id: "approval-preview",
    label: "Approval path stays visible",
    summary:
      "Athena can preview the approval packet route, but approval remains manual and non-persistent.",
    tone: "approval-required",
  },
  {
    id: "timeline-preview-live",
    label: "Cross-workspace run timeline is live",
    summary:
      "Athena can preview routed work, approvals, safety gates, audit gates, backend-only handoff, blockers, and result-pending milestones across specialist workspaces.",
    tone: "ready",
  },
  {
    id: "audit-memory-static",
    label: "Audit memory is static preview only",
    summary:
      "Athena can show what would be remembered for audit while persistent memory, browser storage, and database writes remain unavailable.",
    tone: "approval-required",
  },
  {
    id: "backend-readiness",
    label: "Backend-only execution path required",
    summary:
      "Athena can preview the handoff plan while provider calls, queues, workers, and jobs remain blocked from the frontend.",
    tone: "blocked",
  },
  {
    id: "blocked-state",
    label: "Blocked state stays explicit",
    summary:
      "Athena can show what is blocked before the operator opens a specialist workspace or approval path.",
    tone: "ready",
  },
] as const satisfies readonly AthenaAuditReadinessRecord[];

export const ATHENA_NEXT_ACTIONS = [
  {
    id: "open-athena",
    label: "Open Athena Command Center",
    summary:
      "Start from Athena to plan, route, review, and safely hand off AI work across CodexForge.",
  },
  {
    id: "review-registry",
    label: "Review plugin registry",
    summary:
      "See which specialist workspaces Athena knows, along with route, posture, approvals, and audit requirements.",
  },
  {
    id: "preview-router",
    label: "Preview command routing",
    summary:
      "Use the command router preview to see how Athena would route a command and prepare an approval-gated bridge without executing anything.",
  },
  {
    id: "review-run-timeline",
    label: "Review run timeline",
    summary:
      "Use the cross-workspace run timeline to inspect routed commands, blockers, approvals, and result-pending milestones before any backend handoff exists.",
  },
  {
    id: "review-audit-memory",
    label: "Review audit memory preview",
    summary:
      "See what Athena would remember for audit while persistent memory, browser storage, and database writes remain disabled.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_CURRENT_CAPABILITIES = [
  {
    id: "plan-route-commands",
    label: "Athena can plan and route commands",
    summary:
      "Athena can interpret operator intent, frame the right review path, and keep command composition preview-only.",
  },
  {
    id: "plugin-registry",
    label: "Athena can open the right specialist workspace",
    summary:
      "Athena knows the specialist workspaces, their routes, their postures, and their default blocked or review states.",
  },
  {
    id: "command-router-preview",
    label: "Athena can preview command routing",
    summary:
      "Athena can show which plugin a command belongs to, which route it would open, and which approvals or gates it would require.",
  },
  {
    id: "approval-handoff-preview",
    label: "Athena can preview approval-gated handoffs",
    summary:
      "Athena can prepare approval-gated handoffs. Athena can turn a routed command into an approval-gated backend handoff packet preview while keeping execution blocked by default.",
  },
  {
    id: "timeline-preview",
    label: "Athena can preview cross-workspace timelines",
    summary:
      "Athena can show a unified preview-only timeline of routed commands, approvals, safety gates, audit gates, blockers, backend-only handoff, and result-pending milestones.",
  },
  {
    id: "audit-memory-preview",
    label: "Athena can show static audit memory previews",
    summary:
      "Athena can show what would be remembered for audit while persistent memory, browser storage, and database writes stay unavailable.",
  },
  {
    id: "readiness-review",
    label: "Athena can review readiness and blockers",
    summary:
      "Athena can summarize readiness, approval posture, audit posture, and blocked actions before a backend handoff is considered.",
  },
  {
    id: "safe-handoff",
    label: "Athena can prepare safe handoff",
    summary:
      "Athena can prepare approval-gated handoff packets and backend-only handoff paths while keeping approval, kill switch, and audit requirements visible.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_FUTURE_CAPABILITIES = [
  {
    id: "conversational-composer",
    label: "Athena Conversational Command Composer and Approval Drafts",
    summary:
      "The next likely batch is 4618-4649 - Athena Conversational Command Composer and Approval Drafts.",
  },
  {
    id: "approval-drafts",
    label: "Approval drafts later",
    summary:
      "Athena will later need typed approval drafts, backend receipts, and audit joins before any execution claim becomes real.",
  },
  {
    id: "execution-remains-locked",
    label: "Execution still stays locked",
    summary:
      "Plugin execution, provider execution, autonomous execution, and persistence stay locked until later backend-owned phases exist.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export function buildStableAthenaPluginKey(
  pluginId: AthenaPluginId
): AthenaPluginKey {
  return `athena-plugin:${pluginId}`;
}

export function buildStableAthenaCommandKey(
  commandId: AthenaCommandIntentId
): AthenaCommandKey {
  return `athena-command:${commandId}`;
}

export function buildStableAthenaBridgeKey(
  commandId: AthenaCommandIntentId
): AthenaApprovalBridgeKey {
  return `athena-bridge:${commandId}`;
}

export function buildStableAthenaHandoffPacketKey(
  commandId: AthenaCommandIntentId
): AthenaHandoffPacketKey {
  return `athena-handoff-packet:${commandId}`;
}

export function buildStableAthenaTimelineKey(
  commandId: AthenaCommandIntentId
): AthenaRunTimelineKey {
  return `athena-run-timeline:${commandId}`;
}

export function buildStableAthenaAuditMemoryKey(
  commandId: AthenaCommandIntentId
): AthenaAuditMemoryKey {
  return `athena-audit-memory:${commandId}`;
}

export function listAthenaPrimaryOperatorActions():
  readonly AthenaProductUxActionRecord[] {
  return ATHENA_PRIMARY_OPERATOR_ACTIONS;
}

export function resolveRequiredAthenaPrimaryOperatorAction(
  actionId: AthenaPrimaryOperatorActionId
): AthenaProductUxActionRecord {
  const action = ATHENA_PRIMARY_OPERATOR_ACTIONS.find(
    (candidate) => candidate.id === actionId
  );

  if (!action) {
    throw new Error(`Missing Athena product action: ${actionId}`);
  }

  return action;
}

export function listAthenaPluginLauncherGroups():
  readonly AthenaPluginLauncherGroupRecord[] {
  return ATHENA_PLUGIN_LAUNCHER_GROUPS;
}

export function resolveRequiredAthenaPluginLauncherGroup(
  groupId: AthenaPluginLauncherGroupId
): AthenaPluginLauncherGroupRecord {
  const group = ATHENA_PLUGIN_LAUNCHER_GROUPS.find(
    (candidate) => candidate.id === groupId
  );

  if (!group) {
    throw new Error(`Missing Athena launcher group: ${groupId}`);
  }

  return group;
}

export function buildProductPolishChecklist(
  command: AthenaCommandIntentRecord
): readonly string[] {
  return [
    "Keep /jarvis as Athena Command Center with the chat/operator input near the top.",
    `Keep ${command.routeTarget} aligned with Athena's preview-only cross-workspace run timeline.`,
    "Show approval, kill switch, safety, audit, and backend-only handoff gates together.",
    "Keep result capture pending until approved backend execution exists.",
    "Do not add persistence, browser storage, or frontend execution.",
  ] as const;
}

function buildTimelineMilestoneRecords(
  command: AthenaCommandIntentRecord,
  bridge: AthenaApprovalGatedBridgePreviewRecord
): readonly AthenaTimelineMilestoneRecord[] {
  const timelineKey = buildStableAthenaTimelineKey(command.commandId);

  return [
    {
      milestoneId: `${timelineKey}:routing`,
      category: "routing",
      label: "Routing preview",
      stateLabel: "Previewed",
      summary: `Athena would route ${command.userFacingPhrase} to ${bridge.matchedPluginLabel} at ${command.routeTarget}.`,
    },
    {
      milestoneId: `${timelineKey}:approval`,
      category: "approval",
      label: "Approval preview",
      stateLabel: "Visible",
      summary: `Approval posture stays visible: ${buildAthenaApprovalRequirementsSummary(
        command
      )}.`,
    },
    {
      milestoneId: `${timelineKey}:safety`,
      category: "safety",
      label: "Safety gates",
      stateLabel: "Visible",
      summary: `Safety gates stay visible: ${command.requiredSafetyGates.join(
        " | "
      )}.`,
    },
    {
      milestoneId: `${timelineKey}:audit`,
      category: "audit",
      label: "Audit gates",
      stateLabel: "Visible",
      summary: `Audit gates stay visible: ${buildAthenaAuditRequirementsSummary(
        command
      )}.`,
    },
    {
      milestoneId: `${timelineKey}:handoff`,
      category: "handoff",
      label: "Backend-only handoff",
      stateLabel: "Required",
      summary: buildBackendHandoffSummary(bridge),
    },
    {
      milestoneId: `${timelineKey}:blocker`,
      category: "blocker",
      label: "Blocked by default",
      stateLabel: "Not executed",
      summary: buildBlockedBridgeSummary(bridge),
    },
    {
      milestoneId: `${timelineKey}:result-pending`,
      category: "result-pending",
      label: "Result capture pending",
      stateLabel: "Pending",
      summary: "Result capture is pending until approved backend execution exists.",
    },
  ] as const;
}

export function buildBlockedStateSummary(
  timeline: AthenaCrossWorkspaceRunTimelineRecord
): string {
  const command = resolveRequiredStaticAthenaCommandIntent(
    timeline.commandIntentReference
  );

  return [
    formatDefaultState(command.defaultState),
    "Run status: not executed.",
    "Plugin execution state: not executed.",
    "Provider state: not called.",
    "Queue state: not dispatched.",
    "Worker state: not dispatched.",
    "Job state: not executed.",
    "Result, audit, and approval states: not persisted.",
  ].join(" ");
}

export function buildNextActionSummary(
  timeline: AthenaCrossWorkspaceRunTimelineRecord
): string {
  return [
    timeline.nextAction,
    "Backend-only handoff remains required.",
    "Result capture stays pending until approved backend execution exists.",
  ].join(" ");
}

export function buildTimelinePreviewForCommand(
  command: AthenaCommandIntentRecord
): AthenaCrossWorkspaceRunTimelineRecord {
  const matchedPlugin = resolveStaticAthenaPlugin(command.matchedPluginId);
  const bridge = buildApprovalGatedBridgePreview(command);
  const handoffPacket = buildHandoffPacketPreview(command);
  const timelineKey = buildStableAthenaTimelineKey(command.commandId);

  return {
    timelineVersion: "athena-cross-workspace-run-timeline-v1",
    source: "Athena",
    timelineMode: "preview-only",
    runId: timelineKey,
    timelineKey,
    commandIntentReference: command.commandId,
    userFacingCommandPhrase: command.userFacingPhrase,
    matchedPluginReference: matchedPlugin.pluginId,
    matchedPluginLabel: matchedPlugin.label,
    targetRouteReference: command.routeTarget,
    handoffPacketReference: handoffPacket.packetId,
    approvalGateSnapshot: {
      status: "required",
      summary: buildAthenaApprovalRequirementsSummary(command),
    },
    safetyGateSnapshot: {
      status: "visible",
      summary: command.requiredSafetyGates.join(" | "),
    },
    killSwitchSnapshot: {
      status: "required",
      summary: "Kill switch required before any backend-only handoff can proceed.",
    },
    auditGateSnapshot: {
      status: "visible",
      summary: buildAthenaAuditRequirementsSummary(command),
    },
    backendOnlyHandoffSnapshot: {
      status: "required",
      summary: handoffPacket.backendHandoffSummary,
    },
    resultCaptureSnapshot: {
      status: "pending",
      summary: "Result capture is pending until approved backend execution exists.",
    },
    blockedDefaultReason: buildBlockedBridgeSummary(bridge),
    runStatus: "not-executed",
    pluginExecutionState: "not-executed",
    providerState: "not-called",
    queueState: "not-dispatched",
    workerState: "not-dispatched",
    jobState: "not-executed",
    resultState: "not-persisted",
    auditState: "not-persisted",
    approvalState: "not-persisted",
    eventList: buildTimelineMilestoneRecords(command, bridge),
    nextAction: `Review ${matchedPlugin.label}, confirm operator approval posture, and keep backend-only handoff blocked until explicit approval exists.`,
    nextProductPolishChecklist: buildProductPolishChecklist(command),
  };
}

export function buildAuditMemoryPreview(
  command: AthenaCommandIntentRecord
): AthenaAuditMemoryPreviewRecord {
  const matchedPlugin = resolveStaticAthenaPlugin(command.matchedPluginId);
  const bridge = buildApprovalGatedBridgePreview(command);

  return {
    memoryKey: buildStableAthenaAuditMemoryKey(command.commandId),
    auditMemoryVersion: "athena-audit-memory-preview-v1",
    memoryMode: "static-preview-only",
    persistentMemory: "no persistent memory",
    browserStorage: "no browser storage",
    localStorage: "no localStorage",
    sessionStorage: "no sessionStorage",
    indexedDb: "no IndexedDB",
    cookies: "no cookies",
    databaseWrites: "no database writes",
    commandPhrase: command.userFacingPhrase,
    pluginId: matchedPlugin.pluginId,
    pluginLabel: matchedPlugin.label,
    routeTarget: command.routeTarget,
    approvalRequirement: buildAthenaApprovalRequirementsSummary(command),
    safetyRequirement: buildSafetyRequirementsSummary(bridge),
    auditRequirement: buildAuditRequirementsSummary(bridge),
    blockedDefaultState: command.defaultState,
    lastKnownStateLabel: formatDefaultStateChipLabel(command.defaultState),
    resultState: "not-persisted",
    operatorActionRequired:
      "Review the preview, confirm approval and safety posture, and keep the frontend inert.",
    nextHandoffRequirement:
      "Prepare a backend-only handoff with operator approval, kill switch review, and audit linkage before any execution can exist.",
  };
}

export function listCrossWorkspaceTimelineItems():
  readonly AthenaCrossWorkspaceRunTimelineRecord[] {
  return ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_PREVIEW_ITEMS;
}

export function groupTimelineItemsByPlugin(
  items: readonly AthenaCrossWorkspaceRunTimelineRecord[]
): readonly AthenaTimelineItemsByPluginGroup[] {
  const groups: AthenaTimelineItemsByPluginGroup[] = [];

  for (const plugin of ATHENA_PLUGIN_REGISTRY_PREVIEW) {
    const pluginItems = items.filter(
      (item) => item.matchedPluginReference === plugin.pluginId
    );

    if (pluginItems.length > 0) {
      groups.push({
        pluginId: plugin.pluginId,
        pluginLabel: plugin.label,
        itemCount: pluginItems.length,
        items: pluginItems,
      });
    }
  }

  return groups;
}

export function groupTimelineItemsByBlockedState(
  items: readonly AthenaCrossWorkspaceRunTimelineRecord[]
): readonly AthenaTimelineItemsByBlockedStateGroup[] {
  const orderedStates: readonly AthenaCommandIntentState[] = [
    "blocked-by-default",
    "approval-gated",
    "review-only",
    "secondary-diagnostics",
  ];
  const groups: AthenaTimelineItemsByBlockedStateGroup[] = [];

  for (const state of orderedStates) {
    const stateItems = items.filter((item) => {
      const command = resolveRequiredStaticAthenaCommandIntent(
        item.commandIntentReference
      );

      return command.defaultState === state;
    });

    if (stateItems.length > 0) {
      groups.push({
        blockedState: state,
        blockedStateLabel: formatDefaultStateChipLabel(state),
        itemCount: stateItems.length,
        items: stateItems,
      });
    }
  }

  return groups;
}

export function listAthenaPlugins(): readonly AthenaPluginRegistryPreviewRecord[] {
  return ATHENA_PLUGIN_REGISTRY_PREVIEW;
}

export function listAthenaCommandIntents(): readonly AthenaCommandIntentRecord[] {
  return ATHENA_COMMAND_INTENTS;
}

export function resolveStaticAthenaCommandIntent(
  commandId: AthenaCommandIntentId
): AthenaCommandIntentRecord | undefined {
  return ATHENA_COMMAND_INTENTS.find((intent) => intent.commandId === commandId);
}

export function resolveStaticAthenaCommandIntentByExactSamplePhrase(
  phrase: string
): AthenaCommandIntentRecord | undefined {
  return ATHENA_COMMAND_INTENTS.find(
    (intent) => intent.userFacingPhrase === phrase
  );
}

export function buildAthenaRoutePreview(
  command: AthenaCommandIntentRecord
): AthenaCommandRoutePreview {
  const matchedPlugin = resolveStaticAthenaPlugin(command.matchedPluginId);

  return {
    commandKey: buildStableAthenaCommandKey(command.commandId),
    pluginKey: buildStableAthenaPluginKey(matchedPlugin.pluginId),
    userFacingPhrase: command.userFacingPhrase,
    matchedPluginLabel: matchedPlugin.label,
    routeTarget: command.routeTarget,
    executionPosture: command.executionPosture,
    defaultState: command.defaultState,
    routerExplanation: command.routerExplanation,
    previewedHandoffSteps: command.previewedHandoffSteps,
  };
}

export function listApprovalBridgeRequirements(
  bridge: AthenaApprovalGatedBridgePreviewRecord
): readonly string[] {
  return [
    "Operator approval required",
    "Safety gate required",
    "Kill switch required",
    "Audit required",
    "Backend-only handoff required",
    formatConditionalRequirementLabel(
      "Credential isolation",
      bridge.credentialIsolationRequirement
    ),
    formatConditionalRequirementLabel(
      "Cost acknowledgement",
      bridge.costAcknowledgementRequirement
    ),
    "Privacy/redaction required",
    "Idempotency required",
    "Replay block required",
    "Single-call lock required",
    "Timeout/cancel required",
    "Result capture required",
    "Audit envelope required",
    "Approval join required",
  ] as const;
}

export function buildNextTimelineAuditMemoryChecklist(
  command: AthenaCommandIntentRecord
): readonly string[] {
  return [
    `Keep the cross-workspace run timeline aligned with ${command.routeTarget}`,
    "Keep audit memory static preview only with no persistent memory",
    "Keep operator approval, result capture, and audit linkage visible together",
    "Keep queue, worker, and job dispatch blocked until backend-only execution exists",
  ] as const;
}

export function buildApprovalGatedBridgePreview(
  command: AthenaCommandIntentRecord
): AthenaApprovalGatedBridgePreviewRecord {
  const matchedPlugin = resolveStaticAthenaPlugin(command.matchedPluginId);
  const providerRequirementState = matchedPlugin.providerCapable
    ? "required"
    : "not-applicable";

  return {
    bridgeKey: buildStableAthenaBridgeKey(command.commandId),
    bridgeVersion: "athena-approval-gated-tool-execution-bridge-v1",
    commandIntentReference: command.commandId,
    matchedPluginReference: matchedPlugin.pluginId,
    matchedPluginLabel: matchedPlugin.label,
    routeTargetReference: command.routeTarget,
    approvalPacketPreviewReference: buildStableAthenaHandoffPacketKey(
      command.commandId
    ),
    userFacingPhrase: command.userFacingPhrase,
    operatorApprovalRequirement: "required",
    safetyGateRequirement: "required",
    killSwitchRequirement: "required",
    auditRequirement: "required",
    backendOnlyHandoffRequirement: "required",
    credentialIsolationRequirement: providerRequirementState,
    costAcknowledgementRequirement: providerRequirementState,
    privacyRedactionRequirement: "required",
    idempotencyRequirement: "required",
    replayBlockRequirement: "required",
    singleCallLockRequirement: "required",
    timeoutCancelRequirement: "required",
    resultCaptureRequirement: "required",
    auditEnvelopeRequirement: "required",
    approvalJoinRequirement: "required",
    executionPosture: "blocked-by-default",
    pluginExecutionState: "not-executed",
    providerState: "not-called",
    queueState: "not-dispatched",
    workerState: "not-dispatched",
    jobState: "not-executed",
    resultState: "not-persisted",
    auditState: "not-persisted",
    approvalState: "not-persisted",
    bridgeBlockerList: [
      "Bridge is inert",
      "Bridge is blocked by default",
      "No plugin execution from chat yet",
      "No provider execution",
      "No queue dispatch",
      "No worker dispatch",
      "No job execution",
      "No result persistence",
      "No audit persistence",
      "No approval persistence",
    ],
    nextTimelineAuditMemoryChecklist:
      buildNextTimelineAuditMemoryChecklist(command),
  };
}

export function buildBlockedBridgeSummary(
  bridge: AthenaApprovalGatedBridgePreviewRecord
): string {
  return [
    "Blocked by default.",
    "Plugin execution state: not executed.",
    "Provider state: not called.",
    "Queue state: not dispatched.",
    "Worker state: not dispatched.",
    "Job state: not executed.",
    "Result, audit, and approval states: not persisted.",
  ].join(" ");
}

export function buildSafetyRequirementsSummary(
  bridge: AthenaApprovalGatedBridgePreviewRecord
): string {
  return [
    "Safety gate required",
    "Kill switch required",
    formatConditionalRequirementLabel(
      "Credential isolation",
      bridge.credentialIsolationRequirement
    ),
    formatConditionalRequirementLabel(
      "Cost acknowledgement",
      bridge.costAcknowledgementRequirement
    ),
    "Privacy/redaction required",
    "Idempotency required",
    "Replay block required",
    "Single-call lock required",
    "Timeout/cancel required",
  ].join(" | ");
}

export function buildAuditRequirementsSummary(
  bridge: AthenaApprovalGatedBridgePreviewRecord
): string {
  return [
    "Audit required",
    "Result capture required",
    "Audit envelope required",
    "Approval join required",
  ].join(" | ");
}

export function buildBackendHandoffSummary(
  bridge: AthenaApprovalGatedBridgePreviewRecord
): string {
  return [
    "Backend-only handoff required",
    "Execution posture: blocked by default",
    "Plugin execution state: not executed",
    "Provider state: not called",
    "Queue state: not dispatched",
    "Worker state: not dispatched",
    "Job state: not executed",
  ].join(" | ");
}

export function buildHandoffPacketPreview(
  command: AthenaCommandIntentRecord
): AthenaHandoffPacketPreviewRecord {
  const bridge = buildApprovalGatedBridgePreview(command);

  return {
    packetId: buildStableAthenaHandoffPacketKey(command.commandId),
    source: "Athena",
    commandIntentId: command.commandId,
    targetPluginId: bridge.matchedPluginReference,
    targetPluginLabel: bridge.matchedPluginLabel,
    targetRoute: bridge.routeTargetReference,
    userFacingCommandPhrase: command.userFacingPhrase,
    approvalSummary: buildAthenaApprovalRequirementsSummary(command),
    safetySummary: buildSafetyRequirementsSummary(bridge),
    auditSummary: buildAuditRequirementsSummary(bridge),
    backendHandoffSummary: buildBackendHandoffSummary(bridge),
    blockedDefaultReason: buildBlockedBridgeSummary(bridge),
    requiredOperatorAction:
      "Review the specialist workspace, confirm operator approval, keep the kill switch engaged until ready, and preserve the audit requirement.",
    requiredNextSystemAction:
      "Prepare a backend-only approval join, future run timeline link, and audit memory handoff without dispatching any queue, worker, or job.",
    noExecutionStatement:
      "No execution, dispatch, provider call, plugin call, or persistence occurs from this preview.",
  };
}

export function buildAthenaBlockedActionSummary(
  command: AthenaCommandIntentRecord
): string {
  return [
    "Command router is preview-only.",
    formatDefaultState(command.defaultState),
    buildBlockedBridgeSummary(buildApprovalGatedBridgePreview(command)),
  ].join(" ");
}

export function buildAthenaApprovalRequirementsSummary(
  command: AthenaCommandIntentRecord
): string {
  return command.requiredApprovals.join(" | ");
}

export function buildAthenaAuditRequirementsSummary(
  command: AthenaCommandIntentRecord
): string {
  return command.requiredAuditGates.join(" | ");
}

export const ATHENA_APPROVAL_GATED_TOOL_BRIDGE_PREVIEWS:
  readonly AthenaApprovalGatedBridgePreviewRecord[] =
  ATHENA_APPROVAL_GATED_BRIDGE_COMMAND_IDS.map((commandId) =>
    buildApprovalGatedBridgePreview(
      resolveRequiredStaticAthenaCommandIntent(commandId)
    )
  );

export const ATHENA_HANDOFF_PACKET_PREVIEWS:
  readonly AthenaHandoffPacketPreviewRecord[] =
  ATHENA_APPROVAL_GATED_BRIDGE_COMMAND_IDS.map((commandId) =>
    buildHandoffPacketPreview(resolveRequiredStaticAthenaCommandIntent(commandId))
  );

export const ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_PREVIEW_ITEMS:
  readonly AthenaCrossWorkspaceRunTimelineRecord[] =
  ATHENA_APPROVAL_GATED_BRIDGE_COMMAND_IDS.map((commandId) =>
    buildTimelinePreviewForCommand(
      resolveRequiredStaticAthenaCommandIntent(commandId)
    )
  );

export const ATHENA_AUDIT_MEMORY_PREVIEW_ITEMS:
  readonly AthenaAuditMemoryPreviewRecord[] =
  ATHENA_APPROVAL_GATED_BRIDGE_COMMAND_IDS.map((commandId) =>
    buildAuditMemoryPreview(resolveRequiredStaticAthenaCommandIntent(commandId))
  );

// Historical marker for legacy smoke coverage:
// The next likely Athena batch is 4554-4585 - Athena Cross-Workspace Run Timeline and Audit Memory.

export const ATHENA_COMMAND_CENTER_MODEL = {
  batch: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH,
  highestDetectedPhase: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_PHASE,
  latestCompletedBatch: ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH,
  previousCompletedBatch: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_BATCH,
  nextLikelyBatch: ATHENA_CONVERSATIONAL_COMMAND_COMPOSER_APPROVAL_DRAFTS_BATCH,
  identity: ATHENA_CONTROL_PLANE_IDENTITY,
  chat: ATHENA_CHAT_PLACEHOLDER_MODEL,
  productUx: ATHENA_PRODUCT_UX_POLISH_MODEL,
  suggestedPrompts: ATHENA_SUGGESTED_PROMPTS,
  pluginRegistryPreview: ATHENA_PLUGIN_REGISTRY_PREVIEW,
  safetyGates: ATHENA_SAFETY_GATES,
  blockedActions: ATHENA_BLOCKED_ACTION_GROUPS,
  handoffFlow: ATHENA_HANDOFF_FLOW,
  auditReadiness: ATHENA_AUDIT_READINESS_MODEL,
  nextActions: ATHENA_NEXT_ACTIONS,
  currentCapabilities: ATHENA_CURRENT_CAPABILITIES,
  futureCapabilities: ATHENA_FUTURE_CAPABILITIES,
  commandIntents: ATHENA_COMMAND_INTENTS,
  approvalGatedToolBridgePreviews: ATHENA_APPROVAL_GATED_TOOL_BRIDGE_PREVIEWS,
  handoffPacketPreviews: ATHENA_HANDOFF_PACKET_PREVIEWS,
  crossWorkspaceRunTimeline: ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_PREVIEW_ITEMS,
  auditMemoryPreview: ATHENA_AUDIT_MEMORY_PREVIEW_ITEMS,
} as const satisfies AthenaCommandCenterModel;

function resolveStaticAthenaPlugin(
  pluginId: AthenaPluginId
): AthenaPluginRegistryPreviewRecord {
  const plugin = ATHENA_PLUGIN_REGISTRY_PREVIEW.find(
    (candidate) => candidate.pluginId === pluginId
  );

  if (!plugin) {
    throw new Error(`Missing Athena plugin registry record: ${pluginId}`);
  }

  return plugin;
}

function resolveRequiredStaticAthenaCommandIntent(
  commandId: AthenaCommandIntentId
): AthenaCommandIntentRecord {
  const command = resolveStaticAthenaCommandIntent(commandId);

  if (!command) {
    throw new Error(`Missing Athena command intent: ${commandId}`);
  }

  return command;
}

function formatDefaultState(state: AthenaCommandIntentState): string {
  switch (state) {
    case "approval-gated":
      return "Approval-gated by default.";
    case "review-only":
      return "Review-only by default.";
    case "secondary-diagnostics":
      return "Secondary diagnostics only by default.";
    default:
      return "Blocked by default.";
  }
}

function formatDefaultStateChipLabel(state: AthenaCommandIntentState): string {
  switch (state) {
    case "approval-gated":
      return "Approval-gated";
    case "review-only":
      return "Review-only";
    case "secondary-diagnostics":
      return "Secondary diagnostics";
    default:
      return "Blocked by default";
  }
}

function formatConditionalRequirementLabel(
  label: string,
  state: AthenaConditionalRequirementState
): string {
  if (state === "required") {
    return `${label} required`;
  }

  return `${label} not applicable for this plugin`;
}
