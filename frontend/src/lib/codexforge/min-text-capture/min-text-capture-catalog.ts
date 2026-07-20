import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
} from "../min-synth-e2e-review";
import {
  listMinimalManualGatedTextModelAdapterMvpRecords,
  listTextAdapterFixtureResponses,
  listTextAdapterInputs,
  listTextAdapterRedactedPromptEnvelopes,
  type MinimalTextModelAdapterMvpRecord,
  type TextAdapterDeterministicFixtureResponseRecord,
  type TextAdapterInputRecord,
  type TextAdapterRedactedPromptEnvelopeRecord,
} from "../min-text-adapter";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews,
  listTextAdapterOutputReviewRecords,
  type BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  type MinimalTextAdapterOutputReviewRecord,
} from "../min-text-adapter-review";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalTextAdapterResultCaptureMvpId,
  type MinimalTextAdapterResultCaptureMvpKey,
  type MinimalTextAdapterResultCaptureMvpRecord,
  type TextAdapterCapturedFixtureResultOutputKey,
  type TextAdapterCapturedFixtureResultOutputRecord,
  type TextAdapterResultCaptureAdmissionCheckKey,
  type TextAdapterResultCaptureAdmissionCheckRecord,
  type TextAdapterResultCaptureApprovalPreviewKey,
  type TextAdapterResultCaptureApprovalPreviewRecord,
  type TextAdapterResultCaptureAuditPreviewKey,
  type TextAdapterResultCaptureAuditPreviewRecord,
  type TextAdapterResultCaptureBlockedLivePersistenceSummaryKey,
  type TextAdapterResultCaptureBlockedLivePersistenceSummaryRecord,
  type TextAdapterResultCaptureCommonRecordFields,
  type TextAdapterResultCaptureCurrentReadiness,
  type TextAdapterResultCaptureDigest,
  type TextAdapterResultCaptureEnvelopeKey,
  type TextAdapterResultCaptureEnvelopeRecord,
  type TextAdapterResultCaptureErrorKey,
  type TextAdapterResultCaptureErrorRecord,
  type TextAdapterResultCaptureEvidencePreviewKey,
  type TextAdapterResultCaptureEvidencePreviewRecord,
  type TextAdapterResultCaptureGateId,
  type TextAdapterResultCaptureGateRecord,
  type TextAdapterResultCaptureGateSummary,
  type TextAdapterResultCaptureInputKey,
  type TextAdapterResultCaptureInputRecord,
  type TextAdapterResultCapturePreviewId,
  type TextAdapterResultCaptureReadinessMatrixId,
  type TextAdapterResultCaptureReadinessMatrixRecord,
  type TextAdapterResultCaptureReadinessSummary,
  type TextAdapterResultCaptureRequestKey,
  type TextAdapterResultCaptureRequestRecord,
  type TextAdapterResultCaptureResponseKey,
  type TextAdapterResultCaptureResponseRecord,
  type TextAdapterResultCaptureResultReference,
  type TextAdapterResultCaptureSafetyGateSummaryKey,
  type TextAdapterResultCaptureSafetyGateSummaryRecord,
  type TextAdapterResultCaptureSummary,
  type TextAdapterResultCaptureAuditReference,
  type TextAdapterResultCaptureApprovalReference,
  type TextAdapterResultCaptureEvidenceReference,
} from "./min-text-capture-types";

type TextAdapterResultCaptureSourceBundle = Readonly<{
  textAdapterMvpRecord: MinimalTextModelAdapterMvpRecord;
  textAdapterInputRecord: TextAdapterInputRecord;
  textAdapterReviewRecord: BackendOwnedMinimalManualGatedTextAdapterReviewRecord;
  textAdapterFixtureResponseRecord: TextAdapterDeterministicFixtureResponseRecord;
  textAdapterOutputReviewRecord: MinimalTextAdapterOutputReviewRecord;
  textAdapterRedactedPromptEnvelopeRecord: TextAdapterRedactedPromptEnvelopeRecord;
  syntheticEndToEndPacketReviewRecord: ReturnType<
    typeof listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews
  >[number];
  manualApprovalDecisionReviewRecord: ReturnType<
    typeof listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews
  >[number];
  manualApprovalFixtureRecord: ReturnType<
    typeof listSyntheticMvpManualApprovalFixtures
  >[number];
}>;

