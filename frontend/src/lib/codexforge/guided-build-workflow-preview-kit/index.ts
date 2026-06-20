import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  buildControlledBuilderReviewStableKey as buildGuidedBuildWorkflowReviewStableKey,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";
import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export { buildGuidedBuildWorkflowReviewStableKey };
export * from "./GuidedBuildWorkflowReviewPhasePanels";

export type GuidedBuildWorkflowReviewPacketInput = ControlledBuilderReviewPacketInput;

export type GuidedBuildWorkflowReviewSlug =
  | "guided-build-workflow-boundary"
  | "guided-build-goal-review"
  | "guided-build-target-selection"
  | "guided-build-requirement-checklist"
  | "guided-build-architecture-sketch"
  | "guided-build-file-blueprint"
  | "guided-build-command-blueprint"
  | "guided-build-runtime-blueprint"
  | "guided-build-adapter-blueprint"
  | "guided-build-validation-blueprint"
  | "guided-build-risk-review"
  | "guided-build-approval-queue"
  | "guided-build-evidence-plan"
  | "guided-build-result-plan"
  | "first-practical-guided-build-candidate"
  | "controlled-guided-build-workflow-release-candidate";

type GuidedBuildWorkflowDefinition = {
  slug: GuidedBuildWorkflowReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  supportCopy: string;
  deniedCopy: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  groupLabel: string;
  previewFocus: string;
  language: readonly string[];
  fieldItems: readonly string[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  identity: string;
  advancedDetails: readonly string[];
  advancedCopy: string;
  dataScope: string;
};

export const GUIDED_BUILD_WORKFLOW_BOUNDARY_LANGUAGE = [
  "Guided build workflow boundary",
  "Guided build workflow boundary does not execute builds",
  "Guided build workflow execution requires explicit operator approval",
  "Guided build supports game and non-game targets",
  "Denied guided build workflow paths remain blocked",
  "Guided build workflow checklist",
  "static guided-build-workflow-boundary preview",
  "approval required",
] as const;

export const GUIDED_BUILD_GOAL_REVIEW_LANGUAGE = [
  "Guided build goal review",
  "Guided build goal review does not send prompts",
  "Goal review requires explicit operator approval",
  "Goal review preserves shared CodexForge brain context",
  "Denied guided build goal paths remain blocked",
  "Guided build goal checklist",
  "static guided-build-goal-review preview",
  "approval required",
] as const;

export const GUIDED_BUILD_TARGET_SELECTION_LANGUAGE = [
  "Guided build target selection",
  "Guided build target selection does not route live requests",
  "Target selection requires explicit operator approval",
  "Target selection supports games apps websites dashboards tools research automation creative trading data docs and integrations",
  "Denied guided build target paths remain blocked",
  "Guided build target checklist",
  "static guided-build-target-selection preview",
  "approval required",
] as const;

export const GUIDED_BUILD_REQUIREMENT_CHECKLIST_LANGUAGE = [
  "Guided build requirement checklist",
  "Guided build requirement checklist does not create tasks",
  "Requirement checklist review requires explicit operator approval",
  "Requirement checklists preserve latest-message authority",
  "Denied guided build requirement paths remain blocked",
  "Guided build requirement checklist",
  "static guided-build-requirement-checklist preview",
  "approval required",
] as const;

export const GUIDED_BUILD_ARCHITECTURE_SKETCH_LANGUAGE = [
  "Guided build architecture sketch",
  "Guided build architecture sketch does not scaffold architecture",
  "Architecture sketch review requires explicit operator approval",
  "Architecture sketches include model routing and adapter boundaries",
  "Denied guided build architecture paths remain blocked",
  "Guided build architecture checklist",
  "static guided-build-architecture-sketch preview",
  "approval required",
] as const;

export const GUIDED_BUILD_FILE_BLUEPRINT_LANGUAGE = [
  "Guided build file blueprint",
  "Guided build file blueprint does not write files",
  "File blueprint review requires explicit operator approval",
  "File blueprints include planned files without mutation",
  "Denied guided build file blueprint paths remain blocked",
  "Guided build file blueprint checklist",
  "static guided-build-file-blueprint preview",
  "approval required",
] as const;

export const GUIDED_BUILD_COMMAND_BLUEPRINT_LANGUAGE = [
  "Guided build command blueprint",
  "Guided build command blueprint does not run commands",
  "Command blueprint review requires explicit operator approval",
  "Command blueprints include planned commands without execution",
  "Denied guided build command blueprint paths remain blocked",
  "Guided build command blueprint checklist",
  "static guided-build-command-blueprint preview",
  "approval required",
] as const;

export const GUIDED_BUILD_RUNTIME_BLUEPRINT_LANGUAGE = [
  "Guided build runtime blueprint",
  "Guided build runtime blueprint does not start runtimes",
  "Runtime blueprint review requires explicit operator approval",
  "Runtime blueprints include planned runtimes without launch",
  "Denied guided build runtime blueprint paths remain blocked",
  "Guided build runtime blueprint checklist",
  "static guided-build-runtime-blueprint preview",
  "approval required",
] as const;

export const GUIDED_BUILD_ADAPTER_BLUEPRINT_LANGUAGE = [
  "Guided build adapter blueprint",
  "Guided build adapter blueprint does not execute adapters",
  "Adapter blueprint review requires explicit operator approval",
  "Adapter blueprints include backend and domain adapter gates",
  "Denied guided build adapter blueprint paths remain blocked",
  "Guided build adapter blueprint checklist",
  "static guided-build-adapter-blueprint preview",
  "approval required",
] as const;

export const GUIDED_BUILD_VALIDATION_BLUEPRINT_LANGUAGE = [
  "Guided build validation blueprint",
  "Guided build validation blueprint does not run validation",
  "Validation blueprint review requires explicit operator approval",
  "Validation blueprints include planned tests and smoke checks",
  "Denied guided build validation blueprint paths remain blocked",
  "Guided build validation blueprint checklist",
  "static guided-build-validation-blueprint preview",
  "approval required",
] as const;

export const GUIDED_BUILD_RISK_REVIEW_LANGUAGE = [
  "Guided build risk review",
  "Guided build risk review does not approve risk",
  "Risk review requires explicit operator approval",
  "Risk reviews gate model spend remote calls privacy and tool use",
  "Denied guided build risk paths remain blocked",
  "Guided build risk checklist",
  "static guided-build-risk-review preview",
  "approval required",
] as const;

export const GUIDED_BUILD_APPROVAL_QUEUE_LANGUAGE = [
  "Guided build approval queue",
  "Guided build approval queue does not approve actions",
  "Approval queue decisions require explicit operator approval",
  "Approval queues list every gated model backend and domain action",
  "Denied guided build approval queue paths remain blocked",
  "Guided build approval queue checklist",
  "static guided-build-approval-queue preview",
  "approval required",
] as const;

export const GUIDED_BUILD_EVIDENCE_PLAN_LANGUAGE = [
  "Guided build evidence plan",
  "Guided build evidence plan does not persist evidence",
  "Evidence plan review requires explicit operator approval",
  "Evidence plans route outputs through shared evidence review",
  "Denied guided build evidence paths remain blocked",
  "Guided build evidence checklist",
  "static guided-build-evidence-plan preview",
  "approval required",
] as const;

export const GUIDED_BUILD_RESULT_PLAN_LANGUAGE = [
  "Guided build result plan",
  "Guided build result plan does not persist results",
  "Result plan review requires explicit operator approval",
  "Result plans route outputs through shared result review",
  "Denied guided build result paths remain blocked",
  "Guided build result checklist",
  "static guided-build-result-plan preview",
  "approval required",
] as const;

export const FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_LANGUAGE = [
  "First practical guided build candidate",
  "First practical guided build candidate does not execute builds",
  "Practical guided build candidates require explicit operator approval",
  "Candidate packets combine goal requirements architecture files commands runtimes adapters validation risk approvals evidence and results",
  "Denied practical guided build candidate paths remain blocked",
  "First practical guided build checklist",
  "static first-practical-guided-build-candidate preview",
  "approval required",
] as const;

export const CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled guided build workflow release candidate",
  "Controlled guided build workflow release candidate does not call models or execute adapters",
  "Controlled guided build release requires explicit operator approval",
  "Release candidate supports build anything goals with shared brain gates",
  "Denied controlled guided build workflow paths remain blocked",
  "Controlled guided build workflow release checklist",
  "static controlled-guided-build-workflow-release-candidate preview",
  "approval required",
] as const;

