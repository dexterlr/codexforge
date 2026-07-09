import type { Route } from "next";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH =
  "4458-4489 - Athena Unified Chat Control Plane Foundation";

export const ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE = 4489;

export type AthenaCommandIntentId =
  | "video-brief-intent"
  | "website-build-intent"
  | "avatar-presenter-intent"
  | "workflow-automation-intent"
  | "audit-review-intent"
  | "provider-readiness-intent"
  | "safety-review-intent"
  | "approval-packet-intent";

export type AthenaLauncherStatus =
  | "ready"
  | "approval-required"
  | "blocked";

export type AthenaExecutionPosture =
  | "routing-only"
  | "review-only"
  | "backend-only-required";

export type AthenaCommandIntentState =
  | "blocked-by-default"
  | "review-only"
  | "approval-gated";

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
  routeHint: Route;
}>;

export type AthenaPluginRegistryPreviewRecord = Readonly<{
  id: string;
  label: string;
  routeHref: Route;
  summary: string;
  status: AthenaLauncherStatus;
  executionPosture: string;
}>;

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
  id: AthenaCommandIntentId;
  label: string;
  routeTarget: Route;
  requiredApprovals: readonly string[];
  executionPosture: AthenaExecutionPosture;
  defaultState: AthenaCommandIntentState;
  auditRequirement: string;
  backendOnlyRequirement: string;
}>;