type TextAdapterResultCaptureGateSeed = Readonly<{
  gateId: TextAdapterResultCaptureGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type TextAdapterResultCaptureReadinessSeed = Readonly<{
  readinessId: TextAdapterResultCaptureReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const STATIC_FIXTURE_ID: MinimalTextAdapterResultCaptureMvpId =
  "conversational-planning-request";

const CURRENT_READINESS: TextAdapterResultCaptureCurrentReadiness =
  "minimal-text-adapter-result-capture-mvp-only / backend-only / fixture-only / in-memory-only / not persistent";

const RESULT_CAPTURE_SUMMARY_LINES = [
  "backend-owned minimal manual-gated text model adapter result capture MVP only",
  "minimal text adapter result capture MVP is backend-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  `current readiness is ${CURRENT_READINESS}`,
  "backend-owned minimal manual-gated text model adapter result capture review and recovery preview next",
] as const;

const RESULT_CAPTURE_GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only capture module boundary",
  "text adapter fixture capture mode",
  "minimal text adapter review dependency",
  "deterministic fixture response present",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "manual approval fixture",
  "manual confirmation fixture",
  "deterministic adapter id",
  "deterministic fixture response id",
  "deterministic capture id",
  "deterministic capture digest",
  "in-memory only result reference",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
  "no provider execution",
  "no model call",
  "no prompt sending",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
  "kill switch fixture",
] as const;

const RESULT_CAPTURE_READINESS_SUMMARY_LINES = [
  "server-only result capture helper state",
  "minimal text adapter review dependency",
  "text adapter fixture response dependency",
  "redacted prompt envelope dependency",
  "result capture input state",
  "capture admission check state",
  "captured fixture result output state",
  "capture envelope state",
  "evidence preview state",
  "audit preview state",
  "approval preview state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend request boundary state",
  "API route boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic in-memory text adapter result capture output before adding recovery and audit refinement.",
  "Keep the minimal text adapter result capture MVP backend-only, server-only, fixture-only, and in-memory only.",
  "Do not create a frontend request, API route, prompt sending path, provider/model call, provider SDK import, or persistence target.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, blocked approval recording, and blocked approval token and lease issuance.",
  "text adapter result capture review and recovery preview comes next",
] as const;

const BLOCKED_LIVE_PERSISTENCE_ACTIONS = [
  "real approval request",
  "real approval recording",
  "approval token issuance",
  "approval lease issuance",
  "prompt sending",
  "provider SDK import",
  "provider execution",
  "model call",
  "frontend request creation",
  "API route creation",
  "queue dispatch",
  "worker dispatch",
  "job execution",
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
] as const;

const GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "backend-only boundary",
    owner: "backend boundary",
    requiredState: "backend-only execution path required",
    currentState: "backend-only capture path only",
    evidence: "minimal text adapter result capture MVP is backend-only",
    blockedLiveAction: "frontend-callable result capture",
  },
  {
    gateId: "server-only-capture-module-boundary",
    label: "server-only capture module boundary",
    owner: "server boundary",
    requiredState: "server-only adapters required",
    currentState: "server-only text adapter result capture helper exists",
    evidence: "server-only text adapter result capture helper exists",
    blockedLiveAction: "client-side helper import",
  },
  {
    gateId: "text-adapter-fixture-capture-mode",
    label: "text adapter fixture capture mode",
    owner: "capture boundary",
    requiredState: "fixture-only capture required",
    currentState: "text adapter fixture response is captured in memory only",
    evidence: "text adapter fixture response is captured in memory only",
    blockedLiveAction: "live provider-backed capture",
  },
  {
    gateId: "minimal-text-adapter-review-dependency",
    label: "minimal text adapter review dependency",
    owner: "review dependency",
    requiredState: "minimal text adapter review dependency exists",
    currentState: "Backend-owned minimal text adapter review remains available",
    evidence: "Backend-owned minimal text adapter review",
    blockedLiveAction: "capture without text adapter review",
  },
  {
    gateId: "deterministic-fixture-response-present",
    label: "deterministic fixture response present",
    owner: "fixture boundary",
    requiredState: "deterministic fixture response required",
    currentState: "deterministic text adapter fixture response present",
    evidence: "source text adapter deterministic fixture response remains preview-only and in memory only",
    blockedLiveAction: "capture without fixture response",
  },
  {
    gateId: "redacted-prompt-envelope-present",
    label: "redacted prompt envelope present",
    owner: "prompt boundary",
    requiredState: "redacted prompt envelope required",
    currentState: "redacted prompt envelope is preview-only",
    evidence: "redacted prompt envelope is preview-only",
    blockedLiveAction: "live prompt payload capture",
  },
  {
    gateId: "prompt-not-sent",
    label: "prompt not sent",
    owner: "prompt boundary",
    requiredState: "prompt transmission state is not sent",
    currentState: "prompt transmission state is not sent",
    evidence: "prompt transmission state is not sent",
    blockedLiveAction: "prompt transmission",
  },
  {
    gateId: "provider-sdk-not-imported",
    label: "provider SDK not imported",
    owner: "provider boundary",
    requiredState: "provider SDK import state is not imported",
    currentState: "provider SDK import state is not imported",
    evidence: "No provider SDKs imported",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "provider-response-not-received",
    label: "provider response not received",
    owner: "provider boundary",
    requiredState: "provider response is not received",
    currentState: "provider response is not received",
    evidence: "provider response is not received",
    blockedLiveAction: "provider response ingestion",
  },
  {
    gateId: "model-output-not-generated",
    label: "model output not generated",
    owner: "model boundary",
    requiredState: "model output is not generated",
    currentState: "model output is not generated",
    evidence: "model output is not generated",
    blockedLiveAction: "model output generation",
  },
  {
    gateId: "manual-approval-fixture",
    label: "manual approval fixture",
    owner: "approval boundary",
    requiredState: "manual approval fixture required",
    currentState: "approval fixture is preview-only",
    evidence: "approval fixture is preview-only",
    blockedLiveAction: "real approval request",
  },
  {
    gateId: "manual-confirmation-fixture",
    label: "manual confirmation fixture",
    owner: "approval boundary",
    requiredState: "manual confirmation fixture required",
    currentState: "manual confirmation fixture is preview-only",
    evidence: "manual confirmation fixture is preview-only",
    blockedLiveAction: "real manual confirmation capture",
  },
  {
    gateId: "deterministic-adapter-id",
    label: "deterministic adapter id",
    owner: "identity boundary",
    requiredState: "deterministic preview id only",
    currentState: "deterministic preview id only",
    evidence: "text adapter id remains deterministic preview-only",
    blockedLiveAction: "runtime-generated adapter id",
  },
  {
    gateId: "deterministic-fixture-response-id",
    label: "deterministic fixture response id",
    owner: "identity boundary",
    requiredState: "deterministic preview id only",
    currentState: "deterministic preview id only",
    evidence: "fixture response id remains deterministic preview-only",
    blockedLiveAction: "runtime-generated fixture response id",
  },
  {
    gateId: "deterministic-capture-id",
    label: "deterministic capture id",
    owner: "identity boundary",
    requiredState: "deterministic preview id only",
    currentState: "deterministic preview id only",
    evidence: "capture id remains deterministic preview-only",
    blockedLiveAction: "runtime-generated capture id",
  },
  {
    gateId: "deterministic-capture-digest",
    label: "deterministic capture digest",
    owner: "identity boundary",
    requiredState: "deterministic preview digest only",
    currentState: "deterministic preview digest only",
    evidence: "capture digest remains deterministic preview-only",
    blockedLiveAction: "randomized capture digest",
  },
  {
    gateId: "in-memory-only-result-reference",
    label: "in-memory only result reference",
    owner: "result boundary",
    requiredState: "in-memory-only result reference required",
    currentState: "text adapter result capture is not persistent",
    evidence: "text adapter result capture is not persistent",
    blockedLiveAction: "persistent result reference storage",
  },
  {
    gateId: "no-real-approval-recording",
    label: "no real approval recording",
    owner: "approval boundary",
    requiredState: "no real approval recording",
    currentState: "approval recording state is not recorded",
    evidence: "no real approval recording",
    blockedLiveAction: "approval recording",
  },
  {
    gateId: "no-approval-token-issuance",
    label: "no approval token issuance",
    owner: "approval boundary",
    requiredState: "approval token is not issued",
    currentState: "approval token is not issued",
    evidence: "approval token is not issued",
    blockedLiveAction: "approval token issuance",
  },
  {
    gateId: "no-approval-lease-issuance",
    label: "no approval lease issuance",
    owner: "approval boundary",
    requiredState: "approval lease is not created",
    currentState: "approval lease is not created",
    evidence: "approval lease is not created",
    blockedLiveAction: "approval lease issuance",
  },
  {
    gateId: "no-frontend-request",
    label: "no frontend request",
    owner: "frontend boundary",
    requiredState: "no frontend request is created",
    currentState: "frontend request state: not created",
    evidence: "no frontend request is created",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "no-api-route",
    label: "no API route",
    owner: "route boundary",
    requiredState: "no API route is created",
    currentState: "API route state: not created",
    evidence: "no API route is created",
    blockedLiveAction: "API route creation",
  },
  {
    gateId: "no-fetch-network",
    label: "no fetch/network",
    owner: "network boundary",
    requiredState: "no frontend fetch/network call",
    currentState: "network path blocked",
    evidence: "no frontend fetch/network call",
    blockedLiveAction: "fetch/network call",
  },
  {
    gateId: "no-provider-sdk-import",
    label: "no provider SDK import",
    owner: "provider boundary",
    requiredState: "no provider SDK imports",
    currentState: "provider SDK imports blocked",
    evidence: "No provider SDKs imported",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    label: "no provider execution",
    owner: "provider boundary",
    requiredState: "no provider execution",
    currentState: "provider execution blocked",
    evidence: "no provider execution",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    label: "no model call",
    owner: "model boundary",
    requiredState: "no LLM/model calls",
    currentState: "model calls blocked",
    evidence: "no LLM/model calls",
    blockedLiveAction: "model call",
  },
  {
    gateId: "no-prompt-sending",
    label: "no prompt sending",
    owner: "prompt boundary",
    requiredState: "no prompt sending",
    currentState: "prompt sending blocked",
    evidence: "no prompt sending",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "queue boundary",
    requiredState: "no queue dispatch",
    currentState: "queue dispatch blocked",
    evidence: "no queue dispatch",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "worker boundary",
    requiredState: "no worker dispatch",
    currentState: "worker dispatch blocked",
    evidence: "no worker dispatch",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    label: "no job execution",
    owner: "job boundary",
    requiredState: "no job execution",
    currentState: "job execution blocked",
    evidence: "no job execution",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    label: "no result persistence",
    owner: "persistence boundary",
    requiredState: "no result persistence",
    currentState: "result persistence blocked",
    evidence: "no result persistence",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    label: "no audit persistence",
    owner: "persistence boundary",
    requiredState: "no audit persistence",
    currentState: "audit persistence blocked",
    evidence: "no audit persistence",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    label: "no approval persistence",
    owner: "persistence boundary",
    requiredState: "no approval persistence",
    currentState: "approval persistence blocked",
    evidence: "no approval persistence",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    label: "no database write",
    owner: "database boundary",
    requiredState: "no database writes",
    currentState: "database writes blocked",
    evidence: "no database writes",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    label: "no file write",
    owner: "file boundary",
    requiredState: "no file writes",
    currentState: "file writes blocked",
    evidence: "no file writes",
    blockedLiveAction: "file write",
  },
  {
    gateId: "single-run-lock-preview",
    label: "single-run lock preview",
    owner: "safety gate",
    requiredState: "single-run lock preview required",
    currentState: "single-run lock preview only",
    evidence: "single-run lock preview remains static",
    blockedLiveAction: "parallel live capture",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "idempotency/replay preview",
    owner: "safety gate",
    requiredState: "idempotency/replay preview required",
    currentState: "idempotency and replay remain preview-only",
    evidence: "idempotency/replay preview remains static",
    blockedLiveAction: "live replay and retry",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "timeout/cancel preview",
    owner: "safety gate",
    requiredState: "timeout/cancel preview required",
    currentState: "timeout/cancel preview only",
    evidence: "timeout/cancel preview remains static",
    blockedLiveAction: "live timeout or cancel",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "privacy/redaction preview",
    owner: "safety gate",
    requiredState: "privacy/redaction preview required",
    currentState: "privacy/redaction preview only",
    evidence: "privacy/redaction preview remains static",
    blockedLiveAction: "live payload transmission",
  },
  {
    gateId: "kill-switch-fixture",
    label: "kill switch fixture",
    owner: "safety gate",
    requiredState: "kill switch fixture required",
    currentState: "kill switch fixture only",
    evidence: "kill switch required",
    blockedLiveAction: "autonomous live execution",
  },
] as const satisfies readonly TextAdapterResultCaptureGateSeed[];

