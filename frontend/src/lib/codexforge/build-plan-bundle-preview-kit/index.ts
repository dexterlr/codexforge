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
  | "controlled-build-plan-bundle-release-candidate";

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

const BUILD_PLAN_BUNDLE_PACKET_FIELDS = [
  "original operator goal",
  "clarified goal",
  "target family",
  "target recommendation",
  "requirements",
  "architecture sketch",
  "file manifest",
  "command manifest",
  "runtime manifest",
  "adapter manifest",
  "validation manifest",
  "risk manifest",
  "approval manifest",
  "evidence manifest",
  "result manifest",
  "recovery manifest",
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
    routes: ["/first-complete-build-plan-candidate", "/build-plan-bundle-boundary", "/build-plan-risk-manifest-packet"],
    links: [
      { href: "/first-complete-build-plan-candidate", label: "Previous Phase" },
      { href: "/build-plan-bundle-boundary", label: "Next Phase" },
      { href: "/build-plan-risk-manifest-packet", label: "Risk Manifest" },
    ],
    nextRecommendedAction: "Review the next build plan bundle packet while live execution, model calls, provider calls, backend adapters, domain adapters, files, commands, runtimes, validation, evidence, results, recovery, and packaging remain blocked.",
  }),
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
