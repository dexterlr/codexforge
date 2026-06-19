import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  buildAdapterBackedExecutionPreviewStableKey as buildBackendAdapterContractStableKey,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildBackendAdapterContractStableKey };

export type BackendAdapterContractPacketInput = AdapterBackedExecutionPreviewPacketInput;

export type BackendAdapterContractSlug =
  | "backend-adapter-boundary-contract"
  | "local-bridge-adapter-boundary-contract"
  | "file-write-adapter-backend-contract"
  | "command-runner-adapter-backend-contract"
  | "local-runtime-adapter-backend-contract"
  | "evidence-store-backend-contract"
  | "result-store-backend-contract"
  | "recovery-backend-contract"
  | "packaging-backend-contract"
  | "project-scaffold-backend-contract"
  | "adapter-backend-approval-contract"
  | "adapter-backend-audit-contract"
  | "adapter-backend-sandbox-contract"
  | "adapter-backend-validation-contract"
  | "adapter-backend-operator-trial-contract"
  | "first-backend-adapter-contract-candidate";

type BackendAdapterContractSectionInput = {
  label: string;
  items: string[];
};

type BackendAdapterContractDefinition = {
  slug: BackendAdapterContractSlug;
  phase: string;
  title: string;
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
  sections: readonly BackendAdapterContractSectionInput[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  advancedCopy: string;
  dataScope: string;
};

export const BACKEND_ADAPTER_CONTRACT_SAFETY_MARKERS = [
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "backend adapter contract surface",
  "contract-review page only",
  "no backend execution",
  "no local bridge calls",
  "no adapter execution",
  "no adapter preview execution",
  "no project scaffold creation",
  ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
] as const;

export const BACKEND_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE = [
  "Backend Adapter Boundary Contract",
  "Backend adapter boundary contract does not implement or run backend adapters",
  "Backend adapter execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "request id",
  "adapter family",
  "approved operation",
  "denied operation",
  "sandbox profile",
  "audit state",
  "evidence state",
  "result state",
  "recovery state",
  "validation state",
  "unresolved blockers",
] as const;

export const LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE = [
  "Local Bridge Adapter Boundary Contract",
  "Local bridge adapter boundary contract does not call the local bridge",
  "Local bridge adapter execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "bridge status",
  "handshake",
  "operator consent",
  "allowed adapters",
  "denied adapters",
  "sandbox profile",
  "network policy",
  "process policy",
  "audit/evidence/result states",
  "unresolved blockers",
] as const;

export const FILE_WRITE_ADAPTER_BACKEND_CONTRACT_LANGUAGE = [
  "File Write Adapter Backend Contract",
  "File write adapter backend contract does not write files",
  "File write backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "path policy",
  "operation type",
  "diff contract",
  "rollback contract",
  "audit/evidence/result links",
  "sandbox profile",
  "validation",
  "unresolved blockers",
] as const;

export const COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_LANGUAGE = [
  "Command Runner Adapter Backend Contract",
  "Command runner adapter backend contract does not run commands",
  "Command runner backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "command preview",
  "working directory",
  "env/secrets redaction",
  "timeout",
  "stdout/stderr",
  "exit code",
  "recovery",
  "audit/evidence/result",
  "sandbox profile",
  "validation",
  "unresolved blockers",
] as const;

export const LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_LANGUAGE = [
  "Local Runtime Adapter Backend Contract",
  "Local runtime adapter backend contract does not start local runtimes",
  "Local runtime backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "runtime name",
  "process lifecycle",
  "port/network",
  "stop policy",
  "logs",
  "recovery",
  "audit/evidence/result",
  "sandbox profile",
  "validation",
  "unresolved blockers",
] as const;

export const EVIDENCE_STORE_BACKEND_CONTRACT_LANGUAGE = [
  "Evidence Store Backend Contract",
  "Evidence store backend contract does not store or ingest evidence",
  "Evidence backend storage requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "source",
  "citation",
  "redaction",
  "retention",
  "privacy",
  "audit",
  "result linkage",
  "validation",
  "unresolved blockers",
] as const;

export const RESULT_STORE_BACKEND_CONTRACT_LANGUAGE = [
  "Result Store Backend Contract",
  "Result store backend contract does not store or reuse results",
  "Result backend storage and reuse require explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "result source",
  "acceptance state",
  "reuse scope",
  "privacy/safety",
  "retention",
  "audit",
  "evidence linkage",
  "validation",
  "unresolved blockers",
] as const;

export const RECOVERY_BACKEND_CONTRACT_LANGUAGE = [
  "Recovery Backend Contract",
  "Recovery backend contract does not trigger recovery or retry",
  "Recovery backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "failure source",
  "recovery mode",
  "retry scope",
  "rollback target",
  "cleanup plan",
  "escalation path",
  "audit/evidence/result links",
  "validation",
  "unresolved blockers",
] as const;

export const PACKAGING_BACKEND_CONTRACT_LANGUAGE = [
  "Packaging Backend Contract",
  "Packaging backend contract does not create packages or exports",
  "Packaging backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "artifact source",
  "bundle type",
  "destination",
  "license/redaction",
  "handoff",
  "rollback",
  "audit/evidence/result links",
  "validation",
  "unresolved blockers",
] as const;

export const PROJECT_SCAFFOLD_BACKEND_CONTRACT_LANGUAGE = [
  "Project Scaffold Backend Contract",
  "Project scaffold backend contract does not create projects",
  "Project scaffold backend execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "project type",
  "template",
  "target path",
  "file write dependency",
  "command/runtime dependency",
  "approval",
  "audit/evidence/result/recovery",
  "validation",
  "unresolved blockers",
  "Original medieval fantasy",
  "No copied franchise assets",
] as const;

export const ADAPTER_BACKEND_APPROVAL_CONTRACT_LANGUAGE = [
  "Adapter Backend Approval Contract",
  "Adapter backend approval contract does not approve or execute adapters",
  "Backend approval execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "reviewer",
  "approval state",
  "denial reason",
  "expiry",
  "audit",
  "evidence",
  "recovery",
  "rollback",
  "validation",
  "unresolved blockers",
] as const;

export const ADAPTER_BACKEND_AUDIT_CONTRACT_LANGUAGE = [
  "Adapter Backend Audit Contract",
  "Adapter backend audit contract does not store audit events",
  "Backend audit persistence requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "actor",
  "request id",
  "adapter family",
  "approved operation",
  "denied operation",
  "evidence/result/recovery links",
  "redaction",
  "retention",
  "validation",
  "unresolved blockers",
] as const;

export const ADAPTER_BACKEND_SANDBOX_CONTRACT_LANGUAGE = [
  "Adapter Backend Sandbox Contract",
  "Adapter backend sandbox contract does not run adapters",
  "Backend sandbox execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "allowed paths",
  "denied paths",
  "process policy",
  "network policy",
  "provider/connector/automation exclusions",
  "file/command/runtime boundaries",
  "evidence/result boundaries",
  "validation",
  "unresolved blockers",
] as const;

export const ADAPTER_BACKEND_VALIDATION_CONTRACT_LANGUAGE = [
  "Adapter Backend Validation Contract",
  "Adapter backend validation contract does not run validation from UI",
  "Backend validation execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "smokes",
  "build",
  "repo hygiene",
  "route coverage",
  "command UI simplification",
  "checkpoint docs",
  "server smoke",
  "evidence/result links",
  "unresolved blockers",
] as const;

export const ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_LANGUAGE = [
  "Adapter Backend Operator Trial Contract",
  "Adapter backend operator trial contract does not execute adapters",
  "Backend operator trials require explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "operator checklist",
  "approval review",
  "dry-run review",
  "sandbox review",
  "observation",
  "validation",
  "rollback",
  "handoff",
  "unresolved blockers",
] as const;

export const FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_LANGUAGE = [
  "First Backend Adapter Contract Candidate",
  "First backend adapter contract candidate does not execute adapters",
  "Backend adapter contract execution requires explicit operator approval",
  "backend contract only",
  "not executable from UI",
  "approval required",
  "local bridge required",
  "sandbox required",
  "what this unlocks next",
  "backend boundary",
  "local bridge",
  "file write",
  "command runner",
  "runtime",
  "evidence",
  "result",
  "recovery",
  "packaging",
  "project scaffold",
  "approval",
  "audit",
  "sandbox",
  "validation",
  "operator trial",
  "deferred families",
  "provider/model",
  "connector",
  "automation",
  "creative",
  "research",
  "chatbot",
  "game/server",
  "unresolved blockers",
  "next recommended action",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildContractFieldLine(items: readonly string[]): string {
  return `Contract fields: ${sentenceList(items)}.`;
}

function buildDefinition(input: {
  slug: BackendAdapterContractSlug;
  phase: string;
  title: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel?: string;
  safetyCopy: string;
  language: readonly string[];
  fieldItems: readonly string[];
  contractFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  extraSectionItems?: readonly string[];
  extraAdvancedDetails?: readonly string[];
}): BackendAdapterContractDefinition {
  const fieldLine = buildContractFieldLine(input.fieldItems);
  const extraItems = input.extraSectionItems ?? [];
  const extraAdvancedDetails = input.extraAdvancedDetails ?? [];
  const summarySubject = input.title;
  const plainEnglishTitle = `Plain-English ${input.title.toLowerCase()}`;
  const plainEnglishCopy = `${input.safetyCopy}. ${input.approvalCopy} This is backend contract only, not executable from UI, approval required, local bridge required, and sandbox required. ${fieldLine} What this unlocks next: ${input.nextRecommendedAction}`;
  const identity = `${input.title} identity: ${input.safetyCopy}. ${input.approvalCopy} This contract-review page is backend contract only, not executable from UI, approval required, local bridge required, sandbox required, and what this unlocks next.`;
  const unresolvedBlockers =
    "Unresolved blockers: approved backend owner, approved local bridge owner, explicit approval flow, sandbox enforcement, audit persistence boundary, evidence/result policy, validation evidence, rollback/recovery owner, privacy/redaction review, denial behavior, and operator handoff.";

  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    summarySubject,
    approvalCopy: input.approvalCopy,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel ?? "Review backend contract",
    anchor: input.slug,
    plainEnglishTitle,
    plainEnglishCopy,
    identity,
    language: input.language,
    advancedDetails: [
      `${input.title} identity`,
      fieldLine,
      `Contract focus: ${input.contractFocus}.`,
      `Safety boundary: ${input.safetyCopy}. No live adapter implementation, no backend execution, no local bridge calls, no adapter execution, and no adapter preview execution are available from UI.`,
      unresolvedBlockers,
      `What this unlocks next: ${input.nextRecommendedAction}`,
      ...extraAdvancedDetails,
    ],
    sections: [
      { label: "Contract fields", items: [fieldLine, ...extraItems] },
      { label: "Safety boundary", items: [`${input.safetyCopy}. This surface is backend contract only, not executable from UI, and keeps approval required, local bridge required, and sandbox required before any backend/local implementation can be considered.`] },
      { label: "Approval and validation", items: [`${input.approvalCopy} Validation remains an operator-run responsibility; the UI does not execute adapters, run previews, persist approval decisions, store outputs, or trigger recovery.`] },
      { label: "Unresolved blockers", items: [unresolvedBlockers] },
      { label: "What this unlocks next", items: [`What this unlocks next: ${input.nextRecommendedAction}`] },
    ],
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: `What this unlocks next: ${input.nextRecommendedAction}`,
    advancedCopy: `advanced ${input.slug} details collapsed/secondary. This route is backend contract only, not executable from UI, and ${input.safetyCopy.toLowerCase()}.`,
    dataScope: `${input.slug} backend adapter contract surface`,
  };
}

export const BACKEND_ADAPTER_CONTRACT_DEFINITIONS: Record<BackendAdapterContractSlug, BackendAdapterContractDefinition> = {
  "backend-adapter-boundary-contract": buildDefinition({
    slug: "backend-adapter-boundary-contract",
    phase: "Phase 794",
    title: "Backend Adapter Boundary Contract",
    approvalCopy: "Backend adapter execution requires explicit operator approval.",
    subtitle: "Define the backend adapter boundary without implementing or running backend adapters.",
    safetyCopy: "Backend adapter boundary contract does not implement or run backend adapters",
    language: BACKEND_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE,
    fieldItems: ["request id", "adapter family", "approved operation", "denied operation", "sandbox profile", "audit state", "evidence state", "result state", "recovery state", "validation state", "unresolved blockers"],
    contractFocus: "the frontend-visible backend adapter request and response shape a future backend implementation must satisfy",
    routes: ["/local-bridge-adapter-boundary-contract", "/file-write-adapter-backend-contract", "/adapter-backend-approval-contract"],
    links: [
      { href: "/local-bridge-adapter-boundary-contract", label: "Local bridge contract" },
      { href: "/file-write-adapter-backend-contract", label: "File backend contract" },
      { href: "/adapter-backend-approval-contract", label: "Approval contract" },
    ],
    nextRecommendedAction: "review the local bridge handshake contract and the first file write backend contract before any bounded backend implementation work starts.",
  }),
  "local-bridge-adapter-boundary-contract": buildDefinition({
    slug: "local-bridge-adapter-boundary-contract",
    phase: "Phase 795",
    title: "Local Bridge Adapter Boundary Contract",
    approvalCopy: "Local bridge adapter execution requires explicit operator approval.",
    subtitle: "Define the local bridge adapter boundary without calling the local bridge.",
    safetyCopy: "Local bridge adapter boundary contract does not call the local bridge",
    language: LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE,
    fieldItems: ["bridge status", "handshake", "operator consent", "allowed adapters", "denied adapters", "sandbox profile", "network policy", "process policy", "audit/evidence/result states", "unresolved blockers"],
    contractFocus: "the frontend-visible handshake and consent envelope a future local bridge must satisfy",
    routes: ["/backend-adapter-boundary-contract", "/local-runtime-adapter-backend-contract", "/adapter-backend-sandbox-contract"],
    links: [
      { href: "/backend-adapter-boundary-contract", label: "Backend boundary" },
      { href: "/local-runtime-adapter-backend-contract", label: "Runtime contract" },
      { href: "/adapter-backend-sandbox-contract", label: "Sandbox contract" },
    ],
    nextRecommendedAction: "define approved local bridge handshake evidence and sandbox enforcement before any bridge endpoint can be wired.",
  }),
  "file-write-adapter-backend-contract": buildDefinition({
    slug: "file-write-adapter-backend-contract",
    phase: "Phase 796",
    title: "File Write Adapter Backend Contract",
    approvalCopy: "File write backend execution requires explicit operator approval.",
    subtitle: "Review the file write backend contract without writing files.",
    safetyCopy: "File write adapter backend contract does not write files",
    language: FILE_WRITE_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["path policy", "operation type", "diff contract", "rollback contract", "audit/evidence/result links", "sandbox profile", "validation", "unresolved blockers"],
    contractFocus: "the proposed backend-owned file mutation envelope without exposing UI file writes",
    routes: ["/backend-adapter-boundary-contract", "/adapter-backend-audit-contract", "/adapter-backend-validation-contract"],
    links: [
      { href: "/backend-adapter-boundary-contract", label: "Backend boundary" },
      { href: "/adapter-backend-audit-contract", label: "Audit contract" },
      { href: "/adapter-backend-validation-contract", label: "Validation contract" },
    ],
    nextRecommendedAction: "lock path policy, diff review, rollback, audit, evidence, result, and validation requirements before a backend-owned file write slice is proposed.",
  }),
  "command-runner-adapter-backend-contract": buildDefinition({
    slug: "command-runner-adapter-backend-contract",
    phase: "Phase 797",
    title: "Command Runner Adapter Backend Contract",
    approvalCopy: "Command runner backend execution requires explicit operator approval.",
    subtitle: "Review the command runner backend contract without running commands.",
    safetyCopy: "Command runner adapter backend contract does not run commands",
    language: COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["command preview", "working directory", "env/secrets redaction", "timeout", "stdout/stderr", "exit code", "recovery", "audit/evidence/result", "sandbox profile", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned command execution envelope with redaction, timeout, output, and recovery requirements",
    routes: ["/backend-adapter-boundary-contract", "/local-runtime-adapter-backend-contract", "/adapter-backend-sandbox-contract"],
    links: [
      { href: "/backend-adapter-boundary-contract", label: "Backend boundary" },
      { href: "/local-runtime-adapter-backend-contract", label: "Runtime contract" },
      { href: "/adapter-backend-sandbox-contract", label: "Sandbox contract" },
    ],
    nextRecommendedAction: "separate command preview review from execution ownership and define output, timeout, sandbox, and recovery evidence before backend work starts.",
  }),
  "local-runtime-adapter-backend-contract": buildDefinition({
    slug: "local-runtime-adapter-backend-contract",
    phase: "Phase 798",
    title: "Local Runtime Adapter Backend Contract",
    approvalCopy: "Local runtime backend execution requires explicit operator approval.",
    subtitle: "Review the local runtime backend contract without starting local runtimes.",
    safetyCopy: "Local runtime adapter backend contract does not start local runtimes",
    language: LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["runtime name", "process lifecycle", "port/network", "stop policy", "logs", "recovery", "audit/evidence/result", "sandbox profile", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned runtime lifecycle envelope with port, network, log, stop, and recovery rules",
    routes: ["/local-bridge-adapter-boundary-contract", "/command-runner-adapter-backend-contract", "/adapter-backend-operator-trial-contract"],
    links: [
      { href: "/local-bridge-adapter-boundary-contract", label: "Local bridge" },
      { href: "/command-runner-adapter-backend-contract", label: "Command contract" },
      { href: "/adapter-backend-operator-trial-contract", label: "Operator trial" },
    ],
    nextRecommendedAction: "define runtime lifecycle and stop-policy evidence before any local runtime bridge endpoint is considered.",
  }),
  "evidence-store-backend-contract": buildDefinition({
    slug: "evidence-store-backend-contract",
    phase: "Phase 799",
    title: "Evidence Store Backend Contract",
    approvalCopy: "Evidence backend storage requires explicit operator approval.",
    subtitle: "Review the evidence store backend contract without storing or ingesting evidence.",
    safetyCopy: "Evidence store backend contract does not store or ingest evidence",
    language: EVIDENCE_STORE_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["source", "citation", "redaction", "retention", "privacy", "audit", "result linkage", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned evidence envelope with citation, redaction, retention, privacy, and result linkage rules",
    routes: ["/adapter-backend-audit-contract", "/result-store-backend-contract", "/adapter-backend-validation-contract"],
    links: [
      { href: "/adapter-backend-audit-contract", label: "Audit contract" },
      { href: "/result-store-backend-contract", label: "Result contract" },
      { href: "/adapter-backend-validation-contract", label: "Validation contract" },
    ],
    nextRecommendedAction: "define redaction, citation, retention, privacy, and audit requirements before evidence persistence is implemented.",
  }),
  "result-store-backend-contract": buildDefinition({
    slug: "result-store-backend-contract",
    phase: "Phase 800",
    title: "Result Store Backend Contract",
    approvalCopy: "Result backend storage and reuse require explicit operator approval.",
    subtitle: "Review the result store backend contract without storing or reusing results.",
    safetyCopy: "Result store backend contract does not store or reuse results",
    language: RESULT_STORE_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["result source", "acceptance state", "reuse scope", "privacy/safety", "retention", "audit", "evidence linkage", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned result envelope with acceptance, reuse, privacy, retention, evidence, and validation rules",
    routes: ["/evidence-store-backend-contract", "/adapter-backend-audit-contract", "/first-backend-adapter-contract-candidate"],
    links: [
      { href: "/evidence-store-backend-contract", label: "Evidence contract" },
      { href: "/adapter-backend-audit-contract", label: "Audit contract" },
      { href: "/first-backend-adapter-contract-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "lock acceptance, reuse, retention, and privacy rules before result storage or reuse is implemented.",
  }),
  "recovery-backend-contract": buildDefinition({
    slug: "recovery-backend-contract",
    phase: "Phase 801",
    title: "Recovery Backend Contract",
    approvalCopy: "Recovery backend execution requires explicit operator approval.",
    subtitle: "Review the recovery backend contract without triggering recovery or retry.",
    safetyCopy: "Recovery backend contract does not trigger recovery or retry",
    language: RECOVERY_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["failure source", "recovery mode", "retry scope", "rollback target", "cleanup plan", "escalation path", "audit/evidence/result links", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned recovery envelope with rollback, retry, cleanup, escalation, and evidence requirements",
    routes: ["/file-write-adapter-backend-contract", "/command-runner-adapter-backend-contract", "/adapter-backend-operator-trial-contract"],
    links: [
      { href: "/file-write-adapter-backend-contract", label: "File contract" },
      { href: "/command-runner-adapter-backend-contract", label: "Command contract" },
      { href: "/adapter-backend-operator-trial-contract", label: "Operator trial" },
    ],
    nextRecommendedAction: "define recovery ownership, rollback targets, cleanup rules, and escalation evidence before retry behavior is implemented.",
  }),
  "packaging-backend-contract": buildDefinition({
    slug: "packaging-backend-contract",
    phase: "Phase 802",
    title: "Packaging Backend Contract",
    approvalCopy: "Packaging backend execution requires explicit operator approval.",
    subtitle: "Review the packaging backend contract without creating packages or exports.",
    safetyCopy: "Packaging backend contract does not create packages or exports",
    language: PACKAGING_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["artifact source", "bundle type", "destination", "license/redaction", "handoff", "rollback", "audit/evidence/result links", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned package/export envelope with artifact, license, redaction, destination, handoff, and rollback rules",
    routes: ["/result-store-backend-contract", "/adapter-backend-audit-contract", "/first-backend-adapter-contract-candidate"],
    links: [
      { href: "/result-store-backend-contract", label: "Result contract" },
      { href: "/adapter-backend-audit-contract", label: "Audit contract" },
      { href: "/first-backend-adapter-contract-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "define bundle destination, handoff, rollback, redaction, and audit evidence before package/export behavior is implemented.",
  }),
  "project-scaffold-backend-contract": buildDefinition({
    slug: "project-scaffold-backend-contract",
    phase: "Phase 803",
    title: "Project Scaffold Backend Contract",
    approvalCopy: "Project scaffold backend execution requires explicit operator approval.",
    subtitle: "Review the project scaffold backend contract without creating projects.",
    safetyCopy: "Project scaffold backend contract does not create projects",
    language: PROJECT_SCAFFOLD_BACKEND_CONTRACT_LANGUAGE,
    fieldItems: ["project type", "template", "target path", "file write dependency", "command/runtime dependency", "approval", "audit/evidence/result/recovery", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned project scaffold envelope and dependencies without UI project creation",
    routes: ["/file-write-adapter-backend-contract", "/command-runner-adapter-backend-contract", "/local-runtime-adapter-backend-contract"],
    links: [
      { href: "/file-write-adapter-backend-contract", label: "File contract" },
      { href: "/command-runner-adapter-backend-contract", label: "Command contract" },
      { href: "/local-runtime-adapter-backend-contract", label: "Runtime contract" },
    ],
    nextRecommendedAction: "review file write, command runner, local runtime, audit, evidence, result, and recovery dependencies before any scaffold implementation is proposed.",
    extraSectionItems: ["Example: original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets."],
    extraAdvancedDetails: ["Original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets."],
  }),
  "adapter-backend-approval-contract": buildDefinition({
    slug: "adapter-backend-approval-contract",
    phase: "Phase 804",
    title: "Adapter Backend Approval Contract",
    approvalCopy: "Backend approval execution requires explicit operator approval.",
    subtitle: "Review the adapter backend approval contract without approving or executing adapters.",
    safetyCopy: "Adapter backend approval contract does not approve or execute adapters",
    language: ADAPTER_BACKEND_APPROVAL_CONTRACT_LANGUAGE,
    fieldItems: ["reviewer", "approval state", "denial reason", "expiry", "audit", "evidence", "recovery", "rollback", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned approval envelope without UI approval automation or persisted approval decisions",
    routes: ["/backend-adapter-boundary-contract", "/adapter-backend-audit-contract", "/adapter-backend-operator-trial-contract"],
    links: [
      { href: "/backend-adapter-boundary-contract", label: "Backend boundary" },
      { href: "/adapter-backend-audit-contract", label: "Audit contract" },
      { href: "/adapter-backend-operator-trial-contract", label: "Operator trial" },
    ],
    nextRecommendedAction: "define reviewer, denial, expiry, audit, recovery, rollback, and validation rules before approval execution is implemented.",
  }),
  "adapter-backend-audit-contract": buildDefinition({
    slug: "adapter-backend-audit-contract",
    phase: "Phase 805",
    title: "Adapter Backend Audit Contract",
    approvalCopy: "Backend audit persistence requires explicit operator approval.",
    subtitle: "Review the adapter backend audit contract without storing audit events.",
    safetyCopy: "Adapter backend audit contract does not store audit events",
    language: ADAPTER_BACKEND_AUDIT_CONTRACT_LANGUAGE,
    fieldItems: ["actor", "request id", "adapter family", "approved operation", "denied operation", "evidence/result/recovery links", "redaction", "retention", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned audit envelope with actor, request, operation, redaction, retention, and linkage rules",
    routes: ["/adapter-backend-approval-contract", "/evidence-store-backend-contract", "/result-store-backend-contract"],
    links: [
      { href: "/adapter-backend-approval-contract", label: "Approval contract" },
      { href: "/evidence-store-backend-contract", label: "Evidence contract" },
      { href: "/result-store-backend-contract", label: "Result contract" },
    ],
    nextRecommendedAction: "define redacted audit event shape and retention before audit persistence is implemented.",
  }),
  "adapter-backend-sandbox-contract": buildDefinition({
    slug: "adapter-backend-sandbox-contract",
    phase: "Phase 806",
    title: "Adapter Backend Sandbox Contract",
    approvalCopy: "Backend sandbox execution requires explicit operator approval.",
    subtitle: "Review the adapter backend sandbox contract without running adapters.",
    safetyCopy: "Adapter backend sandbox contract does not run adapters",
    language: ADAPTER_BACKEND_SANDBOX_CONTRACT_LANGUAGE,
    fieldItems: ["allowed paths", "denied paths", "process policy", "network policy", "provider/connector/automation exclusions", "file/command/runtime boundaries", "evidence/result boundaries", "validation", "unresolved blockers"],
    contractFocus: "the backend-owned sandbox envelope with path, process, network, provider, connector, automation, file, command, runtime, evidence, and result boundaries",
    routes: ["/local-bridge-adapter-boundary-contract", "/command-runner-adapter-backend-contract", "/adapter-backend-validation-contract"],
    links: [
      { href: "/local-bridge-adapter-boundary-contract", label: "Local bridge" },
      { href: "/command-runner-adapter-backend-contract", label: "Command contract" },
      { href: "/adapter-backend-validation-contract", label: "Validation contract" },
    ],
    nextRecommendedAction: "define enforceable sandbox policy and validation evidence before any adapter execution implementation is proposed.",
  }),
  "adapter-backend-validation-contract": buildDefinition({
    slug: "adapter-backend-validation-contract",
    phase: "Phase 807",
    title: "Adapter Backend Validation Contract",
    approvalCopy: "Backend validation execution requires explicit operator approval.",
    subtitle: "Review the adapter backend validation contract without running validation from UI.",
    safetyCopy: "Adapter backend validation contract does not run validation from UI",
    language: ADAPTER_BACKEND_VALIDATION_CONTRACT_LANGUAGE,
    fieldItems: ["smokes", "build", "repo hygiene", "route coverage", "command UI simplification", "checkpoint docs", "server smoke", "evidence/result links", "unresolved blockers"],
    contractFocus: "the backend-owned validation evidence envelope without test, build, or smoke execution from UI",
    routes: ["/file-write-adapter-backend-contract", "/adapter-backend-sandbox-contract", "/first-backend-adapter-contract-candidate"],
    links: [
      { href: "/file-write-adapter-backend-contract", label: "File contract" },
      { href: "/adapter-backend-sandbox-contract", label: "Sandbox contract" },
      { href: "/first-backend-adapter-contract-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "define the terminal-owned validation command list and evidence links before backend validation execution is implemented.",
  }),
  "adapter-backend-operator-trial-contract": buildDefinition({
    slug: "adapter-backend-operator-trial-contract",
    phase: "Phase 808",
    title: "Adapter Backend Operator Trial Contract",
    approvalCopy: "Backend operator trials require explicit operator approval.",
    subtitle: "Review the adapter backend operator trial contract without executing adapters.",
    safetyCopy: "Adapter backend operator trial contract does not execute adapters",
    language: ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_LANGUAGE,
    fieldItems: ["operator checklist", "approval review", "dry-run review", "sandbox review", "observation", "validation", "rollback", "handoff", "unresolved blockers"],
    contractFocus: "the backend-owned operator trial envelope with approval, dry-run, sandbox, observation, validation, rollback, and handoff steps",
    routes: ["/adapter-backend-approval-contract", "/adapter-backend-validation-contract", "/first-backend-adapter-contract-candidate"],
    links: [
      { href: "/adapter-backend-approval-contract", label: "Approval contract" },
      { href: "/adapter-backend-validation-contract", label: "Validation contract" },
      { href: "/first-backend-adapter-contract-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "define the operator trial checklist and evidence handoff before any approved backend adapter trial is run outside UI.",
  }),
  "first-backend-adapter-contract-candidate": buildDefinition({
    slug: "first-backend-adapter-contract-candidate",
    phase: "Phase 809",
    title: "First Backend Adapter Contract Candidate",
    approvalCopy: "Backend adapter contract execution requires explicit operator approval.",
    subtitle: "Summarize backend adapter contract readiness without executing adapters.",
    primaryLabel: "Review contract candidate",
    safetyCopy: "First backend adapter contract candidate does not execute adapters",
    language: FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_LANGUAGE,
    fieldItems: ["backend boundary", "local bridge", "file write", "command runner", "runtime", "evidence", "result", "recovery", "packaging", "project scaffold", "approval", "audit", "sandbox", "validation", "operator trial", "deferred families", "unresolved blockers", "next recommended action"],
    contractFocus: "the first complete backend/local adapter boundary contract set before actual bounded implementation work",
    routes: ["/backend-adapter-boundary-contract", "/local-bridge-adapter-boundary-contract", "/file-write-adapter-backend-contract"],
    links: [
      { href: "/backend-adapter-boundary-contract", label: "Backend boundary" },
      { href: "/local-bridge-adapter-boundary-contract", label: "Local bridge" },
      { href: "/file-write-adapter-backend-contract", label: "File contract" },
    ],
    nextRecommendedAction: "choose a bounded backend/local implementation proposal for the file write adapter only after operator approval, sandbox enforcement, audit, evidence/result links, rollback, validation, and denial behavior are specified.",
    extraSectionItems: [
      "Readiness covers backend boundary, local bridge, file write, command runner, runtime, evidence, result, recovery, packaging, project scaffold, approval, audit, sandbox, validation, and operator trial.",
      "Deferred families remain provider/model, connector, automation, creative, research, chatbot, and game/server until their own approved backend/local contracts exist.",
    ],
    extraAdvancedDetails: [
      "Readiness summary: backend boundary, local bridge, file write, command runner, runtime, evidence, result, recovery, packaging, project scaffold, approval, audit, sandbox, validation, and operator trial contract surfaces are defined for review.",
      "Deferred families: provider/model, connector, automation, creative, research, chatbot, and game/server remain blocked until separate approved boundaries exist.",
      "Next recommended action: choose a bounded backend/local implementation proposal for the file write adapter only after operator approval, sandbox enforcement, audit, evidence/result links, rollback, validation, and denial behavior are specified.",
    ],
  }),
};

export function buildBackendAdapterContract(slug: BackendAdapterContractSlug, input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview(slug, input);
}

export function buildBackendAdapterContractAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildAdapterBackedExecutionPreviewAdvancedDetails(title, language, [...details, ...BACKEND_ADAPTER_CONTRACT_SAFETY_MARKERS]);
}

export function buildBackendAdapterContractSections(
  ...sections: BackendAdapterContractSectionInput[]
): ReturnType<typeof buildAdapterBackedExecutionPreviewSections> {
  return buildAdapterBackedExecutionPreviewSections(...sections);
}

export function buildBackendAdapterContractBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function getBackendAdapterContractDefinition(slug: BackendAdapterContractSlug) {
  return BACKEND_ADAPTER_CONTRACT_DEFINITIONS[slug];
}

export function buildBackendAdapterContractPackets(slug: BackendAdapterContractSlug): UniversalExecutionReviewPacket[] {
  const definition = getBackendAdapterContractDefinition(slug);
  return [
    buildBackendAdapterContract(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections: buildBackendAdapterContractSections(...definition.sections),
      routes: [...definition.routes],
      nextRecommendedAction: definition.nextRecommendedAction,
      advancedDetails: buildBackendAdapterContractAdvancedDetails(definition.anchor, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeBackendAdapterContract(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeAdapterBackedExecutionPreview(title, packets, approvalCopy);
}

export function summarizeBackendAdapterContractForSlug(
  slug: BackendAdapterContractSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getBackendAdapterContractDefinition(slug);
  return summarizeBackendAdapterContract(definition.title, packets, definition.approvalCopy);
}

export function buildBackendAdapterContractModelForSlug(
  slug: BackendAdapterContractSlug,
  packets = buildBackendAdapterContractPackets(slug)
) {
  const definition = getBackendAdapterContractDefinition(slug);
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
    advancedDetails: [...definition.advancedDetails, ...BACKEND_ADAPTER_CONTRACT_SAFETY_MARKERS],
    links: definition.links,
    packets,
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
