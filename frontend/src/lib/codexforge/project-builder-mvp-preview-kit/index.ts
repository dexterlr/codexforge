import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  buildControlledBuilderReviewStableKey as buildProjectBuilderMvpReviewStableKey,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";
import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export { buildProjectBuilderMvpReviewStableKey };

export type ProjectBuilderMvpReviewPacketInput = ControlledBuilderReviewPacketInput;

export type ProjectBuilderMvpReviewSlug =
  | "project-builder-mvp-integration-boundary"
  | "project-goal-intake-packet"
  | "project-domain-classifier-preview"
  | "project-plan-model-routing-preview"
  | "project-file-plan-preview"
  | "project-command-plan-preview"
  | "project-runtime-plan-preview"
  | "project-evidence-plan-preview"
  | "project-result-plan-preview"
  | "project-recovery-plan-preview"
  | "project-packaging-plan-preview"
  | "project-approval-plan-preview"
  | "project-builder-operator-review"
  | "first-useful-project-builder-candidate"
  | "project-builder-mvp-trial-packet"
  | "controlled-project-builder-release-candidate";

type ProjectBuilderMvpDefinition = {
  slug: ProjectBuilderMvpReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  previewFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  summarySubject: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  identity: string;
  advancedDetails: readonly string[];
  advancedCopy: string;
  dataScope: string;
};

export const PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_LANGUAGE = [
  "Project builder MVP integration boundary",
  "Project builder MVP integration boundary does not execute projects",
  "Project builder execution requires explicit operator approval",
  "Project builder combines model routing and backend adapter review",
  "Denied project builder integration paths remain blocked",
  "Project builder integration checklist",
  "static project-builder review-only MVP integration boundary",
  "approval required",
] as const;

export const PROJECT_GOAL_INTAKE_PACKET_LANGUAGE = [
  "Project goal intake packet",
  "Project goal intake packet does not send prompts",
  "Goal intake requires explicit operator approval",
  "Goal packets preserve shared CodexForge brain context",
  "Denied project goal intake paths remain blocked",
  "Project goal intake checklist",
  "static goal intake packet preview",
  "approval required",
] as const;

export const PROJECT_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE = [
  "Project domain classifier preview",
  "Project domain classifier preview does not call models",
  "Domain classification requires explicit operator approval",
  "Project domains drive model and adapter selection",
  "Denied project domain classification paths remain blocked",
  "Project domain classifier checklist",
  "static domain classifier preview",
  "approval required",
] as const;

export const PROJECT_PLAN_MODEL_ROUTING_PREVIEW_LANGUAGE = [
  "Project plan model-routing preview",
  "Project plan model-routing preview does not route live requests",
  "Project plan routing requires explicit operator approval",
  "Project plans explain model selection rationale",
  "Denied project plan routing paths remain blocked",
  "Project plan routing checklist",
  "static model-routing preview for project plans",
  "approval required",
] as const;

export const PROJECT_FILE_PLAN_PREVIEW_LANGUAGE = [
  "Project file plan preview",
  "Project file plan preview does not write files",
  "File planning requires explicit operator approval",
  "File plans include backend adapter review",
  "Denied project file plan paths remain blocked",
  "Project file plan checklist",
  "static file plan preview",
  "approval required",
] as const;

export const PROJECT_COMMAND_PLAN_PREVIEW_LANGUAGE = [
  "Project command plan preview",
  "Project command plan preview does not run commands",
  "Command planning requires explicit operator approval",
  "Command plans include backend adapter review",
  "Denied project command plan paths remain blocked",
  "Project command plan checklist",
  "static command plan preview",
  "approval required",
] as const;

export const PROJECT_RUNTIME_PLAN_PREVIEW_LANGUAGE = [
  "Project runtime plan preview",
  "Project runtime plan preview does not start runtimes",
  "Runtime planning requires explicit operator approval",
  "Runtime plans include backend adapter review",
  "Denied project runtime plan paths remain blocked",
  "Project runtime plan checklist",
  "static runtime plan preview",
  "approval required",
] as const;

export const PROJECT_EVIDENCE_PLAN_PREVIEW_LANGUAGE = [
  "Project evidence plan preview",
  "Project evidence plan preview does not persist evidence",
  "Evidence planning requires explicit operator approval",
  "Evidence plans route outputs to shared review",
  "Denied project evidence plan paths remain blocked",
  "Project evidence plan checklist",
  "static evidence plan preview",
  "approval required",
] as const;

export const PROJECT_RESULT_PLAN_PREVIEW_LANGUAGE = [
  "Project result plan preview",
  "Project result plan preview does not persist results",
  "Result planning requires explicit operator approval",
  "Result plans route outputs to shared review",
  "Denied project result plan paths remain blocked",
  "Project result plan checklist",
  "static result plan preview",
  "approval required",
] as const;

