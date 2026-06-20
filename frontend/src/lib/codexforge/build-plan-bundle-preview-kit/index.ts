import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  buildControlledBuilderReviewStableKey as buildBuildPlanBundleReviewStableKey,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";
import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export { buildBuildPlanBundleReviewStableKey };
export * from "./BuildPlanBundleReviewPhasePanels";

export type BuildPlanBundleReviewPacketInput = ControlledBuilderReviewPacketInput;

export type BuildPlanBundleReviewSlug =
  | "build-plan-bundle-boundary"
  | "build-plan-summary-packet"
  | "build-plan-requirements-packet"
  | "build-plan-architecture-packet"
  | "build-plan-file-manifest-packet"
  | "build-plan-command-manifest-packet"
  | "build-plan-runtime-manifest-packet"
  | "build-plan-adapter-manifest-packet"
  | "build-plan-validation-manifest-packet"
  | "build-plan-risk-manifest-packet"
  | "build-plan-approval-manifest-packet"
  | "build-plan-evidence-manifest-packet"
  | "build-plan-result-manifest-packet"
  | "build-plan-recovery-manifest-packet"
  | "first-complete-build-plan-candidate"
  | "controlled-build-plan-bundle-release-candidate"
  | BuildPlanApprovalReviewSlug;

export type BuildPlanApprovalReviewSlug =
  | "build-plan-approval-boundary"
  | "build-plan-approval-queue"
  | "build-plan-approval-detail-packet"
  | "build-plan-approval-diff-preview"
  | "build-plan-approval-command-preview"
  | "build-plan-approval-runtime-preview"
  | "build-plan-approval-adapter-preview"
  | "build-plan-approval-risk-gate"
  | "build-plan-approval-evidence-gate"
  | "build-plan-approval-result-gate"
  | "build-plan-approval-recovery-gate"
  | "build-plan-ready-to-execute-packet"
  | "build-plan-execution-hold-state"
  | "build-plan-operator-signoff-packet"
  | "first-approved-build-plan-candidate"
  | "controlled-build-plan-approval-release-candidate";

type BuildPlanBundleDefinition = {
  slug: BuildPlanBundleReviewSlug;
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

export const BUILD_PLAN_BUNDLE_BOUNDARY_LANGUAGE = [
  "Build plan bundle boundary",
  "Build plan bundle boundary does not execute builds",
  "Build plan bundle execution requires explicit operator approval",
  "Build plan bundles support game and non-game targets",
  "Denied build plan bundle paths remain blocked",
  "Build plan bundle checklist",
  "static build-plan-bundle-boundary preview",
  "approval required",
] as const;

export const BUILD_PLAN_SUMMARY_PACKET_LANGUAGE = [
  "Build plan summary packet",
  "Build plan summary packet does not send prompts",
  "Build plan summaries require explicit operator approval",
  "Summary packets preserve shared CodexForge brain context",
  "Denied build plan summary paths remain blocked",
  "Build plan summary checklist",
  "static build-plan-summary-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_REQUIREMENTS_PACKET_LANGUAGE = [
  "Build plan requirements packet",
  "Build plan requirements packet does not create tasks",
  "Build requirements require explicit operator approval",
  "Requirements packets preserve latest-message authority",
  "Denied build requirements paths remain blocked",
  "Build plan requirements checklist",
  "static build-plan-requirements-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_ARCHITECTURE_PACKET_LANGUAGE = [
  "Build plan architecture packet",
  "Build plan architecture packet does not scaffold architecture",
  "Build architecture requires explicit operator approval",
  "Architecture packets include model routing and adapter boundaries",
  "Denied build architecture paths remain blocked",
  "Build plan architecture checklist",
  "static build-plan-architecture-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_FILE_MANIFEST_PACKET_LANGUAGE = [
  "Build plan file manifest packet",
  "Build plan file manifest packet does not write files",
  "File manifests require explicit operator approval",
  "File manifests include planned files without mutation",
  "Denied build file manifest paths remain blocked",
  "Build plan file manifest checklist",
  "static build-plan-file-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_COMMAND_MANIFEST_PACKET_LANGUAGE = [
  "Build plan command manifest packet",
  "Build plan command manifest packet does not run commands",
  "Command manifests require explicit operator approval",
  "Command manifests include planned commands without execution",
  "Denied build command manifest paths remain blocked",
  "Build plan command manifest checklist",
  "static build-plan-command-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_RUNTIME_MANIFEST_PACKET_LANGUAGE = [
  "Build plan runtime manifest packet",
  "Build plan runtime manifest packet does not start runtimes",
  "Runtime manifests require explicit operator approval",
  "Runtime manifests include planned runtimes without launch",
  "Denied build runtime manifest paths remain blocked",
  "Build plan runtime manifest checklist",
  "static build-plan-runtime-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_ADAPTER_MANIFEST_PACKET_LANGUAGE = [
  "Build plan adapter manifest packet",
  "Build plan adapter manifest packet does not execute adapters",
  "Adapter manifests require explicit operator approval",
  "Adapter manifests include backend and domain adapter gates",
  "Denied build adapter manifest paths remain blocked",
  "Build plan adapter manifest checklist",
  "static build-plan-adapter-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_VALIDATION_MANIFEST_PACKET_LANGUAGE = [
  "Build plan validation manifest packet",
  "Build plan validation manifest packet does not run validation",
  "Validation manifests require explicit operator approval",
  "Validation manifests include planned tests and smoke checks",
  "Denied build validation manifest paths remain blocked",
  "Build plan validation manifest checklist",
  "static build-plan-validation-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_RISK_MANIFEST_PACKET_LANGUAGE = [
  "Build plan risk manifest packet",
  "Build plan risk manifest packet does not approve risk",
  "Risk manifests require explicit operator approval",
  "Risk manifests gate model spend remote calls privacy and tool use",
  "Denied build risk manifest paths remain blocked",
  "Build plan risk manifest checklist",
  "static build-plan-risk-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_MANIFEST_PACKET_LANGUAGE = [
  "Build plan approval manifest packet",
  "Build plan approval manifest packet does not approve actions",
  "Approval manifests require explicit operator approval",
  "Approval manifests list every gated model backend and domain action",
  "Denied build approval manifest paths remain blocked",
  "Build plan approval manifest checklist",
  "static build-plan-approval-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_LANGUAGE = [
  "Build plan evidence manifest packet",
  "Build plan evidence manifest packet does not persist evidence",
  "Evidence manifests require explicit operator approval",
  "Evidence manifests route outputs through shared evidence review",
  "Denied build evidence manifest paths remain blocked",
  "Build plan evidence manifest checklist",
  "static build-plan-evidence-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_RESULT_MANIFEST_PACKET_LANGUAGE = [
  "Build plan result manifest packet",
  "Build plan result manifest packet does not persist results",
  "Result manifests require explicit operator approval",
  "Result manifests route outputs through shared result review",
  "Denied build result manifest paths remain blocked",
  "Build plan result manifest checklist",
  "static build-plan-result-manifest-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_RECOVERY_MANIFEST_PACKET_LANGUAGE = [
  "Build plan recovery manifest packet",
  "Build plan recovery manifest packet does not trigger recovery",
  "Recovery manifests require explicit operator approval",
  "Recovery manifests include rollback backup and restore checkpoints",
  "Denied build recovery manifest paths remain blocked",
  "Build plan recovery manifest checklist",
  "static build-plan-recovery-manifest-packet preview",
  "approval required",
] as const;

export const FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_LANGUAGE = [
  "First complete build plan candidate",
  "First complete build plan candidate does not execute builds",
  "Complete build plan candidates require explicit operator approval",
  "Candidate packets combine summary requirements architecture files commands runtimes adapters validation risk approvals evidence results and recovery",
  "Denied complete build plan candidate paths remain blocked",
  "First complete build plan checklist",
  "static first-complete-build-plan-candidate preview",
  "approval required",
] as const;

export const CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled build plan bundle release candidate",
  "Controlled build plan bundle release candidate does not call models or execute adapters",
  "Controlled build plan release requires explicit operator approval",
  "Release candidate supports build anything goals with shared brain gates",
  "Denied controlled build plan bundle paths remain blocked",
  "Controlled build plan bundle release checklist",
  "static controlled-build-plan-bundle-release-candidate preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_BOUNDARY_LANGUAGE = [
  "Build plan approval boundary",
  "Build plan approval boundary does not approve actions",
  "Build plan approval requires explicit operator approval",
  "Build plan approvals gate model backend and domain actions",
  "Denied build plan approval boundary paths remain blocked",
  "Build plan approval boundary checklist",
  "static build-plan-approval-boundary preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_QUEUE_LANGUAGE = [
  "Build plan approval queue",
  "Build plan approval queue does not persist approval decisions",
  "Approval queue decisions require explicit operator approval",
  "Approval queue items remain preview-only until operator signoff",
  "Denied build plan approval queue paths remain blocked",
  "Build plan approval queue checklist",
  "static build-plan-approval-queue preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_DETAIL_PACKET_LANGUAGE = [
  "Build plan approval detail packet",
  "Build plan approval detail packet does not execute builds",
  "Approval details require explicit operator approval",
  "Detail packets include build plan bundle references",
  "Denied build plan approval detail paths remain blocked",
  "Build plan approval detail checklist",
  "static build-plan-approval-detail-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_DIFF_PREVIEW_LANGUAGE = [
  "Build plan approval diff preview",
  "Build plan approval diff preview does not write files",
  "Diff approval requires explicit operator approval",
  "Diff previews show planned mutations without applying them",
  "Denied build plan approval diff paths remain blocked",
  "Build plan approval diff checklist",
  "static build-plan-approval-diff-preview preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_LANGUAGE = [
  "Build plan approval command preview",
  "Build plan approval command preview does not run commands",
  "Command approval requires explicit operator approval",
  "Command previews show planned commands without execution",
  "Denied build plan approval command paths remain blocked",
  "Build plan approval command checklist",
  "static build-plan-approval-command-preview preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_LANGUAGE = [
  "Build plan approval runtime preview",
  "Build plan approval runtime preview does not start runtimes",
  "Runtime approval requires explicit operator approval",
  "Runtime previews show planned runtime launches without execution",
  "Denied build plan approval runtime paths remain blocked",
  "Build plan approval runtime checklist",
  "static build-plan-approval-runtime-preview preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_LANGUAGE = [
  "Build plan approval adapter preview",
  "Build plan approval adapter preview does not execute adapters",
  "Adapter approval requires explicit operator approval",
  "Adapter previews show backend and domain adapter gates",
  "Denied build plan approval adapter paths remain blocked",
  "Build plan approval adapter checklist",
  "static build-plan-approval-adapter-preview preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_RISK_GATE_LANGUAGE = [
  "Build plan approval risk gate",
  "Build plan approval risk gate does not approve risk",
  "Risk gate review requires explicit operator approval",
  "Risk gates check spend privacy remote calls tools files commands and runtimes",
  "Denied build plan approval risk paths remain blocked",
  "Build plan approval risk checklist",
  "static build-plan-approval-risk-gate preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_EVIDENCE_GATE_LANGUAGE = [
  "Build plan approval evidence gate",
  "Build plan approval evidence gate does not persist evidence",
  "Evidence gate review requires explicit operator approval",
  "Evidence gates route future outputs through shared evidence review",
  "Denied build plan approval evidence paths remain blocked",
  "Build plan approval evidence checklist",
  "static build-plan-approval-evidence-gate preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_RESULT_GATE_LANGUAGE = [
  "Build plan approval result gate",
  "Build plan approval result gate does not persist results",
  "Result gate review requires explicit operator approval",
  "Result gates route future outputs through shared result review",
  "Denied build plan approval result paths remain blocked",
  "Build plan approval result checklist",
  "static build-plan-approval-result-gate preview",
  "approval required",
] as const;