const READINESS_SEEDS = [
  {
    readinessId: "server-only-result-capture-helper-state",
    label: "server-only result capture helper state",
    state: "implemented / server-only",
    evidence: "server-only text adapter result capture helper exists",
    nextSafeAction:
      "Keep the helper server-only while review and recovery preview is added next.",
  },
  {
    readinessId: "minimal-text-adapter-review-dependency",
    label: "minimal text adapter review dependency",
    state: "implemented / deterministic fixture",
    evidence: "Backend-owned minimal text adapter review remains available",
    nextSafeAction:
      "Preserve the source text adapter review as a backend-owned deterministic dependency.",
  },
  {
    readinessId: "text-adapter-fixture-response-dependency",
    label: "text adapter fixture response dependency",
    state: "implemented / deterministic fixture",
    evidence: "text adapter fixture response is captured in memory only",
    nextSafeAction:
      "Keep the deterministic fixture response as the only capture source.",
  },
  {
    readinessId: "redacted-prompt-envelope-dependency",
    label: "redacted prompt envelope dependency",
    state: "implemented / preview-only",
    evidence: "redacted prompt envelope is preview-only",
    nextSafeAction:
      "Keep the redacted prompt envelope preview-only and do not transmit it.",
  },
  {
    readinessId: "result-capture-input-state",
    label: "result capture input state",
    state: "implemented / deterministic capture request only",
    evidence: "Text adapter result capture input remains fixture-only and backend-only",
    nextSafeAction:
      "Do not add a frontend-callable request path.",
  },
  {
    readinessId: "capture-admission-check-state",
    label: "capture admission check state",
    state: "implemented / fixture-only / persistence-blocked",
    evidence: "admission check accepts only deterministic fixture capture",
    nextSafeAction:
      "Keep persistence targets absent and provider execution blocked.",
  },
  {
    readinessId: "captured-fixture-result-output-state",
    label: "captured fixture result output state",
    state: "implemented / in-memory-only",
    evidence: "deterministic fixture result captured in memory only",
    nextSafeAction:
      "Do not persist captured fixture output.",
  },
  {
    readinessId: "capture-envelope-state",
    label: "capture envelope state",
    state: "implemented / preview-only references",
    evidence: "Fixture capture only. No provider output. No persistence.",
    nextSafeAction:
      "Keep envelope references preview-only and not persisted.",
  },
  {
    readinessId: "evidence-preview-state",
    label: "evidence preview state",
    state: "implemented / preview-only",
    evidence: "Text adapter result capture evidence preview stays preview-only",
    nextSafeAction:
      "Expand evidence review later without storing evidence.",
  },
  {
    readinessId: "audit-preview-state",
    label: "audit preview state",
    state: "implemented / preview-only",
    evidence: "audit preview is deterministic adapter metadata only",
    nextSafeAction:
      "Add audit review and recovery preview next without audit persistence.",
  },
  {
    readinessId: "approval-preview-state",
    label: "approval preview state",
    state: "implemented / preview-only",
    evidence: "approval fixture is preview-only",
    nextSafeAction:
      "Keep approval preview static and do not record approvals.",
  },
  {
    readinessId: "provider-boundary-state",
    label: "provider boundary state",
    state: "blocked / no provider execution",
    evidence: "no provider execution",
    nextSafeAction:
      "Do not import provider SDKs or execute a provider.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "prompt boundary state",
    state: "blocked / not sent",
    evidence: "prompt transmission state is not sent",
    nextSafeAction:
      "Keep prompt sending blocked.",
  },
  {
    readinessId: "model-boundary-state",
    label: "model boundary state",
    state: "blocked / not generated",
    evidence: "model output is not generated",
    nextSafeAction:
      "Keep model calls blocked.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "frontend request boundary state",
    state: "blocked / not created",
    evidence: "no frontend request is created",
    nextSafeAction:
      "Do not expose a frontend-callable request path.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "blocked / not created",
    evidence: "no API route is created",
    nextSafeAction:
      "Do not expose an API route.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "queue boundary state",
    state: "blocked / no queue dispatch",
    evidence: "no queue dispatch",
    nextSafeAction:
      "Do not add queue dispatch.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "worker boundary state",
    state: "blocked / no worker dispatch",
    evidence: "no worker dispatch",
    nextSafeAction:
      "Do not add worker dispatch.",
  },
  {
    readinessId: "job-boundary-state",
    label: "job boundary state",
    state: "blocked / no job execution",
    evidence: "no job execution",
    nextSafeAction:
      "Do not add job execution.",
  },
  {
    readinessId: "result-persistence-boundary-state",
    label: "result persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no result persistence",
    nextSafeAction:
      "Keep result persistence blocked.",
  },
  {
    readinessId: "audit-persistence-boundary-state",
    label: "audit persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no audit persistence",
    nextSafeAction:
      "Keep audit persistence blocked.",
  },
  {
    readinessId: "approval-persistence-boundary-state",
    label: "approval persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no approval persistence",
    nextSafeAction:
      "Keep approval persistence blocked.",
  },
  {
    readinessId: "database-boundary-state",
    label: "database boundary state",
    state: "blocked / none",
    evidence: "no database writes",
    nextSafeAction:
      "Do not add a database write target.",
  },
  {
    readinessId: "file-boundary-state",
    label: "file boundary state",
    state: "blocked / none",
    evidence: "no file writes",
    nextSafeAction:
      "Do not add a file write target.",
  },
] as const satisfies readonly TextAdapterResultCaptureReadinessSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function findRequired<T>(
  records: readonly T[],
  matcher: (record: T) => boolean,
  description: string
): T {
  const found = records.find(matcher);

  if (!found) {
    throw new Error(`Missing required ${description}.`);
  }

  return found;
}

