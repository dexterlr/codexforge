import "server-only";

import type { Route } from "next";
import type { JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview } from "../jarvis-video-first-gated-provider-execution-trial-runtime-preview";

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PHASE_RANGE =
  "4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime";

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TITLE =
  "Jarvis Video First Gated Provider Execution Trial Runtime";

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION =
  "jarvis-video-first-gated-provider-execution-trial-runtime-v1";

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_HIGHEST_PHASE =
  4329 as const;

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_LATEST_COMPLETED_BATCH =
  JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PHASE_RANGE;

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PREVIOUS_COMPLETED_BATCH =
  "4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation";

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_NEXT_LIKELY_BATCH =
  "next likely batch: 4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidencePhaseRange =
  | "3434-3465"
  | "3466-3497"
  | "3498-3529"
  | "3530-3561"
  | "3754-3785"
  | "3786-3817"
  | "3818-3849"
  | "3882-3913"
  | "3946-3977"
  | "3978-4009"
  | "4010-4041"
  | "4042-4073"
  | "4074-4105"
  | "4106-4137"
  | "4138-4169"
  | "4170-4201"
  | "4202-4233"
  | "4234-4265"
  | "4266-4297";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidenceSource =
  Readonly<{
    phaseRange: JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidencePhaseRange;
    label: string;
    href: Route;
    summary: string;
    reviewMode: "inert-review-only-input";
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeMode =
  | "disabled-by-default"
  | "operator-enabled";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference =
  Readonly<{
    label: string;
    posture: string;
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord =
  Readonly<{
    title: string;
    posture: string;
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeCredentialSlotReference =
  Readonly<{
    slotLabel: string;
    tokenLabel: string;
    posture: "opaque-token-label-only";
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId =
  | "runtime-enabled"
  | "provider-adapter-injected"
  | "operator-approval"
  | "credential-isolation"
  | "provider-preflight"
  | "safety-preflight"
  | "privacy-redaction"
  | "cost-rate-duration-resolution"
  | "timeout-cancel"
  | "idempotency-key"
  | "single-call-lock"
  | "replay-block"
  | "kill-switch"
  | "network-egress"
  | "queue-not-dispatched"
  | "worker-not-dispatched"
  | "job-not-executed"
  | "persistence-not-persisted"
  | "artifact-placeholder-until-capture-review"
  | "retry-fallback-disabled";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateState =
  | "satisfied"
  | "required"
  | "blocked";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateChecklistItem =
  Readonly<{
    id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId;
    title: string;
    summary: string;
    state: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateState;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState =
  Readonly<{
    runtimeEnabled: boolean;
    providerAdapterInjected: boolean;
    operatorApproved: boolean;
    credentialIsolationConfirmed: boolean;
    providerPreflightCleared: boolean;
    safetyPreflightCleared: boolean;
    privacyRedactionCleared: boolean;
    costRateDurationResolutionCleared: boolean;
    timeoutCancelCleared: boolean;
    idempotencyKeyProvided: boolean;
    singleCallLockAcquired: boolean;
    replayBlockActive: boolean;
    killSwitchEnforced: boolean;
    networkEgressApproved: boolean;
    queueNotDispatched: boolean;
    workerNotDispatched: boolean;
    jobNotExecuted: boolean;
    persistenceNotPersisted: boolean;
    artifactPlaceholderOnly: boolean;
    retryFallbackDisabled: boolean;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeInputEnvelope =
  Readonly<{
    runtimeInputEnvelopeKey: string;
    runtimeVersion: typeof JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION;
    runtimeMode: JarvisVideoFirstGatedProviderExecutionTrialRuntimeMode;
    workspaceId: "jarvis-video";
    studioRoute: "/jarvis-video";
    runtimeLabel: typeof JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TITLE;
    providerAdapterReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    providerCredentialSlotReferences: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeCredentialSlotReference[];
    operatorApprovalReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    approvalPacketDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    resultCaptureEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    auditEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    approvalJoinEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    promptBriefDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    settingsDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    safetyNotesDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    evidenceSources: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidenceSource[];
    idempotencyKeyLabel: "jarvis-video-provider-trial-idempotency-key";
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope =
  Readonly<{
    runtimeGateEnvelopeKey: string;
    runtimeMode: JarvisVideoFirstGatedProviderExecutionTrialRuntimeMode;
    providerPreflightGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    safetyPreflightGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    privacyRedactionGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    costRateDurationResolutionGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    timeoutCancelGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    gateChecklist: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateChecklistItem[];
    missingGateIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[];
    acceptanceState: "blocked-until-explicit-gates";
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockerId =
  | "runtime-disabled-by-default"
  | "provider-adapter-injection-required"
  | "operator-approval-required"
  | "credential-isolation-required"
  | "preflight-gates-unsatisfied"
  | "network-egress-denied-by-default"
  | "queue-worker-job-dispatch-disabled"
  | "persistence-and-artifact-handoff-unimplemented"
  | "future-result-review-recovery-batch-required";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlocker =
  Readonly<{
    id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockerId;
    title: string;
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeRejectionEnvelope =
  Readonly<{
    runtimeRejectionEnvelopeKey: string;
    outcome: "blocked";
    label: string;
    summary: string;
    missingGateIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[];
    blockers: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlocker[];
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceId =
  | "frontend-provider-call"
  | "public-api-route"
  | "provider-sdk-imports"
  | "fetch-network-calls"
  | "provider-call-during-validation"
  | "live-video-generation-during-validation"
  | "queue-dispatch"
  | "worker-dispatch"
  | "job-execution"
  | "scheduler-orchestration-execution"
  | "result-persistence"
  | "audit-persistence"
  | "approval-persistence"
  | "artifact-persistence"
  | "retry-fallback-execution"
  | "render-export-publish"
  | "uploads-downloads"
  | "shell-process-command-execution"
  | "file-writes"
  | "database-writes";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceRecord =
  Readonly<{
    id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceId;
    title: string;
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockedResultEnvelope =
  Readonly<{
    runtimeBlockedResultEnvelopeKey: string;
    outcome: "blocked";
    label: string;
    summary: string;
    artifactState: "placeholder until capture/review";
    queueState: "not dispatched";
    workerState: "not dispatched";
    jobState: "not executed";
    persistenceState: "not persisted";
    retryFallbackState: "disabled";
    disabledExecutionSurfaces: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceId[];
    nextStep: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeProviderAdapterInjectionRequirement =
  Readonly<{
    title: string;
    contractName: "JarvisVideoFirstGatedProviderExecutionTrialRuntimeInjectedAdapter";
    posture: "required";
    summary: string;
    adapterReferenceLabel: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeAdapterRequestEnvelope =
  Readonly<{
    runtimeAttemptKey: string;
    runtimeInputEnvelopeKey: string;
    promptBriefDigestReference: string;
    settingsDigestReference: string;
    safetyNotesDigestReference: string;
    operatorApprovalReference: string;
    approvalPacketDigestReference: string;
    resultCaptureEnvelopeReference: string;
    auditEnvelopeReference: string;
    approvalJoinEnvelopeReference: string;
    idempotencyKeyLabel: "jarvis-video-provider-trial-idempotency-key";
    providerCredentialSlotReferences: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeCredentialSlotReference[];
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeAdapterResponseEnvelope =
  Readonly<{
    outcome: "in-memory-only";
    providerLabel: string;
    summary: string;
    artifactState: "placeholder until capture/review";
    persistenceState: "not persisted";
    resultCaptureEnvelopeReference: string;
    auditEnvelopeReference: string;
    approvalJoinEnvelopeReference: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeInjectedAdapter =
  (
    request: JarvisVideoFirstGatedProviderExecutionTrialRuntimeAdapterRequestEnvelope
  ) => Promise<JarvisVideoFirstGatedProviderExecutionTrialRuntimeAdapterResponseEnvelope>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistId =
  | "backend-only-execution-path-required"
  | "server-only-boundary-required"
  | "provider-adapter-injection-required"
  | "operator-approval-required"
  | "credential-isolation-required"
  | "result-capture-envelope-reference"
  | "audit-envelope-reference"
  | "approval-join-envelope-reference"
  | "prompt-brief-digest-reference"
  | "settings-digest-reference"
  | "safety-notes-digest-reference"
  | "hard-kill-switch-enforced";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistItem =
  Readonly<{
    id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistId;
    title: string;
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistId =
  | "blocked-runtime-result-defined"
  | "result-capture-review-required"
  | "audit-envelope-review-required"
  | "approval-join-review-required"
  | "artifact-review-placeholder-maintained"
  | "no-persistence-state-maintained"
  | "future-recovery-batch-required";

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistItem =
  Readonly<{
    id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistId;
    title: string;
    summary: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeAttempt =
  Readonly<{
    runtimeAttemptKey: string;
    runtimeInputEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeInputEnvelope;
    runtimeGateEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope;
    runtimeRejectionEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeRejectionEnvelope;
    runtimeBlockedResultEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockedResultEnvelope;
    providerAdapterInjectionRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeProviderAdapterInjectionRequirement;
    runtimeAcceptanceChecklist: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistItem[];
    nextResultReviewRecoveryAcceptanceCriteria: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistItem[];
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeStaticReadiness =
  Readonly<{
    isReady: boolean;
    missingGateIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[];
    blockerCount: number;
    disabledSurfaceCount: number;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeCheckpoint =
  Readonly<{
    highestDetectedPhase: typeof JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_HIGHEST_PHASE;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeCompleteness =
  Readonly<{
    isComplete: boolean;
    missingGateIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[];
    missingAcceptanceChecklistIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistId[];
    missingResultReviewRecoveryChecklistIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistId[];
    missingEvidenceInputs: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidencePhaseRange[];
    missingStateMarkers: readonly string[];
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel =
  Readonly<{
    version: typeof JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION;
    runtimeMode: JarvisVideoFirstGatedProviderExecutionTrialRuntimeMode;
    firstGatedProviderExecutionTrialRuntimeSummary: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    runtimeInputEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeInputEnvelope;
    runtimeGateEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope;
    runtimeRejectionEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeRejectionEnvelope;
    runtimeBlockedResultEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockedResultEnvelope;
    providerAdapterInjectionRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeProviderAdapterInjectionRequirement;
    providerAdapterReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    providerCredentialSlotReferences: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeCredentialSlotReference[];
    operatorApprovalStatus: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    credentialIsolationStatus: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    resultCaptureAuditApprovalJoinHandoff: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    approvalPacketDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    resultCaptureEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    auditEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    approvalJoinEnvelopeReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    promptBriefDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    settingsDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    safetyNotesDigestReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    providerPreflightGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    safetyPreflightGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    privacyRedactionGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    costRateDurationResolutionGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    timeoutCancelGateReference: JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;
    idempotencyKeyRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    singleCallLockRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    replayBlockRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    killSwitchRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    networkEgressPolicyRequirement: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    queueState: "not dispatched";
    workerState: "not dispatched";
    jobState: "not executed";
    persistenceState: "not persisted";
    artifactState: "placeholder until capture/review";
    retryFallbackState: "disabled";
    runtimeBlockers: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlocker[];
    runtimeAcceptanceChecklist: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistItem[];
    nextResultReviewRecoveryAcceptanceCriteria: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistItem[];
    resultReviewRecoveryHandoffSummary: JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
    disabledExecutionSurfaces: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceRecord[];
    evidenceSources: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidenceSource[];
    checkpoint: JarvisVideoFirstGatedProviderExecutionTrialRuntimeCheckpoint;
    staticReadiness: JarvisVideoFirstGatedProviderExecutionTrialRuntimeStaticReadiness;
    completeness: JarvisVideoFirstGatedProviderExecutionTrialRuntimeCompleteness;
    displayMarkers: readonly string[];
  }>;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_GATE_IDS =
  [
    "runtime-enabled",
    "provider-adapter-injected",
    "operator-approval",
    "credential-isolation",
    "provider-preflight",
    "safety-preflight",
    "privacy-redaction",
    "cost-rate-duration-resolution",
    "timeout-cancel",
    "idempotency-key",
    "single-call-lock",
    "replay-block",
    "kill-switch",
    "network-egress",
    "queue-not-dispatched",
    "worker-not-dispatched",
    "job-not-executed",
    "persistence-not-persisted",
    "artifact-placeholder-until-capture-review",
    "retry-fallback-disabled",
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[];

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_ACCEPTANCE_CHECKLIST =
  [
    {
      id: "backend-only-execution-path-required",
      title: "backend-only execution path required",
      summary:
        "Provider trial execution stays backend-only and is not callable from frontend.",
    },
    {
      id: "server-only-boundary-required",
      title: "server-only boundary required",
      summary:
        "The runtime path is defined inside a server-only module and does not create a public API route.",
    },
    {
      id: "provider-adapter-injection-required",
      title: "provider adapter injection required",
      summary:
        "Provider execution requires an injected server-only adapter and remains reference-only by default.",
    },
    {
      id: "operator-approval-required",
      title: "operator approval required",
      summary:
        "An operator approval reference is required before any future injected adapter can be called.",
    },
    {
      id: "credential-isolation-required",
      title: "credential isolation required",
      summary:
        "Credential isolation remains server-held and uses opaque token labels only, no secrets.",
    },
    {
      id: "result-capture-envelope-reference",
      title: "result capture envelope reference",
      summary:
        "Result capture remains a review-only handoff reference and is not persisted here.",
    },
    {
      id: "audit-envelope-reference",
      title: "audit envelope reference",
      summary:
        "Audit envelope remains a review-only handoff reference and is not persisted here.",
    },
    {
      id: "approval-join-envelope-reference",
      title: "approval join envelope reference",
      summary:
        "Approval join remains a review-only handoff reference and is not persisted here.",
    },
    {
      id: "prompt-brief-digest-reference",
      title: "prompt/brief digest reference",
      summary:
        "The runtime path consumes prompt/brief digests only and does not expose raw secrets.",
    },
    {
      id: "settings-digest-reference",
      title: "settings digest reference",
      summary:
        "The runtime path consumes settings digests only and does not execute from UI controls.",
    },
    {
      id: "safety-notes-digest-reference",
      title: "safety notes digest reference",
      summary:
        "The runtime path consumes safety-note digests only and remains blocked until reviewed.",
    },
    {
      id: "hard-kill-switch-enforced",
      title: "hard kill switch enforced",
      summary:
        "The kill switch remains enforced and the runtime remains disabled by default.",
    },
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeAcceptanceChecklistItem[];

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_CHECKLIST =
  [
    {
      id: "blocked-runtime-result-defined",
      title: "blocked runtime result is defined",
      summary:
        "The runtime returns a typed blocked result envelope when gates are not explicitly satisfied.",
    },
    {
      id: "result-capture-review-required",
      title: "result capture review is required",
      summary:
        "Future result review must validate result capture before any recovery flow is considered.",
    },
    {
      id: "audit-envelope-review-required",
      title: "audit envelope review is required",
      summary:
        "Future result review must validate audit envelope posture without introducing persistence here.",
    },
    {
      id: "approval-join-review-required",
      title: "approval join review is required",
      summary:
        "Future result review must validate approval join posture without introducing persistence here.",
    },
    {
      id: "artifact-review-placeholder-maintained",
      title: "artifact review placeholder remains maintained",
      summary:
        "Artifact state stays placeholder until capture/review and does not claim an artifact exists.",
    },
    {
      id: "no-persistence-state-maintained",
      title: "no persistence state remains maintained",
      summary:
        "Result, audit, approval, and artifact persistence remain unimplemented in this batch.",
    },
    {
      id: "future-recovery-batch-required",
      title: "future recovery batch remains required",
      summary:
        "Provider trial result review/recovery remains a future batch and does not execute here.",
    },
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeResultReviewRecoveryChecklistItem[];

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_INPUTS =
  [
    "3434-3465",
    "3466-3497",
    "3498-3529",
    "3530-3561",
    "3754-3785",
    "3786-3817",
    "3818-3849",
    "3882-3913",
    "3946-3977",
    "3978-4009",
    "4010-4041",
    "4042-4073",
    "4074-4105",
    "4106-4137",
    "4138-4169",
    "4170-4201",
    "4202-4233",
    "4234-4265",
    "4266-4297",
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidencePhaseRange[];

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_SOURCES =
  [
    {
      phaseRange: "3434-3465",
      label: "Backend-Owned Video Provider Execution Runtime Readiness",
      href: "/video-provider-runtime-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3466-3497",
      label: "First Backend-Owned Video Provider Execution Dry Run",
      href: "/video-provider-dry-run-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3498-3529",
      label: "First Backend-Owned Video Provider Execution Approval Packet",
      href: "/video-provider-approval-packet-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3530-3561",
      label: "First Backend-Owned Video Provider Execution Adapter Readiness",
      href: "/video-provider-adapter-readiness-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3754-3785",
      label: "First Jarvis-Controlled Video Adapter Plug-in",
      href: "/jarvis-video-adapter-plugin-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3786-3817",
      label: "First Jarvis-Controlled Video Dry Run Workspace",
      href: "/jarvis-video-dry-run-workspace-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3818-3849",
      label: "First Jarvis-Controlled Video Approval Packet Workspace",
      href: "/jarvis-video-approval-packet-workspace-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3882-3913",
      label: "First Jarvis-Controlled Video Backend Execution Readiness",
      href: "/jarvis-video-backend-execution-readiness-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3946-3977",
      label: "First Jarvis-Controlled Video Controlled Execution Trial",
      href: "/jarvis-video-controlled-execution-trial-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "3978-4009",
      label: "First Jarvis-Controlled Video Backend Trial Runner Contract",
      href: "/jarvis-video-backend-trial-runner-contract-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4010-4041",
      label: "First Jarvis-Controlled Video Trial Result Review and Recovery",
      href: "/jarvis-video-trial-result-review-recovery-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4042-4073",
      label: "Jarvis Video Studio Release Candidate",
      href: "/jarvis-video-studio-release-candidate-boundary-wiring" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4074-4105",
      label: "Jarvis Video Backend Execution Implementation Plan",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4106-4137",
      label: "Jarvis Video Backend Implementation Readiness Follow-Up",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4138-4169",
      label: "Jarvis Video Backend Runner Contract Hardening",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4170-4201",
      label: "Jarvis Video Backend Runner Foundation Dry-Run Admission",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4202-4233",
      label: "Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4234-4265",
      label: "Jarvis Video Result Capture Audit Envelope and Approval Join",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
    {
      phaseRange: "4266-4297",
      label: "Jarvis Video First Gated Provider Execution Trial Preparation",
      href: "/jarvis-video" as Route,
      summary: "review-only input; does not execute",
      reviewMode: "inert-review-only-input",
    },
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeEvidenceSource[];

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_REFERENCE =
  {
    label: "runtime provider adapter reference only by default",
    posture: "reference-only-by-default",
    summary:
      "The runtime carries a typed server-only adapter reference only by default. Provider execution requires injected server-only adapter wiring and remains blocked until every gate is explicitly satisfied.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_CREDENTIAL_SLOT_REFERENCES =
  [
    {
      slotLabel: "provider credential slot reference",
      tokenLabel: "jarvis-video-provider-token-slot-label",
      posture: "opaque-token-label-only",
      summary:
        "provider credential slot reference using opaque token labels only, no secrets",
    },
    {
      slotLabel: "approval credential slot reference",
      tokenLabel: "jarvis-video-approval-token-slot-label",
      posture: "opaque-token-label-only",
      summary:
        "approval credential slot reference using opaque token labels only, no secrets",
    },
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeCredentialSlotReference[];

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_OPERATOR_APPROVAL_REFERENCE =
  {
    label: "operator approval reference",
    posture: "required-before-provider-trial",
    summary:
      "Operator approval reference remains required before any future server-only adapter execution path can be entered.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_PACKET_DIGEST_REFERENCE =
  {
    label: "approval packet digest reference",
    posture: "digest-only-reference",
    summary:
      "Approval packet digest reference is carried into the runtime path without exposing secrets or raw packet state.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_CAPTURE_ENVELOPE_REFERENCE =
  {
    label: "result capture envelope reference",
    posture: "handoff-reference-only",
    summary:
      "Result capture envelope reference remains inert review-only input and does not persist a result in this batch.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_AUDIT_ENVELOPE_REFERENCE =
  {
    label: "audit envelope reference",
    posture: "handoff-reference-only",
    summary:
      "Audit envelope reference remains inert review-only input and does not persist an audit record in this batch.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_JOIN_ENVELOPE_REFERENCE =
  {
    label: "approval join envelope reference",
    posture: "handoff-reference-only",
    summary:
      "Approval join envelope reference remains inert review-only input and does not persist approval state in this batch.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROMPT_BRIEF_DIGEST_REFERENCE =
  {
    label: "prompt/brief digest reference",
    posture: "digest-only-reference",
    summary:
      "Prompt/brief digest reference is carried as an in-memory marker only and does not send prompt content from frontend.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SETTINGS_DIGEST_REFERENCE =
  {
    label: "settings digest reference",
    posture: "digest-only-reference",
    summary:
      "Settings digest reference is carried as an in-memory marker only and does not enable runtime execution from UI.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_NOTES_DIGEST_REFERENCE =
  {
    label: "safety notes digest reference",
    posture: "digest-only-reference",
    summary:
      "Safety notes digest reference is carried as an in-memory marker only and keeps safety review inside the server-only boundary.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_PREFLIGHT_GATE_REFERENCE =
  {
    label: "provider preflight gate reference",
    posture: "required-before-provider-trial",
    summary:
      "Provider preflight gate reference remains unsatisfied by default and blocks provider execution until explicitly cleared.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_PREFLIGHT_GATE_REFERENCE =
  {
    label: "safety preflight gate reference",
    posture: "required-before-provider-trial",
    summary:
      "Safety preflight gate reference remains unsatisfied by default and blocks provider execution until explicitly cleared.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PRIVACY_REDACTION_GATE_REFERENCE =
  {
    label: "privacy/redaction gate reference",
    posture: "required-before-provider-trial",
    summary:
      "Privacy/redaction gate reference remains unsatisfied by default and blocks provider execution until explicitly cleared.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_COST_RATE_DURATION_RESOLUTION_GATE_REFERENCE =
  {
    label: "cost/rate/duration/resolution gate reference",
    posture: "required-before-provider-trial",
    summary:
      "Cost/rate/duration/resolution gate reference remains unsatisfied by default and blocks provider execution until explicitly cleared.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TIMEOUT_CANCEL_GATE_REFERENCE =
  {
    label: "timeout/cancel gate reference",
    posture: "required-before-provider-trial",
    summary:
      "Timeout/cancel gate reference remains unsatisfied by default and blocks provider execution until explicitly cleared.",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeReference;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_IDEMPOTENCY_KEY_REQUIREMENT =
  {
    title: "idempotency key requirement",
    posture: "required-before-provider-trial",
    summary:
      "Idempotency key requirement remains explicit and unsatisfied by default so replays cannot enter execution accidentally.",
    items: [
      "idempotency key requirement",
      "stable gated provider runtime key",
      "no replay execution without explicit idempotency key",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SINGLE_CALL_LOCK_REQUIREMENT =
  {
    title: "single-call lock requirement",
    posture: "required-before-provider-trial",
    summary:
      "Single-call lock requirement remains explicit and unsatisfied by default so duplicate execution cannot enter the trial runtime path accidentally.",
    items: [
      "single-call lock requirement",
      "single-call lock must be acquired",
      "provider trial remains gated",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REPLAY_BLOCK_REQUIREMENT =
  {
    title: "replay block requirement",
    posture: "enforced-by-default",
    summary:
      "Replay block requirement remains enforced by default and is still part of the static blocked runtime posture.",
    items: [
      "replay block requirement",
      "replay block remains active",
      "replay block requirement is part of the runtime gate envelope",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_KILL_SWITCH_REQUIREMENT =
  {
    title: "kill switch requirement",
    posture: "enforced-by-default",
    summary:
      "Kill switch requirement remains enforced and keeps the runtime disabled by default unless explicitly enabled inside the server-only boundary.",
    items: [
      "kill switch requirement",
      "hard kill switch",
      "runtime disabled by default",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_NETWORK_EGRESS_POLICY_REQUIREMENT =
  {
    title: "network egress policy requirement",
    posture: "denied-by-default",
    summary:
      "Network egress policy requirement remains denied by default and blocks any provider call during validation or normal frontend use.",
    items: [
      "network egress policy requirement",
      "no provider call during validation",
      "no live video generation during validation",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_OPERATOR_APPROVAL_STATUS =
  {
    title: "operator approval status",
    posture: "required-before-provider-trial",
    summary:
      "Operator approval remains required and is carried by reference only. The runtime path is defined, but provider trial remains gated.",
    items: [
      "Operator approval is required",
      "approval packet digest reference",
      "provider trial remains gated",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_CREDENTIAL_ISOLATION_STATUS =
  {
    title: "credential isolation status",
    posture: "server-held-opaque-token-reference-only",
    summary:
      "Credential isolation remains required and uses opaque token labels only. No secrets, env reads, browser storage, or plaintext tokens are introduced here.",
    items: [
      "Credential isolation is required",
      "provider credential slot reference using opaque token labels only, no secrets",
      "server-only boundary required",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_HANDOFF_SUMMARY =
  {
    title: "result capture/audit/approval join handoff",
    posture: "reference-only-until-future-review",
    summary:
      "Result capture envelope, audit envelope, and approval join remain handoff references only. They are not persisted in this batch and do not claim a result or artifact exists.",
    items: [
      "result capture envelope reference",
      "audit envelope reference",
      "approval join envelope reference",
      "artifact state: placeholder until capture/review",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SUMMARY =
  {
    title: "first gated provider execution trial runtime summary",
    posture: "first gated provider execution trial runtime only",
    summary:
      "First gated provider execution trial runtime path is defined as a typed server-only runtime. It remains disabled by default, hard-kill-switch protected, operator-approved only, credential-isolated, adapter-injected only, and blocked from frontend, validation, queue, worker, job, persistence, and broad live provider execution.",
    items: [
      "Server-only provider trial runtime is now defined",
      "Runtime is disabled by default",
      "Provider execution requires injected server-only adapter",
      "Operator approval is required",
      "Credential isolation is required",
      "Kill switch remains enforced",
      "Queue/worker/job dispatch remain disabled",
      "Result/audit/approval persistence remain unimplemented",
      "Next step is provider trial result review and recovery",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_INJECTION_REQUIREMENT =
  {
    title: "runtime provider adapter injection contract",
    contractName:
      "JarvisVideoFirstGatedProviderExecutionTrialRuntimeInjectedAdapter",
    posture: "required",
    summary:
      "runtime provider adapter injection contract is defined, but provider adapter injection required remains unsatisfied by default. runtime provider adapter reference only by default.",
    adapterReferenceLabel:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_REFERENCE.label,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeProviderAdapterInjectionRequirement;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISABLED_EXECUTION_SURFACES =
  [
    {
      id: "frontend-provider-call",
      title: "no frontend provider call",
      summary:
        "The runtime path is server-only and cannot be called from frontend.",
    },
    {
      id: "public-api-route",
      title: "no public API route",
      summary:
        "The runtime path does not create a public API route in this batch.",
    },
    {
      id: "provider-sdk-imports",
      title: "no provider SDK imports in frontend",
      summary:
        "Provider SDK imports are not introduced in frontend Jarvis Video files.",
    },
    {
      id: "fetch-network-calls",
      title: "no fetch/network calls",
      summary:
        "The runtime helpers remain deterministic and do not call fetch or network surfaces in default paths.",
    },
    {
      id: "provider-call-during-validation",
      title: "no provider call during validation",
      summary:
        "Build, smoke, and validation paths do not execute a provider call.",
    },
    {
      id: "live-video-generation-during-validation",
      title: "no live video generation during validation",
      summary:
        "Build, smoke, and validation paths do not execute live video generation.",
    },
    {
      id: "queue-dispatch",
      title: "no queue dispatch",
      summary:
        "Queue state remains not dispatched and no queue runtime is entered.",
    },
    {
      id: "worker-dispatch",
      title: "no worker dispatch",
      summary:
        "Worker state remains not dispatched and no worker runtime is entered.",
    },
    {
      id: "job-execution",
      title: "no job execution",
      summary:
        "Job state remains not executed and no job lease or scheduler surface is entered.",
    },
    {
      id: "scheduler-orchestration-execution",
      title: "no scheduler/orchestration execution",
      summary:
        "Scheduler and orchestration surfaces remain disabled and are not introduced in this batch.",
    },
    {
      id: "result-persistence",
      title: "no result persistence",
      summary:
        "Result persistence remains unimplemented in this batch.",
    },
    {
      id: "audit-persistence",
      title: "no audit persistence",
      summary:
        "Audit persistence remains unimplemented in this batch.",
    },
    {
      id: "approval-persistence",
      title: "no approval persistence",
      summary:
        "Approval persistence remains unimplemented in this batch.",
    },
    {
      id: "artifact-persistence",
      title: "no artifact persistence",
      summary:
        "Artifact persistence remains unimplemented and artifact state stays placeholder until capture/review.",
    },
    {
      id: "retry-fallback-execution",
      title: "no retry/fallback execution",
      summary:
        "Retry and fallback execution remain disabled in this batch.",
    },
    {
      id: "render-export-publish",
      title: "no render/export/publish execution",
      summary:
        "Render, export, and publish execution surfaces remain disabled in this batch.",
    },
    {
      id: "uploads-downloads",
      title: "no uploads/downloads",
      summary:
        "Upload and download execution surfaces remain disabled in this batch.",
    },
    {
      id: "shell-process-command-execution",
      title: "no shell/process/command execution from app code",
      summary:
        "The runtime does not execute shell, process, or command surfaces.",
    },
    {
      id: "file-writes",
      title: "no file writes from app code",
      summary:
        "The runtime does not write files or artifacts in this batch.",
    },
    {
      id: "database-writes",
      title: "no database writes",
      summary:
        "The runtime does not persist results, audits, approvals, or artifacts to a database.",
    },
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeDisabledSurfaceRecord[];

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DEFAULT_CONTROL_STATE =
  {
    runtimeEnabled: false,
    providerAdapterInjected: false,
    operatorApproved: false,
    credentialIsolationConfirmed: false,
    providerPreflightCleared: false,
    safetyPreflightCleared: false,
    privacyRedactionCleared: false,
    costRateDurationResolutionCleared: false,
    timeoutCancelCleared: false,
    idempotencyKeyProvided: false,
    singleCallLockAcquired: false,
    replayBlockActive: true,
    killSwitchEnforced: true,
    networkEgressApproved: false,
    queueNotDispatched: true,
    workerNotDispatched: true,
    jobNotExecuted: true,
    persistenceNotPersisted: true,
    artifactPlaceholderOnly: true,
    retryFallbackDisabled: true,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState;

function collectUniqueValues<Value extends string>(values: readonly Value[]) {
  const uniqueValues: Value[] = [];

  for (const value of values) {
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  }

  return uniqueValues;
}

function collectMissingValues<Value extends string>(
  expectedValues: readonly Value[],
  actualValues: readonly Value[]
) {
  return expectedValues.filter((value) => !actualValues.includes(value));
}

function resolveRuntimeMode(
  controlState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState
) {
  return controlState.runtimeEnabled
    ? "operator-enabled"
    : "disabled-by-default";
}

function buildRuntimeGateChecklistItem(
  id: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId,
  title: string,
  summary: string,
  satisfied: boolean,
  blockedState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateState = "required"
) {
  return {
    id,
    title,
    summary,
    state: satisfied ? "satisfied" : blockedState,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateChecklistItem;
}

function buildRuntimeGateChecklist(
  controlState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState
) {
  return [
    buildRuntimeGateChecklistItem(
      "runtime-enabled",
      "runtime disabled by default",
      "runtime mode: disabled by default remains active until an explicit server-only operator enablement is provided.",
      controlState.runtimeEnabled,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "provider-adapter-injected",
      "provider adapter injection required",
      "Provider execution requires injected server-only adapter wiring and stays blocked while no adapter is injected.",
      controlState.providerAdapterInjected,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "operator-approval",
      "operator approval required",
      "Operator approval remains required before any future injected adapter can run.",
      controlState.operatorApproved,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "credential-isolation",
      "credential isolation required",
      "Credential isolation must be confirmed inside the server-only boundary before any future provider execution can run.",
      controlState.credentialIsolationConfirmed,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "provider-preflight",
      "provider preflight gate reference",
      "Provider preflight gate remains unsatisfied by default.",
      controlState.providerPreflightCleared,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "safety-preflight",
      "safety preflight gate reference",
      "Safety preflight gate remains unsatisfied by default.",
      controlState.safetyPreflightCleared,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "privacy-redaction",
      "privacy/redaction gate reference",
      "Privacy/redaction gate remains unsatisfied by default.",
      controlState.privacyRedactionCleared,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "cost-rate-duration-resolution",
      "cost/rate/duration/resolution gate reference",
      "Cost/rate/duration/resolution gate remains unsatisfied by default.",
      controlState.costRateDurationResolutionCleared,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "timeout-cancel",
      "timeout/cancel gate reference",
      "Timeout/cancel gate remains unsatisfied by default.",
      controlState.timeoutCancelCleared,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "idempotency-key",
      "idempotency key requirement",
      "Idempotency key remains required before any future provider trial execution can run.",
      controlState.idempotencyKeyProvided,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "single-call-lock",
      "single-call lock requirement",
      "Single-call lock remains required before any future provider trial execution can run.",
      controlState.singleCallLockAcquired,
      "required"
    ),
    buildRuntimeGateChecklistItem(
      "replay-block",
      "replay block requirement",
      "Replay block must remain active for the trial runtime path.",
      controlState.replayBlockActive,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "kill-switch",
      "kill switch requirement",
      "Kill switch must remain enforced for the runtime path.",
      controlState.killSwitchEnforced,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "network-egress",
      "network egress policy requirement",
      "Network egress remains denied by default until an operator-approved server-only policy explicitly allows it.",
      controlState.networkEgressApproved,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "queue-not-dispatched",
      "queue state: not dispatched",
      "Queue state must remain not dispatched in this batch.",
      controlState.queueNotDispatched,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "worker-not-dispatched",
      "worker state: not dispatched",
      "Worker state must remain not dispatched in this batch.",
      controlState.workerNotDispatched,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "job-not-executed",
      "job state: not executed",
      "Job state must remain not executed in this batch.",
      controlState.jobNotExecuted,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "persistence-not-persisted",
      "persistence state: not persisted",
      "Persistence state must remain not persisted in this batch.",
      controlState.persistenceNotPersisted,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "artifact-placeholder-until-capture-review",
      "artifact state: placeholder until capture/review",
      "Artifact state must remain placeholder until capture/review in this batch.",
      controlState.artifactPlaceholderOnly,
      "blocked"
    ),
    buildRuntimeGateChecklistItem(
      "retry-fallback-disabled",
      "retry/fallback state: disabled",
      "Retry/fallback execution must remain disabled in this batch.",
      controlState.retryFallbackDisabled,
      "blocked"
    ),
  ] as const satisfies readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateChecklistItem[];
}

function buildRuntimeInputEnvelope(
  runtimeMode: JarvisVideoFirstGatedProviderExecutionTrialRuntimeMode
) {
  return {
    runtimeInputEnvelopeKey: buildStableGatedProviderRuntimeKey([
      "runtime-input-envelope",
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION,
      runtimeMode,
    ]),
    runtimeVersion:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION,
    runtimeMode,
    workspaceId: "jarvis-video",
    studioRoute: "/jarvis-video",
    runtimeLabel:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TITLE,
    providerAdapterReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_REFERENCE,
    providerCredentialSlotReferences:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_CREDENTIAL_SLOT_REFERENCES,
    operatorApprovalReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_OPERATOR_APPROVAL_REFERENCE,
    approvalPacketDigestReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_PACKET_DIGEST_REFERENCE,
    resultCaptureEnvelopeReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_CAPTURE_ENVELOPE_REFERENCE,
    auditEnvelopeReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_AUDIT_ENVELOPE_REFERENCE,
    approvalJoinEnvelopeReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_JOIN_ENVELOPE_REFERENCE,
    promptBriefDigestReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROMPT_BRIEF_DIGEST_REFERENCE,
    settingsDigestReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SETTINGS_DIGEST_REFERENCE,
    safetyNotesDigestReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_NOTES_DIGEST_REFERENCE,
    evidenceSources:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_SOURCES,
    idempotencyKeyLabel: "jarvis-video-provider-trial-idempotency-key",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeInputEnvelope;
}

function buildRuntimeBlockerList(
  missingGateIds: readonly JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateId[]
) {
  const blockers: JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlocker[] =
    [
      {
        id: "runtime-disabled-by-default",
        title: "runtime remains disabled by default",
        summary:
          "The server-only runtime path is defined, but runtime mode remains disabled by default.",
      },
      {
        id: "provider-adapter-injection-required",
        title: "provider adapter injection required",
        summary:
          "Provider execution requires injected server-only adapter wiring and no adapter is injected by default.",
      },
      {
        id: "operator-approval-required",
        title: "operator approval remains required",
        summary:
          "Operator approval remains required and is not granted by default.",
      },
      {
        id: "credential-isolation-required",
        title: "credential isolation remains required",
        summary:
          "Credential isolation remains required and is not satisfied by default.",
      },
      {
        id: "preflight-gates-unsatisfied",
        title: "provider preflight gates remain unsatisfied",
        summary:
          "Provider, safety, privacy/redaction, cost/rate/duration/resolution, and timeout/cancel gates remain unsatisfied by default.",
      },
      {
        id: "network-egress-denied-by-default",
        title: "network egress remains denied by default",
        summary:
          "Network egress remains denied by default and blocks provider execution during validation and normal use.",
      },
      {
        id: "queue-worker-job-dispatch-disabled",
        title: "queue/worker/job dispatch remain disabled",
        summary:
          "Queue, worker, and job execution surfaces remain disabled in this batch.",
      },
      {
        id: "persistence-and-artifact-handoff-unimplemented",
        title: "result/audit/approval persistence remain unimplemented",
        summary:
          "Result, audit, approval, and artifact persistence remain unimplemented and artifact state remains placeholder until capture/review.",
      },
      {
        id: "future-result-review-recovery-batch-required",
        title: "provider trial result review/recovery remains future work",
        summary:
          "The next likely batch remains 4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery.",
      },
    ];

  const requiredBlockerIds: JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockerId[] =
    [];

  if (missingGateIds.includes("runtime-enabled")) {
    requiredBlockerIds.push("runtime-disabled-by-default");
  }
  if (missingGateIds.includes("provider-adapter-injected")) {
    requiredBlockerIds.push("provider-adapter-injection-required");
  }
  if (missingGateIds.includes("operator-approval")) {
    requiredBlockerIds.push("operator-approval-required");
  }
  if (missingGateIds.includes("credential-isolation")) {
    requiredBlockerIds.push("credential-isolation-required");
  }
  if (
    missingGateIds.includes("provider-preflight") ||
    missingGateIds.includes("safety-preflight") ||
    missingGateIds.includes("privacy-redaction") ||
    missingGateIds.includes("cost-rate-duration-resolution") ||
    missingGateIds.includes("timeout-cancel")
  ) {
    requiredBlockerIds.push("preflight-gates-unsatisfied");
  }
  if (missingGateIds.includes("network-egress")) {
    requiredBlockerIds.push("network-egress-denied-by-default");
  }
  if (
    missingGateIds.includes("queue-not-dispatched") ||
    missingGateIds.includes("worker-not-dispatched") ||
    missingGateIds.includes("job-not-executed")
  ) {
    requiredBlockerIds.push("queue-worker-job-dispatch-disabled");
  }
  if (
    missingGateIds.includes("persistence-not-persisted") ||
    missingGateIds.includes("artifact-placeholder-until-capture-review") ||
    missingGateIds.includes("retry-fallback-disabled")
  ) {
    requiredBlockerIds.push("persistence-and-artifact-handoff-unimplemented");
  }

  requiredBlockerIds.push("future-result-review-recovery-batch-required");

  return blockers.filter((blocker) => requiredBlockerIds.includes(blocker.id));
}

export function buildStableGatedProviderRuntimeKey(parts: readonly string[]) {
  return parts.join("::");
}

export function listRequiredRuntimeGates() {
  return [...JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_GATE_IDS] as const;
}

export function listMissingRuntimeGates(
  gateEnvelope: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope,
    "missingGateIds"
  >
) {
  return gateEnvelope.missingGateIds;
}

export function listDisabledExecutionSurfaces() {
  return JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISABLED_EXECUTION_SURFACES;
}

export function buildProviderTrialAcceptanceChecklist() {
  return JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_ACCEPTANCE_CHECKLIST;
}

export function buildResultReviewRecoveryHandoffSummary(
  model: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel,
    "checkpoint" | "runtimeBlockers"
  >
) {
  return {
    title: "result review/recovery handoff summary",
    posture: "future batch required",
    summary:
      "Provider trial result review/recovery remains a future batch. The runtime path defined here forwards only blocked-result posture, handoff references, and recovery acceptance criteria.",
    items: [
      `Latest completed batch: ${model.checkpoint.latestCompletedBatch}`,
      `Previous completed batch: ${model.checkpoint.previousCompletedBatch}`,
      `Next likely batch: ${model.checkpoint.nextLikelyBatch.replace(
        /^next likely batch:\s*/i,
        ""
      )}`,
      `Runtime blockers: ${model.runtimeBlockers.length}`,
      "Provider trial remains gated",
    ],
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeSummaryRecord;
}

export function buildGatedProviderTrialRuntimeEnvelope(
  controlState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState = JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DEFAULT_CONTROL_STATE
) {
  const runtimeMode = resolveRuntimeMode(controlState);
  const gateChecklist = buildRuntimeGateChecklist(controlState);
  const missingGateIds = gateChecklist
    .filter((item) => item.state !== "satisfied")
    .map((item) => item.id);

  return {
    runtimeGateEnvelopeKey: buildStableGatedProviderRuntimeKey([
      "runtime-gate-envelope",
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION,
      runtimeMode,
    ]),
    runtimeMode,
    providerPreflightGateReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_PREFLIGHT_GATE_REFERENCE,
    safetyPreflightGateReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_PREFLIGHT_GATE_REFERENCE,
    privacyRedactionGateReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PRIVACY_REDACTION_GATE_REFERENCE,
    costRateDurationResolutionGateReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_COST_RATE_DURATION_RESOLUTION_GATE_REFERENCE,
    timeoutCancelGateReference:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TIMEOUT_CANCEL_GATE_REFERENCE,
    gateChecklist,
    missingGateIds,
    acceptanceState: "blocked-until-explicit-gates",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope;
}

export function evaluateGatedProviderRuntimeGates(
  controlState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState = JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DEFAULT_CONTROL_STATE
) {
  const gateEnvelope = buildGatedProviderTrialRuntimeEnvelope(controlState);
  const blockers = buildRuntimeBlockerList(gateEnvelope.missingGateIds);

  return {
    gateEnvelope,
    blockers,
    isReady: gateEnvelope.missingGateIds.length === 0,
  } as const;
}

export function buildBlockedProviderTrialRuntimeResult(
  attempt: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeAttempt,
    "runtimeAttemptKey" | "runtimeGateEnvelope"
  >
) {
  return {
    runtimeBlockedResultEnvelopeKey: buildStableGatedProviderRuntimeKey([
      "runtime-blocked-result-envelope",
      attempt.runtimeAttemptKey,
    ]),
    outcome: "blocked",
    label: "provider trial remains gated",
    summary:
      "runtime path defined; provider trial remains gated. The runtime stays disabled by default, requires injected server-only adapter, operator approval, credential isolation, explicit preflight gates, and keeps queue/worker/job/persistence surfaces disabled.",
    artifactState: "placeholder until capture/review",
    queueState: "not dispatched",
    workerState: "not dispatched",
    jobState: "not executed",
    persistenceState: "not persisted",
    retryFallbackState: "disabled",
    disabledExecutionSurfaces:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISABLED_EXECUTION_SURFACES.map(
        (surface) => surface.id
      ),
    nextStep:
      "4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeBlockedResultEnvelope;
}

export function buildProviderTrialBlockedResult(
  attempt: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeAttempt,
    "runtimeAttemptKey" | "runtimeGateEnvelope"
  >
) {
  return buildBlockedProviderTrialRuntimeResult(attempt);
}

function buildRuntimeRejectionEnvelope(
  attemptKey: string,
  gateEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope
) {
  return {
    runtimeRejectionEnvelopeKey: buildStableGatedProviderRuntimeKey([
      "runtime-rejection-envelope",
      attemptKey,
    ]),
    outcome: "blocked",
    label: "runtime rejection envelope",
    summary:
      "runtime rejection envelope keeps the provider trial blocked until every typed gate is explicitly satisfied.",
    missingGateIds: gateEnvelope.missingGateIds,
    blockers: buildRuntimeBlockerList(gateEnvelope.missingGateIds),
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeRejectionEnvelope;
}

export function buildProviderTrialRuntimeAttempt(
  controlState: JarvisVideoFirstGatedProviderExecutionTrialRuntimeControlState = JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DEFAULT_CONTROL_STATE
) {
  const runtimeMode = resolveRuntimeMode(controlState);
  const runtimeInputEnvelope = buildRuntimeInputEnvelope(runtimeMode);
  const runtimeGateEnvelope = buildGatedProviderTrialRuntimeEnvelope(controlState);
  const runtimeAttemptKey = buildStableGatedProviderRuntimeKey([
    "runtime-attempt",
    runtimeInputEnvelope.runtimeInputEnvelopeKey,
    runtimeGateEnvelope.runtimeGateEnvelopeKey,
  ]);
  const runtimeRejectionEnvelope = buildRuntimeRejectionEnvelope(
    runtimeAttemptKey,
    runtimeGateEnvelope
  );
  const runtimeBlockedResultEnvelope = buildBlockedProviderTrialRuntimeResult({
    runtimeAttemptKey,
    runtimeGateEnvelope,
  });

  return {
    runtimeAttemptKey,
    runtimeInputEnvelope,
    runtimeGateEnvelope,
    runtimeRejectionEnvelope,
    runtimeBlockedResultEnvelope,
    providerAdapterInjectionRequirement:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_INJECTION_REQUIREMENT,
    runtimeAcceptanceChecklist:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_ACCEPTANCE_CHECKLIST,
    nextResultReviewRecoveryAcceptanceCriteria:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_CHECKLIST,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeAttempt;
}

export function evaluateStaticRuntimeReadiness(
  model: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel,
    "runtimeGateEnvelope" | "runtimeBlockers" | "disabledExecutionSurfaces"
  >
) {
  return {
    isReady: model.runtimeGateEnvelope.missingGateIds.length === 0,
    missingGateIds: model.runtimeGateEnvelope.missingGateIds,
    blockerCount: model.runtimeBlockers.length,
    disabledSurfaceCount: model.disabledExecutionSurfaces.length,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeStaticReadiness;
}

export async function runGatedProviderTrialRuntimeWithInjectedAdapter(
  attempt: JarvisVideoFirstGatedProviderExecutionTrialRuntimeAttempt,
  injectedAdapter?: JarvisVideoFirstGatedProviderExecutionTrialRuntimeInjectedAdapter
) {
  if (
    attempt.runtimeGateEnvelope.missingGateIds.length > 0 ||
    injectedAdapter === undefined
  ) {
    return buildProviderTrialBlockedResult(attempt);
  }

  const requestEnvelope = {
    runtimeAttemptKey: attempt.runtimeAttemptKey,
    runtimeInputEnvelopeKey:
      attempt.runtimeInputEnvelope.runtimeInputEnvelopeKey,
    promptBriefDigestReference:
      attempt.runtimeInputEnvelope.promptBriefDigestReference.label,
    settingsDigestReference:
      attempt.runtimeInputEnvelope.settingsDigestReference.label,
    safetyNotesDigestReference:
      attempt.runtimeInputEnvelope.safetyNotesDigestReference.label,
    operatorApprovalReference:
      attempt.runtimeInputEnvelope.operatorApprovalReference.label,
    approvalPacketDigestReference:
      attempt.runtimeInputEnvelope.approvalPacketDigestReference.label,
    resultCaptureEnvelopeReference:
      attempt.runtimeInputEnvelope.resultCaptureEnvelopeReference.label,
    auditEnvelopeReference:
      attempt.runtimeInputEnvelope.auditEnvelopeReference.label,
    approvalJoinEnvelopeReference:
      attempt.runtimeInputEnvelope.approvalJoinEnvelopeReference.label,
    idempotencyKeyLabel: attempt.runtimeInputEnvelope.idempotencyKeyLabel,
    providerCredentialSlotReferences:
      attempt.runtimeInputEnvelope.providerCredentialSlotReferences,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeAdapterRequestEnvelope;

  return injectedAdapter(requestEnvelope);
}

function buildGateTitleSummary(
  gateEnvelope: JarvisVideoFirstGatedProviderExecutionTrialRuntimeGateEnvelope
) {
  const missingTitles = gateEnvelope.gateChecklist
    .filter((item) => gateEnvelope.missingGateIds.includes(item.id))
    .map((item) => item.title);

  return missingTitles.join("; ");
}

function evaluateRuntimeCompleteness(
  model: Pick<
    JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel,
    | "runtimeGateEnvelope"
    | "runtimeAcceptanceChecklist"
    | "nextResultReviewRecoveryAcceptanceCriteria"
    | "evidenceSources"
    | "queueState"
    | "workerState"
    | "jobState"
    | "persistenceState"
    | "artifactState"
    | "retryFallbackState"
  >
) {
  const acceptanceChecklistIds = model.runtimeAcceptanceChecklist.map(
    (item) => item.id
  );
  const resultReviewRecoveryChecklistIds =
    model.nextResultReviewRecoveryAcceptanceCriteria.map((item) => item.id);
  const evidenceInputs = model.evidenceSources.map((item) => item.phaseRange);
  const missingStateMarkers: string[] = [];

  if (model.queueState !== "not dispatched") {
    missingStateMarkers.push("queue state: not dispatched");
  }
  if (model.workerState !== "not dispatched") {
    missingStateMarkers.push("worker state: not dispatched");
  }
  if (model.jobState !== "not executed") {
    missingStateMarkers.push("job state: not executed");
  }
  if (model.persistenceState !== "not persisted") {
    missingStateMarkers.push("persistence state: not persisted");
  }
  if (model.artifactState !== "placeholder until capture/review") {
    missingStateMarkers.push("artifact state: placeholder until capture/review");
  }
  if (model.retryFallbackState !== "disabled") {
    missingStateMarkers.push("retry/fallback state: disabled");
  }

  const missingGateIds = collectMissingValues(
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_GATE_IDS,
    collectUniqueValues(model.runtimeGateEnvelope.gateChecklist.map((item) => item.id))
  );
  const missingAcceptanceChecklistIds = collectMissingValues(
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_ACCEPTANCE_CHECKLIST.map(
      (item) => item.id
    ),
    acceptanceChecklistIds
  );
  const missingResultReviewRecoveryChecklistIds = collectMissingValues(
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_CHECKLIST.map(
      (item) => item.id
    ),
    resultReviewRecoveryChecklistIds
  );
  const missingEvidenceInputs = collectMissingValues(
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_INPUTS,
    collectUniqueValues(evidenceInputs)
  );

  return {
    isComplete:
      missingGateIds.length === 0 &&
      missingAcceptanceChecklistIds.length === 0 &&
      missingResultReviewRecoveryChecklistIds.length === 0 &&
      missingEvidenceInputs.length === 0 &&
      missingStateMarkers.length === 0,
    missingGateIds,
    missingAcceptanceChecklistIds,
    missingResultReviewRecoveryChecklistIds,
    missingEvidenceInputs,
    missingStateMarkers,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeCompleteness;
}

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT =
  buildProviderTrialRuntimeAttempt();

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_CHECKPOINT = {
  highestDetectedPhase:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_HIGHEST_PHASE,
  latestCompletedBatch:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_LATEST_COMPLETED_BATCH,
  previousCompletedBatch:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PREVIOUS_COMPLETED_BATCH,
  nextLikelyBatch:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_NEXT_LIKELY_BATCH,
} as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeCheckpoint;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE = {
  version: JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION,
  runtimeMode:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeGateEnvelope.runtimeMode,
  firstGatedProviderExecutionTrialRuntimeSummary:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SUMMARY,
  runtimeInputEnvelope:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeInputEnvelope,
  runtimeGateEnvelope:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeGateEnvelope,
  runtimeRejectionEnvelope:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeRejectionEnvelope,
  runtimeBlockedResultEnvelope:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeBlockedResultEnvelope,
  providerAdapterInjectionRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_INJECTION_REQUIREMENT,
  providerAdapterReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_ADAPTER_REFERENCE,
  providerCredentialSlotReferences:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_CREDENTIAL_SLOT_REFERENCES,
  operatorApprovalStatus:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_OPERATOR_APPROVAL_STATUS,
  credentialIsolationStatus:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_CREDENTIAL_ISOLATION_STATUS,
  resultCaptureAuditApprovalJoinHandoff:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_HANDOFF_SUMMARY,
  approvalPacketDigestReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_PACKET_DIGEST_REFERENCE,
  resultCaptureEnvelopeReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_CAPTURE_ENVELOPE_REFERENCE,
  auditEnvelopeReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_AUDIT_ENVELOPE_REFERENCE,
  approvalJoinEnvelopeReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_APPROVAL_JOIN_ENVELOPE_REFERENCE,
  promptBriefDigestReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROMPT_BRIEF_DIGEST_REFERENCE,
  settingsDigestReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SETTINGS_DIGEST_REFERENCE,
  safetyNotesDigestReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_NOTES_DIGEST_REFERENCE,
  providerPreflightGateReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PROVIDER_PREFLIGHT_GATE_REFERENCE,
  safetyPreflightGateReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SAFETY_PREFLIGHT_GATE_REFERENCE,
  privacyRedactionGateReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PRIVACY_REDACTION_GATE_REFERENCE,
  costRateDurationResolutionGateReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_COST_RATE_DURATION_RESOLUTION_GATE_REFERENCE,
  timeoutCancelGateReference:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TIMEOUT_CANCEL_GATE_REFERENCE,
  idempotencyKeyRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_IDEMPOTENCY_KEY_REQUIREMENT,
  singleCallLockRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_SINGLE_CALL_LOCK_REQUIREMENT,
  replayBlockRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REPLAY_BLOCK_REQUIREMENT,
  killSwitchRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_KILL_SWITCH_REQUIREMENT,
  networkEgressPolicyRequirement:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_NETWORK_EGRESS_POLICY_REQUIREMENT,
  queueState: "not dispatched",
  workerState: "not dispatched",
  jobState: "not executed",
  persistenceState: "not persisted",
  artifactState: "placeholder until capture/review",
  retryFallbackState: "disabled",
  runtimeBlockers:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeRejectionEnvelope.blockers,
  runtimeAcceptanceChecklist:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_REQUIRED_ACCEPTANCE_CHECKLIST,
  nextResultReviewRecoveryAcceptanceCriteria:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_CHECKLIST,
  resultReviewRecoveryHandoffSummary: {
    title: "result review/recovery handoff summary",
    posture: "future batch required",
    summary: "",
    items: [] as readonly string[],
  },
  disabledExecutionSurfaces:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISABLED_EXECUTION_SURFACES,
  evidenceSources:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_SOURCES,
  checkpoint: JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_CHECKPOINT,
  staticReadiness: {
    isReady: false,
    missingGateIds:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeGateEnvelope.missingGateIds,
    blockerCount:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_ATTEMPT.runtimeRejectionEnvelope.blockers.length,
    disabledSurfaceCount:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISABLED_EXECUTION_SURFACES.length,
  },
  completeness: {
    isComplete: false,
    missingGateIds: [],
    missingAcceptanceChecklistIds: [],
    missingResultReviewRecoveryChecklistIds: [],
    missingEvidenceInputs: [],
    missingStateMarkers: [],
  },
  displayMarkers: [] as readonly string[],
} as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel;

const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_SUMMARY =
  buildResultReviewRecoveryHandoffSummary({
    checkpoint: JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_CHECKPOINT,
    runtimeBlockers:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.runtimeBlockers,
  });

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISPLAY_MARKERS =
  [
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_PHASE_RANGE,
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_TITLE,
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_VERSION,
    "runtime version",
    "first gated provider execution trial runtime only",
    "runtime path defined",
    "provider trial remains gated",
    "runtime mode: disabled by default",
    "runtime input envelope",
    "runtime gate envelope",
    "runtime rejection envelope",
    "runtime blocked result envelope",
    "runtime provider adapter injection contract",
    "runtime provider adapter reference only by default",
    "provider credential slot reference using opaque token labels only, no secrets",
    "operator approval reference",
    "approval packet digest reference",
    "result capture envelope reference",
    "audit envelope reference",
    "approval join envelope reference",
    "prompt/brief digest reference",
    "settings digest reference",
    "safety notes digest reference",
    "provider preflight gate reference",
    "safety preflight gate reference",
    "privacy/redaction gate reference",
    "cost/rate/duration/resolution gate reference",
    "timeout/cancel gate reference",
    "idempotency key requirement",
    "single-call lock requirement",
    "replay block requirement",
    "kill switch requirement",
    "network egress policy requirement",
    "queue state: not dispatched",
    "worker state: not dispatched",
    "job state: not executed",
    "persistence state: not persisted",
    "artifact state: placeholder until capture/review",
    "retry/fallback state: disabled",
    "runtime blocker list",
    "runtime acceptance checklist",
    "next result review/recovery acceptance criteria",
    "Server-only provider trial runtime is now defined",
    "Runtime is disabled by default",
    "Provider execution requires injected server-only adapter",
    "Operator approval is required",
    "Credential isolation is required",
    "Kill switch remains enforced",
    "Queue/worker/job dispatch remain disabled",
    "Result/audit/approval persistence remain unimplemented",
    "Next step is provider trial result review and recovery",
    "first gated provider execution trial runtime only",
    "server-only runtime path defined",
    "disabled by default",
    "hard kill switch",
    "provider adapter injection required",
    "operator approval required",
    "credential isolation required",
    "no frontend provider call",
    "no provider call during validation",
    "no live video generation during validation",
    "no queue dispatch",
    "no worker dispatch",
    "no job execution",
    "no result persistence",
    "no audit persistence",
    "no approval persistence",
    "no artifact persistence",
    "no retry/fallback execution",
    "backend-only execution path required",
    "server-only boundary required",
    "provider trial result review/recovery in a future batch",
    "4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime",
    "4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
    "Highest detected phase: 4329",
    "Latest completed batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime",
    "Previous completed batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation",
    "Next likely batch: 4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
    ...JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_INPUTS.map(
      (phaseRange) => `${phaseRange}`
    ),
    ...JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_EVIDENCE_SOURCES.map(
      (source) => `${source.phaseRange} - ${source.label}`
    ),
  ] as const;

export const JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL = {
  ...JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE,
  resultReviewRecoveryHandoffSummary:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_RESULT_REVIEW_RECOVERY_SUMMARY,
  staticReadiness: evaluateStaticRuntimeReadiness({
    runtimeGateEnvelope:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.runtimeGateEnvelope,
    runtimeBlockers:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.runtimeBlockers,
    disabledExecutionSurfaces:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.disabledExecutionSurfaces,
  }),
  completeness: evaluateRuntimeCompleteness({
    runtimeGateEnvelope:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.runtimeGateEnvelope,
    runtimeAcceptanceChecklist:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.runtimeAcceptanceChecklist,
    nextResultReviewRecoveryAcceptanceCriteria:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.nextResultReviewRecoveryAcceptanceCriteria,
    evidenceSources:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.evidenceSources,
    queueState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.queueState,
    workerState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.workerState,
    jobState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.jobState,
    persistenceState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.persistenceState,
    artifactState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.artifactState,
    retryFallbackState:
      JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL_BASE.retryFallbackState,
  }),
  displayMarkers:
    JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_DISPLAY_MARKERS,
} as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimeModel;

export function buildStaticJarvisVideoFirstGatedProviderExecutionTrialRuntimePreview() {
  const model = JARVIS_VIDEO_FIRST_GATED_PROVIDER_EXECUTION_TRIAL_RUNTIME_MODEL;

  return {
    title: "First gated provider trial runtime",
    statusBadge: "Runtime path defined",
    summary:
      "The first server-only provider trial runtime path is now defined as a typed blocked-by-default runtime. Runtime path defined; provider trial remains gated. Provider execution requires injected server-only adapter, operator approval, credential isolation, explicit preflight gates, kill-switch enforcement, and still does not claim a provider call, artifact, or live video generation.",
    highlights: model.firstGatedProviderExecutionTrialRuntimeSummary.items,
    blockedResultSummary: model.runtimeBlockedResultEnvelope.summary,
    missingGateSummary:
      model.runtimeGateEnvelope.missingGateIds.length > 0
        ? `Missing runtime gates: ${buildGateTitleSummary(model.runtimeGateEnvelope)}`
        : "All runtime gates are satisfied.",
    acceptanceChecklist: model.runtimeAcceptanceChecklist.map(
      (item) => item.title
    ),
    disabledExecutionSurfaces: model.disabledExecutionSurfaces.map(
      (surface) => surface.title
    ),
    resultReviewRecoverySummary:
      model.resultReviewRecoveryHandoffSummary.summary,
    evidenceInputCount: model.evidenceSources.length,
    blockerCount: model.runtimeBlockers.length,
    missingGateCount: model.runtimeGateEnvelope.missingGateIds.length,
    checkpoint: model.checkpoint,
  } as const satisfies JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview;
}