export const GUIDED_BUILD_WORKFLOW_PREVIEW_SAFETY_MARKERS = [
  "guided-build-workflow static review-only preview",
  "deterministic static review content",
  "static preview-only guided build workflow",
  "review-only",
  "preview-only",
  "not executable from UI",
  "approval required",
  "approval required before execution",
  "operator-approved",
  "clear denied-path copy",
  "clear operator approval copy",
  "no build execution",
  "no workflow execution",
  "no action execution from UI",
  "no live execution",
  "no live model calls",
  "no provider calls",
  "no provider connection tests",
  "no local runtime probes",
  "no API key reads",
  "no secret reads",
  "no credential reads",
  "no credential storage",
  "no browser credential storage",
  "no credit spend",
  "no prompt sending",
  "no prompts sent remotely",
  "no network calls",
  "no browsing",
  "no deployment",
  "no file write/delete/mutation",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no local runtime start/stop",
  "no local runtime start",
  "no game server start",
  "no game server launch",
  "no mod install",
  "no automation creation",
  "no backend adapter execution",
  "no project adapter execution",
  "no game adapter execution",
  "no domain adapter execution",
  "no model output persistence",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no packaging/scaffold execution",
  "no project scaffold creation",
  "no hidden approvals",
  "no approval shortcuts",
  "no approval automation",
  "no approval decision persistence",
  "no automatic memory promotion",
  "no memory/RAG ingestion or memory auto-promotion",
  "no Brain graph mutation",
  "no audit record writes",
  "no model routing execution",
  "no live request routing",
  "no paid model calls",
  "no free model calls",
  "no local model calls",
  "no remote model calls",
  "no specialist model calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no obvious duplicate React key patterns",
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no mojibake",
] as const;