function buildTextAdapterResultCapturePreviewId(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCapturePreviewId {
  return `text-adapter-result-capture-preview:${id}`;
}

function buildTextAdapterResultCaptureDigest(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureDigest {
  return `text-adapter-result-capture-digest-preview:${id}:in-memory-only`;
}

function buildTextAdapterResultReference(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureResultReference {
  return `text-adapter-result-capture-result-reference-preview:${id}`;
}

function buildTextAdapterAuditReference(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureAuditReference {
  return `text-adapter-result-capture-audit-reference-preview:${id}`;
}

function buildTextAdapterApprovalReference(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureApprovalReference {
  return `text-adapter-result-capture-approval-reference-preview:${id}`;
}

function buildTextAdapterEvidenceReference(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureEvidenceReference {
  return `text-adapter-result-capture-evidence-reference-preview:${id}`;
}

export function buildStableMinimalTextAdapterResultCaptureMvpKey(
  id: MinimalTextAdapterResultCaptureMvpId
): MinimalTextAdapterResultCaptureMvpKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp:${id}`;
}

function buildTextAdapterResultCaptureInputKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureInputKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input:${id}`;
}

function buildTextAdapterResultCaptureAdmissionCheckKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check:${id}`;
}

function buildTextAdapterCapturedFixtureResultOutputKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterCapturedFixtureResultOutputKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output:${id}`;
}

function buildTextAdapterResultCaptureEnvelopeKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureEnvelopeKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope:${id}`;
}

function buildTextAdapterResultCaptureEvidencePreviewKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureEvidencePreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview:${id}`;
}

function buildTextAdapterResultCaptureAuditPreviewKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureAuditPreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview:${id}`;
}

function buildTextAdapterResultCaptureApprovalPreviewKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureApprovalPreviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview:${id}`;
}

function buildTextAdapterResultCaptureSafetyGateSummaryKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary:${id}`;
}

function buildTextAdapterResultCaptureBlockedLivePersistenceSummaryKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureBlockedLivePersistenceSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary:${id}`;
}

function buildTextAdapterResultCaptureRequestKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureRequestKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-request:${id}`;
}

function buildTextAdapterResultCaptureResponseKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureResponseKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-response:${id}`;
}