export const PROJECT_RECOVERY_PLAN_PREVIEW_LANGUAGE = [
  "Project recovery plan preview",
  "Project recovery plan preview does not trigger recovery",
  "Recovery planning requires explicit operator approval",
  "Recovery plans include failure and rollback strategy",
  "Denied project recovery plan paths remain blocked",
  "Project recovery plan checklist",
  "static recovery plan preview",
  "approval required",
] as const;

export const PROJECT_PACKAGING_PLAN_PREVIEW_LANGUAGE = [
  "Project packaging plan preview",
  "Project packaging plan preview does not package outputs",
  "Packaging planning requires explicit operator approval",
  "Packaging plans include export and artifact review",
  "Denied project packaging plan paths remain blocked",
  "Project packaging plan checklist",
  "static packaging plan preview",
  "approval required",
] as const;

export const PROJECT_APPROVAL_PLAN_PREVIEW_LANGUAGE = [
  "Project approval plan preview",
  "Project approval plan preview does not approve actions",
  "Project approval requires explicit operator approval",
  "Approval plans list every gated model and backend action",
  "Denied project approval plan paths remain blocked",
  "Project approval plan checklist",
  "static approval plan preview",
  "approval required",
] as const;

export const PROJECT_BUILDER_OPERATOR_REVIEW_LANGUAGE = [
  "Project builder operator review",
  "Project builder operator review does not execute actions",
  "Operator review requires explicit human approval",
  "Operator review checks goal plan risk budget and privacy",
  "Denied project builder review paths remain blocked",
  "Project builder operator review checklist",
  "static operator review packet",
  "approval required",
] as const;

export const FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_LANGUAGE = [
  "First useful project builder candidate",
  "First useful project builder candidate does not execute projects",
  "Project builder candidates require explicit operator approval",
  "Candidate packets combine goal model routing and backend plans",
  "Denied useful project builder candidate paths remain blocked",
  "First useful project builder checklist",
  "static first useful candidate packet",
  "approval required",
] as const;

export const PROJECT_BUILDER_MVP_TRIAL_PACKET_LANGUAGE = [
  "Project builder MVP trial packet",
  "Project builder MVP trial packet does not run trials",
  "Project builder trials require explicit operator approval",
  "Trial packets preserve shared context memory evidence and audit gates",
  "Denied project builder trial paths remain blocked",
  "Project builder MVP trial checklist",
  "static MVP trial packet preview",
  "approval required",
] as const;

export const CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled project builder release candidate",
  "Controlled project builder release candidate does not call models or execute adapters",
  "Controlled project builder release requires explicit operator approval",
  "Release candidate preserves model routing backend adapter and shared brain gates",
  "Denied controlled project builder release paths remain blocked",
  "Controlled project builder release checklist",
  "static controlled project-builder release candidate",
  "approval required",
] as const;

export const PROJECT_BUILDER_MVP_PREVIEW_SAFETY_MARKERS = [
  "project-builder static review-only preview",
  "deterministic static review content",
  "static project-builder packet preview",
  "review-only",
  "preview-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "clear denied-path copy",
  "clear operator approval copy",
  "no project execution",
  "no project scaffold creation",
  "no scaffold project creation",
  "no file write/delete/mutation",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no local runtime start",
  "no local runtime start/stop",
  "no runtime probing",
  "no local runtime probes",
  "no provider/model calls",
  "no model calls",
  "no provider calls",
  "no prompt sending",
  "no prompts sent remotely",
  "no provider connection tests",
  "no live provider connection tests",
  "no network calls",
  "no credit spend",
  "no API key reads",
  "no secret reads",
  "no credential reads",
  "no credential storage",
  "no browser credential storage",
  "no model output persistence",
  "no output/result storage or reuse",
  "no evidence capture/ingestion/storage",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no packaging/scaffold execution",
  "no backend adapter execution",
  "no backend adapter run",
  "no hidden approvals",
  "no approval shortcuts",
  "no automatic memory promotion",
  "no live memory reads",
  "no live knowledge queries",
  "no audit record writes",
  "no model routing execution",
  "no live request routing",
  "no paid model calls",
  "no free model calls",
  "no local model calls",
  "no remote model calls",
  "no specialist model calls",
  "no specialist image/video/coding/research/trading/game-server model calls",
  "Models are workers not isolated brains",
] as const;

const PROJECT_BUILDER_PACKET_FIELDS = [
  "high-level goal",
  "inferred domain",
  "selected model class",
  "model routing rationale",
  "shared context packet",
  "file plan",
  "command plan",
  "runtime plan",
  "evidence plan",
  "result plan",
  "recovery plan",
  "packaging plan",
  "approval gates",
  "risk class",
  "denied live execution state",
  "operator review state",
] as const;