const GUIDED_BUILD_WORKFLOW_PACKET_FIELDS = [
  "raw goal",
  "clarified goal",
  "target family",
  "requirement checklist",
  "architecture sketch",
  "file blueprint",
  "command blueprint",
  "runtime blueprint",
  "adapter blueprint",
  "validation blueprint",
  "risk review",
  "approval queue",
  "evidence plan",
  "result plan",
  "denied live execution state",
  "operator decision state",
] as const;

const SUPPORTED_GUIDED_BUILD_TARGET_FAMILIES = [
  "game target",
  "app target",
  "website target",
  "dashboard target",
  "tool target",
  "research target",
  "automation target",
  "creative target",
  "trading target",
  "data target",
  "documentation target",
  "integration target",
  "general project target",
] as const;

function joinSentence(items: readonly string[]): string {
  return items.join(", ");
}

function buildGuidedBuildWorkflowDefinition(input: {
  slug: GuidedBuildWorkflowReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  supportCopy: string;
  deniedCopy: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  groupLabel: string;
  previewFocus: string;
  language: readonly string[];
  fieldItems: readonly string[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
}): GuidedBuildWorkflowDefinition {
  const packetFields = "Future guided build packet fields: " + joinSentence(GUIDED_BUILD_WORKFLOW_PACKET_FIELDS) + ".";
  const supportedTargets = "Supported target families: " + joinSentence(SUPPORTED_GUIDED_BUILD_TARGET_FAMILIES) + ".";
  const sharedBrainCopy = "Models are workers. CodexForge is the brain. All paid/free/local/remote/OpenAI-compatible/specialist model workers share one CodexForge brain, memory, knowledge, evidence, result, audit, and approval layer.";
  const modelRouterCopy = "Model-router policy: cheapest capable model wins if safe; local model preferred for private files, codebases, sensitive plans, local workspace context, and local game/server config; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for games/research/creative/trading/coding/automation.";
  const adapterCopy = "Backend/domain adapter policy: all plans remain preview-only; no live execution; all real execution requires explicit operator approval; every adapter proposal must name its approval gate; every result must return through shared evidence/result review.";
  const deniedCopy = input.deniedCopy + ". Denied guided build workflow paths block model calls, provider calls, provider connection tests, local runtime probes, API key reads, secret reads, credential storage, credit spend, prompt sending, remote prompt sending, browsing, deployment, file writes, command execution, runtime starts, game server starts, mod installs, automations, backend adapter execution, domain adapter execution, project adapter execution, game adapter execution, validation execution, evidence persistence, result persistence, recovery, packaging, exports, project scaffolding, model output persistence, automatic memory promotion, hidden approvals, audit writes, and live request routing.";
  const checklistCopy = input.checklistLabel + ": " + joinSentence(GUIDED_BUILD_WORKFLOW_PACKET_FIELDS) + ".";
  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    markerTitle: input.markerTitle,
    safetyCopy: input.safetyCopy,
    approvalCopy: input.approvalCopy,
    supportCopy: input.supportCopy,
    deniedCopy: input.deniedCopy,
    checklistLabel: input.checklistLabel,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    groupLabel: input.groupLabel,
    previewFocus: input.previewFocus,
    language: input.language,
    fieldItems: input.fieldItems,
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: input.nextRecommendedAction,
    plainEnglishTitle: "Plain-English " + input.title.toLowerCase(),
    plainEnglishCopy: input.markerTitle + ". " + input.safetyCopy + ". " + input.approvalCopy + ". " + input.supportCopy + ". " + deniedCopy + " " + packetFields + " " + supportedTargets + " " + sharedBrainCopy + " " + modelRouterCopy + " " + adapterCopy + " Preview focus: " + input.previewFocus + ".",
    identity: input.title + " identity: " + input.markerTitle + ". " + input.safetyCopy + ". " + input.approvalCopy + ". " + input.supportCopy + ". " + input.deniedCopy + ". " + sharedBrainCopy + " Static preview-only review content remains blocked until explicit operator approval.",
    advancedDetails: [input.markerTitle, input.safetyCopy, input.approvalCopy, input.supportCopy, input.deniedCopy, packetFields, supportedTargets, sharedBrainCopy, modelRouterCopy, adapterCopy, deniedCopy, checklistCopy, "Static preview focus fields: " + joinSentence(input.fieldItems) + ".", "Operator decision state: blocked until explicit human approval confirms goal, target family, requirement checklist, architecture, files, commands, runtimes, adapters, validation, risk, approvals, evidence, result, model routing, and safety gates."],
    advancedCopy: input.title + " remains deterministic, static, local-first, review-only, and approval-gated. It does not call models, call providers, send prompts, read secrets, store credentials, spend credits, execute backend adapters, execute domain adapters, write files, run commands, start runtimes, scaffold projects, browse, deploy, package outputs, persist model outputs, persist evidence/results, trigger recovery, run validation, or promote memory automatically.",
    dataScope: input.slug + " guided-build-workflow review-only approval required denied execution static preview",
  };
}