function buildTextAdapterResultCaptureErrorKey(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureErrorKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-error:${id}`;
}

const TEXT_ADAPTER_MVP_RECORDS = listMinimalManualGatedTextModelAdapterMvpRecords();
const TEXT_ADAPTER_INPUT_RECORDS = listTextAdapterInputs();
const TEXT_ADAPTER_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews();
const TEXT_ADAPTER_FIXTURE_RESPONSE_RECORDS = listTextAdapterFixtureResponses();
const TEXT_ADAPTER_OUTPUT_REVIEW_RECORDS = listTextAdapterOutputReviewRecords();
const TEXT_ADAPTER_REDACTED_PROMPT_ENVELOPE_RECORDS =
  listTextAdapterRedactedPromptEnvelopes();
const SYNTHETIC_END_TO_END_PACKET_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews();
const MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const MANUAL_APPROVAL_FIXTURE_RECORDS = listSyntheticMvpManualApprovalFixtures();

function buildSourceBundle(
  id: MinimalTextAdapterResultCaptureMvpId
): TextAdapterResultCaptureSourceBundle {
  return {
    textAdapterMvpRecord: findRequired(
      TEXT_ADAPTER_MVP_RECORDS,
      (record) => record.stableId === id,
      `text adapter MVP record for ${id}`
    ),
    textAdapterInputRecord: findRequired(
      TEXT_ADAPTER_INPUT_RECORDS,
      (record) => record.stableId === id,
      `text adapter input record for ${id}`
    ),
    textAdapterReviewRecord: findRequired(
      TEXT_ADAPTER_REVIEW_RECORDS,
      (record) => record.id === id,
      `text adapter review record for ${id}`
    ),
    textAdapterFixtureResponseRecord: findRequired(
      TEXT_ADAPTER_FIXTURE_RESPONSE_RECORDS,
      (record) => record.stableId === id,
      `text adapter fixture response record for ${id}`
    ),
    textAdapterOutputReviewRecord: findRequired(
      TEXT_ADAPTER_OUTPUT_REVIEW_RECORDS,
      (record) => record.id === id,
      `text adapter output review record for ${id}`
    ),
    textAdapterRedactedPromptEnvelopeRecord: findRequired(
      TEXT_ADAPTER_REDACTED_PROMPT_ENVELOPE_RECORDS,
      (record) => record.stableId === id,
      `text adapter redacted prompt envelope record for ${id}`
    ),
    syntheticEndToEndPacketReviewRecord: findRequired(
      SYNTHETIC_END_TO_END_PACKET_REVIEW_RECORDS,
      (record) => record.id === id,
      `synthetic end-to-end packet review record for ${id}`
    ),
    manualApprovalDecisionReviewRecord: findRequired(
      MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      (record) => record.id === id,
      `manual approval decision review for ${id}`
    ),
    manualApprovalFixtureRecord: findRequired(
      MANUAL_APPROVAL_FIXTURE_RECORDS,
      (record) => record.executionMvpId === id,
      `manual approval fixture for ${id}`
    ),
  };
}

const STATIC_SOURCE = buildSourceBundle(STATIC_FIXTURE_ID);

function buildCommonRecordFields(): TextAdapterResultCaptureCommonRecordFields {
  return {
    stableId: STATIC_SOURCE.textAdapterMvpRecord.stableId,
    capabilityFamily: STATIC_SOURCE.textAdapterMvpRecord.capabilityFamily,
    workspaceTarget: STATIC_SOURCE.textAdapterMvpRecord.workspaceTarget,
    providerSlotLabel: STATIC_SOURCE.textAdapterMvpRecord.providerSlotLabel,
    backupProviderSlotLabel:
      STATIC_SOURCE.textAdapterMvpRecord.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      STATIC_SOURCE.textAdapterMvpRecord.localPrivateAlternativeLabel,
    sourceMinimalTextAdapterMvpReference: STATIC_SOURCE.textAdapterMvpRecord.key,
    sourceMinimalTextAdapterReviewReference:
      STATIC_SOURCE.textAdapterReviewRecord.key,
    sourceTextAdapterDeterministicFixtureResponseReference:
      STATIC_SOURCE.textAdapterFixtureResponseRecord.key,
    sourceTextAdapterOutputReviewReference:
      STATIC_SOURCE.textAdapterOutputReviewRecord.key,
    sourceTextAdapterRedactedPromptEnvelopeReference:
      STATIC_SOURCE.textAdapterRedactedPromptEnvelopeRecord.key,
    sourceSyntheticEndToEndPacketReviewReference:
      STATIC_SOURCE.syntheticEndToEndPacketReviewRecord.key,
    sourceManualApprovalDecisionReviewReference:
      STATIC_SOURCE.manualApprovalDecisionReviewRecord.key,
    sourceManualApprovalFixtureReference:
      STATIC_SOURCE.manualApprovalFixtureRecord.key,
    sourceManualConfirmationFixtureReference:
      STATIC_SOURCE.manualApprovalFixtureRecord.key,
    backendOwnedPosture: "backend-owned",
    serverOnlyPosture: "server-only",
    resultCapturePosture: "result-capture",
    manualGatedPosture: "manual-gated",
    fixtureOnlyPosture: "fixture-only",
    inMemoryOnlyPosture: "in-memory-only",
    noProviderExecution: "no provider execution",
    noModelCalls: "no model calls",
    noPromptSending: "no prompt sending",
    noFrontendRequest: "no frontend request",
    noApiRoute: "no API route",
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch",
    noPersistence: "no persistence",
    noDatabaseWrites: "no database writes",
    noFileWrites: "no file writes",
    noResultPersistence: "no result persistence",
    noAuditPersistence: "no audit persistence",
    noApprovalPersistence: "no approval persistence",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildMvpRecord(): MinimalTextAdapterResultCaptureMvpRecord {
  return {
    key: buildStableMinimalTextAdapterResultCaptureMvpKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-v1",
    label:
      "Backend-owned minimal manual-gated text model adapter result capture MVP",
    requestLabel: STATIC_SOURCE.textAdapterMvpRecord.requestLabel,
    captureState: "captured-text-adapter-fixture-in-memory-only",
    textAdapterId: STATIC_SOURCE.textAdapterMvpRecord.textAdapterId,
    fixtureResponseId: STATIC_SOURCE.textAdapterFixtureResponseRecord.responseId,
    captureId: buildTextAdapterResultCapturePreviewId(STATIC_FIXTURE_ID),
    captureDigest: buildTextAdapterResultCaptureDigest(STATIC_FIXTURE_ID),
    normalizedOperatorIntent: "static fixture only",
    redactedPromptReference:
      STATIC_SOURCE.textAdapterRedactedPromptEnvelopeRecord.key,
    deterministicFixtureResponseReference:
      STATIC_SOURCE.textAdapterFixtureResponseRecord.key,
    capturedResultPayload: {
      label: "static text adapter fixture output only",
      captureEnvelopeState: "preview-only",
      evidenceDigest: buildTextAdapterResultCaptureDigest(STATIC_FIXTURE_ID),
      auditPreviewState: "preview-only / not persisted",
      approvalPreviewState: "preview-only",
    },
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildTextAdapterResultReference(STATIC_FIXTURE_ID),
    auditReference: buildTextAdapterAuditReference(STATIC_FIXTURE_ID),
    approvalReference: buildTextAdapterApprovalReference(STATIC_FIXTURE_ID),
    evidencePacketReference: buildTextAdapterEvidenceReference(STATIC_FIXTURE_ID),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness: CURRENT_READINESS,
    ...buildCommonRecordFields(),
  };
}

function buildInputRecord(): TextAdapterResultCaptureInputRecord {
  return {
    key: buildTextAdapterResultCaptureInputKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input-v1",
    sourceTextAdapterInputReference: STATIC_SOURCE.textAdapterInputRecord.key,
    requestState: "deterministic text adapter capture request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    fixtureResponsePosture: "deterministic fixture response only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      "No frontend request. No API route. No provider call. No persistence.",
    ...buildCommonRecordFields(),
  };
}

function buildAdmissionCheckRecord(): TextAdapterResultCaptureAdmissionCheckRecord {
  return {
    key: buildTextAdapterResultCaptureAdmissionCheckKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check-v1",
    admissionState:
      "accepted / fixture-only / in-memory-only / persistence-blocked",
    sourceTextAdapterInputReference: STATIC_SOURCE.textAdapterInputRecord.key,
    backendOnlyCheck: "passed",
    serverOnlyCheck: "passed",
    manualGatedCheck: "passed",
    fixtureResponseCheck: "passed",
    reviewDependencyCheck: "passed",
    captureBoundaryCheck: "passed",
    persistenceCheck: "blocked",
    nextSafeAction:
      "Keep result capture pinned to the deterministic text adapter fixture response only.",
    ...buildCommonRecordFields(),
  };
}

function buildOutputRecord(): TextAdapterCapturedFixtureResultOutputRecord {
  return {
    key: buildTextAdapterCapturedFixtureResultOutputKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output-v1",
    captureState: "captured-text-adapter-fixture-in-memory-only",
    capturedResultState: "deterministic fixture result captured in memory only",
    textAdapterId: STATIC_SOURCE.textAdapterMvpRecord.textAdapterId,
    fixtureResponseId: STATIC_SOURCE.textAdapterFixtureResponseRecord.responseId,
    captureId: buildTextAdapterResultCapturePreviewId(STATIC_FIXTURE_ID),
    captureDigest: buildTextAdapterResultCaptureDigest(STATIC_FIXTURE_ID),
    normalizedOperatorIntent: "static fixture only",
    redactedPromptReference:
      STATIC_SOURCE.textAdapterRedactedPromptEnvelopeRecord.key,
    deterministicFixtureResponseReference:
      STATIC_SOURCE.textAdapterFixtureResponseRecord.key,
    capturedResultPayload: {
      label: "static text adapter fixture output only",
      captureEnvelopeState: "preview-only",
      evidenceDigest: buildTextAdapterResultCaptureDigest(STATIC_FIXTURE_ID),
      auditPreviewState: "preview-only / not persisted",
      approvalPreviewState: "preview-only",
    },
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildTextAdapterResultReference(STATIC_FIXTURE_ID),
    auditReference: buildTextAdapterAuditReference(STATIC_FIXTURE_ID),
    approvalReference: buildTextAdapterApprovalReference(STATIC_FIXTURE_ID),
    evidencePacketReference: buildTextAdapterEvidenceReference(STATIC_FIXTURE_ID),
    timestampPosture: "static fixture label only / no real timestamp",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    ...buildCommonRecordFields(),
  };
}

function buildEnvelopeRecord(): TextAdapterResultCaptureEnvelopeRecord {
  return {
    key: buildTextAdapterResultCaptureEnvelopeKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope-v1",
    requestReference: buildTextAdapterResultCaptureRequestKey(STATIC_FIXTURE_ID),
    responseReference:
      buildTextAdapterResultCaptureResponseKey(STATIC_FIXTURE_ID),
    errorReference: buildTextAdapterResultCaptureErrorKey(STATIC_FIXTURE_ID),
    inputReference: buildTextAdapterResultCaptureInputKey(STATIC_FIXTURE_ID),
    outputReference:
      buildTextAdapterCapturedFixtureResultOutputKey(STATIC_FIXTURE_ID),
    evidencePreviewReference:
      buildTextAdapterResultCaptureEvidencePreviewKey(STATIC_FIXTURE_ID),
    auditPreviewReference:
      buildTextAdapterResultCaptureAuditPreviewKey(STATIC_FIXTURE_ID),
    approvalPreviewReference:
      buildTextAdapterResultCaptureApprovalPreviewKey(STATIC_FIXTURE_ID),
    captureState: "captured-text-adapter-fixture-in-memory-only",
    capturedResultState: "deterministic fixture result captured in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Fixture capture only. No provider output. No persistence.",
    ...buildCommonRecordFields(),
  };
}

function buildEvidencePreviewRecord(): TextAdapterResultCaptureEvidencePreviewRecord {
  return {
    key: buildTextAdapterResultCaptureEvidencePreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview-v1",
    evidenceReference: buildTextAdapterEvidenceReference(STATIC_FIXTURE_ID),
    evidencePreviewState: "preview-only / not persisted",
    evidenceSummaryLines: [
      "source minimal text adapter MVP reference is preview-only",
      "source minimal text adapter review reference is preview-only",
      "source deterministic fixture response reference is preview-only",
      "source output review reference is preview-only",
      "source redacted prompt envelope reference is preview-only",
      "manual approval fixture reference is preview-only",
      "manual confirmation fixture reference is preview-only",
    ],
    ...buildCommonRecordFields(),
  };
}

function buildAuditPreviewRecord(): TextAdapterResultCaptureAuditPreviewRecord {
  return {
    key: buildTextAdapterResultCaptureAuditPreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview-v1",
    auditReference: buildTextAdapterAuditReference(STATIC_FIXTURE_ID),
    auditPreviewState: "preview-only / not persisted",
    auditSummaryLines: [
      "audit preview is deterministic text adapter capture metadata only",
      "no audit persistence",
      "source text adapter output review stays preview-only",
    ],
    ...buildCommonRecordFields(),
  };
}

function buildApprovalPreviewRecord(): TextAdapterResultCaptureApprovalPreviewRecord {
  return {
    key: buildTextAdapterResultCaptureApprovalPreviewKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview-v1",
    approvalReference: buildTextAdapterApprovalReference(STATIC_FIXTURE_ID),
    approvalPreviewState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalSummaryLines: [
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "approval token is not issued",
      "approval lease is not created",
      "no approval persistence",
    ],
    ...buildCommonRecordFields(),
  };
}

function buildSafetyGateSummaryRecord(): TextAdapterResultCaptureSafetyGateSummaryRecord {
  return {
    key: buildTextAdapterResultCaptureSafetyGateSummaryKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary-v1",
    serverOnlyHelperStatement:
      "server-only text adapter result capture helper exists",
    fixtureCaptureStatement:
      "text adapter fixture response is captured in memory only",
    redactedPromptStatement: "redacted prompt envelope is preview-only",
    blockedPersistenceStatement:
      "text adapter result capture is not persistent",
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_SUMMARY_LINES),
    ...buildCommonRecordFields(),
  };
}

function buildBlockedLivePersistenceSummaryRecord(): TextAdapterResultCaptureBlockedLivePersistenceSummaryRecord {
  return {
    key: buildTextAdapterResultCaptureBlockedLivePersistenceSummaryKey(
      STATIC_FIXTURE_ID
    ),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary-v1",
    blockedLiveActions: BLOCKED_LIVE_PERSISTENCE_ACTIONS,
    noRealApprovalRequestStatement: "no real approval request",
    noRealApprovalRecordingStatement: "no real approval recording",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    summaryLines: [
      "no prompt sending",
      "no provider execution",
      "no model calls",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
    ],
    ...buildCommonRecordFields(),
  };
}

function buildRequestRecord(): TextAdapterResultCaptureRequestRecord {
  return {
    key: buildTextAdapterResultCaptureRequestKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-request-v1",
    requestState: "deterministic text adapter capture request only",
    textAdapterResultCaptureMvpId: STATIC_FIXTURE_ID,
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    fixtureResponsePosture: "deterministic fixture response only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      "No frontend request. No API route. No provider call. No persistence.",
    ...buildCommonRecordFields(),
  };
}

function buildResponseRecord(): TextAdapterResultCaptureResponseRecord {
  return {
    key: buildTextAdapterResultCaptureResponseKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-response-v1",
    responseState: "returned by server-only smoke/helper only",
    textAdapterResultCaptureMvpId: STATIC_FIXTURE_ID,
    captureState: "captured-text-adapter-fixture-in-memory-only",
    capturedResultState: "deterministic fixture result captured in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Fixture capture only. No provider output. No persistence.",
    ...buildCommonRecordFields(),
  };
}

function buildErrorRecord(): TextAdapterResultCaptureErrorRecord {
  return {
    key: buildTextAdapterResultCaptureErrorKey(STATIC_FIXTURE_ID),
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-error-v1",
    errorState: "deterministic preview only",
    textAdapterResultCaptureMvpId: STATIC_FIXTURE_ID,
    failedGateExamples: [
      "deterministic-fixture-response-present",
      "redacted-prompt-envelope-present",
      "prompt-not-sent",
      "provider-sdk-not-imported",
      "no-provider-execution",
      "no-model-call",
      "no-result-persistence",
    ],
    missingTextAdapterFixtureResponseExample:
      "Text adapter deterministic fixture response is required.",
    missingRedactedPromptEnvelopeExample:
      "Text adapter redacted prompt envelope is required.",
    promptTransmissionAttemptedExample:
      "Prompt transmission must remain blocked.",
    providerSdkImportAttemptedExample:
      "Provider SDK import must remain blocked.",
    providerCallAttemptedExample:
      "Provider execution must remain blocked.",
    modelCallAttemptedExample: "Model calls must remain blocked.",
    persistenceAttemptedExample:
      "Persistence target must remain absent.",
    databaseWriteAttemptedExample:
      "Database write target must remain absent.",
    fileWriteAttemptedExample: "File write target must remain absent.",
    queueWorkerJobAttemptedExample:
      "Queue, worker, and job dispatch must remain blocked.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(),
  };
}

function buildGateRecord(
  seed: TextAdapterResultCaptureGateSeed
): TextAdapterResultCaptureGateRecord {
  return {
    id: seed.gateId,
    key: `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate:${STATIC_FIXTURE_ID}:${seed.gateId}`,
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-v1",
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: seed.currentState,
    evidence: `${seed.evidence}. Source fixture response: ${STATIC_SOURCE.textAdapterFixtureResponseRecord.key}.`,
    blockedLiveAction: seed.blockedLiveAction,
    ...buildCommonRecordFields(),
  };
}

function buildReadinessMatrixRecord(
  seed: TextAdapterResultCaptureReadinessSeed
): TextAdapterResultCaptureReadinessMatrixRecord {
  return {
    id: seed.readinessId,
    key: `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness:${STATIC_FIXTURE_ID}:${seed.readinessId}`,
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness-matrix-v1",
    label: seed.label,
    state: seed.state,
    evidence: `${seed.evidence}. Source fixture response: ${STATIC_SOURCE.textAdapterFixtureResponseRecord.key}.`,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction: seed.nextSafeAction,
    ...buildCommonRecordFields(),
  };
}

const RESULT_CAPTURE_MVP_RECORDS = [buildMvpRecord()] as const;
const RESULT_CAPTURE_INPUT_RECORDS = [buildInputRecord()] as const;
const RESULT_CAPTURE_ADMISSION_CHECK_RECORDS = [
  buildAdmissionCheckRecord(),
] as const;
const RESULT_CAPTURE_OUTPUT_RECORDS = [buildOutputRecord()] as const;
const RESULT_CAPTURE_ENVELOPE_RECORDS = [buildEnvelopeRecord()] as const;
const RESULT_CAPTURE_EVIDENCE_PREVIEW_RECORDS = [
  buildEvidencePreviewRecord(),
] as const;
const RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS = [
  buildAuditPreviewRecord(),
] as const;
const RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS = [
  buildApprovalPreviewRecord(),
] as const;
const RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS = [
  buildSafetyGateSummaryRecord(),
] as const;
const RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS = [
  buildBlockedLivePersistenceSummaryRecord(),
] as const;
const RESULT_CAPTURE_REQUEST_RECORDS = [buildRequestRecord()] as const;
const RESULT_CAPTURE_RESPONSE_RECORDS = [buildResponseRecord()] as const;
const RESULT_CAPTURE_ERROR_RECORDS = [buildErrorRecord()] as const;
const RESULT_CAPTURE_GATE_RECORDS = GATE_SEEDS.map(buildGateRecord);
const RESULT_CAPTURE_READINESS_MATRIX_RECORDS =
  READINESS_SEEDS.map(buildReadinessMatrixRecord);

export function listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords():
  readonly MinimalTextAdapterResultCaptureMvpRecord[] {
  return cloneList(RESULT_CAPTURE_MVP_RECORDS);
}

export function listTextAdapterResultCaptureInputs():
  readonly TextAdapterResultCaptureInputRecord[] {
  return cloneList(RESULT_CAPTURE_INPUT_RECORDS);
}

export function listTextAdapterResultCaptureAdmissionChecks():
  readonly TextAdapterResultCaptureAdmissionCheckRecord[] {
  return cloneList(RESULT_CAPTURE_ADMISSION_CHECK_RECORDS);
}

export function listTextAdapterCapturedFixtureResultOutputs():
  readonly TextAdapterCapturedFixtureResultOutputRecord[] {
  return cloneList(RESULT_CAPTURE_OUTPUT_RECORDS);
}

export function listTextAdapterResultCaptureEnvelopes():
  readonly TextAdapterResultCaptureEnvelopeRecord[] {
  return cloneList(RESULT_CAPTURE_ENVELOPE_RECORDS);
}

export function listTextAdapterResultCaptureEvidencePreviews():
  readonly TextAdapterResultCaptureEvidencePreviewRecord[] {
  return cloneList(RESULT_CAPTURE_EVIDENCE_PREVIEW_RECORDS);
}

export function listTextAdapterResultCaptureAuditPreviews():
  readonly TextAdapterResultCaptureAuditPreviewRecord[] {
  return cloneList(RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS);
}

export function listTextAdapterResultCaptureApprovalPreviews():
  readonly TextAdapterResultCaptureApprovalPreviewRecord[] {
  return cloneList(RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS);
}

export function listTextAdapterResultCaptureSafetyGateSummaries():
  readonly TextAdapterResultCaptureSafetyGateSummaryRecord[] {
  return cloneList(RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS);
}

export function listTextAdapterResultCaptureBlockedLivePersistenceSummaries():
  readonly TextAdapterResultCaptureBlockedLivePersistenceSummaryRecord[] {
  return cloneList(RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS);
}

export function listTextAdapterResultCaptureRequestRecords():
  readonly TextAdapterResultCaptureRequestRecord[] {
  return cloneList(RESULT_CAPTURE_REQUEST_RECORDS);
}

export function listTextAdapterResultCaptureResponseRecords():
  readonly TextAdapterResultCaptureResponseRecord[] {
  return cloneList(RESULT_CAPTURE_RESPONSE_RECORDS);
}

export function listTextAdapterResultCaptureErrorRecords():
  readonly TextAdapterResultCaptureErrorRecord[] {
  return cloneList(RESULT_CAPTURE_ERROR_RECORDS);
}

export function listTextAdapterResultCaptureGates():
  readonly TextAdapterResultCaptureGateRecord[] {
  return cloneList(RESULT_CAPTURE_GATE_RECORDS);
}

export function listTextAdapterResultCaptureReadinessMatrixRecords():
  readonly TextAdapterResultCaptureReadinessMatrixRecord[] {
  return cloneList(RESULT_CAPTURE_READINESS_MATRIX_RECORDS);
}

export function buildTextAdapterResultCaptureSummary():
  TextAdapterResultCaptureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    captureCount: RESULT_CAPTURE_MVP_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_SUMMARY_LINES),
    nextSafeAction:
      "Keep the MVP backend-only, server-only, deterministic, and in-memory only while result capture review and recovery preview is defined next.",
  };
}

export function buildTextAdapterResultCaptureGateSummary():
  TextAdapterResultCaptureGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-summary-v1",
    gateCount: RESULT_CAPTURE_GATE_RECORDS.length,
    blockedGateCount: RESULT_CAPTURE_GATE_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_GATE_SUMMARY_LINES),
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

export function buildTextAdapterResultCaptureReadinessSummary():
  TextAdapterResultCaptureReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness-summary-v1",
    readinessCount: RESULT_CAPTURE_READINESS_MATRIX_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_READINESS_SUMMARY_LINES),
    nextSafeAction:
      "Advance to result capture review and recovery preview without creating a frontend request, API route, provider/model call, queue dispatch, worker dispatch, job execution, or persistence path.",
  };
}

export function buildNextTextAdapterResultCaptureReviewRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST);
}