const SUPPORTED_EXAMPLE_DOMAINS = [
  "general project",
  "coding app/site/tool",
  "Minecraft/game-server",
  "research project",
  "video/creative project",
  "trading workspace",
  "automation workflow",
  "design/marketing/deck",
  "local runtime/tooling project",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildProjectBuilderDefinition(input: {
  slug: ProjectBuilderMvpReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  previewFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
}): ProjectBuilderMvpDefinition {
  const packetFields = `Future project-builder packet fields: ${sentenceList(PROJECT_BUILDER_PACKET_FIELDS)}.`;
  const supportedDomains = `Supported example domains: ${sentenceList(SUPPORTED_EXAMPLE_DOMAINS)}.`;
  const projectBuilderBoundary =
    "Project-builder MVP boundary: CodexForge accepts high-level goals and represents a review-only packet that can later become a plan, file plan, command plan, runtime plan, evidence plan, result plan, recovery plan, packaging plan, and approval plan. No prompt is sent, no model is called, no provider is called, no project files are written, no commands run, no runtimes start, no evidence or results persist, no recovery triggers, no packaging occurs, and no project scaffold is created.";
  const sharedBrainBoundary =
    "Shared CodexForge brain boundary: all paid/free/local/remote/OpenAI-compatible/specialist model workers share one CodexForge brain, memory, knowledge, evidence, result, audit, and approval layer. Models are workers. CodexForge is the brain. Memory promotion requires explicit operator approval. Model outputs, when future approved, return through shared evidence and result review rather than isolated model memory.";
  const modelRouterBoundary =
    "Model-router preview rules: cheapest capable model wins if safe; local model preferred for sensitive/codebase/private context; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification; all routing rationale stays static and review-only until explicit operator approval.";
  const backendAdapterBoundary =
    "Backend adapter preview rules: file-write proposals remain preview-only; command proposals remain preview-only; runtime proposals remain preview-only; evidence/result proposals remain preview-only; recovery proposals remain preview-only; packaging/scaffold proposals remain preview-only; all real execution requires explicit operator approval.";
  const deniedBoundary =
    `${input.safetyCopy}. ${input.deniedCopy}. Denied live execution state is blocked for model calls, provider calls, provider connection tests, local runtime probes, API key reads, secret reads, credential storage, prompt sending, credit spend, file writes, command execution, runtime startup, evidence persistence, result persistence, recovery triggers, packaging, project scaffolding, backend adapter execution, model output persistence, automatic memory promotion, hidden approvals, browser credential storage, audit writes, network calls, and live request routing.`;
  const checklistCopy =
    `${input.checklistLabel}: goal clarity, inferred domain, selected model class, model routing rationale, shared context packet, file plan, command plan, runtime plan, evidence plan, result plan, recovery plan, packaging plan, approval gates, risk class, denied live execution state, operator review state, adapter review, audit note, privacy note, cost note, and recovery note.`;
  const fieldLine = `Static preview focus fields: ${sentenceList(input.fieldItems)}.`;

  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    markerTitle: input.markerTitle,
    safetyCopy: input.safetyCopy,
    approvalCopy: input.approvalCopy,
    deniedCopy: input.deniedCopy,
    groupLabel: input.groupLabel,
    checklistLabel: input.checklistLabel,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    language: input.language,
    fieldItems: input.fieldItems,
    previewFocus: input.previewFocus,
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: input.nextRecommendedAction,
    summarySubject: input.title,
    plainEnglishTitle: `Plain-English ${input.title.toLowerCase()}`,
    plainEnglishCopy: `${input.markerTitle}. ${deniedBoundary} ${input.approvalCopy} ${packetFields} ${supportedDomains} ${sharedBrainBoundary} ${modelRouterBoundary} ${backendAdapterBoundary} ${fieldLine} What this unlocks next: ${input.nextRecommendedAction}`,
    identity: `${input.title} identity: ${input.markerTitle}. ${input.safetyCopy}. ${input.approvalCopy} ${input.deniedCopy}. ${packetFields} ${sharedBrainBoundary} This is static project-builder preview-only review content, not executable from UI, approval required, and no live model, provider, adapter, file, command, runtime, evidence, result, recovery, packaging, or scaffold action is available.`,
    advancedDetails: [
      `${input.title} identity`,
      input.markerTitle,
      input.safetyCopy,
      input.approvalCopy,
      input.deniedCopy,
      packetFields,
      supportedDomains,
      `${input.groupLabel}: ${sentenceList(input.fieldItems)}.`,
      checklistCopy,
      `Preview focus: ${input.previewFocus}.`,
      projectBuilderBoundary,
      sharedBrainBoundary,
      modelRouterBoundary,
      backendAdapterBoundary,
      deniedBoundary,
      `Risk review: static risk class is high until the operator explicitly approves model routing and backend adapter execution.`,
      `Operator review state: blocked until explicit human approval confirms goal, plan, risk budget, privacy, evidence, result, recovery, packaging, and approvals.`,
      `What this unlocks next: ${input.nextRecommendedAction}`,
      ...PROJECT_BUILDER_MVP_PREVIEW_SAFETY_MARKERS,
    ],
    advancedCopy: `advanced ${input.slug} details collapsed/secondary. This route is static project-builder review-only preview content, preview-only, not executable from UI, and ${input.safetyCopy.toLowerCase()}.`,
    dataScope: `${input.slug} static project-builder MVP preview surface`,
  };
}