export type AthenaCommandCenterModel = Readonly<{
  batch: string;
  highestDetectedPhase: number;
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

export const ATHENA_CONTROL_PLANE_IDENTITY = {
  name: "Athena",
  title: "Athena Command Center",
  mission:
    "Athena is the main chat operator brain above all specialist Jarvis workspaces.",
  operatorPromise:
    "Ask Athena to plan, route, review, and safely hand off work across CodexForge.",
  posture:
    "Athena unified chat control plane foundation only. Chat input is inert/local only.",
} as const satisfies AthenaIdentityModel;

export const ATHENA_CHAT_PLACEHOLDER_MODEL = {
  label: "Athena operator input",
  placeholder:
    "Draft an operator request for Athena. This stays local to the page and executes nothing.",
  helperText:
    "chat input is inert/local only; no prompt sending; no frontend fetch/network call; no result persistence",
  executionPosture:
    "Execution remains approval-gated and backend-only. No autonomous execution.",
} as const satisfies AthenaChatModel;

export const ATHENA_SUGGESTED_PROMPTS = [
  {
    id: "cinematic-video",
    label: "Make a cinematic product video",
    summary:
      "Route the operator into Jarvis Video Studio to shape a brief, review the locked controls, and prepare a backend-only handoff.",
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
      "Route into Jarvis Audit and Runs to review approvals, blocked actions, evidence packets, and non-persistent result placeholders.",
    routeHint: "/jarvis-audit",
  },
  {
    id: "approval-packet",
    label: "Prepare an approval packet",
    summary:
      "Route into the current audit and workspace surfaces to review approval posture before any backend-only handoff.",
    routeHint: "/jarvis-audit",
  },
  {
    id: "show-blocked",
    label: "Show what is blocked",
    summary:
      "Summarize blocked provider, workflow, plugin, and persistence paths before the operator considers a specialist workspace.",
    routeHint: "/jarvis-safety",
  },
] as const satisfies readonly AthenaSuggestedPromptRecord[];

export const ATHENA_PLUGIN_REGISTRY_PREVIEW = [
  {
    id: "jarvis-video-studio",
    label: "Jarvis Video Studio",
    routeHref: "/jarvis-video",
    summary:
      "Mission brief, prompt or concept, output preview, and locked backend handoff controls remain above the fold.",
    status: "approval-required",
    executionPosture: "Backend-owned execution required",
  },
  {
    id: "jarvis-websites",
    label: "Jarvis Websites",
    routeHref: "/jarvis-websites",
    summary:
      "Review-first website planning with preview, export, and publish still blocked.",
    status: "blocked",
    executionPosture: "Preview and publish blocked",
  },
  {
    id: "jarvis-avatar",
    label: "Jarvis Avatar",
    routeHref: "/jarvis-avatar",
    summary:
      "Review persona, consent, visual style, and safety while preview stays blocked.",
    status: "blocked",
    executionPosture: "Preview blocked",
  },
  {
    id: "jarvis-workflows",
    label: "Jarvis Workflows",
    routeHref: "/jarvis-workflows",
    summary:
      "Review triggers, permissions, dry run, approval, and audit while scheduling and dispatch remain blocked.",
    status: "blocked",
    executionPosture: "Dispatch blocked",
  },
  {
    id: "audit-runs",
    label: "Audit / Runs",
    routeHref: "/jarvis-audit",
    summary:
      "Review the audit trail, approvals ledger, blocked action log, and result placeholders without persistence.",
    status: "ready",
    executionPosture: "Review-only workspace",
  },
  {
    id: "providers",
    label: "Providers",
    routeHref: "/ai-providers",
    summary:
      "Review provider registry posture, routing boundaries, and profile-only provider setup without live calls.",
    status: "ready",
    executionPosture: "Profile-only review",
  },
  {
    id: "safety",
    label: "Safety",
    routeHref: "/jarvis-safety",
    summary:
      "Review the kill switch, approval posture, credential boundary, and browser storage boundary.",
    status: "ready",
    executionPosture: "Safety control plane",
  },
] as const satisfies readonly AthenaPluginRegistryPreviewRecord[];

export const ATHENA_SAFETY_GATES = [
  {
    id: "plan-and-route",
    label: "Athena can plan and route",
    summary:
      "Athena can classify operator intent, point to the right workspace, and prepare a safe review path.",
    tone: "ready",
  },
  {
    id: "approval-gated",
    label: "Execution remains approval-gated",
    summary:
      "Operator approval remains required before any backend-only execution path is proposed.",
    tone: "approval-required",
  },
  {
    id: "backend-only",
    label: "Provider calls stay backend-only",
    summary:
      "No frontend provider calls, no frontend fetch/network calls, and no provider execution are enabled here.",
    tone: "blocked",
  },
  {
    id: "no-autonomy",
    label: "No autonomous execution",
    summary:
      "Athena does not execute plugins, tools, workflows, jobs, queues, or providers from the frontend.",
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
    id: "chat-boundary",
    label: "Chat boundary",
    summary:
      "Athena chat stays local and inert. It does not send prompts or leave the browser.",
    items: [
      "chat input is inert/local only",
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
      "Athena does not perform autonomous plugin, workflow, or provider execution.",
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
      "Specialist work stays review-first and backend-only handoff remains required.",
    items: [
      "backend-only execution path required",
      "operator approval required",
      "kill switch required",
      "audit required",
      "no frontend provider call",
      "provider calls stay backend-only",
    ],
  },
] as const satisfies readonly AthenaBlockedActionGroup[];

export const ATHENA_HANDOFF_FLOW = [
  {
    id: "request",
    label: "Operator request",
    summary:
      "Athena receives a local draft request in the chat-style input and keeps it in the browser session only.",
  },
  {
    id: "route",
    label: "Plan and route",
    summary:
      "Athena classifies the command intent and routes the operator to the right specialist workspace.",
  },
  {
    id: "review",
    label: "Review specialist workspace",
    summary:
      "The operator reviews the workspace brief, safety posture, blocked actions, and readiness markers.",
  },
  {
    id: "approve",
    label: "Approval gate",
    summary:
      "Operator approval remains required before any backend-only execution path can be considered.",
  },
  {
    id: "handoff",
    label: "Backend-only handoff",
    summary:
      "Any future execution remains backend-only and must keep the kill switch and audit path active.",
  },
] as const satisfies readonly AthenaHandoffStepRecord[];

export const ATHENA_AUDIT_READINESS_MODEL = [
  {
    id: "audit-preview",
    label: "Audit preview stays visible",
    summary:
      "Athena keeps audit and run review close to the command center so the operator can see blocked and reviewable paths quickly.",
    tone: "ready",
  },
  {
    id: "approval-review",
    label: "Approval review stays visible",
    summary:
      "Athena can prepare an approval packet path, but approval remains manual and non-persistent.",
    tone: "approval-required",
  },
  {
    id: "backend-readiness",
    label: "Backend-only execution path required",
    summary:
      "Athena can prepare the handoff plan while provider calls, queues, workers, and jobs remain blocked from the frontend.",
    tone: "blocked",
  },
  {
    id: "blocked-state",
    label: "Blocked state stays explicit",
    summary:
      "Athena can show what is blocked before the operator opens a specialist workspace.",
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
    id: "launch-video",
    label: "Launch Jarvis Video Studio",
    summary:
      "Move into the above-the-fold video generation control console when the operator needs a cinematic brief.",
  },
  {
    id: "review-blockers",
    label: "Review blockers",
    summary:
      "Use Athena safety and audit posture to show what is blocked before any backend handoff is discussed.",
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
    id: "routing",
    label: "Route into specialist workspaces",
    summary:
      "Athena can route to Jarvis Video, Websites, Avatar, Workflows, Audit, Providers, and Safety.",
  },
  {
    id: "review",
    label: "Review readiness and blockers",
    summary:
      "Athena can summarize readiness, approval posture, and blocked actions before a handoff is considered.",
  },
  {
    id: "handoff",
    label: "Prepare safe handoff",
    summary:
      "Athena can prepare a backend-only handoff plan while keeping approval, kill switch, and audit requirements visible.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_FUTURE_CAPABILITIES = [
  {
    id: "plugin-registry",
    label: "Athena Plugin Registry and Command Router",
    summary:
      "The next likely batch is 4490-4521 - Athena Plugin Registry and Command Router.",
  },
  {
    id: "project-asset-control",
    label: "Projects and assets control",
    summary:
      "Athena will later coordinate project, asset, and provider-aware specialist workspaces from one control room.",
  },
  {
    id: "trading-lane",
    label: "Trading control lane later",
    summary:
      "Trading remains a future Athena surface and is not part of the current control-plane foundation batch.",
  },
] as const satisfies readonly AthenaCapabilityRecord[];

export const ATHENA_COMMAND_INTENTS = [
  {
    id: "video-brief-intent",
    label: "video brief intent",
    routeTarget: "/jarvis-video",
    requiredApprovals: [
      "operator approval required",
      "kill switch required",
      "audit required",
    ],
    executionPosture: "backend-only-required",
    defaultState: "blocked-by-default",
    auditRequirement: "audit trail review required before any future handoff",
    backendOnlyRequirement:
      "backend-only execution path required; no frontend provider call",
  },
  {
    id: "website-build-intent",
    label: "website build intent",
    routeTarget: "/jarvis-websites",
    requiredApprovals: [
      "operator approval required",
      "publish approval required",
      "audit required",
    ],
    executionPosture: "routing-only",
    defaultState: "blocked-by-default",
    auditRequirement: "audit review required before any preview or publish path",
    backendOnlyRequirement:
      "backend-only execution path required; no frontend fetch/network call",
  },
  {
    id: "avatar-presenter-intent",
    label: "avatar presenter intent",
    routeTarget: "/jarvis-avatar",
    requiredApprovals: [
      "operator approval required",
      "consent review required",
      "audit required",
    ],
    executionPosture: "routing-only",
    defaultState: "blocked-by-default",
    auditRequirement: "audit review required before any likeness or preview path",
    backendOnlyRequirement:
      "backend-only execution path required; no frontend provider call",
  },
  {
    id: "workflow-automation-intent",
    label: "workflow automation intent",
    routeTarget: "/jarvis-workflows",
    requiredApprovals: [
      "operator approval required",
      "permission review required",
      "audit required",
    ],
    executionPosture: "review-only",
    defaultState: "blocked-by-default",
    auditRequirement: "audit trail required before any workflow dispatch",
    backendOnlyRequirement:
      "backend-only execution path required; no plugin execution",
  },
  {
    id: "audit-review-intent",
    label: "audit review intent",
    routeTarget: "/jarvis-audit",
    requiredApprovals: [
      "operator review required",
      "audit required",
    ],
    executionPosture: "review-only",
    defaultState: "review-only",
    auditRequirement: "audit route is the primary review surface for runs and approvals",
    backendOnlyRequirement:
      "no result persistence; backend-only execution path required for future capture",
  },
  {
    id: "provider-readiness-intent",
    label: "provider readiness intent",
    routeTarget: "/ai-providers",
    requiredApprovals: [
      "operator review required",
      "provider boundary review required",
      "audit required",
    ],
    executionPosture: "review-only",
    defaultState: "review-only",
    auditRequirement: "audit review required before any future provider handoff",
    backendOnlyRequirement:
      "provider calls stay backend-only; no frontend provider call",
  },
  {
    id: "safety-review-intent",
    label: "safety review intent",
    routeTarget: "/jarvis-safety",
    requiredApprovals: [
      "operator review required",
      "kill switch required",
      "audit required",
    ],
    executionPosture: "review-only",
    defaultState: "review-only",
    auditRequirement: "audit and safety review remain required before handoff",
    backendOnlyRequirement:
      "backend-only execution path required; no autonomous execution",
  },
  {
    id: "approval-packet-intent",
    label: "approval packet intent",
    routeTarget: "/jarvis-audit",
    requiredApprovals: [
      "operator approval required",
      "approval packet review required",
      "audit required",
    ],
    executionPosture: "review-only",
    defaultState: "approval-gated",
    auditRequirement: "audit review required before approval packet preparation",
    backendOnlyRequirement:
      "backend-only execution path required; no approval persistence",
  },
] as const satisfies readonly AthenaCommandIntentRecord[];

export const ATHENA_COMMAND_CENTER_MODEL = {
  batch: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_BATCH,
  highestDetectedPhase: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE,
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
