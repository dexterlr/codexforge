import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  buildAdapterBackedExecutionPreviewStableKey as buildBackendAdapterImplementationPreviewStableKey,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildBackendAdapterImplementationPreviewStableKey };

export type BackendAdapterImplementationPreviewPacketInput = AdapterBackedExecutionPreviewPacketInput;

export type BackendAdapterImplementationPreviewSlug =
  | "backend-adapter-implementation-scaffold"
  | "file-write-backend-adapter-preview"
  | "command-runner-backend-adapter-preview"
  | "local-runtime-backend-adapter-preview"
  | "evidence-store-backend-adapter-preview"
  | "result-store-backend-adapter-preview"
  | "recovery-backend-adapter-preview"
  | "packaging-backend-adapter-preview"
  | "project-scaffold-backend-adapter-preview"
  | "backend-adapter-approval-preview"
  | "backend-adapter-audit-preview"
  | "backend-adapter-sandbox-preview"
  | "backend-adapter-validation-preview"
  | "backend-adapter-operator-trial-preview"
  | "backend-adapter-dry-run-candidate"
  | "first-backend-adapter-implementation-preview-candidate";

type BackendAdapterImplementationPreviewSectionInput = {
  label: string;
  items: string[];
};

type BackendAdapterImplementationPreviewDefinition = {
  slug: BackendAdapterImplementationPreviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  summarySubject: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  identity: string;
  language: readonly string[];
  advancedDetails: readonly string[];
  sections: readonly BackendAdapterImplementationPreviewSectionInput[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  advancedCopy: string;
  dataScope: string;
};

export const BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_SAFETY_MARKERS = [
  "backend adapter implementation preview only",
  "deterministic static review content",
  "adapter behavior remains preview-only",
  "no backend adapter run",
  "no live adapter calls",
  "no filesystem mutation from adapter previews",
  "no backend file writes",
  "no backend command execution",
  "no backend runtime start",
  "no evidence persistence",
  "no result persistence",
  "no recovery trigger",
  "no package/export behavior",
  "no project creation behavior",
  "no approval shortcuts",
  "no hidden approvals",
  "clear denied-path copy",
  "clear operator approval copy",
  "future model-router remains bounded and unimplemented",
  "future model-router may consider task domain, quality need, cost, speed, context window, privacy/locality, tool support, failure history, operator preference, and approval policy",
  "no live model routing",
  ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
] as const;

export const BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_LANGUAGE = [
  "Backend adapter implementation scaffold",
  "Backend adapter implementation scaffold does not run adapters",
  "Adapter implementation remains preview-only",
  "Implementation requires explicit operator approval",
  "Denied adapter implementation paths remain blocked",
  "Adapter scaffold groups",
  "Backend implementation checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const FILE_WRITE_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "File write backend adapter preview",
  "File write backend adapter preview does not write files",
  "File writes require explicit operator approval",
  "Denied file write paths remain blocked",
  "File write adapter groups",
  "File write preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Command runner backend adapter preview",
  "Command runner backend adapter preview does not execute commands",
  "Command execution requires explicit operator approval",
  "Denied command paths remain blocked",
  "Command adapter groups",
  "Command preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Local runtime backend adapter preview",
  "Local runtime backend adapter preview does not start runtimes",
  "Runtime execution requires explicit operator approval",
  "Denied runtime paths remain blocked",
  "Local runtime adapter groups",
  "Runtime preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Evidence store backend adapter preview",
  "Evidence store backend adapter preview does not persist evidence",
  "Evidence persistence requires explicit operator approval",
  "Denied evidence store paths remain blocked",
  "Evidence store adapter groups",
  "Evidence preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const RESULT_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Result store backend adapter preview",
  "Result store backend adapter preview does not persist results",
  "Result persistence requires explicit operator approval",
  "Denied result store paths remain blocked",
  "Result store adapter groups",
  "Result preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const RECOVERY_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Recovery backend adapter preview",
  "Recovery backend adapter preview does not trigger recovery",
  "Recovery execution requires explicit operator approval",
  "Denied recovery paths remain blocked",
  "Recovery adapter groups",
  "Recovery preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const PACKAGING_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Packaging backend adapter preview",
  "Packaging backend adapter preview does not package or export",
  "Packaging requires explicit operator approval",
  "Denied packaging paths remain blocked",
  "Packaging adapter groups",
  "Packaging preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_LANGUAGE = [
  "Project scaffold backend adapter preview",
  "Project scaffold backend adapter preview does not create projects",
  "Project scaffold creation requires explicit operator approval",
  "Denied scaffold paths remain blocked",
  "Project scaffold adapter groups",
  "Project scaffold preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_APPROVAL_PREVIEW_LANGUAGE = [
  "Backend adapter approval preview",
  "Backend adapter approval preview does not approve actions",
  "Adapter approvals require explicit operator confirmation",
  "Denied approval shortcuts remain blocked",
  "Approval adapter groups",
  "Approval preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_AUDIT_PREVIEW_LANGUAGE = [
  "Backend adapter audit preview",
  "Backend adapter audit preview does not write audit records",
  "Audit persistence requires explicit operator approval",
  "Denied audit paths remain blocked",
  "Audit adapter groups",
  "Audit preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_SANDBOX_PREVIEW_LANGUAGE = [
  "Backend adapter sandbox preview",
  "Backend adapter sandbox preview does not start sandboxes",
  "Sandbox activation requires explicit operator approval",
  "Denied sandbox paths remain blocked",
  "Sandbox adapter groups",
  "Sandbox preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_VALIDATION_PREVIEW_LANGUAGE = [
  "Backend adapter validation preview",
  "Backend adapter validation preview does not run validation",
  "Validation execution requires explicit operator approval",
  "Denied validation paths remain blocked",
  "Validation adapter groups",
  "Validation preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_LANGUAGE = [
  "Backend adapter operator trial preview",
  "Backend adapter operator trial preview does not start trials",
  "Operator trials require explicit approval",
  "Denied operator trial paths remain blocked",
  "Operator trial groups",
  "Operator trial preview checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const BACKEND_ADAPTER_DRY_RUN_CANDIDATE_LANGUAGE = [
  "Backend adapter dry-run candidate",
  "Backend adapter dry-run candidate does not execute dry-runs automatically",
  "Dry-run execution requires explicit operator approval",
  "Denied dry-run paths remain blocked",
  "Dry-run candidate groups",
  "Dry-run candidate checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

export const FIRST_BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_CANDIDATE_LANGUAGE = [
  "First backend adapter implementation preview candidate",
  "First backend adapter implementation preview candidate does not run live adapters",
  "Backend adapter implementation preview requires explicit operator approval",
  "Denied implementation candidate paths remain blocked",
  "Implementation candidate groups",
  "Implementation candidate checklist",
  "static implementation preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "denied paths remain blocked",
  "future model-router bounded concern",
  "no live model routing",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildImplementationFieldLine(items: readonly string[]): string {
  return `Implementation preview fields: ${sentenceList(items)}.`;
}

function buildDefinition(input: {
  slug: BackendAdapterImplementationPreviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel: string;
  safetyCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  implementationFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
}): BackendAdapterImplementationPreviewDefinition {
  const fieldLine = buildImplementationFieldLine(input.fieldItems);
  const modelRouterBoundary =
    "Future model-router layer remains unimplemented: it may later choose among paid, free, local, remote, and specialist AI models by task domain, quality need, cost, speed, context window, privacy/locality, tool support, failure history, operator preference, and approval policy, but this batch performs no live model routing.";
  const safetyBoundary =
    `${input.safetyCopy}. ${input.deniedCopy}. This surface is a deterministic static review surface, preview-only, review-only, not executable from UI, operator-approved, and approval required before any backend adapter behavior can exist.`;
  const unresolvedBlockers =
    "Unresolved blockers: backend owner, local bridge owner, explicit operator approval flow, sandbox enforcement, denied path enforcement, audit persistence boundary, evidence/result policy, validation evidence, rollback/recovery owner, privacy/redaction review, denial behavior, model-router boundary review, and operator handoff.";

  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    markerTitle: input.markerTitle,
    summarySubject: input.title,
    approvalCopy: input.approvalCopy,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    anchor: input.slug,
    plainEnglishTitle: `Plain-English ${input.title.toLowerCase()}`,
    plainEnglishCopy: `${input.markerTitle}. ${safetyBoundary} ${input.approvalCopy} ${fieldLine} ${modelRouterBoundary} What this unlocks next: ${input.nextRecommendedAction}`,
    identity: `${input.title} identity: ${input.markerTitle}. ${input.safetyCopy}. ${input.approvalCopy} ${input.deniedCopy}. This is static implementation preview only, not executable from UI, approval required, and no live adapter calls are available.`,
    language: input.language,
    advancedDetails: [
      `${input.title} identity`,
      input.markerTitle,
      fieldLine,
      `${input.groupLabel}: ${sentenceList(input.fieldItems)}.`,
      `${input.checklistLabel}: approval copy, denied path copy, sandbox boundary, audit placeholder, evidence/result placeholder, recovery note, validation handoff, and operator handoff.`,
      `Implementation focus: ${input.implementationFocus}.`,
      safetyBoundary,
      modelRouterBoundary,
      unresolvedBlockers,
      `What this unlocks next: ${input.nextRecommendedAction}`,
    ],
    sections: [
      { label: input.groupLabel, items: [`${input.groupLabel}: ${sentenceList(input.fieldItems)}.`] },
      { label: input.checklistLabel, items: [`${input.checklistLabel}: approval copy, denied path copy, sandbox boundary, audit placeholder, evidence/result placeholder, recovery note, validation handoff, and operator handoff.`] },
      { label: "Safety boundary", items: [safetyBoundary] },
      { label: "Future model-router boundary", items: [modelRouterBoundary] },
      { label: "Unresolved blockers", items: [unresolvedBlockers] },
      { label: "What this unlocks next", items: [`What this unlocks next: ${input.nextRecommendedAction}`] },
    ],
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: `What this unlocks next: ${input.nextRecommendedAction}`,
    advancedCopy: `advanced ${input.slug} details collapsed/secondary. This route is static implementation preview only, preview-only, not executable from UI, and ${input.safetyCopy.toLowerCase()}.`,
    dataScope: `${input.slug} backend adapter implementation preview surface`,
  };
}

export const BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_DEFINITIONS: Record<BackendAdapterImplementationPreviewSlug, BackendAdapterImplementationPreviewDefinition> = {
  "backend-adapter-implementation-scaffold": buildDefinition({
    slug: "backend-adapter-implementation-scaffold",
    phase: "Phase 810",
    title: "Backend Adapter Implementation Scaffold",
    markerTitle: "Backend adapter implementation scaffold",
    approvalCopy: "Implementation requires explicit operator approval.",
    subtitle: "Review the Backend adapter implementation scaffold without live adapter behavior.",
    primaryLabel: "Review implementation scaffold",
    safetyCopy: "Backend adapter implementation scaffold does not run adapters",
    deniedCopy: "Denied adapter implementation paths remain blocked",
    groupLabel: "Adapter scaffold groups",
    checklistLabel: "Backend implementation checklist",
    language: BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_LANGUAGE,
    fieldItems: ["adapter family", "preview module", "approval gate", "denied path policy", "audit/evidence/result placeholders", "validation handoff"],
    implementationFocus: "adapter implementation module boundaries, approval gates, denied paths, and static handoff checks",
    routes: ["/file-write-backend-adapter-preview", "/backend-adapter-approval-preview", "/first-backend-adapter-implementation-preview-candidate"],
    links: [
      { href: "/file-write-backend-adapter-preview", label: "File adapter preview" },
      { href: "/backend-adapter-approval-preview", label: "Approval preview" },
      { href: "/first-backend-adapter-implementation-preview-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "review the file write backend adapter preview and approval preview before any backend adapter implementation is considered.",
  }),
  "file-write-backend-adapter-preview": buildDefinition({
    slug: "file-write-backend-adapter-preview",
    phase: "Phase 811",
    title: "File Write Backend Adapter Preview",
    markerTitle: "File write backend adapter preview",
    approvalCopy: "File writes require explicit operator approval.",
    subtitle: "Review the File write backend adapter preview without live adapter behavior.",
    primaryLabel: "Review file write preview",
    safetyCopy: "File write backend adapter preview does not write files",
    deniedCopy: "Denied file write paths remain blocked",
    groupLabel: "File write adapter groups",
    checklistLabel: "File write preview checklist",
    language: FILE_WRITE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["target path preview", "operation kind", "diff placeholder", "rollback note", "denied path reason", "audit/evidence/result placeholders"],
    implementationFocus: "file write request envelopes, denied path handling, diff placeholders, and rollback expectations",
    routes: ["/backend-adapter-implementation-scaffold", "/command-runner-backend-adapter-preview", "/backend-adapter-sandbox-preview"],
    links: [
      { href: "/backend-adapter-implementation-scaffold", label: "Implementation scaffold" },
      { href: "/command-runner-backend-adapter-preview", label: "Command preview" },
      { href: "/backend-adapter-sandbox-preview", label: "Sandbox preview" },
    ],
    nextRecommendedAction: "lock denied path and approval copy before any file write backend adapter can move beyond preview.",
  }),
  "command-runner-backend-adapter-preview": buildDefinition({
    slug: "command-runner-backend-adapter-preview",
    phase: "Phase 812",
    title: "Command Runner Backend Adapter Preview",
    markerTitle: "Command runner backend adapter preview",
    approvalCopy: "Command execution requires explicit operator approval.",
    subtitle: "Review the Command runner backend adapter preview without live adapter behavior.",
    primaryLabel: "Review command preview",
    safetyCopy: "Command runner backend adapter preview does not execute commands",
    deniedCopy: "Denied command paths remain blocked",
    groupLabel: "Command adapter groups",
    checklistLabel: "Command preview checklist",
    language: COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["command preview", "working directory policy", "argument redaction", "timeout policy", "denied command reason", "audit/evidence/result placeholders"],
    implementationFocus: "command request previews, working directory policy, timeout notes, redaction, and denied command handling",
    routes: ["/file-write-backend-adapter-preview", "/local-runtime-backend-adapter-preview", "/backend-adapter-validation-preview"],
    links: [
      { href: "/file-write-backend-adapter-preview", label: "File preview" },
      { href: "/local-runtime-backend-adapter-preview", label: "Runtime preview" },
      { href: "/backend-adapter-validation-preview", label: "Validation preview" },
    ],
    nextRecommendedAction: "define command denial, redaction, timeout, and validation evidence before command execution can be considered.",
  }),
  "local-runtime-backend-adapter-preview": buildDefinition({
    slug: "local-runtime-backend-adapter-preview",
    phase: "Phase 813",
    title: "Local Runtime Backend Adapter Preview",
    markerTitle: "Local runtime backend adapter preview",
    approvalCopy: "Runtime execution requires explicit operator approval.",
    subtitle: "Review the Local runtime backend adapter preview without live adapter behavior.",
    primaryLabel: "Review runtime preview",
    safetyCopy: "Local runtime backend adapter preview does not start runtimes",
    deniedCopy: "Denied runtime paths remain blocked",
    groupLabel: "Local runtime adapter groups",
    checklistLabel: "Runtime preview checklist",
    language: LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["runtime name", "lifecycle preview", "port/network policy", "stop policy", "log placeholder", "denied runtime reason"],
    implementationFocus: "local runtime lifecycle previews, port/network policy, stop policy, logs, and denied runtime paths",
    routes: ["/command-runner-backend-adapter-preview", "/backend-adapter-sandbox-preview", "/backend-adapter-operator-trial-preview"],
    links: [
      { href: "/command-runner-backend-adapter-preview", label: "Command preview" },
      { href: "/backend-adapter-sandbox-preview", label: "Sandbox preview" },
      { href: "/backend-adapter-operator-trial-preview", label: "Operator trial" },
    ],
    nextRecommendedAction: "define runtime lifecycle and sandbox policies before any local runtime start behavior is proposed.",
  }),
  "evidence-store-backend-adapter-preview": buildDefinition({
    slug: "evidence-store-backend-adapter-preview",
    phase: "Phase 814",
    title: "Evidence Store Backend Adapter Preview",
    markerTitle: "Evidence store backend adapter preview",
    approvalCopy: "Evidence persistence requires explicit operator approval.",
    subtitle: "Review the Evidence store backend adapter preview without live adapter behavior.",
    primaryLabel: "Review evidence preview",
    safetyCopy: "Evidence store backend adapter preview does not persist evidence",
    deniedCopy: "Denied evidence store paths remain blocked",
    groupLabel: "Evidence store adapter groups",
    checklistLabel: "Evidence preview checklist",
    language: EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["source preview", "citation placeholder", "redaction policy", "retention policy", "privacy note", "denied evidence reason"],
    implementationFocus: "evidence envelopes, citation, redaction, retention, privacy, and denied persistence paths",
    routes: ["/result-store-backend-adapter-preview", "/backend-adapter-audit-preview", "/backend-adapter-validation-preview"],
    links: [
      { href: "/result-store-backend-adapter-preview", label: "Result preview" },
      { href: "/backend-adapter-audit-preview", label: "Audit preview" },
      { href: "/backend-adapter-validation-preview", label: "Validation preview" },
    ],
    nextRecommendedAction: "define evidence redaction, retention, privacy, and audit links before evidence persistence is implemented.",
  }),
  "result-store-backend-adapter-preview": buildDefinition({
    slug: "result-store-backend-adapter-preview",
    phase: "Phase 815",
    title: "Result Store Backend Adapter Preview",
    markerTitle: "Result store backend adapter preview",
    approvalCopy: "Result persistence requires explicit operator approval.",
    subtitle: "Review the Result store backend adapter preview without live adapter behavior.",
    primaryLabel: "Review result preview",
    safetyCopy: "Result store backend adapter preview does not persist results",
    deniedCopy: "Denied result store paths remain blocked",
    groupLabel: "Result store adapter groups",
    checklistLabel: "Result preview checklist",
    language: RESULT_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["result source preview", "acceptance state", "reuse scope", "privacy/safety note", "retention policy", "denied result reason"],
    implementationFocus: "result envelopes, acceptance state, reuse scope, privacy, retention, and denied storage paths",
    routes: ["/evidence-store-backend-adapter-preview", "/backend-adapter-audit-preview", "/first-backend-adapter-implementation-preview-candidate"],
    links: [
      { href: "/evidence-store-backend-adapter-preview", label: "Evidence preview" },
      { href: "/backend-adapter-audit-preview", label: "Audit preview" },
      { href: "/first-backend-adapter-implementation-preview-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "lock acceptance, reuse, privacy, and retention before result persistence or reuse exists.",
  }),
  "recovery-backend-adapter-preview": buildDefinition({
    slug: "recovery-backend-adapter-preview",
    phase: "Phase 816",
    title: "Recovery Backend Adapter Preview",
    markerTitle: "Recovery backend adapter preview",
    approvalCopy: "Recovery execution requires explicit operator approval.",
    subtitle: "Review the Recovery backend adapter preview without live adapter behavior.",
    primaryLabel: "Review recovery preview",
    safetyCopy: "Recovery backend adapter preview does not trigger recovery",
    deniedCopy: "Denied recovery paths remain blocked",
    groupLabel: "Recovery adapter groups",
    checklistLabel: "Recovery preview checklist",
    language: RECOVERY_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["failure source", "recovery mode", "retry scope", "rollback target", "cleanup plan", "denied recovery reason"],
    implementationFocus: "recovery envelopes, retry scope, rollback targets, cleanup plans, escalation, and denied recovery paths",
    routes: ["/file-write-backend-adapter-preview", "/command-runner-backend-adapter-preview", "/backend-adapter-operator-trial-preview"],
    links: [
      { href: "/file-write-backend-adapter-preview", label: "File preview" },
      { href: "/command-runner-backend-adapter-preview", label: "Command preview" },
      { href: "/backend-adapter-operator-trial-preview", label: "Operator trial" },
    ],
    nextRecommendedAction: "define recovery ownership, rollback targets, cleanup, and escalation before recovery execution exists.",
  }),
  "packaging-backend-adapter-preview": buildDefinition({
    slug: "packaging-backend-adapter-preview",
    phase: "Phase 817",
    title: "Packaging Backend Adapter Preview",
    markerTitle: "Packaging backend adapter preview",
    approvalCopy: "Packaging requires explicit operator approval.",
    subtitle: "Review the Packaging backend adapter preview without live adapter behavior.",
    primaryLabel: "Review packaging preview",
    safetyCopy: "Packaging backend adapter preview does not package or export",
    deniedCopy: "Denied packaging paths remain blocked",
    groupLabel: "Packaging adapter groups",
    checklistLabel: "Packaging preview checklist",
    language: PACKAGING_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["artifact source", "bundle type", "destination preview", "license/redaction note", "handoff note", "denied packaging reason"],
    implementationFocus: "package/export envelopes, artifact sources, destinations, redaction, handoff, and denied packaging paths",
    routes: ["/result-store-backend-adapter-preview", "/backend-adapter-audit-preview", "/first-backend-adapter-implementation-preview-candidate"],
    links: [
      { href: "/result-store-backend-adapter-preview", label: "Result preview" },
      { href: "/backend-adapter-audit-preview", label: "Audit preview" },
      { href: "/first-backend-adapter-implementation-preview-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "define destination, handoff, rollback, redaction, and audit evidence before package or export behavior exists.",
  }),
  "project-scaffold-backend-adapter-preview": buildDefinition({
    slug: "project-scaffold-backend-adapter-preview",
    phase: "Phase 818",
    title: "Project Scaffold Backend Adapter Preview",
    markerTitle: "Project scaffold backend adapter preview",
    approvalCopy: "Project scaffold creation requires explicit operator approval.",
    subtitle: "Review the Project scaffold backend adapter preview without live adapter behavior.",
    primaryLabel: "Review scaffold preview",
    safetyCopy: "Project scaffold backend adapter preview does not create projects",
    deniedCopy: "Denied scaffold paths remain blocked",
    groupLabel: "Project scaffold adapter groups",
    checklistLabel: "Project scaffold preview checklist",
    language: PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
    fieldItems: ["project type", "template policy", "target path preview", "file write dependency", "command/runtime dependency", "denied scaffold reason"],
    implementationFocus: "project scaffold envelopes, template policy, target path policy, file/command/runtime dependencies, and denied scaffold paths",
    routes: ["/file-write-backend-adapter-preview", "/command-runner-backend-adapter-preview", "/local-runtime-backend-adapter-preview"],
    links: [
      { href: "/file-write-backend-adapter-preview", label: "File preview" },
      { href: "/command-runner-backend-adapter-preview", label: "Command preview" },
      { href: "/local-runtime-backend-adapter-preview", label: "Runtime preview" },
    ],
    nextRecommendedAction: "review file, command, runtime, audit, evidence, result, and recovery dependencies before any scaffold creation behavior exists.",
  }),
  "backend-adapter-approval-preview": buildDefinition({
    slug: "backend-adapter-approval-preview",
    phase: "Phase 819",
    title: "Backend Adapter Approval Preview",
    markerTitle: "Backend adapter approval preview",
    approvalCopy: "Adapter approvals require explicit operator confirmation.",
    subtitle: "Review the Backend adapter approval preview without live adapter behavior.",
    primaryLabel: "Review approval preview",
    safetyCopy: "Backend adapter approval preview does not approve actions",
    deniedCopy: "Denied approval shortcuts remain blocked",
    groupLabel: "Approval adapter groups",
    checklistLabel: "Approval preview checklist",
    language: BACKEND_ADAPTER_APPROVAL_PREVIEW_LANGUAGE,
    fieldItems: ["reviewer", "approval state", "denial reason", "expiry", "audit link placeholder", "denied shortcut reason"],
    implementationFocus: "approval envelopes, reviewer state, denial reasons, expiry, audit links, and shortcut denial",
    routes: ["/backend-adapter-implementation-scaffold", "/backend-adapter-audit-preview", "/backend-adapter-operator-trial-preview"],
    links: [
      { href: "/backend-adapter-implementation-scaffold", label: "Implementation scaffold" },
      { href: "/backend-adapter-audit-preview", label: "Audit preview" },
      { href: "/backend-adapter-operator-trial-preview", label: "Operator trial" },
    ],
    nextRecommendedAction: "define reviewer, denial, expiry, audit, and rollback rules before backend approval execution exists.",
  }),
  "backend-adapter-audit-preview": buildDefinition({
    slug: "backend-adapter-audit-preview",
    phase: "Phase 820",
    title: "Backend Adapter Audit Preview",
    markerTitle: "Backend adapter audit preview",
    approvalCopy: "Audit persistence requires explicit operator approval.",
    subtitle: "Review the Backend adapter audit preview without live adapter behavior.",
    primaryLabel: "Review audit preview",
    safetyCopy: "Backend adapter audit preview does not write audit records",
    deniedCopy: "Denied audit paths remain blocked",
    groupLabel: "Audit adapter groups",
    checklistLabel: "Audit preview checklist",
    language: BACKEND_ADAPTER_AUDIT_PREVIEW_LANGUAGE,
    fieldItems: ["actor", "request id", "adapter family", "approved operation preview", "denied operation preview", "redaction/retention note"],
    implementationFocus: "audit event envelopes, actor/request state, redaction, retention, evidence/result/recovery links, and denied audit paths",
    routes: ["/backend-adapter-approval-preview", "/evidence-store-backend-adapter-preview", "/result-store-backend-adapter-preview"],
    links: [
      { href: "/backend-adapter-approval-preview", label: "Approval preview" },
      { href: "/evidence-store-backend-adapter-preview", label: "Evidence preview" },
      { href: "/result-store-backend-adapter-preview", label: "Result preview" },
    ],
    nextRecommendedAction: "define redacted audit shape, retention, denial, and linkage rules before audit persistence exists.",
  }),
  "backend-adapter-sandbox-preview": buildDefinition({
    slug: "backend-adapter-sandbox-preview",
    phase: "Phase 821",
    title: "Backend Adapter Sandbox Preview",
    markerTitle: "Backend adapter sandbox preview",
    approvalCopy: "Sandbox activation requires explicit operator approval.",
    subtitle: "Review the Backend adapter sandbox preview without live adapter behavior.",
    primaryLabel: "Review sandbox preview",
    safetyCopy: "Backend adapter sandbox preview does not start sandboxes",
    deniedCopy: "Denied sandbox paths remain blocked",
    groupLabel: "Sandbox adapter groups",
    checklistLabel: "Sandbox preview checklist",
    language: BACKEND_ADAPTER_SANDBOX_PREVIEW_LANGUAGE,
    fieldItems: ["allowed paths", "denied paths", "process policy", "network policy", "provider/connector/automation exclusions", "validation link placeholder"],
    implementationFocus: "sandbox envelopes, allowed paths, denied paths, process policy, network policy, provider/connector/automation exclusions, and validation links",
    routes: ["/local-runtime-backend-adapter-preview", "/command-runner-backend-adapter-preview", "/backend-adapter-validation-preview"],
    links: [
      { href: "/local-runtime-backend-adapter-preview", label: "Runtime preview" },
      { href: "/command-runner-backend-adapter-preview", label: "Command preview" },
      { href: "/backend-adapter-validation-preview", label: "Validation preview" },
    ],
    nextRecommendedAction: "define enforceable sandbox and denial evidence before any sandbox activation exists.",
  }),
  "backend-adapter-validation-preview": buildDefinition({
    slug: "backend-adapter-validation-preview",
    phase: "Phase 822",
    title: "Backend Adapter Validation Preview",
    markerTitle: "Backend adapter validation preview",
    approvalCopy: "Validation execution requires explicit operator approval.",
    subtitle: "Review the Backend adapter validation preview without live adapter behavior.",
    primaryLabel: "Review validation preview",
    safetyCopy: "Backend adapter validation preview does not run validation",
    deniedCopy: "Denied validation paths remain blocked",
    groupLabel: "Validation adapter groups",
    checklistLabel: "Validation preview checklist",
    language: BACKEND_ADAPTER_VALIDATION_PREVIEW_LANGUAGE,
    fieldItems: ["smoke list preview", "build list preview", "repo hygiene check", "route coverage check", "checkpoint docs check", "denied validation reason"],
    implementationFocus: "validation envelopes, smoke/build/repo hygiene evidence, route coverage, checkpoint docs, and denied validation paths",
    routes: ["/file-write-backend-adapter-preview", "/backend-adapter-sandbox-preview", "/first-backend-adapter-implementation-preview-candidate"],
    links: [
      { href: "/file-write-backend-adapter-preview", label: "File preview" },
      { href: "/backend-adapter-sandbox-preview", label: "Sandbox preview" },
      { href: "/first-backend-adapter-implementation-preview-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "define terminal-owned validation evidence before backend validation execution exists.",
  }),
  "backend-adapter-operator-trial-preview": buildDefinition({
    slug: "backend-adapter-operator-trial-preview",
    phase: "Phase 823",
    title: "Backend Adapter Operator Trial Preview",
    markerTitle: "Backend adapter operator trial preview",
    approvalCopy: "Operator trials require explicit approval.",
    subtitle: "Review the Backend adapter operator trial preview without live adapter behavior.",
    primaryLabel: "Review operator trial",
    safetyCopy: "Backend adapter operator trial preview does not start trials",
    deniedCopy: "Denied operator trial paths remain blocked",
    groupLabel: "Operator trial groups",
    checklistLabel: "Operator trial preview checklist",
    language: BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_LANGUAGE,
    fieldItems: ["operator checklist", "approval review", "dry-run review", "sandbox review", "observation note", "denied operator trial reason"],
    implementationFocus: "operator trial envelopes, approval review, dry-run review, sandbox review, observation, validation, rollback, and handoff",
    routes: ["/backend-adapter-approval-preview", "/backend-adapter-validation-preview", "/backend-adapter-dry-run-candidate"],
    links: [
      { href: "/backend-adapter-approval-preview", label: "Approval preview" },
      { href: "/backend-adapter-validation-preview", label: "Validation preview" },
      { href: "/backend-adapter-dry-run-candidate", label: "Dry-run candidate" },
    ],
    nextRecommendedAction: "define the operator trial checklist and evidence handoff before any approved adapter trial exists.",
  }),
  "backend-adapter-dry-run-candidate": buildDefinition({
    slug: "backend-adapter-dry-run-candidate",
    phase: "Phase 824",
    title: "Backend Adapter Dry-Run Candidate",
    markerTitle: "Backend adapter dry-run candidate",
    approvalCopy: "Dry-run execution requires explicit operator approval.",
    subtitle: "Review the Backend adapter dry-run candidate without live adapter behavior.",
    primaryLabel: "Review dry-run candidate",
    safetyCopy: "Backend adapter dry-run candidate does not execute dry-runs automatically",
    deniedCopy: "Denied dry-run paths remain blocked",
    groupLabel: "Dry-run candidate groups",
    checklistLabel: "Dry-run candidate checklist",
    language: BACKEND_ADAPTER_DRY_RUN_CANDIDATE_LANGUAGE,
    fieldItems: ["request preview", "approval state preview", "sandbox state preview", "audit link placeholder", "validation link placeholder", "denied dry-run reason"],
    implementationFocus: "dry-run candidate envelopes, static request previews, approval, sandbox, audit, validation, and denied dry-run paths",
    routes: ["/backend-adapter-operator-trial-preview", "/backend-adapter-validation-preview", "/first-backend-adapter-implementation-preview-candidate"],
    links: [
      { href: "/backend-adapter-operator-trial-preview", label: "Operator trial" },
      { href: "/backend-adapter-validation-preview", label: "Validation preview" },
      { href: "/first-backend-adapter-implementation-preview-candidate", label: "Implementation candidate" },
    ],
    nextRecommendedAction: "confirm dry-run approval, sandbox, audit, and validation evidence before any dry-run execution exists.",
  }),
  "first-backend-adapter-implementation-preview-candidate": buildDefinition({
    slug: "first-backend-adapter-implementation-preview-candidate",
    phase: "Phase 825",
    title: "First Backend Adapter Implementation Preview Candidate",
    markerTitle: "First backend adapter implementation preview candidate",
    approvalCopy: "Backend adapter implementation preview requires explicit operator approval.",
    subtitle: "Review the First backend adapter implementation preview candidate without live adapter behavior.",
    primaryLabel: "Review implementation candidate",
    safetyCopy: "First backend adapter implementation preview candidate does not run live adapters",
    deniedCopy: "Denied implementation candidate paths remain blocked",
    groupLabel: "Implementation candidate groups",
    checklistLabel: "Implementation candidate checklist",
    language: FIRST_BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_CANDIDATE_LANGUAGE,
    fieldItems: ["scaffold", "file write", "command runner", "runtime", "evidence/result", "approval/audit/sandbox/validation/operator trial/dry-run"],
    implementationFocus: "the first complete backend adapter implementation preview candidate across scaffold, file, command, runtime, evidence, result, recovery, packaging, scaffold, approval, audit, sandbox, validation, operator trial, and dry-run surfaces",
    routes: ["/backend-adapter-implementation-scaffold", "/backend-adapter-dry-run-candidate", "/file-write-backend-adapter-preview"],
    links: [
      { href: "/backend-adapter-implementation-scaffold", label: "Implementation scaffold" },
      { href: "/backend-adapter-dry-run-candidate", label: "Dry-run candidate" },
      { href: "/file-write-backend-adapter-preview", label: "File preview" },
    ],
    nextRecommendedAction: "keep implementation preview static until operator approval, sandbox enforcement, audit, evidence/result links, rollback, validation, denial behavior, and model-router boundaries are reviewed.",
  }),
};

export function buildBackendAdapterImplementationPreview(slug: BackendAdapterImplementationPreviewSlug, input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview(slug, input);
}

export function buildBackendAdapterImplementationPreviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildAdapterBackedExecutionPreviewAdvancedDetails(title, language, [...details, ...BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_SAFETY_MARKERS]);
}

export function buildBackendAdapterImplementationPreviewSections(
  ...sections: BackendAdapterImplementationPreviewSectionInput[]
): ReturnType<typeof buildAdapterBackedExecutionPreviewSections> {
  return buildAdapterBackedExecutionPreviewSections(...sections);
}

export function buildBackendAdapterImplementationPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function getBackendAdapterImplementationPreviewDefinition(slug: BackendAdapterImplementationPreviewSlug) {
  return BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_DEFINITIONS[slug];
}

export function buildBackendAdapterImplementationPreviewPackets(slug: BackendAdapterImplementationPreviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getBackendAdapterImplementationPreviewDefinition(slug);
  return [
    buildBackendAdapterImplementationPreview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections: buildBackendAdapterImplementationPreviewSections(...definition.sections),
      routes: [...definition.routes],
      nextRecommendedAction: definition.nextRecommendedAction,
      advancedDetails: buildBackendAdapterImplementationPreviewAdvancedDetails(definition.anchor, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeBackendAdapterImplementationPreview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeAdapterBackedExecutionPreview(title, packets, approvalCopy);
}

export function summarizeBackendAdapterImplementationPreviewForSlug(
  slug: BackendAdapterImplementationPreviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getBackendAdapterImplementationPreviewDefinition(slug);
  return summarizeBackendAdapterImplementationPreview(definition.title, packets, definition.approvalCopy);
}

export function buildBackendAdapterImplementationPreviewModelForSlug(
  slug: BackendAdapterImplementationPreviewSlug,
  packets = buildBackendAdapterImplementationPreviewPackets(slug)
) {
  const definition = getBackendAdapterImplementationPreviewDefinition(slug);
  return buildAdapterBackedExecutionPreviewModel({
    phase: definition.phase,
    title: definition.title,
    summarySubject: definition.summarySubject,
    approvalCopy: definition.approvalCopy,
    subtitle: definition.subtitle,
    primaryLabel: definition.primaryLabel,
    anchor: definition.anchor,
    plainEnglishTitle: definition.plainEnglishTitle,
    plainEnglishCopy: definition.plainEnglishCopy,
    language: definition.language,
    advancedDetails: [...definition.advancedDetails, ...BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_SAFETY_MARKERS],
    links: definition.links,
    packets,
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
