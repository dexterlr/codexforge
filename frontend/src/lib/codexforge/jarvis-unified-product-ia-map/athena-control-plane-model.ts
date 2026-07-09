import type { CodexForgeNavigationRouteHref } from "../navigation-shell/navigation-shell-types";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH =
  "4458-4489 - Athena Unified Chat Control Plane Foundation";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE = 4489;

export const ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH =
  "4490-4521 - Athena Plugin Registry and Command Router";

export const ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_PHASE = 4521;

export const ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH =
  "4522-4553 - Athena Approval-Gated Tool Execution Bridge";

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

export type AthenaCommandCenterModel = Readonly<{
  batch: string;
  highestDetectedPhase: number;
  latestCompletedBatch: string;
  previousCompletedBatch: string;
  nextLikelyBatch: string;
  identity: AthenaIdentityModel;
  chat: AthenaChatModel;
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
}>;

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_MARKERS = {
  batch: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH,
  highestDetectedPhase: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE,
  mission:
    "Athena is the main chat operator brain above all specialist Jarvis workspaces.",
  posture: "Athena unified chat control plane foundation only. Chat input is inert/local only.",
  nextLikelyBatch: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH,
} as const;

export const ATHENA_CONTROL_PLANE_IDENTITY = {
  name: "Athena",
  title: "Athena Command Center",
  mission:
    "Athena is the main chat control layer above all specialist Jarvis workspaces and approval-gated product lanes. Athena can plan and route, review, and safely hand off work across CodexForge.",
  operatorPromise:
    "Ask Athena to plan, route, review, and safely hand off work across CodexForge.",
  posture:
    "Athena plugin registry and command router only. Plugin registry is inert. Command router is preview-only. Chat input stays local and executes nothing.",
} as const satisfies AthenaIdentityModel;

export const ATHENA_CHAT_PLACEHOLDER_MODEL = {
  label: "Athena operator input",
  placeholder:
    "Draft an operator request for Athena. This stays local to the page and executes nothing.",
  helperText:
    "chat input is inert/local only; no prompt sending; no frontend fetch/network call; no plugin execution from chat yet; no result persistence",
  executionPosture:
    "Execution remains approval-gated and backend-only. No autonomous execution.",
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
      "Route into the approval path to review the approval queue, audit gates, and backend-only handoff posture.",
    routeHint: "/approval-queue",
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
    routeTarget: "/approval-queue",
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
      "Athena would open the approval path so the operator can review approval queue posture, audit gates, and backend-only handoff requirements.",
    previewedHandoffSteps: [
      "Open /approval-queue",
      "Review approval packet posture and audit gates",
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
      "Athena can show how a command would be routed, but it does not execute, dispatch, persist, or call anything.",
    tone: "approval-required",
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
    id: "registry-boundary",
    label: "Registry boundary",
    summary:
      "Athena plugin registry is inert and does not launch execution from chat.",
    items: [
      "plugin registry is inert",
      "no plugin execution from chat yet",
      "backend-only execution path required",
      "operator approval required",
    ],
  },
  {
    id: "router-boundary",
    label: "Command router boundary",
    summary:
      "Athena command router is preview-only and does not dispatch or persist anything.",
    items: [
      "command router is preview-only",
      "no prompt sending",
      "no frontend fetch/network call",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
    ],
  },
  {
    id: "execution-boundary",
    label: "Execution boundary",
    summary:
      "Athena does not perform autonomous plugin, workflow, provider, or trading execution.",
    items: [
      "no autonomous execution",
      "no plugin execution",
      "no provider execution",
      "no live video generation",
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
  },
  {
    id: "platform-boundary",
    label: "Platform boundary",
    summary:
      "Credential, storage, and runtime boundaries remain explicit across Athena and specialist workspaces.",
    items: [
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
      "Use the command router preview to see how Athena would route a command without executing anything.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_CURRENT_CAPABILITIES = [
  {
    id: "planning",
    label: "Plan operator requests",
    summary:
      "Athena can interpret operator intent and frame the right review path without executing anything.",
  },
  {
    id: "plugin-registry",
    label: "Map requests to the plugin registry",
    summary:
      "Athena knows the specialist workspaces, their routes, their postures, and their default blocked or review states.",
  },
  {
    id: "command-router",
    label: "Preview command routing",
    summary:
      "Athena can show which plugin a command belongs to, which route it would open, and which approvals or gates it would require.",
  },
  {
    id: "review",
    label: "Review readiness and blockers",
    summary:
      "Athena can summarize readiness, approval posture, audit posture, and blocked actions before a handoff is considered.",
  },
  {
    id: "handoff",
    label: "Prepare safe handoff",
    summary:
      "Athena can prepare a backend-only handoff path while keeping approval, kill switch, and audit requirements visible.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_FUTURE_CAPABILITIES = [
  {
    id: "tool-bridge",
    label: "Athena Approval-Gated Tool Execution Bridge",
    summary:
      "The next likely batch is 4522-4553 - Athena Approval-Gated Tool Execution Bridge.",
  },
  {
    id: "execution-receipts",
    label: "Execution receipts later",
    summary:
      "Athena will later need typed approval packets, backend receipts, and audit joins before any execution claim becomes real.",
  },
  {
    id: "trading-lane",
    label: "Trading stays later and blocked",
    summary:
      "Trading remains a later Athena lane and stays review-only and blocked for now.",
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

export function buildAthenaBlockedActionSummary(
  command: AthenaCommandIntentRecord
): string {
  return [
    "Command router is preview-only.",
    formatDefaultState(command.defaultState),
    command.backendOnlyRequirement,
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

export const ATHENA_COMMAND_CENTER_MODEL = {
  batch: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH,
  highestDetectedPhase: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_PHASE,
  latestCompletedBatch: ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_BATCH,
  previousCompletedBatch: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH,
  nextLikelyBatch: ATHENA_APPROVAL_GATED_TOOL_EXECUTION_BRIDGE_BATCH,
  identity: ATHENA_CONTROL_PLANE_IDENTITY,
  chat: ATHENA_CHAT_PLACEHOLDER_MODEL,
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