export const GUIDED_BUILD_WORKFLOW_DEFINITIONS: Record<GuidedBuildWorkflowReviewSlug, GuidedBuildWorkflowDefinition> = {
  "guided-build-workflow-boundary": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-workflow-boundary",
    phase: "Phase 1018",
    title: "Guided Build Workflow Boundary",
    markerTitle: "Guided build workflow boundary",
    safetyCopy: "Guided build workflow boundary does not execute builds",
    approvalCopy: "Guided build workflow execution requires explicit operator approval",
    supportCopy: "Guided build supports game and non-game targets",
    deniedCopy: "Denied guided build workflow paths remain blocked",
    checklistLabel: "Guided build workflow checklist",
    subtitle: "Review the guided build workflow boundary without executing builds, calling models, or running adapters.",
    primaryLabel: "Review workflow boundary",
    groupLabel: "Workflow boundary fields",
    previewFocus: "raw goal, clarified goal, target family, guided packet boundary, denied execution state, and operator decision state",
    language: GUIDED_BUILD_WORKFLOW_BOUNDARY_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "raw goal, clarified goal, target family, guided packet boundary, denied execution state, and operator decision state"],
    routes: ["/controlled-universal-builder-cockpit-release-candidate", "/guided-build-goal-review", "/guided-build-risk-review"],
    links: [
      { href: "/controlled-universal-builder-cockpit-release-candidate", label: "Previous Phase" },
      { href: "/guided-build-goal-review", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-goal-review": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-goal-review",
    phase: "Phase 1019",
    title: "Guided Build Goal Review",
    markerTitle: "Guided build goal review",
    safetyCopy: "Guided build goal review does not send prompts",
    approvalCopy: "Goal review requires explicit operator approval",
    supportCopy: "Goal review preserves shared CodexForge brain context",
    deniedCopy: "Denied guided build goal paths remain blocked",
    checklistLabel: "Guided build goal checklist",
    subtitle: "Review raw and clarified goals without sending prompts, calling models, or storing model output.",
    primaryLabel: "Review goal packet",
    groupLabel: "Goal review fields",
    previewFocus: "raw goal, clarified goal, ambiguity notes, shared brain context boundary, denied prompt-send state, and operator decision state",
    language: GUIDED_BUILD_GOAL_REVIEW_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "raw goal, clarified goal, ambiguity notes, shared brain context boundary, denied prompt-send state, and operator decision state"],
    routes: ["/guided-build-workflow-boundary", "/guided-build-target-selection", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-workflow-boundary", label: "Previous Phase" },
      { href: "/guided-build-target-selection", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-target-selection": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-target-selection",
    phase: "Phase 1020",
    title: "Guided Build Target Selection",
    markerTitle: "Guided build target selection",
    safetyCopy: "Guided build target selection does not route live requests",
    approvalCopy: "Target selection requires explicit operator approval",
    supportCopy: "Target selection supports games apps websites dashboards tools research automation creative trading data docs and integrations",
    deniedCopy: "Denied guided build target paths remain blocked",
    checklistLabel: "Guided build target checklist",
    subtitle: "Review target-family selection without routing live requests or calling models.",
    primaryLabel: "Review target selection",
    groupLabel: "Target selection fields",
    previewFocus: "target family, supported target matrix, model-router preview, adapter-family preview, denied live route state, and operator decision state",
    language: GUIDED_BUILD_TARGET_SELECTION_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "target family, supported target matrix, model-router preview, adapter-family preview, denied live route state, and operator decision state"],
    routes: ["/guided-build-goal-review", "/guided-build-requirement-checklist", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-goal-review", label: "Previous Phase" },
      { href: "/guided-build-requirement-checklist", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-requirement-checklist": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-requirement-checklist",
    phase: "Phase 1021",
    title: "Guided Build Requirement Checklist",
    markerTitle: "Guided build requirement checklist",
    safetyCopy: "Guided build requirement checklist does not create tasks",
    approvalCopy: "Requirement checklist review requires explicit operator approval",
    supportCopy: "Requirement checklists preserve latest-message authority",
    deniedCopy: "Denied guided build requirement paths remain blocked",
    checklistLabel: "Guided build requirement checklist",
    subtitle: "Review requirements without creating tasks, automations, tickets, files, or persistent model output.",
    primaryLabel: "Review requirements",
    groupLabel: "Requirement checklist fields",
    previewFocus: "requirement checklist, latest-message authority, acceptance criteria preview, denied task creation state, and operator decision state",
    language: GUIDED_BUILD_REQUIREMENT_CHECKLIST_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "requirement checklist, latest-message authority, acceptance criteria preview, denied task creation state, and operator decision state"],
    routes: ["/guided-build-target-selection", "/guided-build-architecture-sketch", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-target-selection", label: "Previous Phase" },
      { href: "/guided-build-architecture-sketch", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-architecture-sketch": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-architecture-sketch",
    phase: "Phase 1022",
    title: "Guided Build Architecture Sketch",
    markerTitle: "Guided build architecture sketch",
    safetyCopy: "Guided build architecture sketch does not scaffold architecture",
    approvalCopy: "Architecture sketch review requires explicit operator approval",
    supportCopy: "Architecture sketches include model routing and adapter boundaries",
    deniedCopy: "Denied guided build architecture paths remain blocked",
    checklistLabel: "Guided build architecture checklist",
    subtitle: "Review architecture sketches without scaffolding projects, creating files, or executing adapters.",
    primaryLabel: "Review architecture",
    groupLabel: "Architecture sketch fields",
    previewFocus: "architecture sketch, model routing boundary, backend adapter boundary, domain adapter boundary, denied scaffold state, and operator decision state",
    language: GUIDED_BUILD_ARCHITECTURE_SKETCH_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "architecture sketch, model routing boundary, backend adapter boundary, domain adapter boundary, denied scaffold state, and operator decision state"],
    routes: ["/guided-build-requirement-checklist", "/guided-build-file-blueprint", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-requirement-checklist", label: "Previous Phase" },
      { href: "/guided-build-file-blueprint", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-file-blueprint": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-file-blueprint",
    phase: "Phase 1023",
    title: "Guided Build File Blueprint",
    markerTitle: "Guided build file blueprint",
    safetyCopy: "Guided build file blueprint does not write files",
    approvalCopy: "File blueprint review requires explicit operator approval",
    supportCopy: "File blueprints include planned files without mutation",
    deniedCopy: "Denied guided build file blueprint paths remain blocked",
    checklistLabel: "Guided build file blueprint checklist",
    subtitle: "Review planned files without writing, deleting, patching, exporting, or scaffolding anything.",
    primaryLabel: "Review file blueprint",
    groupLabel: "File blueprint fields",
    previewFocus: "file blueprint, planned paths, mutation denial, file approval gate, evidence handoff, and operator decision state",
    language: GUIDED_BUILD_FILE_BLUEPRINT_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "file blueprint, planned paths, mutation denial, file approval gate, evidence handoff, and operator decision state"],
    routes: ["/guided-build-architecture-sketch", "/guided-build-command-blueprint", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-architecture-sketch", label: "Previous Phase" },
      { href: "/guided-build-command-blueprint", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-command-blueprint": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-command-blueprint",
    phase: "Phase 1024",
    title: "Guided Build Command Blueprint",
    markerTitle: "Guided build command blueprint",
    safetyCopy: "Guided build command blueprint does not run commands",
    approvalCopy: "Command blueprint review requires explicit operator approval",
    supportCopy: "Command blueprints include planned commands without execution",
    deniedCopy: "Denied guided build command blueprint paths remain blocked",
    checklistLabel: "Guided build command blueprint checklist",
    subtitle: "Review planned commands without shell, git, test, build, smoke, or package execution.",
    primaryLabel: "Review command blueprint",
    groupLabel: "Command blueprint fields",
    previewFocus: "command blueprint, planned command list, shell denial, command approval gate, validation handoff, and operator decision state",
    language: GUIDED_BUILD_COMMAND_BLUEPRINT_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "command blueprint, planned command list, shell denial, command approval gate, validation handoff, and operator decision state"],
    routes: ["/guided-build-file-blueprint", "/guided-build-runtime-blueprint", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-file-blueprint", label: "Previous Phase" },
      { href: "/guided-build-runtime-blueprint", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-runtime-blueprint": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-runtime-blueprint",
    phase: "Phase 1025",
    title: "Guided Build Runtime Blueprint",
    markerTitle: "Guided build runtime blueprint",
    safetyCopy: "Guided build runtime blueprint does not start runtimes",
    approvalCopy: "Runtime blueprint review requires explicit operator approval",
    supportCopy: "Runtime blueprints include planned runtimes without launch",
    deniedCopy: "Denied guided build runtime blueprint paths remain blocked",
    checklistLabel: "Guided build runtime blueprint checklist",
    subtitle: "Review planned runtimes without starting local services, game servers, bridges, workers, or schedulers.",
    primaryLabel: "Review runtime blueprint",
    groupLabel: "Runtime blueprint fields",
    previewFocus: "runtime blueprint, planned services, launch denial, runtime approval gate, sandbox notes, and operator decision state",
    language: GUIDED_BUILD_RUNTIME_BLUEPRINT_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "runtime blueprint, planned services, launch denial, runtime approval gate, sandbox notes, and operator decision state"],
    routes: ["/guided-build-command-blueprint", "/guided-build-adapter-blueprint", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-command-blueprint", label: "Previous Phase" },
      { href: "/guided-build-adapter-blueprint", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-adapter-blueprint": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-adapter-blueprint",
    phase: "Phase 1026",
    title: "Guided Build Adapter Blueprint",
    markerTitle: "Guided build adapter blueprint",
    safetyCopy: "Guided build adapter blueprint does not execute adapters",
    approvalCopy: "Adapter blueprint review requires explicit operator approval",
    supportCopy: "Adapter blueprints include backend and domain adapter gates",
    deniedCopy: "Denied guided build adapter blueprint paths remain blocked",
    checklistLabel: "Guided build adapter blueprint checklist",
    subtitle: "Review backend and domain adapter proposals without executing adapters or calling external systems.",
    primaryLabel: "Review adapter blueprint",
    groupLabel: "Adapter blueprint fields",
    previewFocus: "adapter blueprint, backend adapter gate, domain adapter gate, shared evidence/result return path, denied adapter execution state, and operator decision state",
    language: GUIDED_BUILD_ADAPTER_BLUEPRINT_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "adapter blueprint, backend adapter gate, domain adapter gate, shared evidence/result return path, denied adapter execution state, and operator decision state"],
    routes: ["/guided-build-runtime-blueprint", "/guided-build-validation-blueprint", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-runtime-blueprint", label: "Previous Phase" },
      { href: "/guided-build-validation-blueprint", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-validation-blueprint": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-validation-blueprint",
    phase: "Phase 1027",
    title: "Guided Build Validation Blueprint",
    markerTitle: "Guided build validation blueprint",
    safetyCopy: "Guided build validation blueprint does not run validation",
    approvalCopy: "Validation blueprint review requires explicit operator approval",
    supportCopy: "Validation blueprints include planned tests and smoke checks",
    deniedCopy: "Denied guided build validation blueprint paths remain blocked",
    checklistLabel: "Guided build validation blueprint checklist",
    subtitle: "Review planned tests and smoke checks without executing test, build, smoke, or validation commands.",
    primaryLabel: "Review validation blueprint",
    groupLabel: "Validation blueprint fields",
    previewFocus: "validation blueprint, planned tests, smoke checks, non-execution state, validation approval gate, and operator decision state",
    language: GUIDED_BUILD_VALIDATION_BLUEPRINT_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "validation blueprint, planned tests, smoke checks, non-execution state, validation approval gate, and operator decision state"],
    routes: ["/guided-build-adapter-blueprint", "/guided-build-risk-review", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-adapter-blueprint", label: "Previous Phase" },
      { href: "/guided-build-risk-review", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-risk-review": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-risk-review",
    phase: "Phase 1028",
    title: "Guided Build Risk Review",
    markerTitle: "Guided build risk review",
    safetyCopy: "Guided build risk review does not approve risk",
    approvalCopy: "Risk review requires explicit operator approval",
    supportCopy: "Risk reviews gate model spend remote calls privacy and tool use",
    deniedCopy: "Denied guided build risk paths remain blocked",
    checklistLabel: "Guided build risk checklist",
    subtitle: "Review risk gates for spend, privacy, remote calls, and tool use without approving them automatically.",
    primaryLabel: "Review risk gates",
    groupLabel: "Risk review fields",
    previewFocus: "risk review, model spend gate, remote call gate, privacy class, tool-use gate, denied risk approval state, and operator decision state",
    language: GUIDED_BUILD_RISK_REVIEW_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "risk review, model spend gate, remote call gate, privacy class, tool-use gate, denied risk approval state, and operator decision state"],
    routes: ["/guided-build-validation-blueprint", "/guided-build-approval-queue", "/guided-build-approval-queue"],
    links: [
      { href: "/guided-build-validation-blueprint", label: "Previous Phase" },
      { href: "/guided-build-approval-queue", label: "Next Phase" },
      { href: "/guided-build-approval-queue", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-approval-queue": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-approval-queue",
    phase: "Phase 1029",
    title: "Guided Build Approval Queue",
    markerTitle: "Guided build approval queue",
    safetyCopy: "Guided build approval queue does not approve actions",
    approvalCopy: "Approval queue decisions require explicit operator approval",
    supportCopy: "Approval queues list every gated model backend and domain action",
    deniedCopy: "Denied guided build approval queue paths remain blocked",
    checklistLabel: "Guided build approval queue checklist",
    subtitle: "Review queued approval gates without granting, persisting, or automating approval decisions.",
    primaryLabel: "Review approval queue",
    groupLabel: "Approval queue fields",
    previewFocus: "approval queue, model gates, backend gates, domain gates, denied automatic approval state, and operator decision state",
    language: GUIDED_BUILD_APPROVAL_QUEUE_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "approval queue, model gates, backend gates, domain gates, denied automatic approval state, and operator decision state"],
    routes: ["/guided-build-risk-review", "/guided-build-evidence-plan", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-risk-review", label: "Previous Phase" },
      { href: "/guided-build-evidence-plan", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-evidence-plan": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-evidence-plan",
    phase: "Phase 1030",
    title: "Guided Build Evidence Plan",
    markerTitle: "Guided build evidence plan",
    safetyCopy: "Guided build evidence plan does not persist evidence",
    approvalCopy: "Evidence plan review requires explicit operator approval",
    supportCopy: "Evidence plans route outputs through shared evidence review",
    deniedCopy: "Denied guided build evidence paths remain blocked",
    checklistLabel: "Guided build evidence checklist",
    subtitle: "Review evidence plans without capturing, ingesting, storing, or promoting evidence automatically.",
    primaryLabel: "Review evidence plan",
    groupLabel: "Evidence plan fields",
    previewFocus: "evidence plan, evidence review route, capture denial, persistence denial, shared evidence gate, and operator decision state",
    language: GUIDED_BUILD_EVIDENCE_PLAN_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "evidence plan, evidence review route, capture denial, persistence denial, shared evidence gate, and operator decision state"],
    routes: ["/guided-build-approval-queue", "/guided-build-result-plan", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-approval-queue", label: "Previous Phase" },
      { href: "/guided-build-result-plan", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "guided-build-result-plan": buildGuidedBuildWorkflowDefinition({
    slug: "guided-build-result-plan",
    phase: "Phase 1031",
    title: "Guided Build Result Plan",
    markerTitle: "Guided build result plan",
    safetyCopy: "Guided build result plan does not persist results",
    approvalCopy: "Result plan review requires explicit operator approval",
    supportCopy: "Result plans route outputs through shared result review",
    deniedCopy: "Denied guided build result paths remain blocked",
    checklistLabel: "Guided build result checklist",
    subtitle: "Review result plans without storing outputs, reusing results, or promoting memory automatically.",
    primaryLabel: "Review result plan",
    groupLabel: "Result plan fields",
    previewFocus: "result plan, result review route, output storage denial, shared result gate, memory promotion denial, and operator decision state",
    language: GUIDED_BUILD_RESULT_PLAN_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "result plan, result review route, output storage denial, shared result gate, memory promotion denial, and operator decision state"],
    routes: ["/guided-build-evidence-plan", "/first-practical-guided-build-candidate", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-evidence-plan", label: "Previous Phase" },
      { href: "/first-practical-guided-build-candidate", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "first-practical-guided-build-candidate": buildGuidedBuildWorkflowDefinition({
    slug: "first-practical-guided-build-candidate",
    phase: "Phase 1032",
    title: "First Practical Guided Build Candidate",
    markerTitle: "First practical guided build candidate",
    safetyCopy: "First practical guided build candidate does not execute builds",
    approvalCopy: "Practical guided build candidates require explicit operator approval",
    supportCopy: "Candidate packets combine goal requirements architecture files commands runtimes adapters validation risk approvals evidence and results",
    deniedCopy: "Denied practical guided build candidate paths remain blocked",
    checklistLabel: "First practical guided build checklist",
    subtitle: "Review the first practical guided build candidate packet without executing builds or running adapters.",
    primaryLabel: "Review practical candidate",
    groupLabel: "Practical candidate fields",
    previewFocus: "combined packet with goal, requirements, architecture, files, commands, runtimes, adapters, validation, risk, approvals, evidence, results, denied execution, and operator decision state",
    language: FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "combined packet with goal, requirements, architecture, files, commands, runtimes, adapters, validation, risk, approvals, evidence, results, denied execution, and operator decision state"],
    routes: ["/guided-build-result-plan", "/controlled-guided-build-workflow-release-candidate", "/guided-build-risk-review"],
    links: [
      { href: "/guided-build-result-plan", label: "Previous Phase" },
      { href: "/controlled-guided-build-workflow-release-candidate", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "controlled-guided-build-workflow-release-candidate": buildGuidedBuildWorkflowDefinition({
    slug: "controlled-guided-build-workflow-release-candidate",
    phase: "Phase 1033",
    title: "Controlled Guided Build Workflow Release Candidate",
    markerTitle: "Controlled guided build workflow release candidate",
    safetyCopy: "Controlled guided build workflow release candidate does not call models or execute adapters",
    approvalCopy: "Controlled guided build release requires explicit operator approval",
    supportCopy: "Release candidate supports build anything goals with shared brain gates",
    deniedCopy: "Denied controlled guided build workflow paths remain blocked",
    checklistLabel: "Controlled guided build workflow release checklist",
    subtitle: "Review the controlled guided build workflow release candidate without model calls, provider calls, or adapter execution.",
    primaryLabel: "Review guided build RC",
    groupLabel: "Release candidate fields",
    previewFocus: "release candidate packet, broad target support, shared brain gates, model routing policy, backend/domain adapter gates, evidence, result, audit, approval, denied execution, and operator decision state",
    language: CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE,
    fieldItems: ["raw goal", "clarified goal", "target family", "requirement checklist", "architecture sketch", "file blueprint", "command blueprint", "runtime blueprint", "adapter blueprint", "validation blueprint", "risk review", "approval queue", "evidence plan", "result plan", "denied live execution state", "operator decision state", "release candidate packet, broad target support, shared brain gates, model routing policy, backend/domain adapter gates, evidence, result, audit, approval, denied execution, and operator decision state"],
    routes: ["/first-practical-guided-build-candidate", "/guided-build-workflow-boundary", "/guided-build-risk-review"],
    links: [
      { href: "/first-practical-guided-build-candidate", label: "Previous Phase" },
      { href: "/guided-build-workflow-boundary", label: "Next Phase" },
      { href: "/guided-build-risk-review", label: "Risk Review" },
    ],
    nextRecommendedAction: "Review the next guided build workflow packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
};

export function buildGuidedBuildWorkflowReview(slug: GuidedBuildWorkflowReviewSlug, input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket(slug, input);
}
export function buildGuidedBuildWorkflowReviewAdvancedDetails(title: string, language: readonly string[], details: readonly string[]): string {
  return buildControlledBuilderReviewAdvancedDetails(title, language, [...details, ...GUIDED_BUILD_WORKFLOW_PREVIEW_SAFETY_MARKERS]);
}
export function buildGuidedBuildWorkflowReviewSections(...sections: DailyBetaOneReleaseReviewSection[]): DailyBetaOneReleaseReviewSection[] {
  return buildControlledBuilderReviewSections(...sections);
}
export function buildGuidedBuildWorkflowReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}
export function getGuidedBuildWorkflowReviewDefinition(slug: GuidedBuildWorkflowReviewSlug) {
  return GUIDED_BUILD_WORKFLOW_DEFINITIONS[slug];
}
export function buildGuidedBuildWorkflowReviewPackets(slug: GuidedBuildWorkflowReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getGuidedBuildWorkflowReviewDefinition(slug);
  const sections = buildGuidedBuildWorkflowReviewSections(
    { label: definition.groupLabel, items: [definition.groupLabel + ": " + joinSentence(definition.fieldItems) + "."] },
    { label: definition.checklistLabel, items: [definition.checklistLabel + ": " + joinSentence(GUIDED_BUILD_WORKFLOW_PACKET_FIELDS) + "."] },
    { label: "Supported target families", items: ["Supported target families: " + joinSentence(SUPPORTED_GUIDED_BUILD_TARGET_FAMILIES) + "."] },
    { label: "Model router policy", items: ["Cheapest capable model wins if safe; local model preferred for private files, codebases, sensitive plans, local workspace context, and local game/server config; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for games/research/creative/trading/coding/automation."] },
    { label: "Backend adapter policy", items: ["Backend adapter proposals remain preview-only, name their approval gate, and return through shared evidence/result review after explicit operator approval."] },
    { label: "Domain adapter policy", items: ["Game, app, website, dashboard, tool, research, automation, creative, trading, data, documentation, integration, and general project adapter proposals remain preview-only until explicit operator approval."] },
    { label: "Denied live execution state", items: [definition.deniedCopy, definition.safetyCopy] },
    { label: "Operator approval state", items: [definition.approvalCopy, "All real execution requires explicit operator approval."] }
  );
  return [buildGuidedBuildWorkflowReview(slug, { idHint: slug, status: "blocked", identity: definition.identity, sections, routes: [...definition.routes], nextRecommendedAction: "What this unlocks next: " + definition.nextRecommendedAction, advancedDetails: buildGuidedBuildWorkflowReviewAdvancedDetails(definition.slug, definition.language, definition.advancedDetails) })];
}
export function summarizeGuidedBuildWorkflowReview(title: string, packets: readonly UniversalExecutionReviewPacket[], approvalCopy: string): string {
  return summarizeControlledBuilderReview(title, packets, approvalCopy);
}
export function summarizeGuidedBuildWorkflowReviewForSlug(slug: GuidedBuildWorkflowReviewSlug, packets: readonly UniversalExecutionReviewPacket[]): string {
  const definition = getGuidedBuildWorkflowReviewDefinition(slug);
  return summarizeGuidedBuildWorkflowReview(definition.title, packets, definition.approvalCopy);
}
export function buildGuidedBuildWorkflowReviewModelForSlug(slug: GuidedBuildWorkflowReviewSlug, packets = buildGuidedBuildWorkflowReviewPackets(slug)) {
  const definition = getGuidedBuildWorkflowReviewDefinition(slug);
  return buildControlledBuilderReviewModel({ phase: definition.phase, title: definition.title, summary: summarizeGuidedBuildWorkflowReviewForSlug(slug, packets), subtitle: definition.subtitle, primaryLabel: definition.primaryLabel, anchor: definition.slug, plainEnglishTitle: definition.plainEnglishTitle, plainEnglishCopy: definition.plainEnglishCopy, language: [...definition.language], markers: [...definition.language, ...GUIDED_BUILD_WORKFLOW_PREVIEW_SAFETY_MARKERS], links: [...definition.links], packets, advancedSummary: "Advanced " + definition.title + " details", advancedDetails: [...definition.advancedDetails, ...GUIDED_BUILD_WORKFLOW_PREVIEW_SAFETY_MARKERS], advancedCopy: definition.advancedCopy, dataScope: definition.dataScope });
}