export const BUILD_PLAN_APPROVAL_RECOVERY_GATE_LANGUAGE = [
  "Build plan approval recovery gate",
  "Build plan approval recovery gate does not trigger recovery",
  "Recovery gate review requires explicit operator approval",
  "Recovery gates include rollback backup restore and retry plans",
  "Denied build plan approval recovery paths remain blocked",
  "Build plan approval recovery checklist",
  "static build-plan-approval-recovery-gate preview",
  "approval required",
] as const;

export const BUILD_PLAN_READY_TO_EXECUTE_PACKET_LANGUAGE = [
  "Build plan ready-to-execute packet",
  "Build plan ready-to-execute packet does not execute builds",
  "Ready-to-execute state requires explicit operator approval",
  "Ready-to-execute packets remain held until signoff",
  "Denied build plan ready-to-execute paths remain blocked",
  "Build plan ready-to-execute checklist",
  "static build-plan-ready-to-execute-packet preview",
  "approval required",
] as const;

export const BUILD_PLAN_EXECUTION_HOLD_STATE_LANGUAGE = [
  "Build plan execution hold state",
  "Build plan execution hold state does not execute builds",
  "Execution hold release requires explicit operator approval",
  "Execution hold keeps every model backend and domain action blocked",
  "Denied build plan execution hold paths remain blocked",
  "Build plan execution hold checklist",
  "static build-plan-execution-hold-state preview",
  "approval required",
] as const;

export const BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_LANGUAGE = [
  "Build plan operator signoff packet",
  "Build plan operator signoff packet does not sign off automatically",
  "Operator signoff requires explicit human approval",
  "Signoff packets preserve shared brain memory evidence result and audit gates",
  "Denied build plan operator signoff paths remain blocked",
  "Build plan operator signoff checklist",
  "static build-plan-operator-signoff-packet preview",
  "approval required",
] as const;

export const FIRST_APPROVED_BUILD_PLAN_CANDIDATE_LANGUAGE = [
  "First approved build plan candidate",
  "First approved build plan candidate does not execute builds",
  "Approved build plan candidates require explicit operator approval",
  "Candidate packets combine approval queue diff command runtime adapter risk evidence result and recovery gates",
  "Denied approved build plan candidate paths remain blocked",
  "First approved build plan checklist",
  "static first-approved-build-plan-candidate preview",
  "approval required",
] as const;

export const CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled build plan approval release candidate",
  "Controlled build plan approval release candidate does not call models or execute adapters",
  "Controlled build plan approval release requires explicit operator approval",
  "Release candidate supports build anything approval queues with shared brain gates",
  "Denied controlled build plan approval paths remain blocked",
  "Controlled build plan approval release checklist",
  "static controlled-build-plan-approval-release-candidate preview",
  "approval required",
] as const;

