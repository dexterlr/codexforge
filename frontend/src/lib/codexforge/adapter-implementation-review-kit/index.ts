import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  buildAdapterBackedExecutionPreviewStableKey as buildAdapterImplementationReviewStableKey,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildAdapterImplementationReviewStableKey };

export type AdapterImplementationReviewPacketInput = AdapterBackedExecutionPreviewPacketInput;

export type AdapterImplementationReviewSlug =
  | "first-file-write-adapter-implementation-review"
  | "first-command-runner-adapter-implementation-review"
  | "first-local-runtime-adapter-implementation-review"
  | "first-evidence-store-adapter-implementation-review"
  | "first-result-store-adapter-implementation-review"
  | "first-recovery-adapter-implementation-review"
  | "first-packaging-adapter-implementation-review"
  | "first-project-scaffold-adapter-implementation-review"
  | "adapter-implementation-harness-review"
  | "adapter-implementation-sandbox-review"
  | "adapter-implementation-audit-review"
  | "adapter-implementation-recovery-review"
  | "adapter-implementation-packaging-review"
  | "adapter-implementation-operator-trial-review"
  | "first-adapter-implementation-evidence-review"
  | "first-useful-controlled-adapter-mvp-candidate";

type AdapterImplementationReviewSectionInput = {
  label: string;
  items: string[];
};

type AdapterImplementationReviewDefinition = {
  slug: AdapterImplementationReviewSlug;
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
  sections: readonly AdapterImplementationReviewSectionInput[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  advancedCopy: string;
  dataScope: string;
};

export const ADAPTER_IMPLEMENTATION_REVIEW_SAFETY_MARKERS = [
  "review-only controlled adapter MVP readiness surface",
  "not executable from UI",
  "approval required",
  "sandbox required",
  "evidence required",
  "what this unlocks next",
  ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
] as const;

export const FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First File Write Adapter Implementation Review",
  "First file write adapter implementation review does not write files",
  "File write adapter implementation requires explicit operator approval",
  "Implementation review",
  "Allowlist/denylist",
  "Diff preview",
  "Rollback",
  "Audit",
  "Evidence",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Command Runner Adapter Implementation Review",
  "First command runner adapter implementation review does not run commands",
  "Command runner adapter implementation requires explicit operator approval",
  "Implementation review",
  "Command policy",
  "Working directory",
  "Env/secrets",
  "Timeout",
  "Stdout/stderr",
  "Exit-code",
  "Recovery",
  "Evidence",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Local Runtime Adapter Implementation Review",
  "First local runtime adapter implementation review does not start local runtimes",
  "Local runtime adapter implementation requires explicit operator approval",
  "Implementation review",
  "Process lifecycle",
  "Ports/network",
  "Stop policy",
  "Logs",
  "Recovery",
  "Evidence",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Evidence Store Adapter Implementation Review",
  "First evidence store adapter implementation review does not store or ingest evidence",
  "Evidence store adapter implementation requires explicit operator approval",
  "Implementation review",
  "Evidence shape",
  "Citation",
  "Redaction",
  "Retention",
  "Privacy/audit",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Result Store Adapter Implementation Review",
  "First result store adapter implementation review does not store or reuse results",
  "Result store adapter implementation requires explicit operator approval",
  "Implementation review",
  "Result shape",
  "Acceptance/rejection",
  "Reuse",
  "Privacy/safety",
  "Retention/audit",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Recovery Adapter Implementation Review",
  "First recovery adapter implementation review does not trigger recovery or retry",
  "Recovery adapter implementation requires explicit operator approval",
  "Implementation review",
  "Retry",
  "Rollback",
  "Cleanup",
  "Escalation",
  "Audit",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Packaging Adapter Implementation Review",
  "First packaging adapter implementation review does not create packages or exports",
  "Packaging adapter implementation requires explicit operator approval",
  "Implementation review",
  "Bundle",
  "Artifact",
  "Destination",
  "Redaction/license",
  "Handoff/rollback",
  "Validation",
  "Unresolved blockers",
] as const;

export const FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE = [
  "First Project Scaffold Adapter Implementation Review",
  "First project scaffold adapter implementation review does not create projects",
  "Project scaffold adapter implementation requires explicit operator approval",
  "Implementation review",
  "Project types",
  "Template policy",
  "File/command/runtime dependencies",
  "Evidence/result/recovery",
  "Original medieval fantasy",
  "No copied franchise assets",
  "Validation",
  "Unresolved blockers",
] as const;

export const ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_LANGUAGE = [
  "Adapter Implementation Harness Review",
  "Adapter implementation harness review does not run adapters or tests from UI",
  "Adapter implementation harness execution requires explicit operator approval",
  "Harness coverage",
  "File write",
  "Command runner",
  "Local runtime",
  "Evidence store",
  "Result store",
  "Recovery",
  "Packaging",
  "Project scaffold",
  "Deferred families",
] as const;

export const ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_LANGUAGE = [
  "Adapter Implementation Sandbox Review",
  "Adapter implementation sandbox review does not run adapters",
  "Adapter implementation sandbox execution requires explicit operator approval",
  "Sandbox path",
  "Process",
  "Network",
  "Provider/connector/automation exclusion",
  "Evidence/result boundary",
  "Unresolved blockers",
] as const;

export const ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_LANGUAGE = [
  "Adapter Implementation Audit Review",
  "Adapter implementation audit review does not store audit events",
  "Adapter audit persistence requires explicit operator approval",
  "Audit events",
  "Approval records",
  "Redaction",
  "Evidence/result links",
  "Recovery links",
  "Retention",
  "Unresolved blockers",
] as const;

export const ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_LANGUAGE = [
  "Adapter Implementation Recovery Review",
  "Adapter implementation recovery review does not trigger recovery or retry",
  "Adapter recovery execution requires explicit operator approval",
  "Recovery modes",
  "Rollback",
  "Retry",
  "Cleanup",
  "Escalation",
  "Evidence/result linkage",
  "Unresolved blockers",
] as const;

export const ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_LANGUAGE = [
  "Adapter Implementation Packaging Review",
  "Adapter implementation packaging review does not create packages or exports",
  "Adapter packaging execution requires explicit operator approval",
  "Packaging outputs",
  "Destination",
  "License/redaction",
  "Handoff",
  "Rollback",
  "Unresolved blockers",
] as const;

export const ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_LANGUAGE = [
  "Adapter Implementation Operator Trial Review",
  "Adapter implementation operator trial review does not execute adapters",
  "Operator trial execution requires explicit operator approval",
  "Operator responsibilities",
  "Trial checklist",
  "Approval review",
  "Validation commands",
  "Rollback readiness",
  "Unresolved blockers",
] as const;

export const FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_LANGUAGE = [
  "First Adapter Implementation Evidence Review",
  "First adapter implementation evidence review does not capture or ingest evidence automatically",
  "Adapter evidence usage requires explicit operator approval",
  "Evidence coverage",
  "File write",
  "Command runner",
  "Local runtime",
  "Stores",
  "Recovery",
  "Packaging",
  "Project scaffold",
  "Harness",
  "Sandbox",
  "Audit",
  "Operator trial",
] as const;

export const FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_LANGUAGE = [
  "First Useful Controlled Adapter MVP Candidate",
  "First useful controlled adapter MVP candidate does not execute adapters",
  "Useful controlled adapter MVP execution requires explicit operator approval",
  "First useful MVP readiness",
  "File write",
  "Command runner",
  "Local runtime",
  "Evidence store",
  "Result store",
  "Recovery",
  "Packaging",
  "Project scaffold",
  "Harness",
  "Sandbox",
  "Audit",
  "Operator trial",
  "Evidence review",
  "Deferred families",
  "Unresolved blockers",
  "Next recommended action",
] as const;

const ADAPTER_IMPLEMENTATION_REVIEW_DEFINITIONS: Record<
  AdapterImplementationReviewSlug,
  AdapterImplementationReviewDefinition