export const PROJECT_BUILDER_MVP_DEFINITIONS: Record<ProjectBuilderMvpReviewSlug, ProjectBuilderMvpDefinition> = {
  "project-builder-mvp-integration-boundary": buildProjectBuilderDefinition({
    slug: "project-builder-mvp-integration-boundary",
    phase: "Phase 954",
    title: "Project Builder MVP Integration Boundary",
    markerTitle: "Project builder MVP integration boundary",
    safetyCopy: "Project builder MVP integration boundary does not execute projects",
    approvalCopy: "Project builder execution requires explicit operator approval.",
    deniedCopy: "Denied project builder integration paths remain blocked",
    groupLabel: "Project builder combines model routing and backend adapter review",
    checklistLabel: "Project builder integration checklist",
    subtitle: "Review the Project Builder MVP Integration Boundary without model calls, provider calls, file writes, commands, runtimes, or backend adapter execution.",
    primaryLabel: "Review integration boundary",
    language: PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_LANGUAGE,
    fieldItems: ["goal packet", "domain packet", "model-routing packet", "adapter plan packets", "approval plan", "denied live execution state"],
    previewFocus: "the first useful project-builder integration boundary across goal intake, model routing, backend adapter plans, approval gates, and denied live execution state",
    routes: ["/controlled-backend-model-router-release-candidate", "/project-goal-intake-packet", "/project-approval-plan-preview"],
    links: [
      { href: "/controlled-backend-model-router-release-candidate", label: "Previous Phase" },
      { href: "/project-goal-intake-packet", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review goal intake packets before any model prompt, backend adapter proposal, project write, command, runtime, or scaffold can exist",
  }),
  "project-goal-intake-packet": buildProjectBuilderDefinition({
    slug: "project-goal-intake-packet",
    phase: "Phase 955",
    title: "Project Goal Intake Packet",
    markerTitle: "Project goal intake packet",
    safetyCopy: "Project goal intake packet does not send prompts",
    approvalCopy: "Goal intake requires explicit operator approval.",
    deniedCopy: "Denied project goal intake paths remain blocked",
    groupLabel: "Goal packets preserve shared CodexForge brain context",
    checklistLabel: "Project goal intake checklist",
    subtitle: "Review a static project goal intake packet without sending prompts or reading private context.",
    primaryLabel: "Review goal intake",
    language: PROJECT_GOAL_INTAKE_PACKET_LANGUAGE,
    fieldItems: ["high-level goal", "operator constraints", "privacy posture", "shared context packet", "risk class", "denied prompt-sending state"],
    previewFocus: "goal capture, operator constraints, shared context handoff, privacy posture, and denied prompt-sending state",
    routes: ["/project-builder-mvp-integration-boundary", "/project-domain-classifier-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-builder-mvp-integration-boundary", label: "Previous Phase" },
      { href: "/project-domain-classifier-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "classify the project domain from static intake fields while keeping prompts, providers, and context reads blocked",
  }),
  "project-domain-classifier-preview": buildProjectBuilderDefinition({
    slug: "project-domain-classifier-preview",
    phase: "Phase 956",
    title: "Project Domain Classifier Preview",
    markerTitle: "Project domain classifier preview",
    safetyCopy: "Project domain classifier preview does not call models",
    approvalCopy: "Domain classification requires explicit operator approval.",
    deniedCopy: "Denied project domain classification paths remain blocked",
    groupLabel: "Project domains drive model and adapter selection",
    checklistLabel: "Project domain classifier checklist",
    subtitle: "Review static project-domain classification options without live model calls.",
    primaryLabel: "Review domain classifier",
    language: PROJECT_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE,
    fieldItems: ["inferred domain", "domain confidence note", "domain risk", "adapter family hint", "model class hint", "denied model-call state"],
    previewFocus: "domain inference across general, coding, game-server, research, creative, trading, automation, design, and local runtime projects",
    routes: ["/project-goal-intake-packet", "/project-plan-model-routing-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-goal-intake-packet", label: "Previous Phase" },
      { href: "/project-plan-model-routing-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review model-routing rationale after the static domain signal is visible to the operator",
  }),
  "project-plan-model-routing-preview": buildProjectBuilderDefinition({
    slug: "project-plan-model-routing-preview",
    phase: "Phase 957",
    title: "Project Plan Model-Routing Preview",
    markerTitle: "Project plan model-routing preview",
    safetyCopy: "Project plan model-routing preview does not route live requests",
    approvalCopy: "Project plan routing requires explicit operator approval.",
    deniedCopy: "Denied project plan routing paths remain blocked",
    groupLabel: "Project plans explain model selection rationale",
    checklistLabel: "Project plan routing checklist",
    subtitle: "Review static model selection rationale for a project plan without routing live requests.",
    primaryLabel: "Review model routing",
    language: PROJECT_PLAN_MODEL_ROUTING_PREVIEW_LANGUAGE,
    fieldItems: ["selected model class", "routing rationale", "cost tier", "privacy/locality decision", "specialist fit", "denied live routing state"],
    previewFocus: "cheapest capable safe model selection, local preference, paid/pro justification, specialist justification, and denied live routing state",
    routes: ["/project-domain-classifier-preview", "/project-file-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-domain-classifier-preview", label: "Previous Phase" },
      { href: "/project-file-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review file-plan proposals with model rationale attached but no write path enabled",
  }),
  "project-file-plan-preview": buildProjectBuilderDefinition({
    slug: "project-file-plan-preview",
    phase: "Phase 958",
    title: "Project File Plan Preview",
    markerTitle: "Project file plan preview",
    safetyCopy: "Project file plan preview does not write files",
    approvalCopy: "File planning requires explicit operator approval.",
    deniedCopy: "Denied project file plan paths remain blocked",
    groupLabel: "File plans include backend adapter review",
    checklistLabel: "Project file plan checklist",
    subtitle: "Review static file-write proposals without writing, deleting, mutating, or scaffolding files.",
    primaryLabel: "Review file plan",
    language: PROJECT_FILE_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["file plan", "target path boundary", "write proposal", "rollback note", "adapter review", "denied file-write state"],
    previewFocus: "file-write preview proposals, path boundaries, rollback notes, backend adapter review, and denied write state",
    routes: ["/project-plan-model-routing-preview", "/project-command-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-plan-model-routing-preview", label: "Previous Phase" },
      { href: "/project-command-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review command proposals after file intent is visible and still blocked from mutation",
  }),
  "project-command-plan-preview": buildProjectBuilderDefinition({
    slug: "project-command-plan-preview",
    phase: "Phase 959",
    title: "Project Command Plan Preview",
    markerTitle: "Project command plan preview",
    safetyCopy: "Project command plan preview does not run commands",
    approvalCopy: "Command planning requires explicit operator approval.",
    deniedCopy: "Denied project command plan paths remain blocked",
    groupLabel: "Command plans include backend adapter review",
    checklistLabel: "Project command plan checklist",
    subtitle: "Review static command proposals without shell, git, test, build, smoke, or backend execution.",
    primaryLabel: "Review command plan",
    language: PROJECT_COMMAND_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["command plan", "command intent", "working directory note", "risk class", "adapter review", "denied command-execution state"],
    previewFocus: "command-runner preview proposals, command risk, working-directory notes, backend adapter review, and denied command state",
    routes: ["/project-file-plan-preview", "/project-runtime-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-file-plan-preview", label: "Previous Phase" },
      { href: "/project-runtime-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review runtime startup proposals while keeping local runtimes and probes disabled",
  }),
  "project-runtime-plan-preview": buildProjectBuilderDefinition({
    slug: "project-runtime-plan-preview",
    phase: "Phase 960",
    title: "Project Runtime Plan Preview",
    markerTitle: "Project runtime plan preview",
    safetyCopy: "Project runtime plan preview does not start runtimes",
    approvalCopy: "Runtime planning requires explicit operator approval.",
    deniedCopy: "Denied project runtime plan paths remain blocked",
    groupLabel: "Runtime plans include backend adapter review",
    checklistLabel: "Project runtime plan checklist",
    subtitle: "Review static runtime proposals without starting, probing, or controlling local runtimes.",
    primaryLabel: "Review runtime plan",
    language: PROJECT_RUNTIME_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["runtime plan", "runtime type", "port or process note", "health check placeholder", "adapter review", "denied runtime-start state"],
    previewFocus: "local-runtime preview proposals, runtime boundaries, health-check placeholders, backend adapter review, and denied runtime-start state",
    routes: ["/project-command-plan-preview", "/project-evidence-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-command-plan-preview", label: "Previous Phase" },
      { href: "/project-evidence-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review evidence capture plans with runtime and command behavior still blocked",
  }),
  "project-evidence-plan-preview": buildProjectBuilderDefinition({
    slug: "project-evidence-plan-preview",
    phase: "Phase 961",
    title: "Project Evidence Plan Preview",
    markerTitle: "Project evidence plan preview",
    safetyCopy: "Project evidence plan preview does not persist evidence",
    approvalCopy: "Evidence planning requires explicit operator approval.",
    deniedCopy: "Denied project evidence plan paths remain blocked",
    groupLabel: "Evidence plans route outputs to shared review",
    checklistLabel: "Project evidence plan checklist",
    subtitle: "Review static evidence planning without capturing, ingesting, storing, or persisting evidence.",
    primaryLabel: "Review evidence plan",
    language: PROJECT_EVIDENCE_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["evidence plan", "capture source placeholder", "redaction note", "review destination", "adapter review", "denied evidence-persistence state"],
    previewFocus: "evidence-store preview proposals, redaction notes, shared review routing, backend adapter review, and denied evidence state",
    routes: ["/project-runtime-plan-preview", "/project-result-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-runtime-plan-preview", label: "Previous Phase" },
      { href: "/project-result-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review result handling plans after evidence routing is visible and still blocked from persistence",
  }),
  "project-result-plan-preview": buildProjectBuilderDefinition({
    slug: "project-result-plan-preview",
    phase: "Phase 962",
    title: "Project Result Plan Preview",
    markerTitle: "Project result plan preview",
    safetyCopy: "Project result plan preview does not persist results",
    approvalCopy: "Result planning requires explicit operator approval.",
    deniedCopy: "Denied project result plan paths remain blocked",
    groupLabel: "Result plans route outputs to shared review",
    checklistLabel: "Project result plan checklist",
    subtitle: "Review static result handling without storing, reusing, or persisting project outputs.",
    primaryLabel: "Review result plan",
    language: PROJECT_RESULT_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["result plan", "acceptance criteria", "review destination", "reuse policy", "adapter review", "denied result-persistence state"],
    previewFocus: "result-store preview proposals, acceptance criteria, shared review routing, backend adapter review, and denied result state",
    routes: ["/project-evidence-plan-preview", "/project-recovery-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-evidence-plan-preview", label: "Previous Phase" },
      { href: "/project-recovery-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review recovery strategy while result persistence remains blocked",
  }),
  "project-recovery-plan-preview": buildProjectBuilderDefinition({
    slug: "project-recovery-plan-preview",
    phase: "Phase 963",
    title: "Project Recovery Plan Preview",
    markerTitle: "Project recovery plan preview",
    safetyCopy: "Project recovery plan preview does not trigger recovery",
    approvalCopy: "Recovery planning requires explicit operator approval.",
    deniedCopy: "Denied project recovery plan paths remain blocked",
    groupLabel: "Recovery plans include failure and rollback strategy",
    checklistLabel: "Project recovery plan checklist",
    subtitle: "Review static recovery and rollback strategy without triggering retries, rollbacks, or repair actions.",
    primaryLabel: "Review recovery plan",
    language: PROJECT_RECOVERY_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["recovery plan", "failure modes", "rollback strategy", "retry boundary", "adapter review", "denied recovery state"],
    previewFocus: "recovery preview proposals, failure strategy, rollback strategy, backend adapter review, and denied recovery state",
    routes: ["/project-result-plan-preview", "/project-packaging-plan-preview", "/project-approval-plan-preview"],
    links: [
      { href: "/project-result-plan-preview", label: "Previous Phase" },
      { href: "/project-packaging-plan-preview", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review packaging and export boundaries after recovery strategy is visible",
  }),
  "project-packaging-plan-preview": buildProjectBuilderDefinition({
    slug: "project-packaging-plan-preview",
    phase: "Phase 964",
    title: "Project Packaging Plan Preview",
    markerTitle: "Project packaging plan preview",
    safetyCopy: "Project packaging plan preview does not package outputs",
    approvalCopy: "Packaging planning requires explicit operator approval.",
    deniedCopy: "Denied project packaging plan paths remain blocked",
    groupLabel: "Packaging plans include export and artifact review",
    checklistLabel: "Project packaging plan checklist",
    subtitle: "Review static package/export proposals without creating archives, exports, artifacts, or scaffolds.",
    primaryLabel: "Review packaging plan",
    language: PROJECT_PACKAGING_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["packaging plan", "artifact scope", "export boundary", "retention note", "adapter review", "denied packaging state"],
    previewFocus: "packaging preview proposals, artifact scope, export boundary, backend adapter review, and denied packaging state",
    routes: ["/project-recovery-plan-preview", "/project-approval-plan-preview", "/project-builder-operator-review"],
    links: [
      { href: "/project-recovery-plan-preview", label: "Previous Phase" },
      { href: "/project-approval-plan-preview", label: "Next Phase" },
      { href: "/project-builder-operator-review", label: "Operator Review" },
    ],
    nextRecommendedAction: "review every approval gate before any model route or backend adapter action can be considered",
  }),
  "project-approval-plan-preview": buildProjectBuilderDefinition({
    slug: "project-approval-plan-preview",
    phase: "Phase 965",
    title: "Project Approval Plan Preview",
    markerTitle: "Project approval plan preview",
    safetyCopy: "Project approval plan preview does not approve actions",
    approvalCopy: "Project approval requires explicit operator approval.",
    deniedCopy: "Denied project approval plan paths remain blocked",
    groupLabel: "Approval plans list every gated model and backend action",
    checklistLabel: "Project approval plan checklist",
    subtitle: "Review static approval gates without approving model calls, providers, adapters, files, commands, runtimes, evidence, results, recovery, packaging, or scaffolds.",
    primaryLabel: "Review approval plan",
    language: PROJECT_APPROVAL_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["approval gates", "gated model actions", "gated backend actions", "risk budget", "human approval note", "denied approval state"],
    previewFocus: "approval gate preview across model routing, provider use, backend adapters, file writes, commands, runtimes, evidence, results, recovery, packaging, and scaffolding",
    routes: ["/project-packaging-plan-preview", "/project-builder-operator-review", "/project-builder-mvp-integration-boundary"],
    links: [
      { href: "/project-packaging-plan-preview", label: "Previous Phase" },
      { href: "/project-builder-operator-review", label: "Next Phase" },
      { href: "/project-builder-mvp-integration-boundary", label: "Integration Boundary" },
    ],
    nextRecommendedAction: "send the complete packet to operator review with all live actions still denied",
  }),
  "project-builder-operator-review": buildProjectBuilderDefinition({
    slug: "project-builder-operator-review",
    phase: "Phase 966",
    title: "Project Builder Operator Review",
    markerTitle: "Project builder operator review",
    safetyCopy: "Project builder operator review does not execute actions",
    approvalCopy: "Operator review requires explicit human approval.",
    deniedCopy: "Denied project builder review paths remain blocked",
    groupLabel: "Operator review checks goal plan risk budget and privacy",
    checklistLabel: "Project builder operator review checklist",
    subtitle: "Review the complete project-builder packet before any future action can be approved.",
    primaryLabel: "Review operator gate",
    language: PROJECT_BUILDER_OPERATOR_REVIEW_LANGUAGE,
    fieldItems: ["operator review state", "goal review", "plan review", "risk budget", "privacy review", "denied action state"],
    previewFocus: "human operator review of goal, domain, model routing, adapter plans, risk budget, privacy, and denied actions",
    routes: ["/project-approval-plan-preview", "/first-useful-project-builder-candidate", "/project-builder-mvp-integration-boundary"],
    links: [
      { href: "/project-approval-plan-preview", label: "Previous Phase" },
      { href: "/first-useful-project-builder-candidate", label: "Next Phase" },
      { href: "/project-builder-mvp-integration-boundary", label: "Integration Boundary" },
    ],
    nextRecommendedAction: "combine the reviewed goal, model routing, and backend plans into the first useful candidate packet",
  }),
  "first-useful-project-builder-candidate": buildProjectBuilderDefinition({
    slug: "first-useful-project-builder-candidate",
    phase: "Phase 967",
    title: "First Useful Project Builder Candidate",
    markerTitle: "First useful project builder candidate",
    safetyCopy: "First useful project builder candidate does not execute projects",
    approvalCopy: "Project builder candidates require explicit operator approval.",
    deniedCopy: "Denied useful project builder candidate paths remain blocked",
    groupLabel: "Candidate packets combine goal model routing and backend plans",
    checklistLabel: "First useful project builder checklist",
    subtitle: "Review the first useful project-builder candidate packet without executing or scaffolding projects.",
    primaryLabel: "Review first candidate",
    language: FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_LANGUAGE,
    fieldItems: ["candidate goal", "candidate domain", "candidate model routing", "candidate backend plans", "candidate approval gates", "denied execution state"],
    previewFocus: "combined goal, domain, model routing, file, command, runtime, evidence, result, recovery, packaging, and approval preview packet",
    routes: ["/project-builder-operator-review", "/project-builder-mvp-trial-packet", "/project-approval-plan-preview"],
    links: [
      { href: "/project-builder-operator-review", label: "Previous Phase" },
      { href: "/project-builder-mvp-trial-packet", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review an MVP trial packet while keeping trials, models, providers, and backend adapters blocked",
  }),
  "project-builder-mvp-trial-packet": buildProjectBuilderDefinition({
    slug: "project-builder-mvp-trial-packet",
    phase: "Phase 968",
    title: "Project Builder MVP Trial Packet",
    markerTitle: "Project builder MVP trial packet",
    safetyCopy: "Project builder MVP trial packet does not run trials",
    approvalCopy: "Project builder trials require explicit operator approval.",
    deniedCopy: "Denied project builder trial paths remain blocked",
    groupLabel: "Trial packets preserve shared context memory evidence and audit gates",
    checklistLabel: "Project builder MVP trial checklist",
    subtitle: "Review a static MVP trial packet without running trials, providers, models, runtimes, commands, or adapters.",
    primaryLabel: "Review MVP trial packet",
    language: PROJECT_BUILDER_MVP_TRIAL_PACKET_LANGUAGE,
    fieldItems: ["trial goal", "trial routing", "trial adapter plans", "shared context memory evidence audit gates", "operator approval", "denied trial state"],
    previewFocus: "trial packet review preserving shared context, memory, evidence, audit, model routing, backend adapter plans, and denied trial state",
    routes: ["/first-useful-project-builder-candidate", "/controlled-project-builder-release-candidate", "/project-approval-plan-preview"],
    links: [
      { href: "/first-useful-project-builder-candidate", label: "Previous Phase" },
      { href: "/controlled-project-builder-release-candidate", label: "Next Phase" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "review the controlled release candidate with every model and backend adapter gate still denied",
  }),
  "controlled-project-builder-release-candidate": buildProjectBuilderDefinition({
    slug: "controlled-project-builder-release-candidate",
    phase: "Phase 969",
    title: "Controlled Project Builder Release Candidate",
    markerTitle: "Controlled project builder release candidate",
    safetyCopy: "Controlled project builder release candidate does not call models or execute adapters",
    approvalCopy: "Controlled project builder release requires explicit operator approval.",
    deniedCopy: "Denied controlled project builder release paths remain blocked",
    groupLabel: "Release candidate preserves model routing backend adapter and shared brain gates",
    checklistLabel: "Controlled project builder release checklist",
    subtitle: "Review the controlled project-builder release candidate without model calls, provider calls, backend adapter execution, file writes, commands, runtimes, evidence, results, recovery, packaging, or scaffolds.",
    primaryLabel: "Review project-builder RC",
    language: CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE,
    fieldItems: ["release candidate goal", "release candidate domain", "release candidate model routing", "release candidate backend plans", "shared brain gates", "denied release state"],
    previewFocus: "release candidate review preserving model routing, backend adapter review, shared brain gates, memory, knowledge, evidence, result, audit, approval, and denied live execution state",
    routes: ["/project-builder-mvp-trial-packet", "/project-builder-mvp-integration-boundary", "/project-approval-plan-preview"],
    links: [
      { href: "/project-builder-mvp-trial-packet", label: "Previous Phase" },
      { href: "/project-builder-mvp-integration-boundary", label: "Integration Boundary" },
      { href: "/project-approval-plan-preview", label: "Approval Plan" },
    ],
    nextRecommendedAction: "keep the project-builder MVP release blocked until every packet, route, smoke, approval gate, and denied path is reviewed by the operator",
  }),
};

export function buildProjectBuilderMvpReview(
  slug: ProjectBuilderMvpReviewSlug,
  input: ProjectBuilderMvpReviewPacketInput
): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket(slug, input);
}

export function buildProjectBuilderMvpReviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildControlledBuilderReviewAdvancedDetails(title, language, [...details, ...PROJECT_BUILDER_MVP_PREVIEW_SAFETY_MARKERS]);
}

export function buildProjectBuilderMvpReviewSections(
  ...sections: DailyBetaOneReleaseReviewSection[]
): DailyBetaOneReleaseReviewSection[] {
  return buildControlledBuilderReviewSections(...sections);
}

export function buildProjectBuilderMvpReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function getProjectBuilderMvpReviewDefinition(slug: ProjectBuilderMvpReviewSlug) {
  return PROJECT_BUILDER_MVP_DEFINITIONS[slug];
}

export function buildProjectBuilderMvpReviewPackets(slug: ProjectBuilderMvpReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getProjectBuilderMvpReviewDefinition(slug);
  const sections = buildProjectBuilderMvpReviewSections(
    { label: definition.groupLabel, items: [`${definition.groupLabel}: ${sentenceList(definition.fieldItems)}.`] },
    { label: definition.checklistLabel, items: [`${definition.checklistLabel}: ${sentenceList(PROJECT_BUILDER_PACKET_FIELDS)}.`] },
    { label: "Supported example domains", items: [`Supported example domains: ${sentenceList(SUPPORTED_EXAMPLE_DOMAINS)}.`] },
    { label: "Model-router policy", items: ["Cheapest capable model wins if safe; local model preferred for sensitive/codebase/private context; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification."] },
    { label: "Backend adapter policy", items: ["File-write, command, runtime, evidence, result, recovery, packaging, and scaffold proposals remain preview-only until explicit operator approval."] },
    { label: "Denied live execution state", items: [definition.deniedCopy, definition.safetyCopy] },
    { label: "Operator approval state", items: [definition.approvalCopy, "All real execution requires explicit operator approval."] }
  );

  return [
    buildProjectBuilderMvpReview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections,
      routes: [...definition.routes],
      nextRecommendedAction: `What this unlocks next: ${definition.nextRecommendedAction}`,
      advancedDetails: buildProjectBuilderMvpReviewAdvancedDetails(definition.slug, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeProjectBuilderMvpReview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeControlledBuilderReview(title, packets, approvalCopy);
}

export function summarizeProjectBuilderMvpReviewForSlug(
  slug: ProjectBuilderMvpReviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getProjectBuilderMvpReviewDefinition(slug);
  return summarizeProjectBuilderMvpReview(definition.title, packets, definition.approvalCopy);
}

export function buildProjectBuilderMvpReviewModelForSlug(
  slug: ProjectBuilderMvpReviewSlug,
  packets = buildProjectBuilderMvpReviewPackets(slug)
) {
  const definition = getProjectBuilderMvpReviewDefinition(slug);
  return buildControlledBuilderReviewModel({
    phase: definition.phase,
    title: definition.title,
    summary: summarizeProjectBuilderMvpReviewForSlug(slug, packets),
    subtitle: definition.subtitle,
    primaryLabel: definition.primaryLabel,
    anchor: definition.slug,
    plainEnglishTitle: definition.plainEnglishTitle,
    plainEnglishCopy: definition.plainEnglishCopy,
    language: [...definition.language],
    markers: [...definition.language, ...PROJECT_BUILDER_MVP_PREVIEW_SAFETY_MARKERS],
    links: [...definition.links],
    packets,
    advancedSummary: `Advanced ${definition.title} details`,
    advancedDetails: [...definition.advancedDetails, ...PROJECT_BUILDER_MVP_PREVIEW_SAFETY_MARKERS],
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