export const BUILD_PLAN_BUNDLE_PREVIEW_SAFETY_MARKERS = [
  "build-plan-bundle static review-only preview",
  "deterministic static review content",
  "static preview-only build plan bundle",
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
  "no approval persistence",
  "no approval decision persistence",
  "no persisted approval decisions",
  "all approval states are static preview states",
  "all approval previews remain preview-only",
  "every model/backend/domain action remains explicitly gated",
  "every file/command/runtime/deploy/package/scaffold action remains blocked until operator approval",
  "ready-to-execute held until signoff",
  "operator signoff not automatic",
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

const BUILD_PLAN_BUNDLE_PACKET_FIELDS = [
  "original operator goal",
  "clarified goal",
  "target family",
  "target recommendation",
  "build plan bundle reference",
  "requirements",
  "architecture sketch",
  "file manifest",
  "file manifest preview",
  "command manifest",
  "command manifest preview",
  "runtime manifest",
  "runtime manifest preview",
  "adapter manifest",
  "adapter manifest preview",
  "validation manifest",
  "risk manifest",
  "risk gate",
  "approval manifest",
  "approval checklist",
  "evidence manifest",
  "evidence gate",
  "result manifest",
  "result gate",
  "recovery manifest",
  "recovery gate",
  "ready-to-execute state",
  "execution hold state",
  "operator signoff state",
  "denied live execution state",
  "operator decision state",
] as const;

const SUPPORTED_BUILD_PLAN_TARGET_FAMILIES = [
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

function buildBuildPlanBundleDefinition(input: {
  slug: BuildPlanBundleReviewSlug;
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
}): BuildPlanBundleDefinition {
  const packetFields = "Future build plan bundle packet fields: " + joinSentence(BUILD_PLAN_BUNDLE_PACKET_FIELDS) + ".";
  const supportedTargets = "Supported target families: " + joinSentence(SUPPORTED_BUILD_PLAN_TARGET_FAMILIES) + ".";
  const sharedBrainCopy = "Models are workers. CodexForge is the brain. All paid/free/local/remote/OpenAI-compatible/specialist model workers share one CodexForge brain, memory, knowledge, evidence, result, audit, and approval layer.";
  const modelRouterCopy = "Model-router policy: cheapest capable model wins if safe; local model preferred for private files, codebases, sensitive plans, local workspace context, and local game/server config; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for games/research/creative/trading/coding/automation.";
  const adapterCopy = "Backend/domain adapter policy: all plan manifests remain preview-only; no live execution; all real execution requires explicit operator approval; every adapter proposal must name its approval gate; every result must return through shared evidence/result review.";
  const deniedCopy = input.deniedCopy + ". Denied build plan bundle paths block model calls, provider calls, provider connection tests, local runtime probes, API key reads, secret reads, credential storage, credit spend, prompt sending, remote prompt sending, browsing, deployment, file writes, command execution, runtime starts, game server starts, mod installs, automations, backend adapter execution, domain adapter execution, project adapter execution, game adapter execution, validation execution, evidence persistence, result persistence, recovery, packaging, exports, project scaffolding, model output persistence, automatic memory promotion, hidden approvals, audit writes, and live request routing.";
  const checklistCopy = input.checklistLabel + ": " + joinSentence(BUILD_PLAN_BUNDLE_PACKET_FIELDS) + ".";
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
    advancedDetails: [input.markerTitle, input.safetyCopy, input.approvalCopy, input.supportCopy, input.deniedCopy, packetFields, supportedTargets, sharedBrainCopy, modelRouterCopy, adapterCopy, deniedCopy, checklistCopy, "Static preview focus fields: " + joinSentence(input.fieldItems) + ".", "Operator decision state: blocked until explicit human approval confirms original operator goal, clarified goal, target family, target recommendation, requirements, architecture, files, commands, runtimes, adapters, validation, risk, approvals, evidence, result, recovery, model routing, and safety gates."],
    advancedCopy: input.title + " remains deterministic, static, local-first, review-only, and approval-gated. It does not call models, call providers, send prompts, read secrets, store credentials, spend credits, execute backend adapters, execute domain adapters, write files, run commands, start runtimes, scaffold projects, browse, deploy, package outputs, persist model outputs, persist evidence/results, trigger recovery, run validation, or promote memory automatically.",
    dataScope: input.slug + " build-plan-bundle review-only approval required denied execution static preview",
  };
}

const BUILD_PLAN_APPROVAL_DEFINITION_INPUTS = [
  {
    slug: "build-plan-approval-boundary",
    phase: "Phase 1050",
    title: "Build Plan Approval Boundary",
    markerTitle: "Build plan approval boundary",
    safetyCopy: "Build plan approval boundary does not approve actions",
    approvalCopy: "Build plan approval requires explicit operator approval",
    supportCopy: "Build plan approvals gate model backend and domain actions",
    deniedCopy: "Denied build plan approval boundary paths remain blocked",
    checklistLabel: "Build plan approval boundary checklist",
    subtitle: "Review the approval boundary for future build plan packets without approving model, backend, domain, file, command, runtime, deploy, package, scaffold, or memory actions.",
    primaryLabel: "Review approval boundary",
    groupLabel: "Approval boundary fields",
    previewFocus: "original operator goal, build plan bundle reference, approval boundary, model gates, backend gates, domain gates, denied live execution state, and operator decision state",
    language: BUILD_PLAN_APPROVAL_BOUNDARY_LANGUAGE,
    fieldItems: ["original operator goal", "build plan bundle reference", "approval boundary", "model gates", "backend gates", "domain gates", "approval checklist", "denied live execution state", "operator decision state"],
    routes: ["/controlled-build-plan-bundle-release-candidate", "/build-plan-approval-queue", "/build-plan-approval-risk-gate"],
    links: [
      { href: "/controlled-build-plan-bundle-release-candidate", label: "Previous Phase" },
      { href: "/build-plan-approval-queue", label: "Next Phase" },
      { href: "/build-plan-approval-risk-gate", label: "Risk Gate" },
    ],
    nextRecommendedAction: "Review the build plan approval queue while model, backend, domain, file, command, runtime, deploy, package, scaffold, evidence, result, recovery, audit, memory, and approval decisions remain blocked.",
  },
  {
    slug: "build-plan-approval-queue",
    phase: "Phase 1051",
    title: "Build Plan Approval Queue",
    markerTitle: "Build plan approval queue",
    safetyCopy: "Build plan approval queue does not persist approval decisions",
    approvalCopy: "Approval queue decisions require explicit operator approval",
    supportCopy: "Approval queue items remain preview-only until operator signoff",
    deniedCopy: "Denied build plan approval queue paths remain blocked",
    checklistLabel: "Build plan approval queue checklist",
    subtitle: "Review a static approval queue where candidate decisions are visible but never persisted or auto-approved.",
    primaryLabel: "Review approval queue",
    groupLabel: "Approval queue fields",
    previewFocus: "queue item preview, build plan bundle reference, approval checklist, decision denial, execution hold, signoff requirement, and operator decision state",
    language: BUILD_PLAN_APPROVAL_QUEUE_LANGUAGE,
    fieldItems: ["approval queue", "queue item preview", "build plan bundle reference", "approval checklist", "decision denial", "execution hold", "operator signoff state", "operator decision state"],
    routes: ["/build-plan-approval-boundary", "/build-plan-approval-detail-packet", "/build-plan-ready-to-execute-packet"],
    links: [
      { href: "/build-plan-approval-boundary", label: "Previous Phase" },
      { href: "/build-plan-approval-detail-packet", label: "Next Phase" },
      { href: "/build-plan-ready-to-execute-packet", label: "Ready Packet" },
    ],
    nextRecommendedAction: "Review approval detail packets while queue decisions remain non-persistent, preview-only, and blocked until explicit operator signoff.",
  },
  {
    slug: "build-plan-approval-detail-packet",
    phase: "Phase 1052",
    title: "Build Plan Approval Detail Packet",
    markerTitle: "Build plan approval detail packet",
    safetyCopy: "Build plan approval detail packet does not execute builds",
    approvalCopy: "Approval details require explicit operator approval",
    supportCopy: "Detail packets include build plan bundle references",
    deniedCopy: "Denied build plan approval detail paths remain blocked",
    checklistLabel: "Build plan approval detail checklist",
    subtitle: "Review the approval detail packet for a future build plan without executing builds or storing decisions.",
    primaryLabel: "Review approval detail",
    groupLabel: "Approval detail fields",
    previewFocus: "original operator goal, build plan bundle reference, file preview, command preview, runtime preview, adapter preview, gates, checklist, and operator decision state",
    language: BUILD_PLAN_APPROVAL_DETAIL_PACKET_LANGUAGE,
    fieldItems: ["original operator goal", "build plan bundle reference", "file manifest preview", "command manifest preview", "runtime manifest preview", "adapter manifest preview", "risk gate", "approval checklist", "operator decision state"],
    routes: ["/build-plan-approval-queue", "/build-plan-approval-diff-preview", "/build-plan-approval-boundary"],
    links: [
      { href: "/build-plan-approval-queue", label: "Previous Phase" },
      { href: "/build-plan-approval-diff-preview", label: "Next Phase" },
      { href: "/build-plan-approval-boundary", label: "Approval Boundary" },
    ],
    nextRecommendedAction: "Review the diff preview while approval detail packets remain static, non-executing, and explicitly gated.",
  },
  {
    slug: "build-plan-approval-diff-preview",
    phase: "Phase 1053",
    title: "Build Plan Approval Diff Preview",
    markerTitle: "Build plan approval diff preview",
    safetyCopy: "Build plan approval diff preview does not write files",
    approvalCopy: "Diff approval requires explicit operator approval",
    supportCopy: "Diff previews show planned mutations without applying them",
    deniedCopy: "Denied build plan approval diff paths remain blocked",
    checklistLabel: "Build plan approval diff checklist",
    subtitle: "Review planned file mutations as a static preview without applying patches, writing files, or exporting artifacts.",
    primaryLabel: "Review diff preview",
    groupLabel: "Diff preview fields",
    previewFocus: "file manifest preview, planned mutation summary, diff approval gate, write denial, recovery handoff, and operator decision state",
    language: BUILD_PLAN_APPROVAL_DIFF_PREVIEW_LANGUAGE,
    fieldItems: ["file manifest preview", "planned mutation summary", "diff approval gate", "write denial", "recovery handoff", "approval checklist", "operator decision state"],
    routes: ["/build-plan-approval-detail-packet", "/build-plan-approval-command-preview", "/build-plan-approval-recovery-gate"],
    links: [
      { href: "/build-plan-approval-detail-packet", label: "Previous Phase" },
      { href: "/build-plan-approval-command-preview", label: "Next Phase" },
      { href: "/build-plan-approval-recovery-gate", label: "Recovery Gate" },
    ],
    nextRecommendedAction: "Review the command preview while planned file mutations remain visible only as blocked, static, operator-gated diff previews.",
  },
  {
    slug: "build-plan-approval-command-preview",
    phase: "Phase 1054",
    title: "Build Plan Approval Command Preview",
    markerTitle: "Build plan approval command preview",
    safetyCopy: "Build plan approval command preview does not run commands",
    approvalCopy: "Command approval requires explicit operator approval",
    supportCopy: "Command previews show planned commands without execution",
    deniedCopy: "Denied build plan approval command paths remain blocked",
    checklistLabel: "Build plan approval command checklist",
    subtitle: "Review planned commands without shell, git, test, build, smoke, install, server, or package execution.",
    primaryLabel: "Review command preview",
    groupLabel: "Command preview fields",
    previewFocus: "command manifest preview, command purpose, risk class, command approval gate, execution denial, evidence handoff, and operator decision state",
    language: BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_LANGUAGE,
    fieldItems: ["command manifest preview", "command purpose", "risk class", "command approval gate", "execution denial", "evidence handoff", "operator decision state"],
    routes: ["/build-plan-approval-diff-preview", "/build-plan-approval-runtime-preview", "/build-plan-approval-risk-gate"],
    links: [
      { href: "/build-plan-approval-diff-preview", label: "Previous Phase" },
      { href: "/build-plan-approval-runtime-preview", label: "Next Phase" },
      { href: "/build-plan-approval-risk-gate", label: "Risk Gate" },
    ],
    nextRecommendedAction: "Review the runtime preview while every command remains static, blocked, and explicitly gated.",
  },
  {
    slug: "build-plan-approval-runtime-preview",
    phase: "Phase 1055",
    title: "Build Plan Approval Runtime Preview",
    markerTitle: "Build plan approval runtime preview",
    safetyCopy: "Build plan approval runtime preview does not start runtimes",
    approvalCopy: "Runtime approval requires explicit operator approval",
    supportCopy: "Runtime previews show planned runtime launches without execution",
    deniedCopy: "Denied build plan approval runtime paths remain blocked",
    checklistLabel: "Build plan approval runtime checklist",
    subtitle: "Review planned runtime launches without starting dev servers, local services, game servers, brokers, or provider bridges.",
    primaryLabel: "Review runtime preview",
    groupLabel: "Runtime preview fields",
    previewFocus: "runtime manifest preview, planned launch purpose, local privacy boundary, runtime approval gate, launch denial, and operator decision state",
    language: BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_LANGUAGE,
    fieldItems: ["runtime manifest preview", "planned launch purpose", "local privacy boundary", "runtime approval gate", "launch denial", "execution hold state", "operator decision state"],
    routes: ["/build-plan-approval-command-preview", "/build-plan-approval-adapter-preview", "/build-plan-approval-risk-gate"],
    links: [
      { href: "/build-plan-approval-command-preview", label: "Previous Phase" },
      { href: "/build-plan-approval-adapter-preview", label: "Next Phase" },
      { href: "/build-plan-approval-risk-gate", label: "Risk Gate" },
    ],
    nextRecommendedAction: "Review the adapter preview while planned runtimes remain blocked until explicit operator approval and signoff.",
  },
  {
    slug: "build-plan-approval-adapter-preview",
    phase: "Phase 1056",
    title: "Build Plan Approval Adapter Preview",
    markerTitle: "Build plan approval adapter preview",
    safetyCopy: "Build plan approval adapter preview does not execute adapters",
    approvalCopy: "Adapter approval requires explicit operator approval",
    supportCopy: "Adapter previews show backend and domain adapter gates",
    deniedCopy: "Denied build plan approval adapter paths remain blocked",
    checklistLabel: "Build plan approval adapter checklist",
    subtitle: "Review backend and domain adapter proposals without executing adapters, testing connections, or routing requests.",
    primaryLabel: "Review adapter preview",
    groupLabel: "Adapter preview fields",
    previewFocus: "adapter manifest preview, backend adapter gate, domain adapter gate, shared evidence/result review, adapter execution denial, and operator decision state",
    language: BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["adapter manifest preview", "backend adapter gate", "domain adapter gate", "shared evidence review", "shared result review", "adapter execution denial", "operator decision state"],
    routes: ["/build-plan-approval-runtime-preview", "/build-plan-approval-risk-gate", "/build-plan-approval-evidence-gate"],
    links: [
      { href: "/build-plan-approval-runtime-preview", label: "Previous Phase" },
      { href: "/build-plan-approval-risk-gate", label: "Next Phase" },
      { href: "/build-plan-approval-evidence-gate", label: "Evidence Gate" },
    ],
    nextRecommendedAction: "Review the risk gate while backend and domain adapter proposals stay preview-only and approval-gated.",
  },
  {
    slug: "build-plan-approval-risk-gate",
    phase: "Phase 1057",
    title: "Build Plan Approval Risk Gate",
    markerTitle: "Build plan approval risk gate",
    safetyCopy: "Build plan approval risk gate does not approve risk",
    approvalCopy: "Risk gate review requires explicit operator approval",
    supportCopy: "Risk gates check spend privacy remote calls tools files commands and runtimes",
    deniedCopy: "Denied build plan approval risk paths remain blocked",
    checklistLabel: "Build plan approval risk checklist",
    subtitle: "Review risk gates for spend, privacy, remote calls, tools, files, commands, runtimes, adapters, and target families without approving risk.",
    primaryLabel: "Review risk gate",
    groupLabel: "Risk gate fields",
    previewFocus: "spend gate, privacy gate, remote call gate, tool gate, file gate, command gate, runtime gate, adapter gate, and operator decision state",
    language: BUILD_PLAN_APPROVAL_RISK_GATE_LANGUAGE,
    fieldItems: ["spend gate", "privacy gate", "remote call gate", "tool gate", "file gate", "command gate", "runtime gate", "adapter gate", "operator decision state"],
    routes: ["/build-plan-approval-adapter-preview", "/build-plan-approval-evidence-gate", "/build-plan-approval-command-preview"],
    links: [
      { href: "/build-plan-approval-adapter-preview", label: "Previous Phase" },
      { href: "/build-plan-approval-evidence-gate", label: "Next Phase" },
      { href: "/build-plan-approval-command-preview", label: "Command Preview" },
    ],
    nextRecommendedAction: "Review the evidence gate while risk approval remains explicitly blocked until human operator approval.",
  },
  {
    slug: "build-plan-approval-evidence-gate",
    phase: "Phase 1058",
    title: "Build Plan Approval Evidence Gate",
    markerTitle: "Build plan approval evidence gate",
    safetyCopy: "Build plan approval evidence gate does not persist evidence",
    approvalCopy: "Evidence gate review requires explicit operator approval",
    supportCopy: "Evidence gates route future outputs through shared evidence review",
    deniedCopy: "Denied build plan approval evidence paths remain blocked",
    checklistLabel: "Build plan approval evidence checklist",
    subtitle: "Review future evidence routing without capturing, ingesting, persisting, or promoting evidence automatically.",
    primaryLabel: "Review evidence gate",
    groupLabel: "Evidence gate fields",
    previewFocus: "evidence gate, future output route, capture denial, persistence denial, shared evidence review, audit handoff, and operator decision state",
    language: BUILD_PLAN_APPROVAL_EVIDENCE_GATE_LANGUAGE,
    fieldItems: ["evidence gate", "future output route", "capture denial", "persistence denial", "shared evidence review", "audit handoff", "operator decision state"],
    routes: ["/build-plan-approval-risk-gate", "/build-plan-approval-result-gate", "/build-plan-approval-adapter-preview"],
    links: [
      { href: "/build-plan-approval-risk-gate", label: "Previous Phase" },
      { href: "/build-plan-approval-result-gate", label: "Next Phase" },
      { href: "/build-plan-approval-adapter-preview", label: "Adapter Preview" },
    ],
    nextRecommendedAction: "Review the result gate while evidence remains non-persistent, preview-only, and routed through shared review.",
  },
  {
    slug: "build-plan-approval-result-gate",
    phase: "Phase 1059",
    title: "Build Plan Approval Result Gate",
    markerTitle: "Build plan approval result gate",
    safetyCopy: "Build plan approval result gate does not persist results",
    approvalCopy: "Result gate review requires explicit operator approval",
    supportCopy: "Result gates route future outputs through shared result review",
    deniedCopy: "Denied build plan approval result paths remain blocked",
    checklistLabel: "Build plan approval result checklist",
    subtitle: "Review future result routing without storing outputs, reusing results, or promoting memory automatically.",
    primaryLabel: "Review result gate",
    groupLabel: "Result gate fields",
    previewFocus: "result gate, future output review, output storage denial, shared result review, memory promotion denial, and operator decision state",
    language: BUILD_PLAN_APPROVAL_RESULT_GATE_LANGUAGE,
    fieldItems: ["result gate", "future output review", "output storage denial", "shared result review", "memory promotion denial", "audit handoff", "operator decision state"],
    routes: ["/build-plan-approval-evidence-gate", "/build-plan-approval-recovery-gate", "/build-plan-approval-risk-gate"],
    links: [
      { href: "/build-plan-approval-evidence-gate", label: "Previous Phase" },
      { href: "/build-plan-approval-recovery-gate", label: "Next Phase" },
      { href: "/build-plan-approval-risk-gate", label: "Risk Gate" },
    ],
    nextRecommendedAction: "Review the recovery gate while result persistence remains blocked and shared result review remains required.",
  },
  {
    slug: "build-plan-approval-recovery-gate",
    phase: "Phase 1060",
    title: "Build Plan Approval Recovery Gate",
    markerTitle: "Build plan approval recovery gate",
    safetyCopy: "Build plan approval recovery gate does not trigger recovery",
    approvalCopy: "Recovery gate review requires explicit operator approval",
    supportCopy: "Recovery gates include rollback backup restore and retry plans",
    deniedCopy: "Denied build plan approval recovery paths remain blocked",
    checklistLabel: "Build plan approval recovery checklist",
    subtitle: "Review rollback, backup, restore, and retry plans without triggering recovery or writing recovery artifacts.",
    primaryLabel: "Review recovery gate",
    groupLabel: "Recovery gate fields",
    previewFocus: "rollback plan, backup plan, restore plan, retry plan, recovery approval gate, trigger denial, and operator decision state",
    language: BUILD_PLAN_APPROVAL_RECOVERY_GATE_LANGUAGE,
    fieldItems: ["rollback plan", "backup plan", "restore plan", "retry plan", "recovery approval gate", "trigger denial", "operator decision state"],
    routes: ["/build-plan-approval-result-gate", "/build-plan-ready-to-execute-packet", "/build-plan-approval-diff-preview"],
    links: [
      { href: "/build-plan-approval-result-gate", label: "Previous Phase" },
      { href: "/build-plan-ready-to-execute-packet", label: "Next Phase" },
      { href: "/build-plan-approval-diff-preview", label: "Diff Preview" },
    ],
    nextRecommendedAction: "Review the ready-to-execute packet while recovery remains a static plan, not a triggered action.",
  },
  {
    slug: "build-plan-ready-to-execute-packet",
    phase: "Phase 1061",
    title: "Build Plan Ready-To-Execute Packet",
    markerTitle: "Build plan ready-to-execute packet",
    safetyCopy: "Build plan ready-to-execute packet does not execute builds",
    approvalCopy: "Ready-to-execute state requires explicit operator approval",
    supportCopy: "Ready-to-execute packets remain held until signoff",
    deniedCopy: "Denied build plan ready-to-execute paths remain blocked",
    checklistLabel: "Build plan ready-to-execute checklist",
    subtitle: "Review a future ready-to-execute state that remains held and blocked until explicit signoff.",
    primaryLabel: "Review ready packet",
    groupLabel: "Ready-to-execute fields",
    previewFocus: "ready-to-execute state, approval checklist, queue reference, gate completion preview, execution hold state, signoff requirement, and operator decision state",
    language: BUILD_PLAN_READY_TO_EXECUTE_PACKET_LANGUAGE,
    fieldItems: ["ready-to-execute state", "approval checklist", "queue reference", "gate completion preview", "execution hold state", "operator signoff state", "operator decision state"],
    routes: ["/build-plan-approval-recovery-gate", "/build-plan-execution-hold-state", "/build-plan-approval-queue"],
    links: [
      { href: "/build-plan-approval-recovery-gate", label: "Previous Phase" },
      { href: "/build-plan-execution-hold-state", label: "Next Phase" },
      { href: "/build-plan-approval-queue", label: "Approval Queue" },
    ],
    nextRecommendedAction: "Review the execution hold state while ready-to-execute packets remain held and non-executing.",
  },
  {
    slug: "build-plan-execution-hold-state",
    phase: "Phase 1062",
    title: "Build Plan Execution Hold State",
    markerTitle: "Build plan execution hold state",
    safetyCopy: "Build plan execution hold state does not execute builds",
    approvalCopy: "Execution hold release requires explicit operator approval",
    supportCopy: "Execution hold keeps every model backend and domain action blocked",
    deniedCopy: "Denied build plan execution hold paths remain blocked",
    checklistLabel: "Build plan execution hold checklist",
    subtitle: "Review the execution hold state that blocks every model, backend, domain, file, command, runtime, deploy, package, scaffold, and memory action.",
    primaryLabel: "Review execution hold",
    groupLabel: "Execution hold fields",
    previewFocus: "execution hold state, release denial, model block, backend block, domain block, file/command/runtime block, signoff requirement, and operator decision state",
    language: BUILD_PLAN_EXECUTION_HOLD_STATE_LANGUAGE,
    fieldItems: ["execution hold state", "release denial", "model block", "backend block", "domain block", "file command runtime block", "operator signoff state", "operator decision state"],
    routes: ["/build-plan-ready-to-execute-packet", "/build-plan-operator-signoff-packet", "/build-plan-approval-boundary"],
    links: [
      { href: "/build-plan-ready-to-execute-packet", label: "Previous Phase" },
      { href: "/build-plan-operator-signoff-packet", label: "Next Phase" },
      { href: "/build-plan-approval-boundary", label: "Approval Boundary" },
    ],
    nextRecommendedAction: "Review the operator signoff packet while every execution path remains held.",
  },
  {
    slug: "build-plan-operator-signoff-packet",
    phase: "Phase 1063",
    title: "Build Plan Operator Signoff Packet",
    markerTitle: "Build plan operator signoff packet",
    safetyCopy: "Build plan operator signoff packet does not sign off automatically",
    approvalCopy: "Operator signoff requires explicit human approval",
    supportCopy: "Signoff packets preserve shared brain memory evidence result and audit gates",
    deniedCopy: "Denied build plan operator signoff paths remain blocked",
    checklistLabel: "Build plan operator signoff checklist",
    subtitle: "Review the signoff packet that preserves shared brain, memory, evidence, result, audit, and approval gates without signing off automatically.",
    primaryLabel: "Review signoff packet",
    groupLabel: "Operator signoff fields",
    previewFocus: "operator signoff state, human approval requirement, shared brain gate, memory gate, evidence gate, result gate, audit gate, and execution hold state",
    language: BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_LANGUAGE,
    fieldItems: ["operator signoff state", "human approval requirement", "shared brain gate", "memory gate", "evidence gate", "result gate", "audit gate", "execution hold state"],
    routes: ["/build-plan-execution-hold-state", "/first-approved-build-plan-candidate", "/build-plan-approval-evidence-gate"],
    links: [
      { href: "/build-plan-execution-hold-state", label: "Previous Phase" },
      { href: "/first-approved-build-plan-candidate", label: "Next Phase" },
      { href: "/build-plan-approval-evidence-gate", label: "Evidence Gate" },
    ],
    nextRecommendedAction: "Review the first approved build plan candidate while operator signoff remains explicit and non-automatic.",
  },
  {
    slug: "first-approved-build-plan-candidate",
    phase: "Phase 1064",
    title: "First Approved Build Plan Candidate",
    markerTitle: "First approved build plan candidate",
    safetyCopy: "First approved build plan candidate does not execute builds",
    approvalCopy: "Approved build plan candidates require explicit operator approval",
    supportCopy: "Candidate packets combine approval queue diff command runtime adapter risk evidence result and recovery gates",
    deniedCopy: "Denied approved build plan candidate paths remain blocked",
    checklistLabel: "First approved build plan checklist",
    subtitle: "Review the first approved build plan candidate as a complete static packet without executing builds or persisting approval decisions.",
    primaryLabel: "Review approved candidate",
    groupLabel: "Approved candidate fields",
    previewFocus: "approval queue, diff preview, command preview, runtime preview, adapter preview, risk gate, evidence gate, result gate, recovery gate, signoff, and execution hold",
    language: FIRST_APPROVED_BUILD_PLAN_CANDIDATE_LANGUAGE,
    fieldItems: ["approval queue", "diff preview", "command preview", "runtime preview", "adapter preview", "risk gate", "evidence gate", "result gate", "recovery gate", "operator signoff state", "execution hold state"],
    routes: ["/build-plan-operator-signoff-packet", "/controlled-build-plan-approval-release-candidate", "/build-plan-approval-queue"],
    links: [
      { href: "/build-plan-operator-signoff-packet", label: "Previous Phase" },
      { href: "/controlled-build-plan-approval-release-candidate", label: "Next Phase" },
      { href: "/build-plan-approval-queue", label: "Approval Queue" },
    ],
    nextRecommendedAction: "Review the controlled build plan approval release candidate while the first approved candidate remains static and non-executing.",
  },
  {
    slug: "controlled-build-plan-approval-release-candidate",
    phase: "Phase 1065",
    title: "Controlled Build Plan Approval Release Candidate",
    markerTitle: "Controlled build plan approval release candidate",
    safetyCopy: "Controlled build plan approval release candidate does not call models or execute adapters",
    approvalCopy: "Controlled build plan approval release requires explicit operator approval",
    supportCopy: "Release candidate supports build anything approval queues with shared brain gates",
    deniedCopy: "Denied controlled build plan approval paths remain blocked",
    checklistLabel: "Controlled build plan approval release checklist",
    subtitle: "Review the controlled build plan approval release candidate without model calls, provider calls, prompt sending, adapter execution, or approval persistence.",
    primaryLabel: "Review approval RC",
    groupLabel: "Approval release candidate fields",
    previewFocus: "build-anything approval queues, shared brain gates, model routing policy, backend/domain adapter gates, approval boundary, evidence, result, audit, execution hold, signoff, and denied execution",
    language: CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_LANGUAGE,
    fieldItems: ["build-anything approval queues", "shared brain gates", "model routing policy", "backend/domain adapter gates", "approval boundary", "evidence", "result", "audit", "execution hold", "operator signoff state", "denied execution"],
    routes: ["/first-approved-build-plan-candidate", "/build-plan-approval-boundary", "/build-plan-approval-queue"],
    links: [
      { href: "/first-approved-build-plan-candidate", label: "Previous Phase" },
      { href: "/build-plan-approval-boundary", label: "Approval Boundary" },
      { href: "/build-plan-approval-queue", label: "Approval Queue" },
    ],
    nextRecommendedAction: "Continue approval-boundary review while build-anything approval queues remain static, preview-only, shared-brain gated, and blocked until explicit operator approval.",
  },
] satisfies readonly (Parameters<typeof buildBuildPlanBundleDefinition>[0])[];

export const BUILD_PLAN_BUNDLE_DEFINITIONS: Record<BuildPlanBundleReviewSlug, BuildPlanBundleDefinition> = {
  "build-plan-bundle-boundary": buildBuildPlanBundleDefinition({
    slug: "build-plan-bundle-boundary",
    phase: "Phase 1034",
    title: "Build Plan Bundle Boundary",
    markerTitle: "Build plan bundle boundary",
    safetyCopy: "Build plan bundle boundary does not execute builds",
    approvalCopy: "Build plan bundle execution requires explicit operator approval",
    supportCopy: "Build plan bundles support game and non-game targets",
    deniedCopy: "Denied build plan bundle paths remain blocked",
    checklistLabel: "Build plan bundle checklist",
    subtitle: "Review the build plan bundle boundary without executing builds, calling models, or running adapters.",
    primaryLabel: "Review bundle boundary",
    groupLabel: "Bundle boundary fields",
    previewFocus: "original operator goal, clarified goal, target family, target recommendation, denied execution state, and operator decision state",
    language: BUILD_PLAN_BUNDLE_BOUNDARY_LANGUAGE,
    fieldItems: ["original operator goal", "clarified goal", "target family", "target recommendation", "bundle boundary", "denied live execution state", "operator decision state"],
    routes: ["/controlled-guided-build-workflow-release-candidate", "/build-plan-summary-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/controlled-guided-build-workflow-release-candidate", label: "Previous Phase" },
      { href: "/build-plan-summary-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-summary-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-summary-packet",
    phase: "Phase 1035",
    title: "Build Plan Summary Packet",
    markerTitle: "Build plan summary packet",
    safetyCopy: "Build plan summary packet does not send prompts",
    approvalCopy: "Build plan summaries require explicit operator approval",
    supportCopy: "Summary packets preserve shared CodexForge brain context",
    deniedCopy: "Denied build plan summary paths remain blocked",
    checklistLabel: "Build plan summary checklist",
    subtitle: "Review summary packets without sending prompts, routing models, or persisting generated output.",
    primaryLabel: "Review summary packet",
    groupLabel: "Summary packet fields",
    previewFocus: "original operator goal, clarified goal, target family, target recommendation, summary packet, shared brain context, and operator decision state",
    language: BUILD_PLAN_SUMMARY_PACKET_LANGUAGE,
    fieldItems: ["original operator goal", "clarified goal", "target family", "target recommendation", "summary packet", "shared brain context", "denied prompt sending state", "operator decision state"],
    routes: ["/build-plan-bundle-boundary", "/build-plan-requirements-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-bundle-boundary", label: "Previous Phase" },
      { href: "/build-plan-requirements-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-requirements-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-requirements-packet",
    phase: "Phase 1036",
    title: "Build Plan Requirements Packet",
    markerTitle: "Build plan requirements packet",
    safetyCopy: "Build plan requirements packet does not create tasks",
    approvalCopy: "Build requirements require explicit operator approval",
    supportCopy: "Requirements packets preserve latest-message authority",
    deniedCopy: "Denied build requirements paths remain blocked",
    checklistLabel: "Build plan requirements checklist",
    subtitle: "Review requirements without creating tasks, automations, tickets, files, or execution work.",
    primaryLabel: "Review requirements",
    groupLabel: "Requirements packet fields",
    previewFocus: "requirements, latest-message authority, exclusions, assumptions, denied task creation state, and operator decision state",
    language: BUILD_PLAN_REQUIREMENTS_PACKET_LANGUAGE,
    fieldItems: ["original operator goal", "clarified goal", "requirements", "constraints", "assumptions", "latest-message authority", "denied task creation state", "operator decision state"],
    routes: ["/build-plan-summary-packet", "/build-plan-architecture-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-summary-packet", label: "Previous Phase" },
      { href: "/build-plan-architecture-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-architecture-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-architecture-packet",
    phase: "Phase 1037",
    title: "Build Plan Architecture Packet",
    markerTitle: "Build plan architecture packet",
    safetyCopy: "Build plan architecture packet does not scaffold architecture",
    approvalCopy: "Build architecture requires explicit operator approval",
    supportCopy: "Architecture packets include model routing and adapter boundaries",
    deniedCopy: "Denied build architecture paths remain blocked",
    checklistLabel: "Build plan architecture checklist",
    subtitle: "Review architecture sketches without scaffolding projects, writing files, or executing adapters.",
    primaryLabel: "Review architecture",
    groupLabel: "Architecture packet fields",
    previewFocus: "architecture sketch, model routing boundary, backend adapter boundary, domain adapter boundary, denied scaffold state, and operator decision state",
    language: BUILD_PLAN_ARCHITECTURE_PACKET_LANGUAGE,
    fieldItems: ["requirements", "architecture sketch", "model routing boundary", "backend adapter boundary", "domain adapter boundary", "denied scaffold state", "operator decision state"],
    routes: ["/build-plan-requirements-packet", "/build-plan-file-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-requirements-packet", label: "Previous Phase" },
      { href: "/build-plan-file-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-file-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-file-manifest-packet",
    phase: "Phase 1038",
    title: "Build Plan File Manifest Packet",
    markerTitle: "Build plan file manifest packet",
    safetyCopy: "Build plan file manifest packet does not write files",
    approvalCopy: "File manifests require explicit operator approval",
    supportCopy: "File manifests include planned files without mutation",
    deniedCopy: "Denied build file manifest paths remain blocked",
    checklistLabel: "Build plan file manifest checklist",
    subtitle: "Review planned files without creating, editing, deleting, moving, exporting, or packaging files.",
    primaryLabel: "Review file manifest",
    groupLabel: "File manifest fields",
    previewFocus: "planned files, file ownership, mutation denial, write approval gate, and operator decision state",
    language: BUILD_PLAN_FILE_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["architecture sketch", "file manifest", "planned files", "file ownership", "mutation denial", "write approval gate", "operator decision state"],
    routes: ["/build-plan-architecture-packet", "/build-plan-command-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-architecture-packet", label: "Previous Phase" },
      { href: "/build-plan-command-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-command-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-command-manifest-packet",
    phase: "Phase 1039",
    title: "Build Plan Command Manifest Packet",
    markerTitle: "Build plan command manifest packet",
    safetyCopy: "Build plan command manifest packet does not run commands",
    approvalCopy: "Command manifests require explicit operator approval",
    supportCopy: "Command manifests include planned commands without execution",
    deniedCopy: "Denied build command manifest paths remain blocked",
    checklistLabel: "Build plan command manifest checklist",
    subtitle: "Review planned commands without running shell, git, test, build, smoke, install, or server commands.",
    primaryLabel: "Review command manifest",
    groupLabel: "Command manifest fields",
    previewFocus: "planned commands, command purpose, command risk, execution denial, command approval gate, and operator decision state",
    language: BUILD_PLAN_COMMAND_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["file manifest", "command manifest", "planned commands", "command purpose", "command risk", "execution denial", "command approval gate", "operator decision state"],
    routes: ["/build-plan-file-manifest-packet", "/build-plan-runtime-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-file-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-runtime-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-runtime-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-runtime-manifest-packet",
    phase: "Phase 1040",
    title: "Build Plan Runtime Manifest Packet",
    markerTitle: "Build plan runtime manifest packet",
    safetyCopy: "Build plan runtime manifest packet does not start runtimes",
    approvalCopy: "Runtime manifests require explicit operator approval",
    supportCopy: "Runtime manifests include planned runtimes without launch",
    deniedCopy: "Denied build runtime manifest paths remain blocked",
    checklistLabel: "Build plan runtime manifest checklist",
    subtitle: "Review planned runtimes without launching local runtimes, game servers, dev servers, brokers, or services.",
    primaryLabel: "Review runtime manifest",
    groupLabel: "Runtime manifest fields",
    previewFocus: "planned runtimes, launch denial, runtime approval gate, local runtime privacy, and operator decision state",
    language: BUILD_PLAN_RUNTIME_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["command manifest", "runtime manifest", "planned runtimes", "launch denial", "runtime approval gate", "local runtime privacy", "operator decision state"],
    routes: ["/build-plan-command-manifest-packet", "/build-plan-adapter-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-command-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-adapter-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-adapter-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-adapter-manifest-packet",
    phase: "Phase 1041",
    title: "Build Plan Adapter Manifest Packet",
    markerTitle: "Build plan adapter manifest packet",
    safetyCopy: "Build plan adapter manifest packet does not execute adapters",
    approvalCopy: "Adapter manifests require explicit operator approval",
    supportCopy: "Adapter manifests include backend and domain adapter gates",
    deniedCopy: "Denied build adapter manifest paths remain blocked",
    checklistLabel: "Build plan adapter manifest checklist",
    subtitle: "Review backend and domain adapter proposals without executing adapters or testing connections.",
    primaryLabel: "Review adapter manifest",
    groupLabel: "Adapter manifest fields",
    previewFocus: "backend adapters, domain adapters, approval gates, shared evidence/result review, execution denial, and operator decision state",
    language: BUILD_PLAN_ADAPTER_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["runtime manifest", "adapter manifest", "backend adapters", "domain adapters", "approval gates", "shared evidence/result review", "execution denial", "operator decision state"],
    routes: ["/build-plan-runtime-manifest-packet", "/build-plan-validation-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-runtime-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-validation-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-validation-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-validation-manifest-packet",
    phase: "Phase 1042",
    title: "Build Plan Validation Manifest Packet",
    markerTitle: "Build plan validation manifest packet",
    safetyCopy: "Build plan validation manifest packet does not run validation",
    approvalCopy: "Validation manifests require explicit operator approval",
    supportCopy: "Validation manifests include planned tests and smoke checks",
    deniedCopy: "Denied build validation manifest paths remain blocked",
    checklistLabel: "Build plan validation manifest checklist",
    subtitle: "Review planned tests and smoke checks without executing test, build, smoke, lint, or validation commands.",
    primaryLabel: "Review validation manifest",
    groupLabel: "Validation manifest fields",
    previewFocus: "planned tests, smoke checks, validation gate, non-execution state, evidence handoff, and operator decision state",
    language: BUILD_PLAN_VALIDATION_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["adapter manifest", "validation manifest", "planned tests", "smoke checks", "validation gate", "non-execution state", "evidence handoff", "operator decision state"],
    routes: ["/build-plan-adapter-manifest-packet", "/build-plan-risk-manifest-packet", "/build-plan-approval-manifest-packet"],
    links: [
      { href: "/build-plan-adapter-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-approval-manifest-packet", label: "Approval Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-risk-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-risk-manifest-packet",
    phase: "Phase 1043",
    title: "Build Plan Risk Manifest Packet",
    markerTitle: "Build plan risk manifest packet",
    safetyCopy: "Build plan risk manifest packet does not approve risk",
    approvalCopy: "Risk manifests require explicit operator approval",
    supportCopy: "Risk manifests gate model spend remote calls privacy and tool use",
    deniedCopy: "Denied build risk manifest paths remain blocked",
    checklistLabel: "Build plan risk manifest checklist",
    subtitle: "Review risk gates for spend, remote calls, privacy, tools, and local workspace context without approving them automatically.",
    primaryLabel: "Review risk manifest",
    groupLabel: "Risk manifest fields",
    previewFocus: "model spend gate, remote call gate, privacy class, tool-use gate, denied risk approval state, and operator decision state",
    language: BUILD_PLAN_RISK_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["validation manifest", "risk manifest", "model spend gate", "remote call gate", "privacy class", "tool-use gate", "denied risk approval state", "operator decision state"],
    routes: ["/build-plan-validation-manifest-packet", "/build-plan-approval-manifest-packet", "/build-plan-evidence-manifest-packet"],
    links: [
      { href: "/build-plan-validation-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-approval-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-evidence-manifest-packet", label: "Evidence Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-approval-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-approval-manifest-packet",
    phase: "Phase 1044",
    title: "Build Plan Approval Manifest Packet",
    markerTitle: "Build plan approval manifest packet",
    safetyCopy: "Build plan approval manifest packet does not approve actions",
    approvalCopy: "Approval manifests require explicit operator approval",
    supportCopy: "Approval manifests list every gated model backend and domain action",
    deniedCopy: "Denied build approval manifest paths remain blocked",
    checklistLabel: "Build plan approval manifest checklist",
    subtitle: "Review every model, backend, domain, file, command, runtime, validation, evidence, result, and recovery gate without approving actions.",
    primaryLabel: "Review approval manifest",
    groupLabel: "Approval manifest fields",
    previewFocus: "approval manifest, model gates, backend gates, domain gates, denied automatic approval state, and operator decision state",
    language: BUILD_PLAN_APPROVAL_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["risk manifest", "approval manifest", "model gates", "backend gates", "domain gates", "denied automatic approval state", "operator decision state"],
    routes: ["/build-plan-risk-manifest-packet", "/build-plan-evidence-manifest-packet", "/build-plan-bundle-boundary"],
    links: [
      { href: "/build-plan-risk-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-evidence-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-bundle-boundary", label: "Bundle Boundary" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-evidence-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-evidence-manifest-packet",
    phase: "Phase 1045",
    title: "Build Plan Evidence Manifest Packet",
    markerTitle: "Build plan evidence manifest packet",
    safetyCopy: "Build plan evidence manifest packet does not persist evidence",
    approvalCopy: "Evidence manifests require explicit operator approval",
    supportCopy: "Evidence manifests route outputs through shared evidence review",
    deniedCopy: "Denied build evidence manifest paths remain blocked",
    checklistLabel: "Build plan evidence manifest checklist",
    subtitle: "Review evidence routes without capturing, ingesting, persisting, or promoting evidence automatically.",
    primaryLabel: "Review evidence manifest",
    groupLabel: "Evidence manifest fields",
    previewFocus: "evidence manifest, evidence review route, capture denial, persistence denial, shared evidence gate, and operator decision state",
    language: BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["approval manifest", "evidence manifest", "evidence review route", "capture denial", "persistence denial", "shared evidence gate", "operator decision state"],
    routes: ["/build-plan-approval-manifest-packet", "/build-plan-result-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-approval-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-result-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-result-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-result-manifest-packet",
    phase: "Phase 1046",
    title: "Build Plan Result Manifest Packet",
    markerTitle: "Build plan result manifest packet",
    safetyCopy: "Build plan result manifest packet does not persist results",
    approvalCopy: "Result manifests require explicit operator approval",
    supportCopy: "Result manifests route outputs through shared result review",
    deniedCopy: "Denied build result manifest paths remain blocked",
    checklistLabel: "Build plan result manifest checklist",
    subtitle: "Review result routes without storing outputs, reusing results, or promoting memory automatically.",
    primaryLabel: "Review result manifest",
    groupLabel: "Result manifest fields",
    previewFocus: "result manifest, output review route, output storage denial, shared result gate, memory promotion denial, and operator decision state",
    language: BUILD_PLAN_RESULT_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["evidence manifest", "result manifest", "output review route", "output storage denial", "shared result gate", "memory promotion denial", "operator decision state"],
    routes: ["/build-plan-evidence-manifest-packet", "/build-plan-recovery-manifest-packet", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-evidence-manifest-packet", label: "Previous Phase" },
      { href: "/build-plan-recovery-manifest-packet", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "build-plan-recovery-manifest-packet": buildBuildPlanBundleDefinition({
    slug: "build-plan-recovery-manifest-packet",
    phase: "Phase 1047",
    title: "Build Plan Recovery Manifest Packet",
    markerTitle: "Build plan recovery manifest packet",
    safetyCopy: "Build plan recovery manifest packet does not trigger recovery",
    approvalCopy: "Recovery manifests require explicit operator approval",
    supportCopy: "Recovery manifests include rollback backup and restore checkpoints",
    deniedCopy: "Denied build recovery manifest paths remain blocked",
    checklistLabel: "Build plan recovery manifest checklist",
    subtitle: "Review rollback, backup, and restore checkpoints without triggering recovery or writing backup artifacts.",
    primaryLabel: "Review recovery manifest",
    groupLabel: "Recovery manifest fields",
    previewFocus: "rollback checkpoints, backup checkpoints, restore checkpoints, recovery evidence gate, denied recovery trigger state, and operator decision state",
    language: BUILD_PLAN_RECOVERY_MANIFEST_PACKET_LANGUAGE,
    fieldItems: ["result manifest", "recovery manifest", "rollback checkpoints", "backup checkpoints", "restore checkpoints", "recovery evidence gate", "denied recovery trigger state", "operator decision state"],
    routes: ["/build-plan-result-manifest-packet", "/first-complete-build-plan-candidate", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-result-manifest-packet", label: "Previous Phase" },
      { href: "/first-complete-build-plan-candidate", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "first-complete-build-plan-candidate": buildBuildPlanBundleDefinition({
    slug: "first-complete-build-plan-candidate",
    phase: "Phase 1048",
    title: "First Complete Build Plan Candidate",
    markerTitle: "First complete build plan candidate",
    safetyCopy: "First complete build plan candidate does not execute builds",
    approvalCopy: "Complete build plan candidates require explicit operator approval",
    supportCopy: "Candidate packets combine summary requirements architecture files commands runtimes adapters validation risk approvals evidence results and recovery",
    deniedCopy: "Denied complete build plan candidate paths remain blocked",
    checklistLabel: "First complete build plan checklist",
    subtitle: "Review the first complete build plan candidate without executing builds, running adapters, or persisting outputs.",
    primaryLabel: "Review complete candidate",
    groupLabel: "Complete candidate fields",
    previewFocus: "combined packet with summary, requirements, architecture, files, commands, runtimes, adapters, validation, risk, approvals, evidence, results, recovery, denied execution, and operator decision state",
    language: FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_LANGUAGE,
    fieldItems: ["summary", "requirements", "architecture", "files", "commands", "runtimes", "adapters", "validation", "risk", "approvals", "evidence", "results", "recovery", "denied execution", "operator decision state"],
    routes: ["/build-plan-recovery-manifest-packet", "/controlled-build-plan-bundle-release-candidate", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/build-plan-recovery-manifest-packet", label: "Previous Phase" },
      { href: "/controlled-build-plan-bundle-release-candidate", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  "controlled-build-plan-bundle-release-candidate": buildBuildPlanBundleDefinition({
    slug: "controlled-build-plan-bundle-release-candidate",
    phase: "Phase 1049",
    title: "Controlled Build Plan Bundle Release Candidate",
    markerTitle: "Controlled build plan bundle release candidate",
    safetyCopy: "Controlled build plan bundle release candidate does not call models or execute adapters",
    approvalCopy: "Controlled build plan release requires explicit operator approval",
    supportCopy: "Release candidate supports build anything goals with shared brain gates",
    deniedCopy: "Denied controlled build plan bundle paths remain blocked",
    checklistLabel: "Controlled build plan bundle release checklist",
    subtitle: "Review the controlled build plan bundle release candidate without model calls, provider calls, prompt sending, or adapter execution.",
    primaryLabel: "Review build plan RC",
    groupLabel: "Release candidate fields",
    previewFocus: "release candidate packet, broad target support, shared brain gates, model routing policy, backend/domain adapter gates, evidence, result, audit, approval, denied execution, and operator decision state",
    language: CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_LANGUAGE,
    fieldItems: ["release candidate packet", "broad target support", "shared brain gates", "model routing policy", "backend/domain adapter gates", "evidence", "result", "audit", "approval", "denied execution", "operator decision state"],
    routes: ["/first-complete-build-plan-candidate", "/build-plan-approval-boundary", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/first-complete-build-plan-candidate", label: "Previous Phase" },
      { href: "/build-plan-approval-boundary", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
  ...(Object.fromEntries(
    BUILD_PLAN_APPROVAL_DEFINITION_INPUTS.map((input) => [input.slug, buildBuildPlanBundleDefinition(input)])
  ) as Record<BuildPlanApprovalReviewSlug, BuildPlanBundleDefinition>),
};

export function buildBuildPlanBundleReview(slug: BuildPlanBundleReviewSlug, input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket(slug, input);
}

export function buildBuildPlanBundleReviewAdvancedDetails(title: string, language: readonly string[], details: readonly string[]): string {
  return buildControlledBuilderReviewAdvancedDetails(title, language, [...details, ...BUILD_PLAN_BUNDLE_PREVIEW_SAFETY_MARKERS]);
}

export function buildBuildPlanBundleReviewSections(...sections: DailyBetaOneReleaseReviewSection[]): DailyBetaOneReleaseReviewSection[] {
  return buildControlledBuilderReviewSections(...sections);
}

export function buildBuildPlanBundleReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function getBuildPlanBundleReviewDefinition(slug: BuildPlanBundleReviewSlug) {
  return BUILD_PLAN_BUNDLE_DEFINITIONS[slug];
}

export function buildBuildPlanBundleReviewPackets(slug: BuildPlanBundleReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getBuildPlanBundleReviewDefinition(slug);
  const sections = buildBuildPlanBundleReviewSections(
    { label: definition.groupLabel, items: [definition.groupLabel + ": " + joinSentence(definition.fieldItems) + "."] },
    { label: definition.checklistLabel, items: [definition.checklistLabel + ": " + joinSentence(BUILD_PLAN_BUNDLE_PACKET_FIELDS) + "."] },
    { label: "Supported target families", items: ["Supported target families: " + joinSentence(SUPPORTED_BUILD_PLAN_TARGET_FAMILIES) + "."] },
    { label: "Model router policy", items: ["Cheapest capable model wins if safe; local model preferred for private files, codebases, sensitive plans, local workspace context, and local game/server config; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for games/research/creative/trading/coding/automation."] },
    { label: "Backend adapter policy", items: ["Backend adapter proposals remain preview-only, name their approval gate, and return through shared evidence/result review after explicit operator approval."] },
    { label: "Domain adapter policy", items: ["Game, app, website, dashboard, tool, research, automation, creative, trading, data, documentation, integration, and general project adapter proposals remain preview-only until explicit operator approval."] },
    { label: "Denied live execution state", items: [definition.deniedCopy, definition.safetyCopy] },
    { label: "Operator approval state", items: [definition.approvalCopy, "All real execution requires explicit operator approval."] }
  );
  return [buildBuildPlanBundleReview(slug, { idHint: slug, status: "blocked", identity: definition.identity, sections, routes: [...definition.routes], nextRecommendedAction: "What this unlocks next: " + definition.nextRecommendedAction, advancedDetails: buildBuildPlanBundleReviewAdvancedDetails(definition.slug, definition.language, definition.advancedDetails) })];
}

export function summarizeBuildPlanBundleReview(title: string, packets: readonly UniversalExecutionReviewPacket[], approvalCopy: string): string {
  return summarizeControlledBuilderReview(title, packets, approvalCopy);
}

export function summarizeBuildPlanBundleReviewForSlug(slug: BuildPlanBundleReviewSlug, packets: readonly UniversalExecutionReviewPacket[]): string {
  const definition = getBuildPlanBundleReviewDefinition(slug);
  return summarizeBuildPlanBundleReview(definition.title, packets, definition.approvalCopy);
}

export function buildBuildPlanBundleReviewModelForSlug(slug: BuildPlanBundleReviewSlug, packets = buildBuildPlanBundleReviewPackets(slug)) {
  const definition = getBuildPlanBundleReviewDefinition(slug);
  return buildControlledBuilderReviewModel({ phase: definition.phase, title: definition.title, summary: summarizeBuildPlanBundleReviewForSlug(slug, packets), subtitle: definition.subtitle, primaryLabel: definition.primaryLabel, anchor: definition.slug, plainEnglishTitle: definition.plainEnglishTitle, plainEnglishCopy: definition.plainEnglishCopy, language: [...definition.language], markers: [...definition.language, ...BUILD_PLAN_BUNDLE_PREVIEW_SAFETY_MARKERS], links: [...definition.links], packets, advancedSummary: "Advanced " + definition.title + " details", advancedDetails: [...definition.advancedDetails, ...BUILD_PLAN_BUNDLE_PREVIEW_SAFETY_MARKERS], advancedCopy: definition.advancedCopy, dataScope: definition.dataScope });
}