> = {
  "first-file-write-adapter-implementation-review": {
    slug: "first-file-write-adapter-implementation-review",
    phase: "Phase 746",
    title: "First File Write Adapter Implementation Review",
    summarySubject: "First File Write Adapter Implementation Review",
    approvalCopy: "File write adapter implementation requires explicit operator approval.",
    subtitle: "Review the first file write implementation surface without writing files.",
    primaryLabel: "Review file write implementation",
    anchor: "first-file-write-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first file write adapter implementation review",
    plainEnglishCopy:
      "First file write adapter implementation review does not write files. It reviews allowlist/denylist, diff preview, rollback, audit, evidence, validation, unresolved blockers, and what this unlocks next.",
    identity:
      "First File Write Adapter Implementation Review identity: First file write adapter implementation review does not write files. File write adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First File Write Adapter Implementation Review identity",
      "Implementation review",
      "Allowlist/denylist",
      "Diff preview",
      "Rollback",
      "Audit",
      "Evidence",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: confirms the planned backend-owned file write request shape, target path class, approval packet, denial states, and result handoff while keeping UI review-only."] },
      { label: "Allowlist/denylist", items: ["Allowlist/denylist: allowed paths must be explicit, canonical, workspace-bound, and server-verified; denied paths include arbitrary local projects, parent traversal, generated folders, secrets, and credential stores."] },
      { label: "Diff preview", items: ["Diff preview: operator sees a human-readable proposed diff, reason, risk note, and validation plan before any approved backend-owned file mutation could be considered later."] },
      { label: "Rollback", items: ["Rollback: requires previous-content source, rollback owner, verification step, failure escalation, and no automatic rollback trigger from UI."] },
      { label: "Audit", items: ["Audit: needs request id, operator approval reference, target path class, redaction result, diff summary, outcome, validation status, and no secrets."] },
      { label: "Evidence", items: ["Evidence: evidence required means terminal validation output or reviewed backend proof must be linked manually; this page does not capture, ingest, store, or reuse evidence."] },
      { label: "Validation", items: ["Validation: focused smoke, all-smoke registration, command UI simplification, checkpoint docs, route coverage, repo hygiene, build, server smoke, and diff hygiene stay terminal-only."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: backend executor contract, allowlist source, rollback capture, audit persistence, evidence handoff, and recovery ownership are not approved."] },
      { label: "What this unlocks next", items: ["What this unlocks next: the smallest first actual bounded file-write request contract after explicit approval, sandbox proof, audit shape, rollback readiness, and evidence review."] },
    ],
    routes: ["/file-write-adapter-implementation-slice", "/adapter-implementation-sandbox-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/file-write-adapter-implementation-slice", label: "File write slice" },
      { href: "/adapter-implementation-sandbox-review", label: "Sandbox review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve only a backend-owned file write request contract after sandbox, diff preview, rollback, audit, and evidence requirements are reviewed.",
    advancedCopy:
      "advanced first file write adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not write files.",
    dataScope:
      "first-file-write-adapter-implementation-review buildFirstFileWriteAdapterImplementationReviewStableKey FirstFileWriteAdapterImplementationReviewPanel",
  },
  "first-command-runner-adapter-implementation-review": {
    slug: "first-command-runner-adapter-implementation-review",
    phase: "Phase 747",
    title: "First Command Runner Adapter Implementation Review",
    summarySubject: "First Command Runner Adapter Implementation Review",
    approvalCopy: "Command runner adapter implementation requires explicit operator approval.",
    subtitle: "Review command runner implementation readiness without running commands.",
    primaryLabel: "Review command runner implementation",
    anchor: "first-command-runner-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first command runner adapter implementation review",
    plainEnglishCopy:
      "First command runner adapter implementation review does not run commands. It reviews command policy, working directory, env/secrets, timeout, stdout/stderr, exit-code, recovery, evidence, validation, and unresolved blockers.",
    identity:
      "First Command Runner Adapter Implementation Review identity: First command runner adapter implementation review does not run commands. Command runner adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Command Runner Adapter Implementation Review identity",
      "Implementation review",
      "Command policy",
      "Working directory",
      "Env/secrets",
      "Timeout",
      "Stdout/stderr",
      "Exit-code",
      "Recovery",
      "Evidence",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: confirms command profile shape, approval packet, bounded working directory, expected outputs, denial states, and result handoff without command execution from UI."] },
      { label: "Command policy", items: ["Command policy: only named allowlisted profiles can be considered later; arbitrary shell strings, package install behavior, server launch commands, and provider/connector traffic stay denied."] },
      { label: "Working directory", items: ["Working directory: must be canonical, workspace-bound, profile-owned, and never accepted from arbitrary path browsing or local project scanning in UI."] },
      { label: "Env/secrets", items: ["Env/secrets: no process.env printing, no secrets displayed, no credentials in browser storage, no token persistence, and redacted environment summaries only."] },
      { label: "Timeout", items: ["Timeout: command profiles need explicit timeout, cancellation, output cap, and failure handling before any approved backend execution can be considered."] },
      { label: "Stdout/stderr", items: ["Stdout/stderr: output must be capped, redacted, tagged by stream, tied to request id, and reviewed before evidence or result handoff."] },
      { label: "Exit-code", items: ["Exit-code: success, failure, timeout, cancelled, policy-denied, and validation-needed states must be explicit and not auto-accepted by UI."] },
      { label: "Recovery", items: ["Recovery: retry, cleanup, escalation, and rollback are reviewed here but never triggered from UI."] },
      { label: "Evidence", items: ["Evidence: evidence required means reviewed terminal or backend proof is attached manually; this page does not store or ingest command output."] },
      { label: "Validation", items: ["Validation: focused smoke, all-smoke registration, command UI simplification, checkpoint docs, route coverage, build, server smoke, and diff hygiene remain operator-terminal steps."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: command profile registry, sandbox enforcement, env redaction, output capture, timeout policy, audit persistence, and recovery ownership are not approved."] },
    ],
    routes: ["/command-runner-adapter-implementation-slice", "/adapter-implementation-harness-review", "/adapter-implementation-sandbox-review"],
    links: [
      { href: "/command-runner-adapter-implementation-slice", label: "Command runner slice" },
      { href: "/adapter-implementation-harness-review", label: "Harness review" },
      { href: "/adapter-implementation-sandbox-review", label: "Sandbox review" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep command runner implementation blocked until file write evidence, command profiles, sandbox proof, redaction, and recovery ownership are approved.",
    advancedCopy:
      "advanced first command runner adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not run commands.",
    dataScope:
      "first-command-runner-adapter-implementation-review buildFirstCommandRunnerAdapterImplementationReviewStableKey FirstCommandRunnerAdapterImplementationReviewPanel",
  },
  "first-local-runtime-adapter-implementation-review": {
    slug: "first-local-runtime-adapter-implementation-review",
    phase: "Phase 748",
    title: "First Local Runtime Adapter Implementation Review",
    summarySubject: "First Local Runtime Adapter Implementation Review",
    approvalCopy: "Local runtime adapter implementation requires explicit operator approval.",
    subtitle: "Review local runtime implementation readiness without starting local runtimes.",
    primaryLabel: "Review local runtime implementation",
    anchor: "first-local-runtime-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first local runtime adapter implementation review",
    plainEnglishCopy:
      "First local runtime adapter implementation review does not start local runtimes. It reviews process lifecycle, ports/network, stop policy, logs, recovery, evidence, validation, and unresolved blockers.",
    identity:
      "First Local Runtime Adapter Implementation Review identity: First local runtime adapter implementation review does not start local runtimes. Local runtime adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Local Runtime Adapter Implementation Review identity",
      "Implementation review",
      "Process lifecycle",
      "Ports/network",
      "Stop policy",
      "Logs",
      "Recovery",
      "Evidence",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future runtime profile states, approval packet, bounded working directory, log handling, stop behavior, and operator handoff while keeping UI review-only."] },
      { label: "Process lifecycle", items: ["Process lifecycle: planned states include blocked, approved, starting by backend, running, stopping, stopped, failed, timeout, and validation-needed; UI does not start or stop processes."] },
      { label: "Ports/network", items: ["Ports/network: ports must be explicit, local-first, conflict-checked, network-denied by default, and never expose real endpoints or provider/connector traffic from UI."] },
      { label: "Stop policy", items: ["Stop policy: stop, cancel, cleanup, and escalation require approved backend ownership and cannot be triggered by this review surface."] },
      { label: "Logs", items: ["Logs: logs must be capped, redacted, stream-tagged, request-scoped, and reviewed before evidence or result handoff."] },
      { label: "Recovery", items: ["Recovery: restart, cleanup, rollback, and escalation are reviewed as policies, not executed from UI."] },
      { label: "Evidence", items: ["Evidence: evidence required means reviewed backend lifecycle proof and terminal validation output are linked manually; this page does not ingest runtime logs."] },
      { label: "Validation", items: ["Validation: local runtime route smoke, no start/stop checks, command UI simplification, checkpoint docs, route coverage, build, server smoke, and diff hygiene stay terminal-only."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: runtime profile registry, port policy, process supervisor contract, log redaction, recovery ownership, and sandbox enforcement are not approved."] },
    ],
    routes: ["/local-runtime-adapter-implementation-slice", "/adapter-implementation-sandbox-review", "/adapter-implementation-recovery-review"],
    links: [
      { href: "/local-runtime-adapter-implementation-slice", label: "Runtime slice" },
      { href: "/adapter-implementation-sandbox-review", label: "Sandbox review" },
      { href: "/adapter-implementation-recovery-review", label: "Recovery review" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep local runtime implementation blocked until command profile evidence, process lifecycle policy, stop policy, log redaction, and sandbox proof are approved.",
    advancedCopy:
      "advanced first local runtime adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not start local runtimes.",
    dataScope:
      "first-local-runtime-adapter-implementation-review buildFirstLocalRuntimeAdapterImplementationReviewStableKey FirstLocalRuntimeAdapterImplementationReviewPanel",
  },
  "first-evidence-store-adapter-implementation-review": {
    slug: "first-evidence-store-adapter-implementation-review",
    phase: "Phase 749",
    title: "First Evidence Store Adapter Implementation Review",
    summarySubject: "First Evidence Store Adapter Implementation Review",
    approvalCopy: "Evidence store adapter implementation requires explicit operator approval.",
    subtitle: "Review evidence store readiness without storing or ingesting evidence.",
    primaryLabel: "Review evidence store implementation",
    anchor: "first-evidence-store-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first evidence store adapter implementation review",
    plainEnglishCopy:
      "First evidence store adapter implementation review does not store or ingest evidence. It reviews evidence shape, citation, redaction, retention, privacy/audit, validation, and unresolved blockers.",
    identity:
      "First Evidence Store Adapter Implementation Review identity: First evidence store adapter implementation review does not store or ingest evidence. Evidence store adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Evidence Store Adapter Implementation Review identity",
      "Implementation review",
      "Evidence shape",
      "Citation",
      "Redaction",
      "Retention",
      "Privacy/audit",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future evidence records, request links, source type, redaction state, validation state, and audit references without evidence capture or ingestion from UI."] },
      { label: "Evidence shape", items: ["Evidence shape: reviewed evidence needs source label, operator note, command or file reference, redaction status, trust level, timestamp supplied by backend evidence, and request id."] },
      { label: "Citation", items: ["Citation: citations must point to reviewed local validation logs, diff summaries, backend audit ids, or operator-provided references; no web or research browsing occurs from UI."] },
      { label: "Redaction", items: ["Redaction: secrets, tokens, endpoints, connector data, provider outputs, credential paths, and private local paths must be redacted before any persistence is approved."] },
      { label: "Retention", items: ["Retention: retention needs owner, scope, expiry, deletion review, and no automatic storage or reuse decisions from UI."] },
      { label: "Privacy/audit", items: ["Privacy/audit: privacy review covers data minimization, approval records, manual evidence links, and no credential/key/token/endpoint/output storage from UI."] },
      { label: "Validation", items: ["Validation: smoke checks verify no evidence capture, ingestion, or storage behavior, route coverage, command UI simplification, checkpoint docs, and deterministic UI posture."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: storage owner, retention policy, redaction proof, citation schema, audit persistence, and manual evidence import process are not approved."] },
    ],
    routes: ["/evidence-store-adapter-implementation-slice", "/first-adapter-implementation-evidence-review", "/adapter-implementation-audit-review"],
    links: [
      { href: "/evidence-store-adapter-implementation-slice", label: "Evidence slice" },
      { href: "/first-adapter-implementation-evidence-review", label: "Evidence review" },
      { href: "/adapter-implementation-audit-review", label: "Audit review" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve evidence shape, redaction, citation, retention, privacy, and audit policy before any evidence store implementation is considered.",
    advancedCopy:
      "advanced first evidence store adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not store or ingest evidence.",
    dataScope:
      "first-evidence-store-adapter-implementation-review buildFirstEvidenceStoreAdapterImplementationReviewStableKey FirstEvidenceStoreAdapterImplementationReviewPanel",
  },
  "first-result-store-adapter-implementation-review": {
    slug: "first-result-store-adapter-implementation-review",
    phase: "Phase 750",
    title: "First Result Store Adapter Implementation Review",
    summarySubject: "First Result Store Adapter Implementation Review",
    approvalCopy: "Result store adapter implementation requires explicit operator approval.",
    subtitle: "Review result store readiness without storing or reusing results.",
    primaryLabel: "Review result store implementation",
    anchor: "first-result-store-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first result store adapter implementation review",
    plainEnglishCopy:
      "First result store adapter implementation review does not store or reuse results. It reviews result shape, acceptance/rejection, reuse, privacy/safety, retention/audit, validation, and unresolved blockers.",
    identity:
      "First Result Store Adapter Implementation Review identity: First result store adapter implementation review does not store or reuse results. Result store adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Result Store Adapter Implementation Review identity",
      "Implementation review",
      "Result shape",
      "Acceptance/rejection",
      "Reuse",
      "Privacy/safety",
      "Retention/audit",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future result record shape, review state, acceptance gate, rejection reason, evidence link, and audit reference without result storage from UI."] },
      { label: "Result shape", items: ["Result shape: result records need request id, adapter family, summary, operator decision, evidence references, redaction state, validation state, and no live output secrets."] },
      { label: "Acceptance/rejection", items: ["Acceptance/rejection: acceptance must be explicit, reversible where possible, reviewable, and never auto-accepted because an adapter or UI generated output."] },
      { label: "Reuse", items: ["Reuse: result reuse requires separate approval, privacy review, freshness review, and no automatic memory, RAG, or template promotion."] },
      { label: "Privacy/safety", items: ["Privacy/safety: no credential/key/token/endpoint/output storage, no connector data reuse, no provider output persistence, and no localStorage or sessionStorage result persistence."] },
      { label: "Retention/audit", items: ["Retention/audit: retention policy, audit links, deletion review, evidence links, and operator decision history must be approved before implementation."] },
      { label: "Validation", items: ["Validation: smoke checks verify no result storage or reuse behavior, route coverage, command UI simplification, checkpoint docs, and deterministic UI posture."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: result schema, acceptance workflow, reuse policy, retention owner, audit persistence, and privacy review are not approved."] },
    ],
    routes: ["/result-store-adapter-implementation-slice", "/first-adapter-implementation-evidence-review", "/adapter-implementation-audit-review"],
    links: [
      { href: "/result-store-adapter-implementation-slice", label: "Result slice" },
      { href: "/first-adapter-implementation-evidence-review", label: "Evidence review" },
      { href: "/adapter-implementation-audit-review", label: "Audit review" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve result shape, acceptance/rejection, reuse, privacy, retention, and audit policy before any result store implementation is considered.",
    advancedCopy:
      "advanced first result store adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not store or reuse results.",
    dataScope:
      "first-result-store-adapter-implementation-review buildFirstResultStoreAdapterImplementationReviewStableKey FirstResultStoreAdapterImplementationReviewPanel",
  },
  "first-recovery-adapter-implementation-review": {
    slug: "first-recovery-adapter-implementation-review",
    phase: "Phase 751",
    title: "First Recovery Adapter Implementation Review",
    summarySubject: "First Recovery Adapter Implementation Review",
    approvalCopy: "Recovery adapter implementation requires explicit operator approval.",
    subtitle: "Review recovery readiness without triggering recovery or retry.",
    primaryLabel: "Review recovery implementation",
    anchor: "first-recovery-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first recovery adapter implementation review",
    plainEnglishCopy:
      "First recovery adapter implementation review does not trigger recovery or retry. It reviews retry, rollback, cleanup, escalation, audit, validation, and unresolved blockers.",
    identity:
      "First Recovery Adapter Implementation Review identity: First recovery adapter implementation review does not trigger recovery or retry. Recovery adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Recovery Adapter Implementation Review identity",
      "Implementation review",
      "Retry",
      "Rollback",
      "Cleanup",
      "Escalation",
      "Audit",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future recovery request shape, approved modes, evidence requirements, audit links, and operator handoff while keeping retry and rollback non-executable from UI."] },
      { label: "Retry", items: ["Retry: retries need bounded profile, attempt cap, backoff policy, precheck, operator approval, evidence link, and no automatic retry from UI."] },
      { label: "Rollback", items: ["Rollback: rollback requires approved source of truth, affected path or process scope, verification step, owner, and no UI-triggered rollback."] },
      { label: "Cleanup", items: ["Cleanup: cleanup actions need target scope, dry review, safety checks, and denial of arbitrary deletes, command execution, or runtime control from UI."] },
      { label: "Escalation", items: ["Escalation: unsafe or unknown failures must route to operator review, not automatic repair, background jobs, notifications, or hidden recovery."] },
      { label: "Audit", items: ["Audit: recovery audit needs request id, original failure link, approval record, recovery mode, outcome, evidence link, redaction state, and retention review."] },
      { label: "Validation", items: ["Validation: smoke checks verify no recovery or retry trigger, route coverage, command UI simplification, checkpoint docs, and deterministic UI posture."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: retry profile registry, rollback evidence, cleanup policy, escalation owner, audit persistence, and validation proof are not approved."] },
    ],
    routes: ["/recovery-adapter-implementation-slice", "/adapter-implementation-recovery-review", "/adapter-implementation-audit-review"],
    links: [
      { href: "/recovery-adapter-implementation-slice", label: "Recovery slice" },
      { href: "/adapter-implementation-recovery-review", label: "Recovery review" },
      { href: "/adapter-implementation-audit-review", label: "Audit review" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep recovery implementation blocked until retry, rollback, cleanup, escalation, audit, and evidence linkage are approved.",
    advancedCopy:
      "advanced first recovery adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not trigger recovery or retry.",
    dataScope:
      "first-recovery-adapter-implementation-review buildFirstRecoveryAdapterImplementationReviewStableKey FirstRecoveryAdapterImplementationReviewPanel",
  },
  "first-packaging-adapter-implementation-review": {
    slug: "first-packaging-adapter-implementation-review",
    phase: "Phase 752",
    title: "First Packaging Adapter Implementation Review",
    summarySubject: "First Packaging Adapter Implementation Review",
    approvalCopy: "Packaging adapter implementation requires explicit operator approval.",
    subtitle: "Review packaging readiness without creating packages or exports.",
    primaryLabel: "Review packaging implementation",
    anchor: "first-packaging-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first packaging adapter implementation review",
    plainEnglishCopy:
      "First packaging adapter implementation review does not create packages or exports. It reviews bundle, artifact, destination, redaction/license, handoff/rollback, validation, and unresolved blockers.",
    identity:
      "First Packaging Adapter Implementation Review identity: First packaging adapter implementation review does not create packages or exports. Packaging adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Packaging Adapter Implementation Review identity",
      "Implementation review",
      "Bundle",
      "Artifact",
      "Destination",
      "Redaction/license",
      "Handoff/rollback",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future packaging request shape, allowed artifact types, destination policy, redaction review, and handoff status without package/export behavior from UI."] },
      { label: "Bundle", items: ["Bundle: bundle inputs must be explicit, allowlisted, license-reviewed, redacted, reproducible, and never gathered by arbitrary local path crawling."] },
      { label: "Artifact", items: ["Artifact: artifact metadata needs request id, content summary, source evidence, size class, redaction state, license status, and validation state."] },
      { label: "Destination", items: ["Destination: destinations must be approved backend-owned locations; no browser storage, automatic downloads, endpoint storage, connector uploads, or package writes from UI."] },
      { label: "Redaction/license", items: ["Redaction/license: copied franchise assets, secrets, credentials, protected assets, unlicensed content, and private endpoints remain denied."] },
      { label: "Handoff/rollback", items: ["Handoff/rollback: packaging handoff needs operator review, rollback or deletion review, validation evidence, and no automatic export or release from UI."] },
      { label: "Validation", items: ["Validation: smoke checks verify no package/export/write behavior, route coverage, command UI simplification, checkpoint docs, and deterministic UI posture."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: artifact schema, license review, destination allowlist, rollback policy, audit persistence, and validation proof are not approved."] },
    ],
    routes: ["/packaging-adapter-implementation-slice", "/adapter-implementation-packaging-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/packaging-adapter-implementation-slice", label: "Packaging slice" },
      { href: "/adapter-implementation-packaging-review", label: "Packaging review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep packaging implementation blocked until artifact shape, destination, redaction, license, handoff, rollback, and audit policies are approved.",
    advancedCopy:
      "advanced first packaging adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not create packages or exports.",
    dataScope:
      "first-packaging-adapter-implementation-review buildFirstPackagingAdapterImplementationReviewStableKey FirstPackagingAdapterImplementationReviewPanel",
  },
  "first-project-scaffold-adapter-implementation-review": {
    slug: "first-project-scaffold-adapter-implementation-review",
    phase: "Phase 753",
    title: "First Project Scaffold Adapter Implementation Review",
    summarySubject: "First Project Scaffold Adapter Implementation Review",
    approvalCopy: "Project scaffold adapter implementation requires explicit operator approval.",
    subtitle: "Review project scaffold readiness without creating projects.",
    primaryLabel: "Review project scaffold implementation",
    anchor: "first-project-scaffold-adapter-implementation-review",
    plainEnglishTitle: "Plain-English first project scaffold adapter implementation review",
    plainEnglishCopy:
      "First project scaffold adapter implementation review does not create projects. It reviews project types, template policy, file/command/runtime dependencies, evidence/result/recovery, validation, unresolved blockers, and an original medieval fantasy example with no copied franchise assets.",
    identity:
      "First Project Scaffold Adapter Implementation Review identity: First project scaffold adapter implementation review does not create projects. Project scaffold adapter implementation requires explicit operator approval, sandbox required, evidence required, and the adapter is not executable from UI.",
    language: FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Project Scaffold Adapter Implementation Review identity",
      "Implementation review",
      "Project types",
      "Template policy",
      "File/command/runtime dependencies",
      "Evidence/result/recovery",
      "Original medieval fantasy",
      "No copied franchise assets",
      "Validation",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Implementation review", items: ["Implementation review: defines future scaffold request shape, template approval, dependency review, output boundaries, and handoff states without creating projects from UI."] },
      { label: "Project types", items: ["Project types: allowed future examples include small local app skeletons, documentation packs, workflow demos, and an original medieval fantasy game/server concept inspired by ice, fire, castles, houses, and kingdoms."] },
      { label: "Template policy", items: ["Template policy: templates must be approved, local, license-reviewed, deterministic, no copied franchise assets, no protected maps, logos, dialogue, music, or character likenesses."] },
      { label: "File/command/runtime dependencies", items: ["File/command/runtime dependencies: scaffold needs approved file write, command runner, and local runtime boundaries before any project creation can be considered."] },
      { label: "Evidence/result/recovery", items: ["Evidence/result/recovery: scaffold review needs evidence links, result acceptance, rollback/cleanup plan, and no automatic evidence ingestion, result storage, or recovery trigger."] },
      { label: "Validation", items: ["Validation: smoke checks verify no project creation, no Minecraft/project/server build or launch execution, no copied franchise assets, route coverage, and deterministic UI posture."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: template registry, destination allowlist, file/command/runtime approvals, license review, recovery ownership, evidence/result policy, and package handoff are not approved."] },
      { label: "What this unlocks next", items: ["What this unlocks next: a future scaffold adapter can become useful only after file write, command runner, local runtime, recovery, evidence, result, packaging, and sandbox boundaries are approved."] },
    ],
    routes: ["/project-scaffold-adapter-implementation-slice", "/first-file-write-adapter-implementation-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/project-scaffold-adapter-implementation-slice", label: "Scaffold slice" },
      { href: "/first-file-write-adapter-implementation-review", label: "File write review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep scaffold implementation blocked until template policy, file/command/runtime approvals, evidence/result/recovery links, and packaging handoff are approved.",
    advancedCopy:
      "advanced first project scaffold adapter implementation review details collapsed/secondary. This route is review-only, not executable from UI, and does not create projects.",
    dataScope:
      "first-project-scaffold-adapter-implementation-review buildFirstProjectScaffoldAdapterImplementationReviewStableKey FirstProjectScaffoldAdapterImplementationReviewPanel",
  },
  "adapter-implementation-harness-review": {
    slug: "adapter-implementation-harness-review",
    phase: "Phase 754",
    title: "Adapter Implementation Harness Review",
    summarySubject: "Adapter Implementation Harness Review",
    approvalCopy: "Adapter implementation harness execution requires explicit operator approval.",
    subtitle: "Review harness coverage without running adapters or tests from UI.",
    primaryLabel: "Review implementation harness",
    anchor: "adapter-implementation-harness-review",
    plainEnglishTitle: "Plain-English adapter implementation harness review",
    plainEnglishCopy:
      "Adapter implementation harness review does not run adapters or tests from UI. It covers file write, command runner, local runtime, evidence store, result store, recovery, packaging, project scaffold, and deferred families.",
    identity:
      "Adapter Implementation Harness Review identity: Adapter implementation harness review does not run adapters or tests from UI. Adapter implementation harness execution requires explicit operator approval, sandbox required, evidence required, and harness execution is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Harness Review identity",
      "Harness coverage",
      "File write",
      "Command runner",
      "Local runtime",
      "Evidence store",
      "Result store",
      "Recovery",
      "Packaging",
      "Project scaffold",
      "Deferred families",
    ],
    sections: [
      { label: "Harness coverage", items: ["Harness coverage: review-only matrix for request shape, approval packet, sandbox proof, audit record, evidence link, result state, recovery mode, validation command, and unresolved blockers."] },
      { label: "File write", items: ["File write: harness expects path allowlist, denylist, diff preview, rollback note, audit summary, and no file write from UI."] },
      { label: "Command runner", items: ["Command runner: harness expects command profile, working directory, env/secrets redaction, timeout, stdout/stderr handling, exit-code states, and no command execution from UI."] },
      { label: "Local runtime", items: ["Local runtime: harness expects process lifecycle states, ports/network policy, stop policy, logs, recovery, and no local runtime start/stop from UI."] },
      { label: "Evidence store", items: ["Evidence store: harness expects evidence shape, citation, redaction, retention, privacy/audit, and no evidence capture/ingestion/storage from UI."] },
      { label: "Result store", items: ["Result store: harness expects result shape, acceptance/rejection, reuse policy, privacy/safety, retention/audit, and no output/result storage or reuse from UI."] },
      { label: "Recovery", items: ["Recovery: harness expects retry, rollback, cleanup, escalation, audit, evidence links, and no recovery/retry trigger from UI."] },
      { label: "Packaging", items: ["Packaging: harness expects bundle, artifact, destination, redaction/license, handoff/rollback, and no package/export/write behavior from UI."] },
      { label: "Project scaffold", items: ["Project scaffold: harness expects template policy, file/command/runtime dependencies, evidence/result/recovery, original medieval fantasy safe wording, and no project/server build or launch execution."] },
      { label: "Deferred families", items: ["Deferred families: provider/model, connector, automation, creative, research, chatbot, video-call monitoring, and game/server execution remain excluded from this controlled MVP harness."] },
    ],
    routes: ["/first-command-runner-adapter-implementation-review", "/adapter-implementation-sandbox-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/first-command-runner-adapter-implementation-review", label: "Command review" },
      { href: "/adapter-implementation-sandbox-review", label: "Sandbox review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve the harness as a review matrix only, then collect manual evidence before any terminal-run harness execution is considered.",
    advancedCopy:
      "advanced adapter implementation harness review details collapsed/secondary. This route is review-only, not executable from UI, and does not run adapters or tests from UI.",
    dataScope:
      "adapter-implementation-harness-review buildAdapterImplementationHarnessReviewStableKey AdapterImplementationHarnessReviewPanel",
  },
  "adapter-implementation-sandbox-review": {
    slug: "adapter-implementation-sandbox-review",
    phase: "Phase 755",
    title: "Adapter Implementation Sandbox Review",
    summarySubject: "Adapter Implementation Sandbox Review",
    approvalCopy: "Adapter implementation sandbox execution requires explicit operator approval.",
    subtitle: "Review sandbox boundaries without running adapters.",
    primaryLabel: "Review implementation sandbox",
    anchor: "adapter-implementation-sandbox-review",
    plainEnglishTitle: "Plain-English adapter implementation sandbox review",
    plainEnglishCopy:
      "Adapter implementation sandbox review does not run adapters. It reviews sandbox path, process, network, provider/connector/automation exclusion, evidence/result boundary, and unresolved blockers.",
    identity:
      "Adapter Implementation Sandbox Review identity: Adapter implementation sandbox review does not run adapters. Adapter implementation sandbox execution requires explicit operator approval, sandbox required, evidence required, and sandbox execution is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Sandbox Review identity",
      "Sandbox path",
      "Process",
      "Network",
      "Provider/connector/automation exclusion",
      "Evidence/result boundary",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Sandbox path", items: ["Sandbox path: allowed paths must be backend-owned, canonical, workspace-bound, allowlisted, traversal-denied, generated-folder-denied, secret-file-denied, and unavailable through arbitrary UI browsing."] },
      { label: "Process", items: ["Process: process execution needs command profiles, lifecycle states, timeout, cancellation, log redaction, stop policy, and no arbitrary shell execution from UI."] },
      { label: "Network", items: ["Network: network access is denied by default, local-first, explicit, no real endpoints displayed, no provider/model calls, no connector fetches, and no automation traffic."] },
      { label: "Provider/connector/automation exclusion", items: ["Provider/connector/automation exclusion: provider/model, connector, automation, creative, research, chatbot, monitoring, video-call, and game/server live traffic stay deferred."] },
      { label: "Evidence/result boundary", items: ["Evidence/result boundary: evidence and results require manual review, redaction, acceptance, retention, and audit decisions; this page does not capture, ingest, store, or reuse them."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: server enforcement, path allowlist source, command profile registry, network denial proof, output redaction, audit persistence, and release handoff are not approved."] },
    ],
    routes: ["/adapter-implementation-sandbox-boundary", "/first-file-write-adapter-implementation-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/adapter-implementation-sandbox-boundary", label: "Sandbox boundary" },
      { href: "/first-file-write-adapter-implementation-review", label: "File write review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve sandbox path, process, network, deferred exclusions, evidence/result boundaries, and unresolved blocker ownership before implementation.",
    advancedCopy:
      "advanced adapter implementation sandbox review details collapsed/secondary. This route is review-only, not executable from UI, and does not run adapters.",
    dataScope:
      "adapter-implementation-sandbox-review buildAdapterImplementationSandboxReviewStableKey AdapterImplementationSandboxReviewPanel",
  },
  "adapter-implementation-audit-review": {
    slug: "adapter-implementation-audit-review",
    phase: "Phase 756",
    title: "Adapter Implementation Audit Review",
    summarySubject: "Adapter Implementation Audit Review",
    approvalCopy: "Adapter audit persistence requires explicit operator approval.",
    subtitle: "Review audit readiness without storing audit events.",
    primaryLabel: "Review implementation audit",
    anchor: "adapter-implementation-audit-review",
    plainEnglishTitle: "Plain-English adapter implementation audit review",
    plainEnglishCopy:
      "Adapter implementation audit review does not store audit events. It reviews audit events, approval records, redaction, evidence/result links, recovery links, retention, and unresolved blockers.",
    identity:
      "Adapter Implementation Audit Review identity: Adapter implementation audit review does not store audit events. Adapter audit persistence requires explicit operator approval, sandbox required, evidence required, and audit persistence is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Audit Review identity",
      "Audit events",
      "Approval records",
      "Redaction",
      "Evidence/result links",
      "Recovery links",
      "Retention",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Audit events", items: ["Audit events: reviewed event shape includes request id, adapter family, operator action, policy decision, sandbox state, outcome, validation state, redaction state, and no secret values."] },
      { label: "Approval records", items: ["Approval records: approvals need explicit operator identity or role, request summary, scope, expiration, rollback note, and no approval automation or decision persistence from UI."] },
      { label: "Redaction", items: ["Redaction: audit views must redact credentials, tokens, endpoints, provider outputs, connector data, private paths, and command output secrets before persistence is approved."] },
      { label: "Evidence/result links", items: ["Evidence/result links: audit can link reviewed evidence and result ids only after explicit approval; this page does not capture evidence or store results."] },
      { label: "Recovery links", items: ["Recovery links: recovery events need original failure, retry or rollback mode, cleanup status, escalation path, validation evidence, and no recovery trigger from UI."] },
      { label: "Retention", items: ["Retention: retention needs owner, scope, expiry, deletion review, privacy review, and no browser credential/output storage."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: audit schema, persistence owner, redaction proof, approval record retention, evidence/result references, and recovery links are not approved."] },
    ],
    routes: ["/adapter-implementation-audit-trail", "/first-evidence-store-adapter-implementation-review", "/first-result-store-adapter-implementation-review"],
    links: [
      { href: "/adapter-implementation-audit-trail", label: "Audit trail" },
      { href: "/first-evidence-store-adapter-implementation-review", label: "Evidence store review" },
      { href: "/first-result-store-adapter-implementation-review", label: "Result store review" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve audit event shape, redaction, approval records, evidence/result links, recovery links, and retention before audit persistence exists.",
    advancedCopy:
      "advanced adapter implementation audit review details collapsed/secondary. This route is review-only, not executable from UI, and does not store audit events.",
    dataScope:
      "adapter-implementation-audit-review buildAdapterImplementationAuditReviewStableKey AdapterImplementationAuditReviewPanel",
  },
  "adapter-implementation-recovery-review": {
    slug: "adapter-implementation-recovery-review",
    phase: "Phase 757",
    title: "Adapter Implementation Recovery Review",
    summarySubject: "Adapter Implementation Recovery Review",
    approvalCopy: "Adapter recovery execution requires explicit operator approval.",
    subtitle: "Review recovery readiness without triggering recovery or retry.",
    primaryLabel: "Review adapter recovery",
    anchor: "adapter-implementation-recovery-review",
    plainEnglishTitle: "Plain-English adapter implementation recovery review",
    plainEnglishCopy:
      "Adapter implementation recovery review does not trigger recovery or retry. It reviews recovery modes, rollback, retry, cleanup, escalation, evidence/result linkage, and unresolved blockers.",
    identity:
      "Adapter Implementation Recovery Review identity: Adapter implementation recovery review does not trigger recovery or retry. Adapter recovery execution requires explicit operator approval, sandbox required, evidence required, and recovery execution is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Recovery Review identity",
      "Recovery modes",
      "Rollback",
      "Retry",
      "Cleanup",
      "Escalation",
      "Evidence/result linkage",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Recovery modes", items: ["Recovery modes: reviewed modes include no-op, retry, rollback, cleanup, escalate, validation-needed, and blocked; none are triggered from UI."] },
      { label: "Rollback", items: ["Rollback: rollback needs approved previous state, affected scope, operator approval, validation proof, audit record, and explicit denial for arbitrary file deletion or command execution from UI."] },
      { label: "Retry", items: ["Retry: retry needs approved profile, attempt cap, timeout, output cap, redaction, evidence link, and no automatic retry from UI."] },
      { label: "Cleanup", items: ["Cleanup: cleanup needs approved target scope, dry review, owner, validation, and no package/export/write, process kill, or path crawling from UI."] },
      { label: "Escalation", items: ["Escalation: escalation sends the issue to operator review without notifications, background jobs, schedules, polling loops, or hidden automation from UI."] },
      { label: "Evidence/result linkage", items: ["Evidence/result linkage: recovery decisions must link reviewed evidence and accepted/rejected result state after approval; this page does not ingest or store either."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: recovery mode registry, rollback evidence, retry policy, cleanup policy, escalation owner, audit persistence, and evidence/result linkage are not approved."] },
    ],
    routes: ["/first-recovery-adapter-implementation-review", "/adapter-implementation-audit-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/first-recovery-adapter-implementation-review", label: "First recovery review" },
      { href: "/adapter-implementation-audit-review", label: "Audit review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve recovery modes, rollback, retry, cleanup, escalation, evidence/result linkage, and audit requirements before recovery execution exists.",
    advancedCopy:
      "advanced adapter implementation recovery review details collapsed/secondary. This route is review-only, not executable from UI, and does not trigger recovery or retry.",
    dataScope:
      "adapter-implementation-recovery-review buildAdapterImplementationRecoveryReviewStableKey AdapterImplementationRecoveryReviewPanel",
  },
  "adapter-implementation-packaging-review": {
    slug: "adapter-implementation-packaging-review",
    phase: "Phase 758",
    title: "Adapter Implementation Packaging Review",
    summarySubject: "Adapter Implementation Packaging Review",
    approvalCopy: "Adapter packaging execution requires explicit operator approval.",
    subtitle: "Review packaging readiness without creating packages or exports.",
    primaryLabel: "Review adapter packaging",
    anchor: "adapter-implementation-packaging-review",
    plainEnglishTitle: "Plain-English adapter implementation packaging review",
    plainEnglishCopy:
      "Adapter implementation packaging review does not create packages or exports. It reviews packaging outputs, destination, license/redaction, handoff, rollback, and unresolved blockers.",
    identity:
      "Adapter Implementation Packaging Review identity: Adapter implementation packaging review does not create packages or exports. Adapter packaging execution requires explicit operator approval, sandbox required, evidence required, and packaging execution is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Packaging Review identity",
      "Packaging outputs",
      "Destination",
      "License/redaction",
      "Handoff",
      "Rollback",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Packaging outputs", items: ["Packaging outputs: reviewed output types include summary packs, validation packets, handoff manifests, and artifact metadata; this page creates no packages, exports, or downloads."] },
      { label: "Destination", items: ["Destination: destination must be backend-owned, approved, local-first, redacted, and never an arbitrary endpoint, connector upload, browser storage, or hidden file write from UI."] },
      { label: "License/redaction", items: ["License/redaction: license status, copied asset checks, secret redaction, endpoint redaction, and no copied franchise assets must be reviewed before packaging."] },
      { label: "Handoff", items: ["Handoff: handoff needs operator review, evidence links, result state, validation commands, unresolved blockers, and no automatic release or handoff send from UI."] },
      { label: "Rollback", items: ["Rollback: rollback needs deletion review, artifact invalidation, audit link, owner, and no UI-triggered package removal or file deletion."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: output schema, destination allowlist, license review, redaction proof, handoff owner, rollback policy, and audit persistence are not approved."] },
    ],
    routes: ["/first-packaging-adapter-implementation-review", "/adapter-implementation-audit-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/first-packaging-adapter-implementation-review", label: "First packaging review" },
      { href: "/adapter-implementation-audit-review", label: "Audit review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: approve packaging outputs, destination, license/redaction, handoff, rollback, and audit policy before packaging execution exists.",
    advancedCopy:
      "advanced adapter implementation packaging review details collapsed/secondary. This route is review-only, not executable from UI, and does not create packages or exports.",
    dataScope:
      "adapter-implementation-packaging-review buildAdapterImplementationPackagingReviewStableKey AdapterImplementationPackagingReviewPanel",
  },
  "adapter-implementation-operator-trial-review": {
    slug: "adapter-implementation-operator-trial-review",
    phase: "Phase 759",
    title: "Adapter Implementation Operator Trial Review",
    summarySubject: "Adapter Implementation Operator Trial Review",
    approvalCopy: "Operator trial execution requires explicit operator approval.",
    subtitle: "Review operator trial readiness without executing adapters.",
    primaryLabel: "Review operator trial",
    anchor: "adapter-implementation-operator-trial-review",
    plainEnglishTitle: "Plain-English adapter implementation operator trial review",
    plainEnglishCopy:
      "Adapter implementation operator trial review does not execute adapters. It reviews operator responsibilities, trial checklist, approval review, validation commands, rollback readiness, and unresolved blockers.",
    identity:
      "Adapter Implementation Operator Trial Review identity: Adapter implementation operator trial review does not execute adapters. Operator trial execution requires explicit operator approval, sandbox required, evidence required, and operator trial execution is not executable from UI.",
    language: ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_LANGUAGE,
    advancedDetails: [
      "Adapter Implementation Operator Trial Review identity",
      "Operator responsibilities",
      "Trial checklist",
      "Approval review",
      "Validation commands",
      "Rollback readiness",
      "Unresolved blockers",
    ],
    sections: [
      { label: "Operator responsibilities", items: ["Operator responsibilities: inspect scope, review approval packet, confirm sandbox policy, run terminal validation only after approval, review rollback readiness, and avoid claiming execution without evidence."] },
      { label: "Trial checklist", items: ["Trial checklist: file write review, command runner review, local runtime review, stores review, recovery review, packaging review, scaffold review, harness review, sandbox review, audit review, and evidence review."] },
      { label: "Approval review", items: ["Approval review: approval must be explicit, scoped, revocable, auditable, and never automated, persisted from UI, or reused for deferred families."] },
      { label: "Validation commands", items: ["Validation commands: npm run build; checkpoint docs smoke; focused phase smokes; all-smoke; command UI simplification smoke; repo hygiene smoke; server smoke; git diff --check; git status --short; git diff --stat."] },
      { label: "Rollback readiness", items: ["Rollback readiness: every approved adapter trial needs rollback/no-op plan, cleanup owner, validation evidence, recovery route, audit link, and operator escalation path."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: backend execution owner, sandbox proof, audit persistence, evidence/result policy, recovery ownership, packaging handoff, and validation evidence are not approved."] },
    ],
    routes: ["/adapter-implementation-harness-review", "/first-adapter-implementation-evidence-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/adapter-implementation-harness-review", label: "Harness review" },
      { href: "/first-adapter-implementation-evidence-review", label: "Evidence review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: keep operator trial review as a checklist until file write, command runner, runtime, sandbox, audit, evidence, result, recovery, and packaging policies are approved.",
    advancedCopy:
      "advanced adapter implementation operator trial review details collapsed/secondary. This route is review-only, not executable from UI, and does not execute adapters.",
    dataScope:
      "adapter-implementation-operator-trial-review buildAdapterImplementationOperatorTrialReviewStableKey AdapterImplementationOperatorTrialReviewPanel",
  },
  "first-adapter-implementation-evidence-review": {
    slug: "first-adapter-implementation-evidence-review",
    phase: "Phase 760",
    title: "First Adapter Implementation Evidence Review",
    summarySubject: "First Adapter Implementation Evidence Review",
    approvalCopy: "Adapter evidence usage requires explicit operator approval.",
    subtitle: "Review evidence coverage without capturing or ingesting evidence automatically.",
    primaryLabel: "Review adapter evidence",
    anchor: "first-adapter-implementation-evidence-review",
    plainEnglishTitle: "Plain-English first adapter implementation evidence review",
    plainEnglishCopy:
      "First adapter implementation evidence review does not capture or ingest evidence automatically. It covers file write, command runner, local runtime, stores, recovery, packaging, project scaffold, harness, sandbox, audit, and operator trial evidence.",
    identity:
      "First Adapter Implementation Evidence Review identity: First adapter implementation evidence review does not capture or ingest evidence automatically. Adapter evidence usage requires explicit operator approval, sandbox required, evidence required, and evidence usage is not executable from UI.",
    language: FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_LANGUAGE,
    advancedDetails: [
      "First Adapter Implementation Evidence Review identity",
      "Evidence coverage",
      "File write",
      "Command runner",
      "Local runtime",
      "Stores",
      "Recovery",
      "Packaging",
      "Project scaffold",
      "Harness",
      "Sandbox",
      "Audit",
      "Operator trial",
    ],
    sections: [
      { label: "Evidence coverage", items: ["Evidence coverage: every implementation review needs manual proof for request shape, approval, sandbox boundary, audit state, validation command, outcome, rollback readiness, and unresolved blockers."] },
      { label: "File write", items: ["File write: evidence should show allowlist, denylist, diff preview, rollback note, audit shape, and no file write from UI."] },
      { label: "Command runner", items: ["Command runner: evidence should show command profile, working directory, env/secrets redaction, timeout, stdout/stderr policy, exit-code states, and no command execution from UI."] },
      { label: "Local runtime", items: ["Local runtime: evidence should show lifecycle, ports/network, stop policy, logs, recovery, and no local runtime start/stop from UI."] },
      { label: "Stores", items: ["Stores: evidence store and result store evidence should show shape, citation, redaction, retention, acceptance/rejection, reuse policy, privacy/safety, and no automatic storage."] },
      { label: "Recovery", items: ["Recovery: evidence should show retry, rollback, cleanup, escalation, audit, evidence/result linkage, and no recovery/retry trigger from UI."] },
      { label: "Packaging", items: ["Packaging: evidence should show bundle, artifact, destination, redaction/license, handoff, rollback, and no package/export/write behavior from UI."] },
      { label: "Project scaffold", items: ["Project scaffold: evidence should show template policy, dependencies, recovery plan, original medieval fantasy safe wording, no copied franchise assets, and no project/server build or launch execution."] },
      { label: "Harness", items: ["Harness: evidence should show review matrix coverage and no adapters or tests run from UI."] },
      { label: "Sandbox", items: ["Sandbox: evidence should show path, process, network, provider/connector/automation exclusion, and evidence/result boundaries."] },
      { label: "Audit", items: ["Audit: evidence should show audit event shape, approval records, redaction, evidence/result links, recovery links, retention, and no audit storage from UI."] },
      { label: "Operator trial", items: ["Operator trial: evidence should show responsibilities, checklist, approval review, validation commands, rollback readiness, and unresolved blockers."] },
    ],
    routes: ["/first-evidence-store-adapter-implementation-review", "/adapter-implementation-operator-trial-review", "/first-useful-controlled-adapter-mvp-candidate"],
    links: [
      { href: "/first-evidence-store-adapter-implementation-review", label: "Evidence store review" },
      { href: "/adapter-implementation-operator-trial-review", label: "Operator trial review" },
      { href: "/first-useful-controlled-adapter-mvp-candidate", label: "MVP candidate" },
    ],
    nextRecommendedAction:
      "Next recommended action: gather manual evidence requirements for each review surface before any first actual bounded adapter implementation is attempted.",
    advancedCopy:
      "advanced first adapter implementation evidence review details collapsed/secondary. This route is review-only, not executable from UI, and does not capture or ingest evidence automatically.",
    dataScope:
      "first-adapter-implementation-evidence-review buildFirstAdapterImplementationEvidenceReviewStableKey FirstAdapterImplementationEvidenceReviewPanel",
  },
  "first-useful-controlled-adapter-mvp-candidate": {
    slug: "first-useful-controlled-adapter-mvp-candidate",
    phase: "Phase 761",
    title: "First Useful Controlled Adapter MVP Candidate",
    summarySubject: "First Useful Controlled Adapter MVP Candidate",
    approvalCopy: "Useful controlled adapter MVP execution requires explicit operator approval.",
    subtitle: "Summarize first useful controlled adapter MVP readiness without executing adapters.",
    primaryLabel: "Review controlled adapter MVP",
    anchor: "first-useful-controlled-adapter-mvp-candidate",
    plainEnglishTitle: "Plain-English first useful controlled adapter MVP candidate",
    plainEnglishCopy:
      "First useful controlled adapter MVP candidate does not execute adapters. It summarizes readiness for file write, command runner, local runtime, evidence store, result store, recovery, packaging, project scaffold, harness, sandbox, audit, operator trial, evidence review, deferred families, unresolved blockers, and next recommended action.",
    identity:
      "First Useful Controlled Adapter MVP Candidate identity: First useful controlled adapter MVP candidate does not execute adapters. Useful controlled adapter MVP execution requires explicit operator approval, sandbox required, evidence required, and actual bounded implementation remains blocked until backend-owned approval and evidence exist.",
    language: FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_LANGUAGE,
    advancedDetails: [
      "First Useful Controlled Adapter MVP Candidate identity",
      "First useful MVP readiness",
      "File write",
      "Command runner",
      "Local runtime",
      "Evidence store",
      "Result store",
      "Recovery",
      "Packaging",
      "Project scaffold",
      "Harness",
      "Sandbox",
      "Audit",
      "Operator trial",
      "Evidence review",
      "Deferred families",
      "Unresolved blockers",
      "Next recommended action",
    ],
    sections: [
      { label: "First useful MVP readiness", items: ["First useful MVP readiness: review surfaces now cover file write, command runner, local runtime, evidence store, result store, recovery, packaging, project scaffold, harness, sandbox, audit, operator trial, and evidence review."] },
      { label: "File write", items: ["File write: close to first useful implementation only after allowlist/denylist, diff preview, rollback, audit, evidence, validation, and unresolved blockers are approved."] },
      { label: "Command runner", items: ["Command runner: remains blocked until command policy, working directory, env/secrets, timeout, stdout/stderr, exit-code, recovery, evidence, and validation are approved."] },
      { label: "Local runtime", items: ["Local runtime: remains blocked until process lifecycle, ports/network, stop policy, logs, recovery, evidence, validation, and sandbox policy are approved."] },
      { label: "Evidence store", items: ["Evidence store: remains blocked until evidence shape, citation, redaction, retention, privacy/audit, and explicit usage approval are approved."] },
      { label: "Result store", items: ["Result store: remains blocked until result shape, acceptance/rejection, reuse, privacy/safety, retention/audit, and explicit result approval are approved."] },
      { label: "Recovery", items: ["Recovery: remains blocked until retry, rollback, cleanup, escalation, audit, evidence/result linkage, and operator escalation are approved."] },
      { label: "Packaging", items: ["Packaging: remains blocked until packaging outputs, destination, license/redaction, handoff, rollback, and no package/export/write behavior are approved."] },
      { label: "Project scaffold", items: ["Project scaffold: remains blocked until project types, template policy, file/command/runtime dependencies, evidence/result/recovery, original medieval fantasy safe wording, and no copied franchise assets are approved."] },
      { label: "Harness", items: ["Harness: ready as a review matrix only; it does not run adapters or tests from UI."] },
      { label: "Sandbox", items: ["Sandbox: must prove path, process, network, provider/connector/automation exclusion, and evidence/result boundary before implementation."] },
      { label: "Audit", items: ["Audit: must approve events, approval records, redaction, evidence/result links, recovery links, retention, and no audit storage from UI."] },
      { label: "Operator trial", items: ["Operator trial: must keep responsibilities, checklist, approval review, validation commands, rollback readiness, and unresolved blockers explicit before any trial execution."] },
      { label: "Evidence review", items: ["Evidence review: must cover file write, command runner, local runtime, stores, recovery, packaging, project scaffold, harness, sandbox, audit, and operator trial evidence without automatic capture or ingestion."] },
      { label: "Deferred families", items: ["Deferred families: provider/model, connector, automation, creative, research, chatbot, game/server, video-call monitoring, and live provider/local/connector traffic remain deferred."] },
      { label: "Unresolved blockers", items: ["Unresolved blockers: backend request contract, sandbox enforcement, approval packet, audit persistence, evidence/result persistence, recovery ownership, packaging handoff, command profiles, runtime profiles, and validation evidence are not approved."] },
      { label: "Next recommended action", items: ["Next recommended action: implement only the first actual bounded file-write request contract after explicit operator approval, with no UI execution, no arbitrary paths, diff preview, rollback, audit, evidence, validation, and denial smokes; keep command runner and local runtime next but blocked until file-write evidence is proven."] },
    ],
    routes: [
      "/first-file-write-adapter-implementation-review",
      "/first-command-runner-adapter-implementation-review",
      "/first-local-runtime-adapter-implementation-review",
      "/adapter-implementation-operator-trial-review",
    ],
    links: [
      { href: "/first-file-write-adapter-implementation-review", label: "File write review" },
      { href: "/first-command-runner-adapter-implementation-review", label: "Command review" },
      { href: "/adapter-implementation-operator-trial-review", label: "Operator trial review" },
    ],
    nextRecommendedAction:
      "Next recommended action: move toward the first actual bounded file-write request contract only after operator approval, backend enforcement, sandbox policy, audit shape, rollback readiness, and validation evidence are complete.",
    advancedCopy:
      "advanced first useful controlled adapter MVP candidate details collapsed/secondary. This route is review-only, not executable from UI, does not execute adapters, and does not claim actual bounded implementation exists yet.",
    dataScope:
      "first-useful-controlled-adapter-mvp-candidate buildFirstUsefulControlledAdapterMvpCandidateStableKey FirstUsefulControlledAdapterMvpCandidatePanel",
  },
};

export function buildAdapterImplementationReview(
  slug: AdapterImplementationReviewSlug,
  input: AdapterImplementationReviewPacketInput
): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview(slug, input);
}

export function buildAdapterImplementationReviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildAdapterBackedExecutionPreviewAdvancedDetails(title, language, [...details, ...ADAPTER_IMPLEMENTATION_REVIEW_SAFETY_MARKERS]);
}

export function buildAdapterImplementationReviewSections(
  ...sections: AdapterImplementationReviewSectionInput[]
): ReturnType<typeof buildAdapterBackedExecutionPreviewSections> {
  return buildAdapterBackedExecutionPreviewSections(...sections);
}

export function buildAdapterImplementationReviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function getAdapterImplementationReviewDefinition(slug: AdapterImplementationReviewSlug) {
  return ADAPTER_IMPLEMENTATION_REVIEW_DEFINITIONS[slug];
}

export function buildAdapterImplementationReviewPackets(slug: AdapterImplementationReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getAdapterImplementationReviewDefinition(slug);
  return [
    buildAdapterImplementationReview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections: buildAdapterImplementationReviewSections(...definition.sections),
      routes: [...definition.routes],
      nextRecommendedAction: definition.nextRecommendedAction,
      advancedDetails: buildAdapterImplementationReviewAdvancedDetails(definition.anchor, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeAdapterImplementationReview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeAdapterBackedExecutionPreview(title, packets, approvalCopy);
}

export function summarizeAdapterImplementationReviewForSlug(
  slug: AdapterImplementationReviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getAdapterImplementationReviewDefinition(slug);
  return summarizeAdapterImplementationReview(definition.title, packets, definition.approvalCopy);
}

export function buildAdapterImplementationReviewModelForSlug(
  slug: AdapterImplementationReviewSlug,
  packets = buildAdapterImplementationReviewPackets(slug)
) {
  const definition = getAdapterImplementationReviewDefinition(slug);
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
    advancedDetails: [...definition.advancedDetails, ...ADAPTER_IMPLEMENTATION_REVIEW_SAFETY_MARKERS],
    links: definition.links,
    packets,
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
